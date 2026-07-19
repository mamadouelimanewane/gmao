# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-07 · Stocks >> WF-07-02 · Filtre articles en état Critique
- Location: tests\workflows.spec.ts:424:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Critique")')

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
          - img [ref=e69]
        - link "Workflow Achat" [ref=e71] [cursor=pointer]:
          - /url: /achats
          - generic [ref=e72]:
            - img [ref=e73]
            - text: Workflow Achat
        - link "Fournisseurs" [ref=e77] [cursor=pointer]:
          - /url: /fournisseurs
          - generic [ref=e78]:
            - img [ref=e79]
            - text: Fournisseurs
        - link "Coûts & TCO" [ref=e84] [cursor=pointer]:
          - /url: /finances
          - generic [ref=e85]:
            - img [ref=e86]
            - text: Coûts & TCO
        - link "Ressources Humaines" [ref=e91] [cursor=pointer]:
          - /url: /rh
          - generic [ref=e92]:
            - img [ref=e93]
            - text: Ressources Humaines
        - link "IA Copilot NEW" [ref=e105] [cursor=pointer]:
          - /url: /ia
          - generic [ref=e106]:
            - img [ref=e107]
            - text: IA Copilot
          - generic [ref=e110]: NEW
        - link "Analytics IoT" [ref=e111] [cursor=pointer]:
          - /url: /analytics
          - generic [ref=e112]:
            - img [ref=e113]
            - text: Analytics IoT
        - link "Statistiques" [ref=e116] [cursor=pointer]:
          - /url: /statistiques
          - generic [ref=e117]:
            - img [ref=e118]
            - text: Statistiques
        - link "Rapports" [ref=e120] [cursor=pointer]:
          - /url: /rapports
          - generic [ref=e121]:
            - img [ref=e122]
            - text: Rapports
        - link "Plan Hôpital" [ref=e125] [cursor=pointer]:
          - /url: /plan
          - generic [ref=e126]:
            - img [ref=e127]
            - text: Plan Hôpital
        - paragraph [ref=e129]: Système
        - link "Paramètres" [ref=e130] [cursor=pointer]:
          - /url: /settings
          - img [ref=e131]
          - text: Paramètres
      - generic [ref=e134]:
        - generic [ref=e136]:
          - img [ref=e137]
          - generic [ref=e139]: Administrateur
        - generic [ref=e140]:
          - generic [ref=e142]:
            - paragraph [ref=e143]: admin
            - paragraph [ref=e144]: Tech
          - button "Déconnexion" [ref=e145]:
            - img [ref=e146]
    - generic [ref=e149]:
      - banner [ref=e150]:
        - generic [ref=e152]:
          - generic [ref=e153]: GMAO
          - img [ref=e154]
          - generic [ref=e156]: Stocks & Achats
        - generic [ref=e158]:
          - img [ref=e159]
          - textbox "Rechercher…" [ref=e162]
        - generic [ref=e163]:
          - button "Portail des applications" [ref=e164]:
            - img [ref=e165]
          - button "Clair" [ref=e170]:
            - img [ref=e171]
            - generic [ref=e177]: Clair
          - button "🇫🇷" [ref=e179]:
            - img [ref=e180]
            - generic [ref=e183]: 🇫🇷
          - button "4" [ref=e185]:
            - img [ref=e186]
            - generic [ref=e189]: "4"
      - main [ref=e191]:
        - generic [ref=e193]:
          - generic [ref=e194]:
            - generic [ref=e195]:
              - generic [ref=e196]:
                - heading "Stocks & Supply Chain IA" [level=1] [ref=e197]
                - generic [ref=e198]: PRÉDICTION
              - paragraph [ref=e199]: Suivi des consommables et prévisions d'approvisionnement assistées par IA.
            - generic [ref=e200]:
              - link "Statistiques" [ref=e201] [cursor=pointer]:
                - /url: /statistiques
                - img [ref=e202]
                - text: Statistiques
              - button "Ajouter un Article" [ref=e204]:
                - img [ref=e205]
                - text: Ajouter un Article
          - generic [ref=e206]:
            - generic [ref=e207]:
              - generic [ref=e208]:
                - 'heading "Prévision d''épuisement : Filtre antibactérien (STK-002)" [level=2] [ref=e209]':
                  - img [ref=e210]
                  - text: "Prévision d'épuisement : Filtre antibactérien (STK-002)"
                - generic [ref=e213]: "Délai Fournisseur : 6 sem."
              - application [ref=e217]:
                - generic [ref=e235]:
                  - generic [ref=e236]:
                    - generic [ref=e238]: S0
                    - generic [ref=e240]: S1
                    - generic [ref=e242]: S2
                    - generic [ref=e244]: S3
                    - generic [ref=e246]: S4
                    - generic [ref=e248]: S5
                    - generic [ref=e250]: S6
                    - generic [ref=e252]: S7
                  - generic [ref=e253]:
                    - generic [ref=e255]: "0"
                    - generic [ref=e257]: "15"
                    - generic [ref=e259]: "30"
                    - generic [ref=e261]: "45"
                    - generic [ref=e263]: "60"
                  - generic [ref=e264]: Seuil Sécurité
                  - generic [ref=e265]: Rupture (S4)
            - generic [ref=e266]:
              - img [ref=e268]
              - heading "Insights IA & Auto-Order" [level=2] [ref=e280]:
                - img [ref=e281]
                - text: Insights IA & Auto-Order
              - generic [ref=e293]:
                - generic [ref=e295]:
                  - img [ref=e296]
                  - generic [ref=e298]:
                    - heading "Alerte de Rupture Imminente" [level=4] [ref=e299]
                    - paragraph [ref=e300]: Le stock de Filtre antibactérien sera épuisé dans 4 semaines. Le délai de livraison (Dräger France) est de 6 semaines. Vous serez en rupture de stock pendant 2 semaines.
                - generic [ref=e302]:
                  - img [ref=e303]
                  - generic [ref=e306]:
                    - heading "Recommandation d'Urgence" [level=4] [ref=e307]
                    - paragraph [ref=e308]: Passer commande aujourd'hui. Emprunter temporairement 8 unités via MedPool auprès de l'Hôpital de Thiès pour couvrir le gap de 2 semaines.
                - button "Générer Bon de Commande Auto" [ref=e309]:
                  - img [ref=e310]
                  - text: Générer Bon de Commande Auto
                - button "Chercher sur MedPool" [ref=e314]:
                  - img [ref=e315]
                  - text: Chercher sur MedPool
          - generic [ref=e317]:
            - generic [ref=e318]:
              - img [ref=e319]
              - textbox "Rechercher un consommable, pièce, fournisseur..." [ref=e322]
            - generic [ref=e323]:
              - img [ref=e324]
              - generic [ref=e326]: "Catégorie:"
              - button "Tous" [ref=e327]
              - button "Consommables" [ref=e328]
              - button "Pièces Détachées" [ref=e329]
              - button "Batteries" [ref=e330]
          - table [ref=e333]:
            - rowgroup [ref=e334]:
              - row "Désignation Catégorie Stock & IA Fournisseur Statut Actions" [ref=e335]:
                - columnheader "Désignation" [ref=e336]
                - columnheader "Catégorie" [ref=e337]
                - columnheader "Stock & IA" [ref=e338]
                - columnheader "Fournisseur" [ref=e339]
                - columnheader "Statut" [ref=e340]
                - columnheader "Actions" [ref=e341]
            - rowgroup [ref=e342]:
              - 'row "Électrodes pédiatriques ECG STK-001 · Armoire A - Urgences Consommables 120 boîtes / min: 50 15/sem · 2 sem (Lead) BioSénégal SARL Normal" [ref=e343]':
                - cell "Électrodes pédiatriques ECG STK-001 · Armoire A - Urgences" [ref=e344]:
                  - generic [ref=e345]:
                    - img [ref=e347]
                    - generic [ref=e351]:
                      - generic [ref=e352]: Électrodes pédiatriques ECG
                      - generic [ref=e353]: STK-001 · Armoire A - Urgences
                - cell "Consommables" [ref=e354]:
                  - generic [ref=e355]: Consommables
                - 'cell "120 boîtes / min: 50 15/sem · 2 sem (Lead)" [ref=e356]':
                  - generic [ref=e357]:
                    - generic [ref=e358]:
                      - generic [ref=e359]: 120 boîtes
                      - generic [ref=e360]: "/ min: 50"
                    - generic [ref=e361]:
                      - generic "Consommation par semaine" [ref=e362]:
                        - img [ref=e363]
                        - text: 15/sem
                      - generic [ref=e366]: ·
                      - generic "Délai de livraison" [ref=e367]:
                        - img [ref=e368]
                        - text: 2 sem (Lead)
                - cell "BioSénégal SARL" [ref=e371]
                - cell "Normal" [ref=e372]:
                  - generic [ref=e373]: Normal
                - cell [ref=e374]:
                  - button [ref=e375]:
                    - img [ref=e376]
              - 'row "Filtre antibactérien respirateur STK-002 · Dépôt Principal B Pièces Détachées 18 unités / min: 15 4/sem · 6 sem (Lead) Dräger France Critique" [ref=e380]':
                - cell "Filtre antibactérien respirateur STK-002 · Dépôt Principal B" [ref=e381]:
                  - generic [ref=e382]:
                    - img [ref=e384]
                    - generic [ref=e388]:
                      - generic [ref=e389]: Filtre antibactérien respirateur
                      - generic [ref=e390]: STK-002 · Dépôt Principal B
                - cell "Pièces Détachées" [ref=e391]:
                  - generic [ref=e392]: Pièces Détachées
                - 'cell "18 unités / min: 15 4/sem · 6 sem (Lead)" [ref=e393]':
                  - generic [ref=e394]:
                    - generic [ref=e395]:
                      - generic [ref=e396]: 18 unités
                      - generic [ref=e397]: "/ min: 15"
                    - generic [ref=e398]:
                      - generic "Consommation par semaine" [ref=e399]:
                        - img [ref=e400]
                        - text: 4/sem
                      - generic [ref=e403]: ·
                      - generic "Délai de livraison" [ref=e404]:
                        - img [ref=e405]
                        - text: 6 sem (Lead)
                - cell "Dräger France" [ref=e408]
                - cell "Critique" [ref=e409]:
                  - generic [ref=e410]: Critique
                - cell [ref=e411]:
                  - button [ref=e412]:
                    - img [ref=e413]
              - 'row "Gel conducteur ultrasons 5L STK-003 · Armoire B - Maternité Consommables 2 bidons / min: 5 3/sem · 1 sem (Lead) Medica-Dakar Critique" [ref=e417]':
                - cell "Gel conducteur ultrasons 5L STK-003 · Armoire B - Maternité" [ref=e418]:
                  - generic [ref=e419]:
                    - img [ref=e421]
                    - generic [ref=e425]:
                      - generic [ref=e426]: Gel conducteur ultrasons 5L
                      - generic [ref=e427]: STK-003 · Armoire B - Maternité
                - cell "Consommables" [ref=e428]:
                  - generic [ref=e429]: Consommables
                - 'cell "2 bidons / min: 5 3/sem · 1 sem (Lead)" [ref=e430]':
                  - generic [ref=e431]:
                    - generic [ref=e432]:
                      - generic [ref=e433]: 2 bidons
                      - generic [ref=e434]: "/ min: 5"
                    - generic [ref=e435]:
                      - generic "Consommation par semaine" [ref=e436]:
                        - img [ref=e437]
                        - text: 3/sem
                      - generic [ref=e440]: ·
                      - generic "Délai de livraison" [ref=e441]:
                        - img [ref=e442]
                        - text: 1 sem (Lead)
                - cell "Medica-Dakar" [ref=e445]
                - cell "Critique" [ref=e446]:
                  - generic [ref=e447]: Critique
                - cell [ref=e448]:
                  - button [ref=e449]:
                    - img [ref=e450]
              - 'row "Batterie de secours défibrillateur Zoll STK-004 · Dépôt Principal A Batteries 18 unités / min: 6 0.5/sem · 8 sem (Lead) Zoll SAS Surstock" [ref=e454]':
                - cell "Batterie de secours défibrillateur Zoll STK-004 · Dépôt Principal A" [ref=e455]:
                  - generic [ref=e456]:
                    - img [ref=e458]
                    - generic [ref=e462]:
                      - generic [ref=e463]: Batterie de secours défibrillateur Zoll
                      - generic [ref=e464]: STK-004 · Dépôt Principal A
                - cell "Batteries" [ref=e465]:
                  - generic [ref=e466]: Batteries
                - 'cell "18 unités / min: 6 0.5/sem · 8 sem (Lead)" [ref=e467]':
                  - generic [ref=e468]:
                    - generic [ref=e469]:
                      - generic [ref=e470]: 18 unités
                      - generic [ref=e471]: "/ min: 6"
                    - generic [ref=e472]:
                      - generic "Consommation par semaine" [ref=e473]:
                        - img [ref=e474]
                        - text: 0.5/sem
                      - generic [ref=e477]: ·
                      - generic "Délai de livraison" [ref=e478]:
                        - img [ref=e479]
                        - text: 8 sem (Lead)
                - cell "Zoll SAS" [ref=e482]
                - cell "Surstock" [ref=e483]:
                  - generic [ref=e484]: Surstock
                - cell [ref=e485]:
                  - button [ref=e486]:
                    - img [ref=e487]
              - 'row "Lampe halogène pour scialytique STK-005 · Bloc Op. - Réserve Pièces Détachées 12 unités / min: 10 1/sem · 4 sem (Lead) Surgical Light Co. Normal" [ref=e491]':
                - cell "Lampe halogène pour scialytique STK-005 · Bloc Op. - Réserve" [ref=e492]:
                  - generic [ref=e493]:
                    - img [ref=e495]
                    - generic [ref=e499]:
                      - generic [ref=e500]: Lampe halogène pour scialytique
                      - generic [ref=e501]: STK-005 · Bloc Op. - Réserve
                - cell "Pièces Détachées" [ref=e502]:
                  - generic [ref=e503]: Pièces Détachées
                - 'cell "12 unités / min: 10 1/sem · 4 sem (Lead)" [ref=e504]':
                  - generic [ref=e505]:
                    - generic [ref=e506]:
                      - generic [ref=e507]: 12 unités
                      - generic [ref=e508]: "/ min: 10"
                    - generic [ref=e509]:
                      - generic "Consommation par semaine" [ref=e510]:
                        - img [ref=e511]
                        - text: 1/sem
                      - generic [ref=e514]: ·
                      - generic "Délai de livraison" [ref=e515]:
                        - img [ref=e516]
                        - text: 4 sem (Lead)
                - cell "Surgical Light Co." [ref=e519]
                - cell "Normal" [ref=e520]:
                  - generic [ref=e521]: Normal
                - cell [ref=e522]:
                  - button [ref=e523]:
                    - img [ref=e524]
  - generic [ref=e528]: "0"
```

# Test source

```ts
  325 |     await page.click('button:has-text("Créer"), button:has-text("Enregistrer")');
  326 | 
  327 |     await expect(page.locator('text=Test Ticket E2E Playwright')).toBeVisible({ timeout: 5000 });
  328 |   });
  329 | 
  330 |   test('WF-05-03 · Filtrer les tickets par priorité Critique', async ({ page }) => {
  331 |     await page.click('button:has-text("Critique")');
  332 |     await page.waitForTimeout(300);
  333 |   });
  334 | 
  335 |   test('WF-05-04 · Rechercher dans les tickets', async ({ page }) => {
  336 |     const searchInput = page.locator('input[placeholder*="Rechercher"]').first();
  337 |     await searchInput.fill('IRM');
  338 |     await page.waitForTimeout(300);
  339 |   });
  340 | 
  341 |   test('WF-05-05 · Avancer un ticket dans le workflow', async ({ page }) => {
  342 |     // Find first open ticket and advance it
  343 |     const advanceBtn = page.locator('button:has-text("Avancer"), button:has-text("→")').first();
  344 |     if (await advanceBtn.isVisible()) {
  345 |       await advanceBtn.click();
  346 |     }
  347 |   });
  348 | });
  349 | 
  350 | // ─────────────────────────────────────────────────────────────────────────────
  351 | // WORKFLOW 6 — Maintenance Planifiée
  352 | // ─────────────────────────────────────────────────────────────────────────────
  353 | test.describe('WF-06 · Maintenance Planifiée', () => {
  354 | 
  355 |   test.beforeEach(async ({ page }) => {
  356 |     await loginAs(page, 'admin');
  357 |     await page.goto(`${BASE}/pm`);
  358 |     await expect(page.locator('h1').filter({ hasText: /Maintenance/i })).toBeVisible({ timeout: 8000 });
  359 |   });
  360 | 
  361 |   test('WF-06-01 · Liste des plans de maintenance affichée', async ({ page }) => {
  362 |     await expect(page.locator('text=PPM')).toBeVisible();
  363 |     await expect(page.locator('text=Conforme')).toBeVisible();
  364 |   });
  365 | 
  366 |   test('WF-06-02 · Basculer vers vue Calendrier', async ({ page }) => {
  367 |     await page.click('button:has-text("Calendrier")');
  368 |     await expect(page.locator('text=Lun')).toBeVisible();
  369 |   });
  370 | 
  371 |   test('WF-06-03 · Navigation calendrier (mois suivant)', async ({ page }) => {
  372 |     await page.click('button:has-text("Calendrier")');
  373 |     const nextBtn = page.locator('button').filter({ has: page.locator('svg') }).last();
  374 |     await nextBtn.click();
  375 |   });
  376 | 
  377 |   test('WF-06-04 · Cocher un item de checklist', async ({ page }) => {
  378 |     const checkbox = page.locator('input[type="checkbox"]').first();
  379 |     if (await checkbox.isVisible()) {
  380 |       const before = await checkbox.isChecked();
  381 |       await checkbox.click();
  382 |       await expect(checkbox).toHaveProperty('checked', !before);
  383 |     }
  384 |   });
  385 | 
  386 |   test('WF-06-05 · Export iCal (.ics)', async ({ page }) => {
  387 |     const [download] = await Promise.all([
  388 |       page.waitForEvent('download', { timeout: 5000 }),
  389 |       page.click('button[title="Exporter iCal"], button:has-text("Export")'),
  390 |     ]).catch(() => [null]);
  391 |     if (download) {
  392 |       expect(download.suggestedFilename()).toContain('.ics');
  393 |     }
  394 |   });
  395 | 
  396 |   test('WF-06-06 · Filtre par fréquence Mensuel', async ({ page }) => {
  397 |     const filterBtn = page.locator('button').filter({ hasText: /Mensuel/i }).first();
  398 |     if (await filterBtn.isVisible()) {
  399 |       await filterBtn.click();
  400 |     }
  401 |   });
  402 | 
  403 |   test('WF-06-07 · KPIs taux de conformité visibles', async ({ page }) => {
  404 |     await expect(page.locator('text=Conforme')).toBeVisible();
  405 |     await expect(page.locator('text=%')).toBeVisible();
  406 |   });
  407 | });
  408 | 
  409 | // ─────────────────────────────────────────────────────────────────────────────
  410 | // WORKFLOW 7 — Stocks
  411 | // ─────────────────────────────────────────────────────────────────────────────
  412 | test.describe('WF-07 · Stocks', () => {
  413 | 
  414 |   test.beforeEach(async ({ page }) => {
  415 |     await loginAs(page, 'admin');
  416 |     await page.goto(`${BASE}/stocks`);
  417 |     await expect(page.locator('h1').filter({ hasText: /Stock/i })).toBeVisible({ timeout: 8000 });
  418 |   });
  419 | 
  420 |   test('WF-07-01 · Liste des articles affichée', async ({ page }) => {
  421 |     await expect(page.locator('table')).toBeVisible();
  422 |   });
  423 | 
  424 |   test('WF-07-02 · Filtre articles en état Critique', async ({ page }) => {
> 425 |     await page.click('button:has-text("Critique")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  426 |     await page.waitForTimeout(300);
  427 |     const badges = page.locator('.uc-badge-danger');
  428 |     if (await badges.count() > 0) await expect(badges.first()).toBeVisible();
  429 |   });
  430 | 
  431 |   test('WF-07-03 · Ajouter un article en stock', async ({ page }) => {
  432 |     await page.click('button:has-text("Nouvel article"), button:has-text("Ajouter")');
  433 |     await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 5000 });
  434 | 
  435 |     await page.fill('input[placeholder*="nom"], input[name="name"]', 'Article Test E2E');
  436 |     const qtyInput = page.locator('input[type="number"]').first();
  437 |     await qtyInput.fill('50');
  438 |     const threshInput = page.locator('input[type="number"]').nth(1);
  439 |     await threshInput.fill('10');
  440 |     await page.click('button:has-text("Enregistrer"), button[type="submit"]');
  441 |     await expect(page.locator('text=Article Test E2E')).toBeVisible({ timeout: 5000 });
  442 |   });
  443 | 
  444 |   test('WF-07-04 · Export PDF de l\'inventaire', async ({ page }) => {
  445 |     const [download] = await Promise.all([
  446 |       page.waitForEvent('download', { timeout: 8000 }),
  447 |       page.click('button:has-text("PDF"), button:has-text("Export")'),
  448 |     ]).catch(() => [null]);
  449 |     if (download) expect(download.suggestedFilename()).toContain('.pdf');
  450 |   });
  451 | 
  452 |   test('WF-07-05 · Graphique de prévision de rupture', async ({ page }) => {
  453 |     // Click on a stock item to show forecast
  454 |     const firstItem = page.locator('tbody tr').first();
  455 |     await firstItem.click();
  456 |     // or look for a button to show chart
  457 |     const chartBtn = page.locator('button').filter({ hasText: /Prévision|Forecast/i }).first();
  458 |     if (await chartBtn.isVisible()) await chartBtn.click();
  459 |   });
  460 | });
  461 | 
  462 | // ─────────────────────────────────────────────────────────────────────────────
  463 | // WORKFLOW 8 — Achats
  464 | // ─────────────────────────────────────────────────────────────────────────────
  465 | test.describe('WF-08 · Achats', () => {
  466 | 
  467 |   test.beforeEach(async ({ page }) => {
  468 |     await loginAs(page, 'admin');
  469 |     await page.goto(`${BASE}/achats`);
  470 |     await expect(page.locator('h1, h2').filter({ hasText: /Achat|Commande/i })).toBeVisible({ timeout: 8000 });
  471 |   });
  472 | 
  473 |   test('WF-08-01 · Kanban achats — 4 colonnes', async ({ page }) => {
  474 |     await expect(page.locator('text=Demande')).toBeVisible();
  475 |     await expect(page.locator('text=Validé')).toBeVisible();
  476 |     await expect(page.locator('text=Commandé')).toBeVisible();
  477 |     await expect(page.locator('text=Reçu')).toBeVisible();
  478 |   });
  479 | 
  480 |   test('WF-08-02 · Créer une demande d\'achat', async ({ page }) => {
  481 |     await page.click('button:has-text("Nouvelle demande"), button:has-text("Nouveau")');
  482 |     await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 5000 });
  483 |     await page.fill('input[placeholder*="article"], input[placeholder*="Article"]', 'Pièce Test E2E');
  484 |     await page.click('button[type="submit"], button:has-text("Créer")');
  485 |     await expect(page.locator('text=Pièce Test E2E')).toBeVisible({ timeout: 5000 });
  486 |   });
  487 | 
  488 |   test('WF-08-03 · Valider une commande (role admin)', async ({ page }) => {
  489 |     const validateBtn = page.locator('button:has-text("Valider")').first();
  490 |     if (await validateBtn.isVisible()) {
  491 |       await validateBtn.click();
  492 |     }
  493 |   });
  494 | 
  495 |   test('WF-08-04 · Technicien ne peut PAS valider', async ({ page }) => {
  496 |     await loginAs(page, 'technician');
  497 |     await page.goto(`${BASE}/achats`);
  498 |     const validateBtn = page.locator('button:has-text("Valider")');
  499 |     await expect(validateBtn).toHaveCount(0);
  500 |   });
  501 | });
  502 | 
  503 | // ─────────────────────────────────────────────────────────────────────────────
  504 | // WORKFLOW 9 — Fournisseurs
  505 | // ─────────────────────────────────────────────────────────────────────────────
  506 | test.describe('WF-09 · Fournisseurs', () => {
  507 | 
  508 |   test.beforeEach(async ({ page }) => {
  509 |     await loginAs(page, 'admin');
  510 |     await page.goto(`${BASE}/fournisseurs`);
  511 |     await expect(page.locator('h1').filter({ hasText: /Fournisseur/i })).toBeVisible({ timeout: 8000 });
  512 |   });
  513 | 
  514 |   test('WF-09-01 · Liste des fournisseurs affichée', async ({ page }) => {
  515 |     await expect(page.locator('text=Siemens')).toBeVisible();
  516 |   });
  517 | 
  518 |   test('WF-09-02 · Recherche fournisseur', async ({ page }) => {
  519 |     await page.fill('input[placeholder*="Rechercher"]', 'Siemens');
  520 |     await expect(page.locator('text=Siemens Healthineers')).toBeVisible();
  521 |   });
  522 | 
  523 |   test('WF-09-03 · Ouvrir la fiche fournisseur', async ({ page }) => {
  524 |     const firstCard = page.locator('.rounded-2xl, .glass').first();
  525 |     await firstCard.click();
```