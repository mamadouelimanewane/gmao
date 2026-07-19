# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-08 · Achats >> WF-08-02 · Créer une demande d'achat
- Location: tests\workflows.spec.ts:480:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Pièce Test E2E')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Pièce Test E2E')

```

```yaml
- complementary:
  - link "GMAO Health v3.0 · Ndamatou":
    - /url: /apps
  - text: En ligne · Synchronisé
  - navigation:
    - paragraph: Principal
    - link "Portail":
      - /url: /apps
    - link "Équipements":
      - /url: /equipements
    - link "Interventions 5":
      - /url: /tickets
    - link "Workflow Réparation":
      - /url: /tickets
    - link "PM Planifiées 2":
      - /url: /pm
    - link "MedPool (Réseau)":
      - /url: /medpool
    - link "Énergie & ESG":
      - /url: /energie
    - link "Stocks & Achats":
      - /url: /stocks
    - link "Workflow Achat":
      - /url: /achats
    - link "Fournisseurs":
      - /url: /fournisseurs
    - link "Coûts & TCO":
      - /url: /finances
    - link "Ressources Humaines":
      - /url: /rh
    - link "IA Copilot NEW":
      - /url: /ia
    - link "Analytics IoT":
      - /url: /analytics
    - link "Statistiques":
      - /url: /statistiques
    - link "Rapports":
      - /url: /rapports
    - link "Plan Hôpital":
      - /url: /plan
    - paragraph: Système
    - link "Paramètres":
      - /url: /settings
  - text: Administrateur
  - paragraph: admin
  - paragraph: Tech
  - button "Déconnexion"
- banner:
  - text: GMAO Workflow Achat
  - textbox "Rechercher…"
  - button "Portail des applications"
  - button "Clair"
  - button "🇫🇷"
  - button "4"
- main:
  - heading "Nouvelle Demande d'Achat" [level=3]
  - button
  - text: Article / Pièce *
  - 'textbox "ex: Filtre antibactérien respirateur"'
  - text: Quantité *
  - spinbutton: "1"
  - text: Unité
  - textbox "pcs, boîtes…": pcs
  - text: Fournisseur suggéré
  - 'textbox "ex: BioSénégal SARL"'
  - text: Prix unitaire estimé (FCFA)
  - spinbutton
  - text: Notes
  - textbox "Justification, urgence…"
  - paragraph: Nom de l'article et quantité valide requis
  - button "Annuler"
  - button "Soumettre la demande"
  - heading "Workflow Achat" [level=1]
  - paragraph: Demande → Validation → Commande fournisseur → Réception → Mise à jour du stock.
  - button "Nouvelle Demande"
  - textbox "Rechercher par article, fournisseur, ID...": Pièce Test E2E
  - heading "Demande" [level=3]
  - text: 0 Aucune demande
  - heading "Validé" [level=3]
  - text: 0 Aucune demande
  - heading "Commandé" [level=3]
  - text: 0 Aucune demande
  - heading "Reçu" [level=3]
  - text: 0 Aucune demande
```

# Test source

```ts
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
> 485 |     await expect(page.locator('text=Pièce Test E2E')).toBeVisible({ timeout: 5000 });
      |                                                       ^ Error: expect(locator).toBeVisible() failed
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
  536 |       await page.fill('input[placeholder*="nom"], input[name="name"]', 'Fournisseur Test E2E');
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
```