# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-03 · Tableau de bord >> WF-03-06 · Uptime par service (barre de progression)
- Location: tests\workflows.spec.ts:183:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Radiologie')
Expected: visible
Error: strict mode violation: locator('text=Radiologie') resolved to 3 elements:
    1) <span class="text-slate-400">Radiologie</span> aka locator('span').filter({ hasText: 'Radiologie' })
    2) <p class="text-xs text-slate-500 mt-0.5">Radiologie – Salle 2 · Il y a 10 min</p> aka getByText('Radiologie – Salle 2 · Il y a')
    3) <tspan x="74.1" dy="0.71em">Radiologie</tspan> aka locator('tspan').filter({ hasText: 'Radiologie' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Radiologie')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - link "GMAO Health v3.0 · Ndamatou" [ref=e6] [cursor=pointer]:
        - /url: /apps
        - img [ref=e8]
        - generic [ref=e12]:
          - text: GMAO Health
          - generic [ref=e13]: v3.0 · Ndamatou
      - generic [ref=e14]:
        - img [ref=e15]
        - text: En ligne · Synchronisé
      - navigation [ref=e19]:
        - paragraph [ref=e20]: Principal
        - link "Portail" [ref=e21] [cursor=pointer]:
          - /url: /apps
          - generic [ref=e22]:
            - img [ref=e23]
            - text: Portail
        - link "Équipements" [ref=e28] [cursor=pointer]:
          - /url: /equipements
          - generic [ref=e29]:
            - img [ref=e30]
            - text: Équipements
        - link "Interventions 5" [ref=e34] [cursor=pointer]:
          - /url: /tickets
          - generic [ref=e35]:
            - img [ref=e36]
            - text: Interventions
          - generic [ref=e38]: "5"
        - link "Workflow Réparation" [ref=e39] [cursor=pointer]:
          - /url: /tickets
          - generic [ref=e40]:
            - img [ref=e41]
            - text: Workflow Réparation
        - link "PM Planifiées 2" [ref=e44] [cursor=pointer]:
          - /url: /pm
          - generic [ref=e45]:
            - img [ref=e46]
            - text: PM Planifiées
          - generic [ref=e50]: "2"
        - link "MedPool (Réseau)" [ref=e51] [cursor=pointer]:
          - /url: /medpool
          - generic [ref=e52]:
            - img [ref=e53]
            - text: MedPool (Réseau)
        - link "Énergie & ESG" [ref=e58] [cursor=pointer]:
          - /url: /energie
          - generic [ref=e59]:
            - img [ref=e60]
            - text: Énergie & ESG
        - link "Stocks & Achats" [ref=e63] [cursor=pointer]:
          - /url: /stocks
          - generic [ref=e64]:
            - img [ref=e65]
            - text: Stocks & Achats
        - link "Workflow Achat" [ref=e69] [cursor=pointer]:
          - /url: /achats
          - generic [ref=e70]:
            - img [ref=e71]
            - text: Workflow Achat
        - link "Fournisseurs" [ref=e75] [cursor=pointer]:
          - /url: /fournisseurs
          - generic [ref=e76]:
            - img [ref=e77]
            - text: Fournisseurs
        - link "Coûts & TCO" [ref=e82] [cursor=pointer]:
          - /url: /finances
          - generic [ref=e83]:
            - img [ref=e84]
            - text: Coûts & TCO
        - link "Ressources Humaines" [ref=e89] [cursor=pointer]:
          - /url: /rh
          - generic [ref=e90]:
            - img [ref=e91]
            - text: Ressources Humaines
        - link "IA Copilot NEW" [ref=e103] [cursor=pointer]:
          - /url: /ia
          - generic [ref=e104]:
            - img [ref=e105]
            - text: IA Copilot
          - generic [ref=e108]: NEW
        - link "Analytics IoT" [ref=e109] [cursor=pointer]:
          - /url: /analytics
          - generic [ref=e110]:
            - img [ref=e111]
            - text: Analytics IoT
        - link "Statistiques" [ref=e114] [cursor=pointer]:
          - /url: /statistiques
          - generic [ref=e115]:
            - img [ref=e116]
            - text: Statistiques
        - link "Rapports" [ref=e118] [cursor=pointer]:
          - /url: /rapports
          - generic [ref=e119]:
            - img [ref=e120]
            - text: Rapports
        - link "Plan Hôpital" [ref=e123] [cursor=pointer]:
          - /url: /plan
          - generic [ref=e124]:
            - img [ref=e125]
            - text: Plan Hôpital
        - paragraph [ref=e127]: Système
        - link "Paramètres" [ref=e128] [cursor=pointer]:
          - /url: /settings
          - img [ref=e129]
          - text: Paramètres
      - generic [ref=e132]:
        - generic [ref=e134]:
          - img [ref=e135]
          - generic [ref=e137]: Administrateur
        - generic [ref=e138]:
          - generic [ref=e140]:
            - paragraph [ref=e141]: admin
            - paragraph [ref=e142]: Tech
          - button "Déconnexion" [ref=e143]:
            - img [ref=e144]
    - generic [ref=e147]:
      - banner [ref=e148]:
        - generic [ref=e150]:
          - generic [ref=e151]: GMAO
          - img [ref=e152]
          - generic [ref=e154]: Statistiques
        - generic [ref=e156]:
          - img [ref=e157]
          - textbox "Rechercher…" [ref=e160]
        - generic [ref=e161]:
          - button "Portail des applications" [ref=e162]:
            - img [ref=e163]
          - button "Clair" [ref=e168]:
            - img [ref=e169]
            - generic [ref=e175]: Clair
          - button "🇫🇷" [ref=e177]:
            - img [ref=e178]
            - generic [ref=e181]: 🇫🇷
          - button "4" [ref=e183]:
            - img [ref=e184]
            - generic [ref=e187]: "4"
      - main [ref=e189]:
        - generic [ref=e191]:
          - generic [ref=e192]:
            - generic [ref=e193]:
              - heading "Tableau de bord" [level=1] [ref=e194]
              - paragraph [ref=e195]: Vue temps réel · Hôpital Ndamatou Touba
            - generic [ref=e196]:
              - generic [ref=e199]: Live · Mis à jour il y a 5s
              - button "Générer Rapport" [ref=e200]:
                - img [ref=e201]
                - text: Générer Rapport
          - link "Voir tous les indicateurs clés Uptime, tickets, MTTR et bien plus — page Statistiques" [ref=e204] [cursor=pointer]:
            - /url: /statistiques
            - generic [ref=e205]:
              - img [ref=e207]
              - generic [ref=e209]:
                - paragraph [ref=e210]: Voir tous les indicateurs clés
                - paragraph [ref=e211]: Uptime, tickets, MTTR et bien plus — page Statistiques
            - img [ref=e212]
          - generic [ref=e214]:
            - generic [ref=e215]:
              - generic [ref=e216]:
                - generic [ref=e217]:
                  - heading "Activité de la semaine" [level=2] [ref=e218]
                  - paragraph [ref=e219]: Pannes, interventions résolues et maintenance préventive
                - generic [ref=e220]:
                  - generic [ref=e223]: Pannes
                  - generic [ref=e226]: Résolus
                  - generic [ref=e229]: Préventif
              - application [ref=e232]:
                - generic [ref=e258]:
                  - generic [ref=e259]:
                    - generic [ref=e261]: Lun
                    - generic [ref=e263]: Mar
                    - generic [ref=e265]: Mer
                    - generic [ref=e267]: Jeu
                    - generic [ref=e269]: Ven
                    - generic [ref=e271]: Sam
                    - generic [ref=e273]: Dim
                  - generic [ref=e274]:
                    - generic [ref=e276]: "0"
                    - generic [ref=e278]: "2"
                    - generic [ref=e280]: "4"
                    - generic [ref=e282]: "6"
                    - generic [ref=e284]: "8"
            - generic [ref=e285]:
              - generic [ref=e286]:
                - heading "État du parc (347 équipements)" [level=2] [ref=e287]
                - generic [ref=e288]:
                  - application [ref=e290]
                  - generic [ref=e291]:
                    - generic [ref=e292]:
                      - generic [ref=e295]: Opérationnel
                      - generic [ref=e296]: 68%
                    - generic [ref=e297]:
                      - generic [ref=e300]: En Maintenance
                      - generic [ref=e301]: 18%
                    - generic [ref=e302]:
                      - generic [ref=e305]: En Panne
                      - generic [ref=e306]: 14%
              - generic [ref=e307]:
                - heading "Uptime par service" [level=2] [ref=e308]
                - generic [ref=e309]:
                  - generic [ref=e311]:
                    - generic [ref=e312]: Radiologie
                    - generic [ref=e313]: 92%
                  - generic [ref=e317]:
                    - generic [ref=e318]: Urgences
                    - generic [ref=e319]: 98%
                  - generic [ref=e323]:
                    - generic [ref=e324]: Réanimation
                    - generic [ref=e325]: 95%
                  - generic [ref=e329]:
                    - generic [ref=e330]: Bloc Op.
                    - generic [ref=e331]: 99%
                  - generic [ref=e335]:
                    - generic [ref=e336]: Maternité
                    - generic [ref=e337]: 87%
          - generic [ref=e340]:
            - generic [ref=e341]:
              - generic [ref=e342]:
                - heading "Alertes actives" [level=2] [ref=e345]
                - link "Voir tout" [ref=e346] [cursor=pointer]:
                  - /url: /tickets
                  - text: Voir tout
                  - img [ref=e347]
              - generic [ref=e349]:
                - generic [ref=e350] [cursor=pointer]:
                  - img [ref=e352]
                  - generic [ref=e354]:
                    - paragraph [ref=e355]: IRM Siemens Magnetom
                    - paragraph [ref=e356]: Radiologie – Salle 2 · Il y a 10 min
                  - img [ref=e357]
                - generic [ref=e359] [cursor=pointer]:
                  - img [ref=e361]
                  - generic [ref=e363]:
                    - paragraph [ref=e364]: Scanner GE Optima CT660
                    - paragraph [ref=e365]: Urgences · Il y a 45 min
                  - img [ref=e366]
                - generic [ref=e368] [cursor=pointer]:
                  - img [ref=e370]
                  - generic [ref=e372]:
                    - paragraph [ref=e373]: Moniteur Philips IntelliVue
                    - paragraph [ref=e374]: Réanimation – Lit 4 · Il y a 2h
                  - img [ref=e375]
                - generic [ref=e377] [cursor=pointer]:
                  - img [ref=e379]
                  - generic [ref=e381]:
                    - paragraph [ref=e382]: Respirateur Dräger Evita
                    - paragraph [ref=e383]: Bloc Opératoire 2 · Il y a 3h
                  - img [ref=e384]
            - generic [ref=e386]:
              - heading "Tickets par département" [level=2] [ref=e387]
              - paragraph [ref=e388]: Répartition des interventions ce mois
              - application [ref=e391]:
                - generic [ref=e414]:
                  - generic [ref=e415]:
                    - generic [ref=e417]: Radiologie
                    - generic [ref=e419]: Urgences
                    - generic [ref=e421]: Réanimation
                    - generic [ref=e423]: Bloc Op.
                    - generic [ref=e425]: Maternité
                  - generic [ref=e426]:
                    - generic [ref=e428]: "80"
                    - generic [ref=e430]: "85"
                    - generic [ref=e432]: "90"
                    - generic [ref=e434]: "95"
                    - generic [ref=e436]: "100"
  - generic [ref=e437]: "80"
```

# Test source

```ts
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
> 185 |     await expect(page.locator('text=Radiologie')).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
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
  238 | 
  239 |   test('WF-04-06 · Ouvrir le drawer de détail', async ({ page }) => {
  240 |     // Hover first row to show action buttons
  241 |     const firstRow = page.locator('tbody tr').first();
  242 |     await firstRow.hover();
  243 |     const eyeBtn = firstRow.locator('[title="Voir détails"], button').filter({ has: page.locator('svg') }).first();
  244 |     await eyeBtn.click();
  245 |     await expect(page.locator('text=Catégorie')).toBeVisible({ timeout: 5000 });
  246 |     await expect(page.locator('text=Uptime')).toBeVisible();
  247 |   });
  248 | 
  249 |   test('WF-04-07 · Modifier un équipement (modal édition)', async ({ page }) => {
  250 |     const firstRow = page.locator('tbody tr').first();
  251 |     await firstRow.hover();
  252 |     // Click pencil icon (Modifier)
  253 |     await firstRow.locator('[title="Modifier"]').click();
  254 |     await expect(page.locator('text=Modifier l\'équipement')).toBeVisible({ timeout: 5000 });
  255 | 
  256 |     // Change uptime value
  257 |     const uptimeInput = page.locator('input[type="number"]');
  258 |     await uptimeInput.clear();
  259 |     await uptimeInput.fill('95');
  260 |     await page.click('button:has-text("Enregistrer les modifications")');
  261 |     // Modal should close
  262 |     await expect(page.locator('text=Modifier l\'équipement')).not.toBeVisible({ timeout: 3000 });
  263 |   });
  264 | 
  265 |   test('WF-04-08 · Supprimer un équipement', async ({ page }) => {
  266 |     // Add one first so we don't delete real data
  267 |     await page.click('button:has-text("Nouvel Équipement")');
  268 |     await page.fill('input[placeholder*="IRM Siemens"]', 'Équipement À Supprimer');
  269 |     await page.fill('input[placeholder*="SN-XXXX"]', 'SN-DEL-0000');
  270 |     await page.click('button:has-text("Enregistrer")');
  271 |     await expect(page.locator('text=Équipement À Supprimer')).toBeVisible();
  272 | 
  273 |     // Delete it
  274 |     const targetRow = page.locator('tr').filter({ hasText: 'Équipement À Supprimer' });
  275 |     await targetRow.hover();
  276 |     await targetRow.locator('button').last().click(); // Trash icon
  277 |     await expect(page.locator('text=Équipement À Supprimer')).not.toBeVisible({ timeout: 3000 });
  278 |   });
  279 | 
  280 |   test('WF-04-09 · Comparaison de 2 équipements', async ({ page }) => {
  281 |     const checkboxes = page.locator('input[type="checkbox"]');
  282 |     await checkboxes.nth(0).check();
  283 |     await checkboxes.nth(1).check();
  284 |     // FAB button should appear
  285 |     await expect(page.locator('button:has-text("Comparer")')).toBeVisible({ timeout: 3000 });
```