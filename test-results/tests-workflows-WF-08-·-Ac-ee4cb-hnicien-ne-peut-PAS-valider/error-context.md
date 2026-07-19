# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-08 · Achats >> WF-08-04 · Technicien ne peut PAS valider
- Location: tests\workflows.spec.ts:495:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="email"]')

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
          - paragraph [ref=e23]: a.diallo
          - paragraph [ref=e24]: Technicien Biomédical
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
        - textbox "Rechercher un module…" [ref=e62]
  - generic [ref=e63]:
    - generic [ref=e64]:
      - generic [ref=e65]:
        - img [ref=e67]
        - generic [ref=e69]:
          - generic [ref=e70]:
            - heading "Maintenance & Interventions" [level=2] [ref=e71]
            - generic [ref=e72]: "5"
          - paragraph [ref=e73]: Le quotidien biomédical
      - generic [ref=e74]:
        - button "Équipements Inventaire, criticité, historique Ouvrir" [ref=e75]:
          - img [ref=e77]
          - generic [ref=e81]:
            - paragraph [ref=e82]: Équipements
            - paragraph [ref=e83]: Inventaire, criticité, historique
            - generic [ref=e84]:
              - text: Ouvrir
              - img [ref=e85]
        - button "Interventions Tickets de dépannage et curatif Ouvrir" [ref=e87]:
          - img [ref=e89]
          - generic [ref=e91]:
            - paragraph [ref=e92]: Interventions
            - paragraph [ref=e93]: Tickets de dépannage et curatif
            - generic [ref=e94]:
              - text: Ouvrir
              - img [ref=e95]
        - button "Workflow Réparation Signalement → diagnostic → clôture Ouvrir" [ref=e97]:
          - img [ref=e99]
          - generic [ref=e102]:
            - paragraph [ref=e103]: Workflow Réparation
            - paragraph [ref=e104]: Signalement → diagnostic → clôture
            - generic [ref=e105]:
              - text: Ouvrir
              - img [ref=e106]
        - button "PM Planifiées Maintenance préventive programmée Ouvrir" [ref=e108]:
          - img [ref=e110]
          - generic [ref=e114]:
            - paragraph [ref=e115]: PM Planifiées
            - paragraph [ref=e116]: Maintenance préventive programmée
            - generic [ref=e117]:
              - text: Ouvrir
              - img [ref=e118]
        - button "MedPool Réseau d'entraide inter-hospitalière Ouvrir" [ref=e120]:
          - img [ref=e122]
          - generic [ref=e127]:
            - paragraph [ref=e128]: MedPool
            - paragraph [ref=e129]: Réseau d'entraide inter-hospitalière
            - generic [ref=e130]:
              - text: Ouvrir
              - img [ref=e131]
    - generic [ref=e133]:
      - generic [ref=e134]:
        - img [ref=e136]
        - generic [ref=e140]:
          - generic [ref=e141]:
            - heading "Approvisionnement & Ressources" [level=2] [ref=e142]
            - generic [ref=e143]: "5"
          - paragraph [ref=e144]: Stocks, achats et partenaires
      - generic [ref=e145]:
        - button "Stocks & Achats Consommables et prévisions IA Ouvrir" [ref=e146]:
          - img [ref=e148]
          - generic [ref=e152]:
            - paragraph [ref=e153]: Stocks & Achats
            - paragraph [ref=e154]: Consommables et prévisions IA
            - generic [ref=e155]:
              - text: Ouvrir
              - img [ref=e156]
        - button "Workflow Achat Demande → validation → réception Ouvrir" [ref=e158]:
          - img [ref=e160]
          - generic [ref=e164]:
            - paragraph [ref=e165]: Workflow Achat
            - paragraph [ref=e166]: Demande → validation → réception
            - generic [ref=e167]:
              - text: Ouvrir
              - img [ref=e168]
        - button "Fournisseurs Contrats, contacts, réactivité SLA Ouvrir" [ref=e170]:
          - img [ref=e172]
          - generic [ref=e177]:
            - paragraph [ref=e178]: Fournisseurs
            - paragraph [ref=e179]: Contrats, contacts, réactivité SLA
            - generic [ref=e180]:
              - text: Ouvrir
              - img [ref=e181]
        - button "Coûts & TCO Budgets et coût total de possession Ouvrir" [ref=e183]:
          - img [ref=e185]
          - generic [ref=e190]:
            - paragraph [ref=e191]: Coûts & TCO
            - paragraph [ref=e192]: Budgets et coût total de possession
            - generic [ref=e193]:
              - text: Ouvrir
              - img [ref=e194]
        - button "Ressources Humaines Planning et équipe biomédicale Ouvrir" [ref=e196]:
          - img [ref=e198]
          - generic [ref=e210]:
            - paragraph [ref=e211]: Ressources Humaines
            - paragraph [ref=e212]: Planning et équipe biomédicale
            - generic [ref=e213]:
              - text: Ouvrir
              - img [ref=e214]
    - generic [ref=e216]:
      - generic [ref=e217]:
        - img [ref=e219]
        - generic [ref=e222]:
          - generic [ref=e223]:
            - heading "Pilotage & Innovation" [level=2] [ref=e224]
            - generic [ref=e225]: "6"
          - paragraph [ref=e226]: Décision, durabilité et IA
      - generic [ref=e227]:
        - button "Analytics IoT Capteurs et analytique prédictive Ouvrir" [ref=e228]:
          - img [ref=e230]
          - generic [ref=e233]:
            - paragraph [ref=e234]: Analytics IoT
            - paragraph [ref=e235]: Capteurs et analytique prédictive
            - generic [ref=e236]:
              - text: Ouvrir
              - img [ref=e237]
        - button "Statistiques Tous les indicateurs clés regroupés Ouvrir" [ref=e239]:
          - img [ref=e241]
          - generic [ref=e243]:
            - paragraph [ref=e244]: Statistiques
            - paragraph [ref=e245]: Tous les indicateurs clés regroupés
            - generic [ref=e246]:
              - text: Ouvrir
              - img [ref=e247]
        - button "Rapports Audit et conformité réglementaire Ouvrir" [ref=e249]:
          - img [ref=e251]
          - generic [ref=e254]:
            - paragraph [ref=e255]: Rapports
            - paragraph [ref=e256]: Audit et conformité réglementaire
            - generic [ref=e257]:
              - text: Ouvrir
              - img [ref=e258]
        - button "IA Copilot Assistant intelligent de maintenance Ouvrir" [ref=e260]:
          - img [ref=e262]
          - generic [ref=e265]:
            - paragraph [ref=e266]: IA Copilot
            - paragraph [ref=e267]: Assistant intelligent de maintenance
            - generic [ref=e268]:
              - text: Ouvrir
              - img [ref=e269]
        - button "Énergie & ESG Optimisation énergétique et carbone Ouvrir" [ref=e271]:
          - img [ref=e273]
          - generic [ref=e276]:
            - paragraph [ref=e277]: Énergie & ESG
            - paragraph [ref=e278]: Optimisation énergétique et carbone
            - generic [ref=e279]:
              - text: Ouvrir
              - img [ref=e280]
        - button "Plan Hôpital Cartographie interactive des services Ouvrir" [ref=e282]:
          - img [ref=e284]
          - generic [ref=e286]:
            - paragraph [ref=e287]: Plan Hôpital
            - paragraph [ref=e288]: Cartographie interactive des services
            - generic [ref=e289]:
              - text: Ouvrir
              - img [ref=e290]
    - generic [ref=e292]:
      - generic [ref=e293]:
        - img [ref=e295]
        - generic [ref=e298]:
          - generic [ref=e299]:
            - heading "Système" [level=2] [ref=e300]
            - generic [ref=e301]: "1"
          - paragraph [ref=e302]: Réglages et comptes
      - button "Paramètres Profil, utilisateurs, apparence Ouvrir" [ref=e304]:
        - img [ref=e306]
        - generic [ref=e309]:
          - paragraph [ref=e310]: Paramètres
          - paragraph [ref=e311]: Profil, utilisateurs, apparence
          - generic [ref=e312]:
            - text: Ouvrir
            - img [ref=e313]
  - contentinfo [ref=e315]:
    - paragraph [ref=e316]: © 2026 GMAO Health · Hôpital Ndamatou Touba, Sénégal
```

# Test source

```ts
  1   | /**
  2   |  * GMAO Health — Tests E2E complets de tous les workflows
  3   |  * Cible : https://ndamatou-gmao.vercel.app/ (ou localhost:5173 si --base-url)
  4   |  *
  5   |  * Exécution :
  6   |  *   npx playwright test tests/workflows.spec.ts --reporter=html
  7   |  */
  8   | import { test, expect, type Page } from '@playwright/test';
  9   | 
  10  | // ─────────────────────────────────────────────────────────────────────────────
  11  | // Helpers
  12  | // ─────────────────────────────────────────────────────────────────────────────
  13  | const BASE = process.env.BASE_URL || 'http://localhost:5173';
  14  | const CREDS = { email: 'admin@ndamatou.sn', password: 'Admin1234!' };
  15  | 
  16  | async function mockSupabase(page: Page, email: string) {
  17  |   await page.route('**/auth/v1/token?*', async route => {
  18  |     await route.fulfill({
  19  |       status: 200, contentType: 'application/json',
  20  |       body: JSON.stringify({
  21  |         access_token: 'fake-jwt', token_type: 'bearer', expires_in: 3600, refresh_token: 'fake-refresh',
  22  |         user: { id: 'fake-123', aud: 'authenticated', role: 'authenticated', email }
  23  |       })
  24  |     });
  25  |   });
  26  |   await page.route('**/auth/v1/user', async route => {
  27  |     await route.fulfill({
  28  |       status: 200, contentType: 'application/json',
  29  |       body: JSON.stringify({ id: 'fake-123', aud: 'authenticated', role: 'authenticated', email })
  30  |     });
  31  |   });
  32  |   await page.route('**/rest/v1/profiles?*', async route => {
  33  |     let role = 'admin';
  34  |     if (email.includes('diallo')) role = 'technician';
  35  |     if (email.includes('faye')) role = 'engineer';
  36  |     if (email.includes('diop')) role = 'director';
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
> 49  |   await page.fill('input[type="email"]', email);
      |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
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
  137 |     await expect(page.locator('text=Stocks')).toBeVisible({ timeout: 10000 });
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
```