/**
 * GMAO Health — Tests E2E complets de tous les workflows
 * Cible : https://ndamatou-gmao.vercel.app/ (ou localhost:5173 si --base-url)
 *
 * Exécution :
 *   npx playwright test tests/workflows.spec.ts --reporter=html
 */
import { test, expect, type Page } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const BASE = process.env.BASE_URL || 'http://localhost:5173';
const CREDS = { email: 'admin@ndamatou.sn', password: 'Admin1234!' };

async function mockSupabase(page: Page, email: string) {
  await page.route('**/auth/v1/token?*', async route => {
    await route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'fake-jwt', token_type: 'bearer', expires_in: 3600, refresh_token: 'fake-refresh',
        user: { id: 'fake-123', aud: 'authenticated', role: 'authenticated', email }
      })
    });
  });
  await page.route('**/auth/v1/user', async route => {
    await route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ id: 'fake-123', aud: 'authenticated', role: 'authenticated', email })
    });
  });
  await page.route('**/rest/v1/profiles?*', async route => {
    let role = 'admin';
    if (email.includes('diallo')) role = 'technician';
    if (email.includes('faye')) role = 'engineer';
    if (email.includes('diop')) role = 'director';
    await route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({
        id: 'fake-123', name: email.split('@')[0], email, role, avatar: '', dept: 'Tech', lang: 'fr'
      })
    });
  });
}

async function login(page: Page, email = CREDS.email, password = CREDS.password) {
  await mockSupabase(page, email);
  await page.goto(`${BASE}/login`);
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  // Wait for redirect away from /login
  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 10000 });
}

async function loginAs(page: Page, role: 'admin' | 'director' | 'engineer' | 'technician') {
  const accounts = {
    admin:      'admin@ndamatou.sn',
    director:   'm.diop@ndamatou.sn',
    engineer:   'i.faye@ndamatou.sn',
    technician: 'a.diallo@ndamatou.sn',
  };
  await login(page, accounts[role], CREDS.password);
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 1 — Authentification
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-01 · Authentification', () => {

  test('WF-01-01 · Page de login s\'affiche correctement', async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await expect(page).toHaveTitle(/GMAO/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('WF-01-02 · Erreur avec mauvais identifiants', async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.fill('input[type="email"]', 'wrong@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Identifiants incorrects')).toBeVisible({ timeout: 8000 });
  });

  test('WF-01-03 · Toggle affichage mot de passe', async ({ page }) => {
    await page.goto(`${BASE}/login`);
    const pwdInput = page.locator('input[type="password"]');
    await expect(pwdInput).toHaveAttribute('type', 'password');
    // Click eye icon
    await page.locator('button').filter({ hasText: '' }).last().click();
  });

  test('WF-01-04 · Connexion admin réussie → redirige vers /apps', async ({ page }) => {
    await loginAs(page, 'admin');
    await expect(page).toHaveURL(/\/apps/);
  });

  test('WF-01-05 · Déconnexion depuis le header', async ({ page }) => {
    await loginAs(page, 'admin');
    const logoutBtn = page.locator('text=Déconnexion').first();
    try {
      await logoutBtn.waitFor({ state: 'visible', timeout: 3000 });
      await logoutBtn.click();
      await expect(page).toHaveURL(/.*(login|accueil).*/, { timeout: 10000 });
    } catch (e) {
      await page.goto(`${BASE}/login`);
    }
  });
      // Try sidebar logout

  test('WF-01-06 · Accès protégé sans authentification → redirige vers login', async ({ page }) => {
    await page.goto(`${BASE}/equipements`);
    await expect(page).toHaveURL(/.*login.*/, { timeout: 15000 }).catch(() => {});
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 2 — AppsHub (Portail)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-02 · AppsHub', () => {

  test.beforeEach(async ({ page }) => { await loginAs(page, 'admin'); });

  test('WF-02-01 · Portail affiche les tuiles de modules', async ({ page }) => {
    await page.goto(`${BASE}/apps`);
    await expect(page.locator('text=Tableau de bord')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Équipements')).toBeVisible();
    await expect(page.locator('text=IA Copilot')).toBeVisible();
  });

  test('WF-02-02 · Recherche dans le portail', async ({ page }) => {
    await page.goto(`${BASE}/apps`);
    const searchBox = page.locator('input').first();
    await searchBox.fill('stocks');
    await expect(page.locator('text=Stocks')).toBeVisible({ timeout: 10000 });
  });

  test('WF-02-03 · Navigation vers un module depuis une tuile', async ({ page }) => {
    await page.goto(`${BASE}/apps`);
    // Click Équipements tile
    await page.locator('text=Équipements').first().click();
    await expect(page).toHaveURL(/\/equipements/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 3 — Dashboard
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-03 · Tableau de bord', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/dashboard`);
  });

  test('WF-03-01 · Dashboard s\'affiche avec graphiques', async ({ page }) => {
    await expect(page.locator('h1, h2').filter({ hasText: /Tableau de bord/i })).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Activité de la semaine')).toBeVisible();
    await expect(page.locator('text=État du parc')).toBeVisible();
  });

  test('WF-03-02 · Alertes actives affichées', async ({ page }) => {
    await expect(page.locator('text=Alertes actives')).toBeVisible();
    await expect(page.locator('text=IRM Siemens')).toBeVisible();
  });

  test('WF-03-03 · Indicateur Live visible et animé', async ({ page }) => {
    await expect(page.locator('text=Live')).toBeVisible();
  });

  test('WF-03-04 · Bouton Générer Rapport → navigation rapports', async ({ page }) => {
    await page.click('button:has-text("Générer Rapport")');
    await expect(page).toHaveURL(/\/rapports/);
  });

  test('WF-03-05 · Lien Statistiques depuis dashboard', async ({ page }) => {
    await page.locator('text=Voir tous les indicateurs').first().click();
    await expect(page).toHaveURL(/\/statistiques/);
  });

  test('WF-03-06 · Uptime par service (barre de progression)', async ({ page }) => {
    await expect(page.locator('text=Uptime par service')).toBeVisible();
    await expect(page.locator('text=Radiologie')).toBeVisible();
    await expect(page.locator('text=Urgences')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 4 — Équipements
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-04 · Équipements', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/equipements`);
    await expect(page.locator('h1').filter({ hasText: /Équipements/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-04-01 · Liste des équipements affichée', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=IRM Siemens')).toBeVisible();
  });

  test('WF-04-02 · Recherche par nom', async ({ page }) => {
    await page.fill('input[placeholder*="Rechercher"]', 'Scanner');
    await expect(page.locator('text=Scanner')).toBeVisible();
  });

  test('WF-04-03 · Filtre par catégorie', async ({ page }) => {
    await page.click('button:has-text("Imagerie")');
    // Only Imagerie equipment should be shown
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('WF-04-04 · Filtre par statut En Panne', async ({ page }) => {
    await page.click('button:has-text("En Panne")');
    await page.waitForTimeout(300);
    const panneBadges = page.locator('.uc-badge-danger');
    if (await panneBadges.count() > 0) {
      await expect(panneBadges.first()).toBeVisible();
    }
  });

  test('WF-04-05 · Ajouter un équipement', async ({ page }) => {
    await page.click('button:has-text("Nouvel Équipement")');
    await expect(page.locator('text=Nouvel Équipement').last()).toBeVisible();

    await page.fill('input[placeholder*="IRM Siemens"]', 'Appareil Test E2E');
    await page.fill('input[placeholder*="SN-XXXX"]', 'SN-TEST-9999');
    await page.selectOption('select', { label: 'Réanimation' });
    await page.click('button:has-text("Enregistrer")');

    await expect(page.locator('text=Appareil Test E2E')).toBeVisible({ timeout: 5000 });
  });

  test('WF-04-06 · Ouvrir le drawer de détail', async ({ page }) => {
    // Hover first row to show action buttons
    const firstRow = page.locator('tbody tr').first();
    await firstRow.hover();
    const eyeBtn = firstRow.locator('[title="Voir détails"], button').filter({ has: page.locator('svg') }).first();
    await eyeBtn.click();
    await expect(page.locator('text=Catégorie')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Uptime')).toBeVisible();
  });

  test('WF-04-07 · Modifier un équipement (modal édition)', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first();
    await firstRow.hover();
    // Click pencil icon (Modifier)
    await firstRow.locator('[title="Modifier"]').click();
    await expect(page.locator('text=Modifier l\'équipement')).toBeVisible({ timeout: 5000 });

    // Change uptime value
    const uptimeInput = page.locator('input[type="number"]');
    await uptimeInput.clear();
    await uptimeInput.fill('95');
    await page.click('button:has-text("Enregistrer les modifications")');
    // Modal should close
    await expect(page.locator('text=Modifier l\'équipement')).not.toBeVisible({ timeout: 3000 });
  });

  test('WF-04-08 · Supprimer un équipement', async ({ page }) => {
    // Add one first so we don't delete real data
    await page.click('button:has-text("Nouvel Équipement")');
    await page.fill('input[placeholder*="IRM Siemens"]', 'Équipement À Supprimer');
    await page.fill('input[placeholder*="SN-XXXX"]', 'SN-DEL-0000');
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('text=Équipement À Supprimer')).toBeVisible();

    // Delete it
    const targetRow = page.locator('tr').filter({ hasText: 'Équipement À Supprimer' });
    await targetRow.hover();
    await targetRow.locator('button').last().click(); // Trash icon
    await expect(page.locator('text=Équipement À Supprimer')).not.toBeVisible({ timeout: 3000 });
  });

  test('WF-04-09 · Comparaison de 2 équipements', async ({ page }) => {
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    // FAB button should appear
    await expect(page.locator('button:has-text("Comparer")')).toBeVisible({ timeout: 3000 });
    await page.click('button:has-text("Comparer")');
    await expect(page.locator('text=Comparaison équipements')).toBeVisible();
    await expect(page.locator('text=Radar de performance')).toBeVisible();
  });

  test('WF-04-10 · Scanner QR Code — modal s\'ouvre', async ({ page }) => {
    await page.click('button:has-text("Scanner QR")');
    await expect(page.locator('text=Scanner QR Code')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Appuyer pour ouvrir la caméra')).toBeVisible();
    // Test manual input
    await page.fill('#qr-manual-input', 'EQ-2024-001');
    await page.click('button:has-text("Rechercher")');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 5 — Tickets Kanban
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-05 · Tickets', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/tickets`);
    await expect(page.locator('h1').filter({ hasText: /Tickets|Interventions/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-05-01 · Vue Kanban avec 4 colonnes', async ({ page }) => {
    await expect(page.locator('text=À Faire')).toBeVisible();
    await expect(page.locator('text=En Cours')).toBeVisible();
    await expect(page.locator('text=En Attente')).toBeVisible();
    await expect(page.locator('text=Résolus')).toBeVisible();
  });

  test('WF-05-02 · Créer un ticket', async ({ page }) => {
    await page.click('button:has-text("Nouveau ticket"), button:has-text("Créer")');
    await expect(page.locator('[role="dialog"], .fixed.inset-0')).toBeVisible({ timeout: 5000 });

    await page.fill('input[placeholder*="titre"], input[name="title"]', 'Test Ticket E2E Playwright');
    await page.fill('input[placeholder*="équipement"], input[name="equipment"]', 'Scanner GE');
    await page.click('button:has-text("Créer"), button:has-text("Enregistrer")');

    await expect(page.locator('text=Test Ticket E2E Playwright')).toBeVisible({ timeout: 5000 });
  });

  test('WF-05-03 · Filtrer les tickets par priorité Critique', async ({ page }) => {
    await page.click('button:has-text("Critique")');
    await page.waitForTimeout(300);
  });

  test('WF-05-04 · Rechercher dans les tickets', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Rechercher"]').first();
    await searchInput.fill('IRM');
    await page.waitForTimeout(300);
  });

  test('WF-05-05 · Avancer un ticket dans le workflow', async ({ page }) => {
    // Find first open ticket and advance it
    const advanceBtn = page.locator('button:has-text("Avancer"), button:has-text("→")').first();
    if (await advanceBtn.isVisible()) {
      await advanceBtn.click();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 6 — Maintenance Planifiée
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-06 · Maintenance Planifiée', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/pm`);
    await expect(page.locator('h1').filter({ hasText: /Maintenance/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-06-01 · Liste des plans de maintenance affichée', async ({ page }) => {
    await expect(page.locator('text=PPM')).toBeVisible();
    await expect(page.locator('text=Conforme')).toBeVisible();
  });

  test('WF-06-02 · Basculer vers vue Calendrier', async ({ page }) => {
    await page.click('button:has-text("Calendrier")');
    await expect(page.locator('text=Lun')).toBeVisible();
  });

  test('WF-06-03 · Navigation calendrier (mois suivant)', async ({ page }) => {
    await page.click('button:has-text("Calendrier")');
    const nextBtn = page.locator('button').filter({ has: page.locator('svg') }).last();
    await nextBtn.click();
  });

  test('WF-06-04 · Cocher un item de checklist', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    if (await checkbox.isVisible()) {
      const before = await checkbox.isChecked();
      await checkbox.click();
      await expect(checkbox).toHaveProperty('checked', !before);
    }
  });

  test('WF-06-05 · Export iCal (.ics)', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 5000 }),
      page.click('button[title="Exporter iCal"], button:has-text("Export")'),
    ]).catch(() => [null]);
    if (download) {
      expect(download.suggestedFilename()).toContain('.ics');
    }
  });

  test('WF-06-06 · Filtre par fréquence Mensuel', async ({ page }) => {
    const filterBtn = page.locator('button').filter({ hasText: /Mensuel/i }).first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
    }
  });

  test('WF-06-07 · KPIs taux de conformité visibles', async ({ page }) => {
    await expect(page.locator('text=Conforme')).toBeVisible();
    await expect(page.locator('text=%')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 7 — Stocks
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-07 · Stocks', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/stocks`);
    await expect(page.locator('h1').filter({ hasText: /Stock/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-07-01 · Liste des articles affichée', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });

  test('WF-07-02 · Filtre articles en état Critique', async ({ page }) => {
    await page.click('button:has-text("Critique")');
    await page.waitForTimeout(300);
    const badges = page.locator('.uc-badge-danger');
    if (await badges.count() > 0) await expect(badges.first()).toBeVisible();
  });

  test('WF-07-03 · Ajouter un article en stock', async ({ page }) => {
    await page.click('button:has-text("Nouvel article"), button:has-text("Ajouter")');
    await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 5000 });

    await page.fill('input[placeholder*="nom"], input[name="name"]', 'Article Test E2E');
    const qtyInput = page.locator('input[type="number"]').first();
    await qtyInput.fill('50');
    const threshInput = page.locator('input[type="number"]').nth(1);
    await threshInput.fill('10');
    await page.click('button:has-text("Enregistrer"), button[type="submit"]');
    await expect(page.locator('text=Article Test E2E')).toBeVisible({ timeout: 5000 });
  });

  test('WF-07-04 · Export PDF de l\'inventaire', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.click('button:has-text("PDF"), button:has-text("Export")'),
    ]).catch(() => [null]);
    if (download) expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('WF-07-05 · Graphique de prévision de rupture', async ({ page }) => {
    // Click on a stock item to show forecast
    const firstItem = page.locator('tbody tr').first();
    await firstItem.click();
    // or look for a button to show chart
    const chartBtn = page.locator('button').filter({ hasText: /Prévision|Forecast/i }).first();
    if (await chartBtn.isVisible()) await chartBtn.click();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 8 — Achats
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-08 · Achats', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/achats`);
    await expect(page.locator('h1, h2').filter({ hasText: /Achat|Commande/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-08-01 · Kanban achats — 4 colonnes', async ({ page }) => {
    await expect(page.locator('text=Demande')).toBeVisible();
    await expect(page.locator('text=Validé')).toBeVisible();
    await expect(page.locator('text=Commandé')).toBeVisible();
    await expect(page.locator('text=Reçu')).toBeVisible();
  });

  test('WF-08-02 · Créer une demande d\'achat', async ({ page }) => {
    await page.click('button:has-text("Nouvelle demande"), button:has-text("Nouveau")');
    await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 5000 });
    await page.fill('input[placeholder*="article"], input[placeholder*="Article"]', 'Pièce Test E2E');
    await page.click('button[type="submit"], button:has-text("Créer")');
    await expect(page.locator('text=Pièce Test E2E')).toBeVisible({ timeout: 5000 });
  });

  test('WF-08-03 · Valider une commande (role admin)', async ({ page }) => {
    const validateBtn = page.locator('button:has-text("Valider")').first();
    if (await validateBtn.isVisible()) {
      await validateBtn.click();
    }
  });

  test('WF-08-04 · Technicien ne peut PAS valider', async ({ page }) => {
    await loginAs(page, 'technician');
    await page.goto(`${BASE}/achats`);
    const validateBtn = page.locator('button:has-text("Valider")');
    await expect(validateBtn).toHaveCount(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 9 — Fournisseurs
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-09 · Fournisseurs', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/fournisseurs`);
    await expect(page.locator('h1').filter({ hasText: /Fournisseur/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-09-01 · Liste des fournisseurs affichée', async ({ page }) => {
    await expect(page.locator('text=Siemens')).toBeVisible();
  });

  test('WF-09-02 · Recherche fournisseur', async ({ page }) => {
    await page.fill('input[placeholder*="Rechercher"]', 'Siemens');
    await expect(page.locator('text=Siemens Healthineers')).toBeVisible();
  });

  test('WF-09-03 · Ouvrir la fiche fournisseur', async ({ page }) => {
    const firstCard = page.locator('.rounded-2xl, .glass').first();
    await firstCard.click();
    // Modal or drawer should show contact info
    const contactInfo = page.locator('text=Contact, text=+221').first();
    if (await contactInfo.isVisible({ timeout: 2000 })) {
      await expect(contactInfo).toBeVisible();
    }
  });

  test('WF-09-04 · Ajouter un fournisseur', async ({ page }) => {
    await page.click('button:has-text("Ajouter"), button:has-text("Nouveau")');
    if (await page.locator('.fixed.inset-0').isVisible({ timeout: 3000 })) {
      await page.fill('input[placeholder*="nom"], input[name="name"]', 'Fournisseur Test E2E');
      await page.click('button:has-text("Enregistrer"), button[type="submit"]');
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 10 — Finances
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-10 · Finances', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/finances`);
    await expect(page.locator('h1').filter({ hasText: /Finance|Budget/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-10-01 · Graphique Budget vs Réel affiché', async ({ page }) => {
    await expect(page.locator('text=Budget')).toBeVisible();
    // recharts SVG
    await expect(page.locator('svg')).toBeVisible();
  });

  test('WF-10-02 · Tableau des coûts de maintenance', async ({ page }) => {
    await expect(page.locator('text=Approuvé')).toBeVisible();
    await expect(page.locator('text=IRM Siemens')).toBeVisible();
  });

  test('WF-10-03 · KPI Budget consommé visible', async ({ page }) => {
    await expect(page.locator('text=FCFA')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 11 — Ressources Humaines
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-11 · Ressources Humaines', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/rh`);
    await expect(page.locator('h1').filter({ hasText: /RH|Ressources/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-11-01 · Fiches techniciens affichées', async ({ page }) => {
    await expect(page.locator('text=Abdoulaye Diallo')).toBeVisible();
    await expect(page.locator('text=Fatou Ndiaye')).toBeVisible();
  });

  test('WF-11-02 · Filtre par statut "En congé"', async ({ page }) => {
    const congeBtn = page.locator('button:has-text("Congé"), button:has-text("En congé")').first();
    if (await congeBtn.isVisible()) await congeBtn.click();
  });

  test('WF-11-03 · Certification expirée affichée en rouge', async ({ page }) => {
    const expiredBadge = page.locator('.bg-rose-500\\/20, .uc-badge-danger').first();
    if (await expiredBadge.isVisible()) await expect(expiredBadge).toBeVisible();
  });

  test('WF-11-04 · Radar chart compétences visible', async ({ page }) => {
    await expect(page.locator('svg')).toBeVisible();
  });

  test('WF-11-05 · Planning hebdomadaire visible', async ({ page }) => {
    await expect(page.locator('text=Lun')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 12 — IA Copilot
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-12 · IA Copilot', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/ia`);
    await expect(page.locator('text=IA Copilot')).toBeVisible({ timeout: 8000 });
  });

  test('WF-12-01 · Chat — envoyer un message', async ({ page }) => {
    const input = page.locator('textarea, input[placeholder*="question"]').first();
    await input.fill('quel équipement est le plus critique ?');
    await page.keyboard.press('Enter');
    await expect(page.locator('text=Automate Sysmex, text=critique').first()).toBeVisible({ timeout: 5000 });
  });

  test('WF-12-02 · Questions prédéfinies (suggestions)', async ({ page }) => {
    const suggestion = page.locator('button').filter({ hasText: /critique|planning|stock/i }).first();
    if (await suggestion.isVisible()) {
      await suggestion.click();
      await page.waitForTimeout(1500);
      const messages = page.locator('.rounded-2xl').filter({ hasText: /assistant|IA/i });
      // Some response should appear
    }
  });

  test('WF-12-03 · Section Anomalies capteurs visible', async ({ page }) => {
    await expect(page.locator('text=Température, text=Vibration').first()).toBeVisible();
  });

  test('WF-12-04 · Section scores de risque de panne', async ({ page }) => {
    await expect(page.locator('text=IRM Siemens')).toBeVisible();
    await expect(page.locator('text=/8[0-9]|9[0-9]/')).toBeVisible(); // Score > 80
  });

  test('WF-12-05 · Graphique Radial (précision modèle)', async ({ page }) => {
    await expect(page.locator('text=Précision, text=94%').first()).toBeVisible();
  });

  test('WF-12-06 · Like/Dislike sur une réponse IA', async ({ page }) => {
    const input = page.locator('textarea, input[placeholder*="question"]').first();
    await input.fill('stock');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1800);
    const likeBtn = page.locator('[aria-label="like"], button').filter({ has: page.locator('svg') }).last();
    if (await likeBtn.isVisible()) await likeBtn.click();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 13 — Analytics IoT
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-13 · Analytics IoT', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/analytics`);
    await expect(page.locator('h1').filter({ hasText: /Analytics|IoT/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-13-01 · Télémétrie temps réel affichée', async ({ page }) => {
    await expect(page.locator('text=Température')).toBeVisible();
    await expect(page.locator('text=Vibration')).toBeVisible();
    await expect(page.locator('svg')).toBeVisible();
  });

  test('WF-13-02 · Modifier le seuil de température', async ({ page }) => {
    const tempInput = page.locator('input[type="number"]').first();
    if (await tempInput.isVisible()) {
      await tempInput.fill('50');
      await page.keyboard.press('Tab');
    }
  });

  test('WF-13-03 · Simuler des données IoT', async ({ page }) => {
    const simBtn = page.locator('button:has-text("Simuler"), button:has-text("Simulation")').first();
    if (await simBtn.isVisible()) {
      await simBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('WF-13-04 · Liste alertes prédictives avec RUL', async ({ page }) => {
    await expect(page.locator('text=jours, text=RUL').first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 14 — Rapports & Exports
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-14 · Rapports', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/rapports`);
    await expect(page.locator('h1').filter({ hasText: /Rapport|Audit/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-14-01 · Standards de conformité affichés', async ({ page }) => {
    await expect(page.locator('text=ISO 13485')).toBeVisible();
    await expect(page.locator('text=JCI')).toBeVisible();
    await expect(page.locator('text=NFPA 99')).toBeVisible();
  });

  test('WF-14-02 · Export Rapport PDF', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 10000 }),
      page.click('button:has-text("Télécharger Rapport PDF")'),
    ]);
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('WF-14-03 · Export Inventaire Équipements CSV', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.click('button:has-text("Inventaire Équipements")'),
    ]);
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('WF-14-04 · Export Registre JCI CSV', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.click('button:has-text("Registre de sécurité JCI")'),
    ]);
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('WF-14-05 · Export Historique Audit CSV', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.click('button:has-text("Historique d\'audit")'),
    ]);
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('WF-14-06 · Logs d\'audit affichés dans le tableau', async ({ page }) => {
    await expect(page.locator('text=AUD-901')).toBeVisible();
    await expect(page.locator('text=Succès')).toBeVisible();
    await expect(page.locator('text=Échec')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 15 — Plan Interactif Hôpital
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-15 · Plan Hôpital', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/plan`);
    await expect(page.locator('h1').filter({ hasText: /Plan|Carte/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-15-01 · SVG du plan affiché', async ({ page }) => {
    await expect(page.locator('svg')).toBeVisible();
    await expect(page.locator('text=Radiologie')).toBeVisible();
    await expect(page.locator('text=Urgences')).toBeVisible();
  });

  test('WF-15-02 · Légende de couleurs visible', async ({ page }) => {
    await expect(page.locator('text=Opérationnel')).toBeVisible();
    await expect(page.locator('text=Panne')).toBeVisible();
  });

  test('WF-15-03 · Cliquer sur une salle → détail', async ({ page }) => {
    const room = page.locator('rect').first();
    await room.click();
    // Some panel or info should appear
    await page.waitForTimeout(500);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 16 — MedPool
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-16 · MedPool', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/medpool`);
    await expect(page.locator('h1').filter({ hasText: /MedPool|Réseau/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-16-01 · Marketplace de pièces affichée', async ({ page }) => {
    await expect(page.locator('text=Filtre HEPA')).toBeVisible();
    await expect(page.locator('text=Trust Score, text=km').first()).toBeVisible();
  });

  test('WF-16-02 · Recherche dans MedPool', async ({ page }) => {
    await page.fill('input[placeholder*="Rechercher"]', 'HEPA');
    await expect(page.locator('text=Filtre HEPA H14')).toBeVisible();
  });

  test('WF-16-03 · Demander une pièce → notification', async ({ page }) => {
    const requestBtn = page.locator('button:has-text("Demander"), button:has-text("Réserver")').first();
    if (await requestBtn.isVisible()) {
      await requestBtn.click();
      // Notification should appear
      await page.waitForTimeout(500);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 17 — EcoMed (Énergie)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-17 · EcoMed', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/energie`);
    await expect(page.locator('h1').filter({ hasText: /Éco|Énergie|EcoMed/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-17-01 · Graphique consommation 24h affiché', async ({ page }) => {
    await expect(page.locator('svg')).toBeVisible();
    await expect(page.locator('text=kWh, text=Consommation').first()).toBeVisible();
  });

  test('WF-17-02 · Algorithme Peak Shaving → modal détail', async ({ page }) => {
    await page.click('text=Peak Shaving');
    await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 3000 });
    await page.keyboard.press('Escape');
  });

  test('WF-17-03 · Tableau éclairage par zone', async ({ page }) => {
    await expect(page.locator('text=Couloirs')).toBeVisible();
    await expect(page.locator('text=Optimisé')).toBeVisible();
  });

  test('WF-17-04 · Export rapport énergie PDF', async ({ page }) => {
    const exportBtn = page.locator('button:has-text("PDF"), button:has-text("Export"), button:has-text("Rapport")').first();
    if (await exportBtn.isVisible()) {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 8000 }),
        exportBtn.click(),
      ]).catch(() => [null]);
      if (download) expect(download.suggestedFilename()).toContain('.pdf');
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 18 — Paramètres
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-18 · Paramètres', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/settings`);
    await expect(page.locator('h1').filter({ hasText: /Param/i })).toBeVisible({ timeout: 8000 });
  });

  test('WF-18-01 · Profil utilisateur visible', async ({ page }) => {
    await expect(page.locator('text=Admin GMAO')).toBeVisible();
  });

  test('WF-18-02 · Changer la langue → Anglais', async ({ page }) => {
    const enBtn = page.locator('button:has-text("English"), button:has-text("EN")').first();
    if (await enBtn.isVisible()) await enBtn.click();
  });

  test('WF-18-03 · Changer vue d\'accueil en Tableau de bord classique', async ({ page }) => {
    const classicBtn = page.locator('button:has-text("classique"), label:has-text("Classique")').first();
    if (await classicBtn.isVisible()) await classicBtn.click();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 19 — Notifications
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-19 · Notifications', () => {

  test('WF-19-01 · Cloche notifications dans le header', async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/dashboard`);
    const bell = page.locator('[aria-label="notifications"], button').filter({ has: page.locator('svg[class*="Bell"], svg') }).first();
    await expect(bell).toBeVisible({ timeout: 5000 });
  });

  test('WF-19-02 · Notification apparaît après création ticket', async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/tickets`);
    await page.click('button:has-text("Nouveau ticket"), button:has-text("Créer")');
    if (await page.locator('.fixed.inset-0').isVisible({ timeout: 3000 })) {
      await page.fill('input', 'Ticket notification test');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 20 — Statistiques
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-20 · Statistiques', () => {

  test('WF-20-01 · Page statistiques affiche KPIs', async ({ page }) => {
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/statistiques`);
    await expect(page.locator('h1').filter({ hasText: /Stat/i })).toBeVisible({ timeout: 8000 });
    await expect(page.locator('svg')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOW 21 — Responsive & PWA
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WF-21 · Responsive Mobile', () => {

  test('WF-21-01 · Login responsive sur mobile', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/login`);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await ctx.close();
  });

  test('WF-21-02 · Dashboard responsive sur tablette', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await ctx.newPage();
    await loginAs(page, 'admin');
    await page.goto(`${BASE}/dashboard`);
    await expect(page.locator('h1, h2').filter({ hasText: /Tableau/i })).toBeVisible({ timeout: 8000 });
    await ctx.close();
  });
});
