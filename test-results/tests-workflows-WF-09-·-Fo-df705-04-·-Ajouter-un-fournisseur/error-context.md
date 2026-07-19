# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-09 · Fournisseurs >> WF-09-04 · Ajouter un fournisseur
- Location: tests\workflows.spec.ts:533:3

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
        - img [ref=e82]
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
        - generic [ref=e156]: Fournisseurs
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
      - generic [ref=e192]:
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]:
              - img [ref=e198]
              - heading "Nouveau Fournisseur" [level=3] [ref=e203]
            - button [ref=e204]:
              - img [ref=e205]
          - generic [ref=e208]:
            - generic [ref=e209]:
              - generic [ref=e210]: Nom de l'entreprise *
              - 'textbox "ex: Siemens Healthineers Sénégal" [ref=e211]'
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e214]: Catégorie *
                - combobox [ref=e215]:
                  - option "Constructeur"
                  - option "Distributeur Local" [selected]
                  - option "Prestataire de service"
              - generic [ref=e216]:
                - generic [ref=e217]: Temps de réponse (SLA) *
                - 'textbox "ex: 4h, 24h" [ref=e218]': 24h
            - generic [ref=e219]:
              - generic [ref=e220]: Nom du contact principal *
              - 'textbox "ex: M. Ibrahima Diop" [ref=e221]'
            - generic [ref=e222]:
              - generic [ref=e223]:
                - generic [ref=e224]: Email de contact *
                - 'textbox "ex: contact@entreprise.com" [ref=e225]'
              - generic [ref=e226]:
                - generic [ref=e227]: Téléphone *
                - 'textbox "ex: +221 33 800 00 00" [ref=e228]'
            - generic [ref=e229]:
              - generic [ref=e230]: Adresse / Localisation
              - 'textbox "ex: Dakar, Almadies" [ref=e231]'
          - generic [ref=e232]:
            - button "Annuler" [ref=e233]
            - button "Enregistrer" [ref=e234]
        - generic [ref=e235]:
          - generic [ref=e236]:
            - generic [ref=e237]:
              - heading "Fournisseurs & Constructeurs" [level=1] [ref=e238]
              - paragraph [ref=e239]: Gérez les relations, contrats de garantie et pièces détachées fournis par vos partenaires.
            - button "Ajouter un Fournisseur" [active] [ref=e240]:
              - img [ref=e241]
              - text: Ajouter un Fournisseur
          - generic [ref=e242]:
            - generic [ref=e243]:
              - img [ref=e244]
              - textbox "Rechercher par entreprise, contact, adresse..." [ref=e247]
            - generic [ref=e248]:
              - generic [ref=e249]: "Filtrer:"
              - button "Tous" [ref=e250]
              - button "Constructeur" [ref=e251]
              - button "Distributeur Local" [ref=e252]
              - button "Prestataire de service" [ref=e253]
          - generic [ref=e254]:
            - generic [ref=e255]:
              - generic [ref=e256]:
                - generic [ref=e257]:
                  - generic [ref=e258]: Constructeur
                  - generic [ref=e259]: Actif
                - generic [ref=e261]:
                  - heading "Siemens Healthineers Sénégal" [level=3] [ref=e262]
                  - generic [ref=e263]:
                    - img [ref=e264]
                    - text: "4.8"
                - paragraph [ref=e266]: Dakar, Almadies
                - generic [ref=e267]:
                  - generic [ref=e268]:
                    - generic [ref=e269]: "Contact:"
                    - text: M. Ibrahima Diop
                  - generic [ref=e270]:
                    - link "+221 33 824 55 66" [ref=e271] [cursor=pointer]:
                      - /url: tel:+221 33 824 55 66
                      - img [ref=e272]
                      - text: +221 33 824 55 66
                    - link "ibrahima.diop@siemens.com" [ref=e274] [cursor=pointer]:
                      - /url: mailto:ibrahima.diop@siemens.com
                      - img [ref=e275]
                      - text: ibrahima.diop@siemens.com
                - generic [ref=e278]:
                  - paragraph [ref=e279]: Pièces & consommables clés
                  - generic [ref=e280]:
                    - generic [ref=e281]: Tubes RX
                    - generic [ref=e282]: Bobines IRM
                    - generic [ref=e283]: Cartes électroniques de puissance
              - generic [ref=e284]:
                - generic [ref=e285]:
                  - img [ref=e286]
                  - generic [ref=e289]: 3 contrats actifs
                - generic [ref=e290]: "SLA réactivité : 4h"
            - generic [ref=e291]:
              - generic [ref=e292]:
                - generic [ref=e293]:
                  - generic [ref=e294]: Distributeur Local
                  - generic [ref=e295]: Actif
                - generic [ref=e297]:
                  - heading "BioSénégal SARL" [level=3] [ref=e298]
                  - generic [ref=e299]:
                    - img [ref=e300]
                    - text: "4.2"
                - paragraph [ref=e302]: Dakar, Fann Résidence
                - generic [ref=e303]:
                  - generic [ref=e304]:
                    - generic [ref=e305]: "Contact:"
                    - text: Mme. Aminata Tall
                  - generic [ref=e306]:
                    - link "+221 33 869 12 34" [ref=e307] [cursor=pointer]:
                      - /url: tel:+221 33 869 12 34
                      - img [ref=e308]
                      - text: +221 33 869 12 34
                    - link "contact@biosenegal.sn" [ref=e310] [cursor=pointer]:
                      - /url: mailto:contact@biosenegal.sn
                      - img [ref=e311]
                      - text: contact@biosenegal.sn
                - generic [ref=e314]:
                  - paragraph [ref=e315]: Pièces & consommables clés
                  - generic [ref=e316]:
                    - generic [ref=e317]: Électrodes ECG
                    - generic [ref=e318]: Batteries de secours
                    - generic [ref=e319]: Câbles de rechange
              - generic [ref=e320]:
                - generic [ref=e321]:
                  - img [ref=e322]
                  - generic [ref=e325]: 5 contrats actifs
                - generic [ref=e326]: "SLA réactivité : 2h"
            - generic [ref=e327]:
              - generic [ref=e328]:
                - generic [ref=e329]:
                  - generic [ref=e330]: Distributeur Local
                  - generic [ref=e331]: Sous évaluation
                - generic [ref=e333]:
                  - heading "Medica-Dakar" [level=3] [ref=e334]
                  - generic [ref=e335]:
                    - img [ref=e336]
                    - text: "3.5"
                - paragraph [ref=e338]: Dakar, Plateau
                - generic [ref=e339]:
                  - generic [ref=e340]:
                    - generic [ref=e341]: "Contact:"
                    - text: M. Cheikh Tidiane
                  - generic [ref=e342]:
                    - link "+221 33 842 98 76" [ref=e343] [cursor=pointer]:
                      - /url: tel:+221 33 842 98 76
                      - img [ref=e344]
                      - text: +221 33 842 98 76
                    - link "cheikh.tidiane@medica.sn" [ref=e346] [cursor=pointer]:
                      - /url: mailto:cheikh.tidiane@medica.sn
                      - img [ref=e347]
                      - text: cheikh.tidiane@medica.sn
                - generic [ref=e350]:
                  - paragraph [ref=e351]: Pièces & consommables clés
                  - generic [ref=e352]:
                    - generic [ref=e353]: Gel ultrasons
                    - generic [ref=e354]: Papier ECG
                    - generic [ref=e355]: Lampes de scialytique
              - generic [ref=e356]:
                - generic [ref=e357]:
                  - img [ref=e358]
                  - generic [ref=e361]: 1 contrats actifs
                - generic [ref=e362]: "SLA réactivité : 24h"
            - generic [ref=e363]:
              - generic [ref=e364]:
                - generic [ref=e365]:
                  - generic [ref=e366]: Constructeur
                  - generic [ref=e367]: Actif
                - generic [ref=e369]:
                  - heading "Dräger Service Afrique" [level=3] [ref=e370]
                  - generic [ref=e371]:
                    - img [ref=e372]
                    - text: "4.7"
                - paragraph [ref=e374]: France (Support Distant / Import)
                - generic [ref=e375]:
                  - generic [ref=e376]:
                    - generic [ref=e377]: "Contact:"
                    - text: M. Marc Dubois
                  - generic [ref=e378]:
                    - link "+33 1 46 11 20 00" [ref=e379] [cursor=pointer]:
                      - /url: tel:+33 1 46 11 20 00
                      - img [ref=e380]
                      - text: +33 1 46 11 20 00
                    - link "marc.dubois@draeger.com" [ref=e382] [cursor=pointer]:
                      - /url: mailto:marc.dubois@draeger.com
                      - img [ref=e383]
                      - text: marc.dubois@draeger.com
                - generic [ref=e386]:
                  - paragraph [ref=e387]: Pièces & consommables clés
                  - generic [ref=e388]:
                    - generic [ref=e389]: Filtres antibactériens
                    - generic [ref=e390]: Valves expiratoires
                    - generic [ref=e391]: Capteurs O2
              - generic [ref=e392]:
                - generic [ref=e393]:
                  - img [ref=e394]
                  - generic [ref=e397]: 2 contrats actifs
                - generic [ref=e398]: "SLA réactivité : 48h"
```

# Test source

```ts
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
> 536 |       await page.fill('input[placeholder*="nom"], input[name="name"]', 'Fournisseur Test E2E');
      |                  ^ Error: page.fill: Test timeout of 30000ms exceeded.
  537 |       await page.click('button:has-text("Enregistrer"), button[type="submit"]');
  538 |     }
  539 |   });
  540 | });
  541 | 
  542 | // ─────────────────────────────────────────────────────────────────────────────
  543 | // WORKFLOW 10 — Finances
  544 | // ─────────────────────────────────────────────────────────────────────────────
  545 | test.describe('WF-10 · Finances', () => {
  546 | 
  547 |   test.beforeEach(async ({ page }) => {
  548 |     await loginAs(page, 'admin');
  549 |     await page.goto(`${BASE}/finances`);
  550 |     await expect(page.locator('h1').filter({ hasText: /Finance|Budget/i })).toBeVisible({ timeout: 8000 });
  551 |   });
  552 | 
  553 |   test('WF-10-01 · Graphique Budget vs Réel affiché', async ({ page }) => {
  554 |     await expect(page.locator('text=Budget')).toBeVisible();
  555 |     // recharts SVG
  556 |     await expect(page.locator('svg')).toBeVisible();
  557 |   });
  558 | 
  559 |   test('WF-10-02 · Tableau des coûts de maintenance', async ({ page }) => {
  560 |     await expect(page.locator('text=Approuvé')).toBeVisible();
  561 |     await expect(page.locator('text=IRM Siemens')).toBeVisible();
  562 |   });
  563 | 
  564 |   test('WF-10-03 · KPI Budget consommé visible', async ({ page }) => {
  565 |     await expect(page.locator('text=FCFA')).toBeVisible();
  566 |   });
  567 | });
  568 | 
  569 | // ─────────────────────────────────────────────────────────────────────────────
  570 | // WORKFLOW 11 — Ressources Humaines
  571 | // ─────────────────────────────────────────────────────────────────────────────
  572 | test.describe('WF-11 · Ressources Humaines', () => {
  573 | 
  574 |   test.beforeEach(async ({ page }) => {
  575 |     await loginAs(page, 'admin');
  576 |     await page.goto(`${BASE}/rh`);
  577 |     await expect(page.locator('h1').filter({ hasText: /RH|Ressources/i })).toBeVisible({ timeout: 8000 });
  578 |   });
  579 | 
  580 |   test('WF-11-01 · Fiches techniciens affichées', async ({ page }) => {
  581 |     await expect(page.locator('text=Abdoulaye Diallo')).toBeVisible();
  582 |     await expect(page.locator('text=Fatou Ndiaye')).toBeVisible();
  583 |   });
  584 | 
  585 |   test('WF-11-02 · Filtre par statut "En congé"', async ({ page }) => {
  586 |     const congeBtn = page.locator('button:has-text("Congé"), button:has-text("En congé")').first();
  587 |     if (await congeBtn.isVisible()) await congeBtn.click();
  588 |   });
  589 | 
  590 |   test('WF-11-03 · Certification expirée affichée en rouge', async ({ page }) => {
  591 |     const expiredBadge = page.locator('.bg-rose-500\\/20, .uc-badge-danger').first();
  592 |     if (await expiredBadge.isVisible()) await expect(expiredBadge).toBeVisible();
  593 |   });
  594 | 
  595 |   test('WF-11-04 · Radar chart compétences visible', async ({ page }) => {
  596 |     await expect(page.locator('svg')).toBeVisible();
  597 |   });
  598 | 
  599 |   test('WF-11-05 · Planning hebdomadaire visible', async ({ page }) => {
  600 |     await expect(page.locator('text=Lun')).toBeVisible();
  601 |   });
  602 | });
  603 | 
  604 | // ─────────────────────────────────────────────────────────────────────────────
  605 | // WORKFLOW 12 — IA Copilot
  606 | // ─────────────────────────────────────────────────────────────────────────────
  607 | test.describe('WF-12 · IA Copilot', () => {
  608 | 
  609 |   test.beforeEach(async ({ page }) => {
  610 |     await loginAs(page, 'admin');
  611 |     await page.goto(`${BASE}/ia`);
  612 |     await expect(page.locator('text=IA Copilot')).toBeVisible({ timeout: 8000 });
  613 |   });
  614 | 
  615 |   test('WF-12-01 · Chat — envoyer un message', async ({ page }) => {
  616 |     const input = page.locator('textarea, input[placeholder*="question"]').first();
  617 |     await input.fill('quel équipement est le plus critique ?');
  618 |     await page.keyboard.press('Enter');
  619 |     await expect(page.locator('text=Automate Sysmex, text=critique').first()).toBeVisible({ timeout: 5000 });
  620 |   });
  621 | 
  622 |   test('WF-12-02 · Questions prédéfinies (suggestions)', async ({ page }) => {
  623 |     const suggestion = page.locator('button').filter({ hasText: /critique|planning|stock/i }).first();
  624 |     if (await suggestion.isVisible()) {
  625 |       await suggestion.click();
  626 |       await page.waitForTimeout(1500);
  627 |       const messages = page.locator('.rounded-2xl').filter({ hasText: /assistant|IA/i });
  628 |       // Some response should appear
  629 |     }
  630 |   });
  631 | 
  632 |   test('WF-12-03 · Section Anomalies capteurs visible', async ({ page }) => {
  633 |     await expect(page.locator('text=Température, text=Vibration').first()).toBeVisible();
  634 |   });
  635 | 
  636 |   test('WF-12-04 · Section scores de risque de panne', async ({ page }) => {
```