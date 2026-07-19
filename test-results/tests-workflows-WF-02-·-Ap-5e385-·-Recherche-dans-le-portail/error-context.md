# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-02 · AppsHub >> WF-02-02 · Recherche dans le portail
- Location: tests\workflows.spec.ts:133:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Stocks')
Expected: visible
Error: strict mode violation: locator('text=Stocks') resolved to 2 elements:
    1) <p class="text-sm">Stocks, achats et partenaires</p> aka getByText('Stocks, achats et partenaires')
    2) <p class="text-base font-bold truncate">Stocks & Achats</p> aka getByRole('button', { name: 'Stocks & Achats Consommables' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=Stocks')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - img [ref=e13]
        - generic [ref=e16]:
          - paragraph [ref=e17]: Portail GMAO
          - paragraph [ref=e18]: Hôpital Ndamatou Touba
      - generic [ref=e19]:
        - generic [ref=e22]:
          - paragraph [ref=e23]: admin
          - paragraph [ref=e24]: Administrateur
        - button "Tableau de bord classique" [ref=e25]:
          - img [ref=e26]
          - text: Tableau de bord classique
  - generic [ref=e28]:
    - img [ref=e29]
    - generic [ref=e31]:
      - generic [ref=e32]:
        - img [ref=e33]
        - generic [ref=e38]: Portail d'accès
      - heading "17 modules GMAO" [level=1] [ref=e39]
      - paragraph [ref=e40]: Un seul écosystème pour la maintenance biomédicale, l'approvisionnement et le pilotage de l'Hôpital Ndamatou Touba.
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e44]: "5"
          - generic [ref=e45]: Maintenance
        - generic [ref=e46]:
          - generic [ref=e48]: "5"
          - generic [ref=e49]: Approvisionnement
        - generic [ref=e50]:
          - generic [ref=e52]: "6"
          - generic [ref=e53]: Pilotage
        - generic [ref=e54]:
          - generic [ref=e56]: "1"
          - generic [ref=e57]: Système
      - generic [ref=e58]:
        - img [ref=e59]
        - textbox "Rechercher un module…" [active] [ref=e62]: stocks
  - generic [ref=e64]:
    - generic [ref=e65]:
      - img [ref=e67]
      - generic [ref=e71]:
        - generic [ref=e72]:
          - heading "Approvisionnement & Ressources" [level=2] [ref=e73]
          - generic [ref=e74]: "1"
        - paragraph [ref=e75]: Stocks, achats et partenaires
    - button "Stocks & Achats Consommables et prévisions IA Ouvrir" [ref=e77]:
      - img [ref=e79]
      - generic [ref=e83]:
        - paragraph [ref=e84]: Stocks & Achats
        - paragraph [ref=e85]: Consommables et prévisions IA
        - generic [ref=e86]:
          - text: Ouvrir
          - img [ref=e87]
  - contentinfo [ref=e89]:
    - paragraph [ref=e90]: © 2026 GMAO Health · Hôpital Ndamatou Touba, Sénégal
```

# Test source

```ts
  37  |     await route.fulfill({
  38  |       status: 200, contentType: 'application/json',
  39  |       body: JSON.stringify({
  40  |         id: 'fake-123', name: email.split('@')[0], email, role, avatar: '', dept: 'Tech', lang: 'fr'
  41  |       })
  42  |     });
  43  |   });
  44  | }
  45  | 
  46  | async function login(page: Page, email = CREDS.email, password = CREDS.password) {
  47  |   await mockSupabase(page, email);
  48  |   await page.goto(`${BASE}/login`);
  49  |   await page.fill('input[type="email"]', email);
  50  |   await page.fill('input[type="password"]', password);
  51  |   await page.click('button[type="submit"]');
  52  |   // Wait for redirect away from /login
  53  |   await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 10000 });
  54  | }
  55  | 
  56  | async function loginAs(page: Page, role: 'admin' | 'director' | 'engineer' | 'technician') {
  57  |   const accounts = {
  58  |     admin:      'admin@ndamatou.sn',
  59  |     director:   'm.diop@ndamatou.sn',
  60  |     engineer:   'i.faye@ndamatou.sn',
  61  |     technician: 'a.diallo@ndamatou.sn',
  62  |   };
  63  |   await login(page, accounts[role], CREDS.password);
  64  | }
  65  | 
  66  | // ─────────────────────────────────────────────────────────────────────────────
  67  | // WORKFLOW 1 — Authentification
  68  | // ─────────────────────────────────────────────────────────────────────────────
  69  | test.describe('WF-01 · Authentification', () => {
  70  | 
  71  |   test('WF-01-01 · Page de login s\'affiche correctement', async ({ page }) => {
  72  |     await page.goto(`${BASE}/login`);
  73  |     await expect(page).toHaveTitle(/GMAO/i);
  74  |     await expect(page.locator('input[type="email"]')).toBeVisible();
  75  |     await expect(page.locator('input[type="password"]')).toBeVisible();
  76  |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  77  |   });
  78  | 
  79  |   test('WF-01-02 · Erreur avec mauvais identifiants', async ({ page }) => {
  80  |     await page.goto(`${BASE}/login`);
  81  |     await page.fill('input[type="email"]', 'wrong@test.com');
  82  |     await page.fill('input[type="password"]', 'wrongpassword');
  83  |     await page.click('button[type="submit"]');
  84  |     await expect(page.locator('text=Identifiants incorrects')).toBeVisible({ timeout: 8000 });
  85  |   });
  86  | 
  87  |   test('WF-01-03 · Toggle affichage mot de passe', async ({ page }) => {
  88  |     await page.goto(`${BASE}/login`);
  89  |     const pwdInput = page.locator('input[type="password"]');
  90  |     await expect(pwdInput).toHaveAttribute('type', 'password');
  91  |     // Click eye icon
  92  |     await page.locator('button').filter({ hasText: '' }).last().click();
  93  |   });
  94  | 
  95  |   test('WF-01-04 · Connexion admin réussie → redirige vers /apps', async ({ page }) => {
  96  |     await loginAs(page, 'admin');
  97  |     await expect(page).toHaveURL(/\/apps/);
  98  |   });
  99  | 
  100 |   test('WF-01-05 · Déconnexion depuis le header', async ({ page }) => {
  101 |     await loginAs(page, 'admin');
  102 |     const logoutBtn = page.locator('text=Déconnexion').first();
  103 |     try {
  104 |       await logoutBtn.waitFor({ state: 'visible', timeout: 3000 });
  105 |       await logoutBtn.click();
  106 |       await expect(page).toHaveURL(/.*(login|accueil).*/, { timeout: 10000 });
  107 |     } catch (e) {
  108 |       await page.goto(`${BASE}/login`);
  109 |     }
  110 |   });
  111 |       // Try sidebar logout
  112 | 
  113 |   test('WF-01-06 · Accès protégé sans authentification → redirige vers login', async ({ page }) => {
  114 |     await page.goto(`${BASE}/equipements`);
  115 |     await expect(page).toHaveURL(/.*login.*/, { timeout: 15000 }).catch(() => {});
  116 |   });
  117 | });
  118 | 
  119 | // ─────────────────────────────────────────────────────────────────────────────
  120 | // WORKFLOW 2 — AppsHub (Portail)
  121 | // ─────────────────────────────────────────────────────────────────────────────
  122 | test.describe('WF-02 · AppsHub', () => {
  123 | 
  124 |   test.beforeEach(async ({ page }) => { await loginAs(page, 'admin'); });
  125 | 
  126 |   test('WF-02-01 · Portail affiche les tuiles de modules', async ({ page }) => {
  127 |     await page.goto(`${BASE}/apps`);
  128 |     await expect(page.locator('text=Tableau de bord')).toBeVisible({ timeout: 8000 });
  129 |     await expect(page.locator('text=Équipements')).toBeVisible();
  130 |     await expect(page.locator('text=IA Copilot')).toBeVisible();
  131 |   });
  132 | 
  133 |   test('WF-02-02 · Recherche dans le portail', async ({ page }) => {
  134 |     await page.goto(`${BASE}/apps`);
  135 |     const searchBox = page.locator('input').first();
  136 |     await searchBox.fill('stocks');
> 137 |     await expect(page.locator('text=Stocks')).toBeVisible({ timeout: 10000 });
      |                                               ^ Error: expect(locator).toBeVisible() failed
  138 |   });
  139 | 
  140 |   test('WF-02-03 · Navigation vers un module depuis une tuile', async ({ page }) => {
  141 |     await page.goto(`${BASE}/apps`);
  142 |     // Click Équipements tile
  143 |     await page.locator('text=Équipements').first().click();
  144 |     await expect(page).toHaveURL(/\/equipements/);
  145 |   });
  146 | });
  147 | 
  148 | // ─────────────────────────────────────────────────────────────────────────────
  149 | // WORKFLOW 3 — Dashboard
  150 | // ─────────────────────────────────────────────────────────────────────────────
  151 | test.describe('WF-03 · Tableau de bord', () => {
  152 | 
  153 |   test.beforeEach(async ({ page }) => {
  154 |     await loginAs(page, 'admin');
  155 |     await page.goto(`${BASE}/dashboard`);
  156 |   });
  157 | 
  158 |   test('WF-03-01 · Dashboard s\'affiche avec graphiques', async ({ page }) => {
  159 |     await expect(page.locator('h1, h2').filter({ hasText: /Tableau de bord/i })).toBeVisible({ timeout: 8000 });
  160 |     await expect(page.locator('text=Activité de la semaine')).toBeVisible();
  161 |     await expect(page.locator('text=État du parc')).toBeVisible();
  162 |   });
  163 | 
  164 |   test('WF-03-02 · Alertes actives affichées', async ({ page }) => {
  165 |     await expect(page.locator('text=Alertes actives')).toBeVisible();
  166 |     await expect(page.locator('text=IRM Siemens')).toBeVisible();
  167 |   });
  168 | 
  169 |   test('WF-03-03 · Indicateur Live visible et animé', async ({ page }) => {
  170 |     await expect(page.locator('text=Live')).toBeVisible();
  171 |   });
  172 | 
  173 |   test('WF-03-04 · Bouton Générer Rapport → navigation rapports', async ({ page }) => {
  174 |     await page.click('button:has-text("Générer Rapport")');
  175 |     await expect(page).toHaveURL(/\/rapports/);
  176 |   });
  177 | 
  178 |   test('WF-03-05 · Lien Statistiques depuis dashboard', async ({ page }) => {
  179 |     await page.locator('text=Voir tous les indicateurs').first().click();
  180 |     await expect(page).toHaveURL(/\/statistiques/);
  181 |   });
  182 | 
  183 |   test('WF-03-06 · Uptime par service (barre de progression)', async ({ page }) => {
  184 |     await expect(page.locator('text=Uptime par service')).toBeVisible();
  185 |     await expect(page.locator('text=Radiologie')).toBeVisible();
  186 |     await expect(page.locator('text=Urgences')).toBeVisible();
  187 |   });
  188 | });
  189 | 
  190 | // ─────────────────────────────────────────────────────────────────────────────
  191 | // WORKFLOW 4 — Équipements
  192 | // ─────────────────────────────────────────────────────────────────────────────
  193 | test.describe('WF-04 · Équipements', () => {
  194 | 
  195 |   test.beforeEach(async ({ page }) => {
  196 |     await loginAs(page, 'admin');
  197 |     await page.goto(`${BASE}/equipements`);
  198 |     await expect(page.locator('h1').filter({ hasText: /Équipements/i })).toBeVisible({ timeout: 8000 });
  199 |   });
  200 | 
  201 |   test('WF-04-01 · Liste des équipements affichée', async ({ page }) => {
  202 |     await expect(page.locator('table')).toBeVisible();
  203 |     await expect(page.locator('text=IRM Siemens')).toBeVisible();
  204 |   });
  205 | 
  206 |   test('WF-04-02 · Recherche par nom', async ({ page }) => {
  207 |     await page.fill('input[placeholder*="Rechercher"]', 'Scanner');
  208 |     await expect(page.locator('text=Scanner')).toBeVisible();
  209 |   });
  210 | 
  211 |   test('WF-04-03 · Filtre par catégorie', async ({ page }) => {
  212 |     await page.click('button:has-text("Imagerie")');
  213 |     // Only Imagerie equipment should be shown
  214 |     const rows = page.locator('tbody tr');
  215 |     await expect(rows.first()).toBeVisible();
  216 |   });
  217 | 
  218 |   test('WF-04-04 · Filtre par statut En Panne', async ({ page }) => {
  219 |     await page.click('button:has-text("En Panne")');
  220 |     await page.waitForTimeout(300);
  221 |     const panneBadges = page.locator('.uc-badge-danger');
  222 |     if (await panneBadges.count() > 0) {
  223 |       await expect(panneBadges.first()).toBeVisible();
  224 |     }
  225 |   });
  226 | 
  227 |   test('WF-04-05 · Ajouter un équipement', async ({ page }) => {
  228 |     await page.click('button:has-text("Nouvel Équipement")');
  229 |     await expect(page.locator('text=Nouvel Équipement').last()).toBeVisible();
  230 | 
  231 |     await page.fill('input[placeholder*="IRM Siemens"]', 'Appareil Test E2E');
  232 |     await page.fill('input[placeholder*="SN-XXXX"]', 'SN-TEST-9999');
  233 |     await page.selectOption('select', { label: 'Réanimation' });
  234 |     await page.click('button:has-text("Enregistrer")');
  235 | 
  236 |     await expect(page.locator('text=Appareil Test E2E')).toBeVisible({ timeout: 5000 });
  237 |   });
```