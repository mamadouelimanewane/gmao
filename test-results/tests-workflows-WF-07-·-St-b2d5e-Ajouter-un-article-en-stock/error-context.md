# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-07 · Stocks >> WF-07-03 · Ajouter un article en stock
- Location: tests\workflows.spec.ts:431:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="nom"], input[name="name"]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
          - generic [ref=e196]:
            - generic [ref=e197]:
              - generic [ref=e198]:
                - img [ref=e199]
                - heading "Nouvel Article" [level=3] [ref=e203]
              - button [ref=e204]:
                - img [ref=e205]
            - generic [ref=e208]:
              - generic [ref=e209]:
                - generic [ref=e210]: Nom *
                - 'textbox "ex: Électrodes pédiatriques" [ref=e211]'
              - generic [ref=e212]:
                - generic [ref=e213]:
                  - generic [ref=e214]: Catégorie
                  - combobox [ref=e215]:
                    - option "Consommables" [selected]
                    - option "Pièces Détachées"
                    - option "Batteries"
                    - option "Énergie"
                - generic [ref=e216]:
                  - generic [ref=e217]: Unité
                  - textbox "pcs, boîtes, flacons…" [ref=e218]: pcs
              - generic [ref=e219]:
                - generic [ref=e220]:
                  - generic [ref=e221]: Quantité *
                  - spinbutton [ref=e222]
                - generic [ref=e223]:
                  - generic [ref=e224]: Seuil minimum *
                  - spinbutton [ref=e225]
              - generic [ref=e226]:
                - generic [ref=e227]:
                  - generic [ref=e228]: Prix unitaire (FCFA)
                  - spinbutton [ref=e229]
                - generic [ref=e230]:
                  - generic [ref=e231]: Fournisseur
                  - 'textbox "ex: BioSénégal SARL" [ref=e232]'
              - generic [ref=e233]:
                - generic [ref=e234]: Localisation
                - 'textbox "ex: Armoire A - Urgences" [ref=e235]'
            - generic [ref=e236]:
              - button "Annuler" [ref=e237]
              - button "Enregistrer" [ref=e238]
          - generic [ref=e239]:
            - generic [ref=e240]:
              - generic [ref=e241]:
                - heading "Stocks & Supply Chain IA" [level=1] [ref=e242]
                - generic [ref=e243]: PRÉDICTION
              - paragraph [ref=e244]: Suivi des consommables et prévisions d'approvisionnement assistées par IA.
            - generic [ref=e245]:
              - link "Statistiques" [ref=e246] [cursor=pointer]:
                - /url: /statistiques
                - img [ref=e247]
                - text: Statistiques
              - button "Ajouter un Article" [active] [ref=e249]:
                - img [ref=e250]
                - text: Ajouter un Article
          - generic [ref=e251]:
            - generic [ref=e252]:
              - generic [ref=e253]:
                - 'heading "Prévision d''épuisement : Filtre antibactérien (STK-002)" [level=2] [ref=e254]':
                  - img [ref=e255]
                  - text: "Prévision d'épuisement : Filtre antibactérien (STK-002)"
                - generic [ref=e258]: "Délai Fournisseur : 6 sem."
              - application [ref=e262]:
                - generic [ref=e280]:
                  - generic [ref=e281]:
                    - generic [ref=e283]: S0
                    - generic [ref=e285]: S1
                    - generic [ref=e287]: S2
                    - generic [ref=e289]: S3
                    - generic [ref=e291]: S4
                    - generic [ref=e293]: S5
                    - generic [ref=e295]: S6
                    - generic [ref=e297]: S7
                  - generic [ref=e298]:
                    - generic [ref=e300]: "0"
                    - generic [ref=e302]: "15"
                    - generic [ref=e304]: "30"
                    - generic [ref=e306]: "45"
                    - generic [ref=e308]: "60"
                  - generic [ref=e309]: Seuil Sécurité
                  - generic [ref=e310]: Rupture (S4)
            - generic [ref=e311]:
              - img [ref=e313]
              - heading "Insights IA & Auto-Order" [level=2] [ref=e325]:
                - img [ref=e326]
                - text: Insights IA & Auto-Order
              - generic [ref=e338]:
                - generic [ref=e340]:
                  - img [ref=e341]
                  - generic [ref=e343]:
                    - heading "Alerte de Rupture Imminente" [level=4] [ref=e344]
                    - paragraph [ref=e345]: Le stock de Filtre antibactérien sera épuisé dans 4 semaines. Le délai de livraison (Dräger France) est de 6 semaines. Vous serez en rupture de stock pendant 2 semaines.
                - generic [ref=e347]:
                  - img [ref=e348]
                  - generic [ref=e351]:
                    - heading "Recommandation d'Urgence" [level=4] [ref=e352]
                    - paragraph [ref=e353]: Passer commande aujourd'hui. Emprunter temporairement 8 unités via MedPool auprès de l'Hôpital de Thiès pour couvrir le gap de 2 semaines.
                - button "Générer Bon de Commande Auto" [ref=e354]:
                  - img [ref=e355]
                  - text: Générer Bon de Commande Auto
                - button "Chercher sur MedPool" [ref=e359]:
                  - img [ref=e360]
                  - text: Chercher sur MedPool
          - generic [ref=e362]:
            - generic [ref=e363]:
              - img [ref=e364]
              - textbox "Rechercher un consommable, pièce, fournisseur..." [ref=e367]
            - generic [ref=e368]:
              - img [ref=e369]
              - generic [ref=e371]: "Catégorie:"
              - button "Tous" [ref=e372]
              - button "Consommables" [ref=e373]
              - button "Pièces Détachées" [ref=e374]
              - button "Batteries" [ref=e375]
          - table [ref=e378]:
            - rowgroup [ref=e379]:
              - row "Désignation Catégorie Stock & IA Fournisseur Statut Actions" [ref=e380]:
                - columnheader "Désignation" [ref=e381]
                - columnheader "Catégorie" [ref=e382]
                - columnheader "Stock & IA" [ref=e383]
                - columnheader "Fournisseur" [ref=e384]
                - columnheader "Statut" [ref=e385]
                - columnheader "Actions" [ref=e386]
            - rowgroup [ref=e387]:
              - 'row "Électrodes pédiatriques ECG STK-001 · Armoire A - Urgences Consommables 120 boîtes / min: 50 15/sem · 2 sem (Lead) BioSénégal SARL Normal" [ref=e388]':
                - cell "Électrodes pédiatriques ECG STK-001 · Armoire A - Urgences" [ref=e389]:
                  - generic [ref=e390]:
                    - img [ref=e392]
                    - generic [ref=e396]:
                      - generic [ref=e397]: Électrodes pédiatriques ECG
                      - generic [ref=e398]: STK-001 · Armoire A - Urgences
                - cell "Consommables" [ref=e399]:
                  - generic [ref=e400]: Consommables
                - 'cell "120 boîtes / min: 50 15/sem · 2 sem (Lead)" [ref=e401]':
                  - generic [ref=e402]:
                    - generic [ref=e403]:
                      - generic [ref=e404]: 120 boîtes
                      - generic [ref=e405]: "/ min: 50"
                    - generic [ref=e406]:
                      - generic "Consommation par semaine" [ref=e407]:
                        - img [ref=e408]
                        - text: 15/sem
                      - generic [ref=e411]: ·
                      - generic "Délai de livraison" [ref=e412]:
                        - img [ref=e413]
                        - text: 2 sem (Lead)
                - cell "BioSénégal SARL" [ref=e416]
                - cell "Normal" [ref=e417]:
                  - generic [ref=e418]: Normal
                - cell [ref=e419]:
                  - button [ref=e420]:
                    - img [ref=e421]
              - 'row "Filtre antibactérien respirateur STK-002 · Dépôt Principal B Pièces Détachées 18 unités / min: 15 4/sem · 6 sem (Lead) Dräger France Critique" [ref=e425]':
                - cell "Filtre antibactérien respirateur STK-002 · Dépôt Principal B" [ref=e426]:
                  - generic [ref=e427]:
                    - img [ref=e429]
                    - generic [ref=e433]:
                      - generic [ref=e434]: Filtre antibactérien respirateur
                      - generic [ref=e435]: STK-002 · Dépôt Principal B
                - cell "Pièces Détachées" [ref=e436]:
                  - generic [ref=e437]: Pièces Détachées
                - 'cell "18 unités / min: 15 4/sem · 6 sem (Lead)" [ref=e438]':
                  - generic [ref=e439]:
                    - generic [ref=e440]:
                      - generic [ref=e441]: 18 unités
                      - generic [ref=e442]: "/ min: 15"
                    - generic [ref=e443]:
                      - generic "Consommation par semaine" [ref=e444]:
                        - img [ref=e445]
                        - text: 4/sem
                      - generic [ref=e448]: ·
                      - generic "Délai de livraison" [ref=e449]:
                        - img [ref=e450]
                        - text: 6 sem (Lead)
                - cell "Dräger France" [ref=e453]
                - cell "Critique" [ref=e454]:
                  - generic [ref=e455]: Critique
                - cell [ref=e456]:
                  - button [ref=e457]:
                    - img [ref=e458]
              - 'row "Gel conducteur ultrasons 5L STK-003 · Armoire B - Maternité Consommables 2 bidons / min: 5 3/sem · 1 sem (Lead) Medica-Dakar Critique" [ref=e462]':
                - cell "Gel conducteur ultrasons 5L STK-003 · Armoire B - Maternité" [ref=e463]:
                  - generic [ref=e464]:
                    - img [ref=e466]
                    - generic [ref=e470]:
                      - generic [ref=e471]: Gel conducteur ultrasons 5L
                      - generic [ref=e472]: STK-003 · Armoire B - Maternité
                - cell "Consommables" [ref=e473]:
                  - generic [ref=e474]: Consommables
                - 'cell "2 bidons / min: 5 3/sem · 1 sem (Lead)" [ref=e475]':
                  - generic [ref=e476]:
                    - generic [ref=e477]:
                      - generic [ref=e478]: 2 bidons
                      - generic [ref=e479]: "/ min: 5"
                    - generic [ref=e480]:
                      - generic "Consommation par semaine" [ref=e481]:
                        - img [ref=e482]
                        - text: 3/sem
                      - generic [ref=e485]: ·
                      - generic "Délai de livraison" [ref=e486]:
                        - img [ref=e487]
                        - text: 1 sem (Lead)
                - cell "Medica-Dakar" [ref=e490]
                - cell "Critique" [ref=e491]:
                  - generic [ref=e492]: Critique
                - cell [ref=e493]:
                  - button [ref=e494]:
                    - img [ref=e495]
              - 'row "Batterie de secours défibrillateur Zoll STK-004 · Dépôt Principal A Batteries 18 unités / min: 6 0.5/sem · 8 sem (Lead) Zoll SAS Surstock" [ref=e499]':
                - cell "Batterie de secours défibrillateur Zoll STK-004 · Dépôt Principal A" [ref=e500]:
                  - generic [ref=e501]:
                    - img [ref=e503]
                    - generic [ref=e507]:
                      - generic [ref=e508]: Batterie de secours défibrillateur Zoll
                      - generic [ref=e509]: STK-004 · Dépôt Principal A
                - cell "Batteries" [ref=e510]:
                  - generic [ref=e511]: Batteries
                - 'cell "18 unités / min: 6 0.5/sem · 8 sem (Lead)" [ref=e512]':
                  - generic [ref=e513]:
                    - generic [ref=e514]:
                      - generic [ref=e515]: 18 unités
                      - generic [ref=e516]: "/ min: 6"
                    - generic [ref=e517]:
                      - generic "Consommation par semaine" [ref=e518]:
                        - img [ref=e519]
                        - text: 0.5/sem
                      - generic [ref=e522]: ·
                      - generic "Délai de livraison" [ref=e523]:
                        - img [ref=e524]
                        - text: 8 sem (Lead)
                - cell "Zoll SAS" [ref=e527]
                - cell "Surstock" [ref=e528]:
                  - generic [ref=e529]: Surstock
                - cell [ref=e530]:
                  - button [ref=e531]:
                    - img [ref=e532]
              - 'row "Lampe halogène pour scialytique STK-005 · Bloc Op. - Réserve Pièces Détachées 12 unités / min: 10 1/sem · 4 sem (Lead) Surgical Light Co. Normal" [ref=e536]':
                - cell "Lampe halogène pour scialytique STK-005 · Bloc Op. - Réserve" [ref=e537]:
                  - generic [ref=e538]:
                    - img [ref=e540]
                    - generic [ref=e544]:
                      - generic [ref=e545]: Lampe halogène pour scialytique
                      - generic [ref=e546]: STK-005 · Bloc Op. - Réserve
                - cell "Pièces Détachées" [ref=e547]:
                  - generic [ref=e548]: Pièces Détachées
                - 'cell "12 unités / min: 10 1/sem · 4 sem (Lead)" [ref=e549]':
                  - generic [ref=e550]:
                    - generic [ref=e551]:
                      - generic [ref=e552]: 12 unités
                      - generic [ref=e553]: "/ min: 10"
                    - generic [ref=e554]:
                      - generic "Consommation par semaine" [ref=e555]:
                        - img [ref=e556]
                        - text: 1/sem
                      - generic [ref=e559]: ·
                      - generic "Délai de livraison" [ref=e560]:
                        - img [ref=e561]
                        - text: 4 sem (Lead)
                - cell "Surgical Light Co." [ref=e564]
                - cell "Normal" [ref=e565]:
                  - generic [ref=e566]: Normal
                - cell [ref=e567]:
                  - button [ref=e568]:
                    - img [ref=e569]
  - generic [ref=e573]: "0"
```

# Test source

```ts
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
  425 |     await page.click('button:has-text("Critique")');
  426 |     await page.waitForTimeout(300);
  427 |     const badges = page.locator('.uc-badge-danger');
  428 |     if (await badges.count() > 0) await expect(badges.first()).toBeVisible();
  429 |   });
  430 | 
  431 |   test('WF-07-03 · Ajouter un article en stock', async ({ page }) => {
  432 |     await page.click('button:has-text("Nouvel article"), button:has-text("Ajouter")');
  433 |     await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 5000 });
  434 | 
> 435 |     await page.fill('input[placeholder*="nom"], input[name="name"]', 'Article Test E2E');
      |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
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
  526 |     // Modal or drawer should show contact info
  527 |     const contactInfo = page.locator('text=Contact, text=+221').first();
  528 |     if (await contactInfo.isVisible({ timeout: 2000 })) {
  529 |       await expect(contactInfo).toBeVisible();
  530 |     }
  531 |   });
  532 | 
  533 |   test('WF-09-04 · Ajouter un fournisseur', async ({ page }) => {
  534 |     await page.click('button:has-text("Ajouter"), button:has-text("Nouveau")');
  535 |     if (await page.locator('.fixed.inset-0').isVisible({ timeout: 3000 })) {
```