# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-10 · Finances >> WF-10-01 · Graphique Budget vs Réel affiché
- Location: tests\workflows.spec.ts:553:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1').filter({ hasText: /Finance|Budget/i })
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for locator('h1').filter({ hasText: /Finance|Budget/i })

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
  - text: GMAO Coûts & TCO
  - textbox "Rechercher…"
  - button "Portail des applications"
  - button "Clair"
  - button "🇫🇷"
  - button "4"
- main:
  - heading "Gestion des Coûts & TCO" [level=1]
  - paragraph: Analyse financière, budgets par centre de coûts, TCO (Total Cost of Ownership) et indices de remplacement (RRI).
  - button "Planification Budgétaire"
  - link "Voir les indicateurs financiers Budget, coûts curatif/préventif, alertes RRI — page Statistiques":
    - /url: /statistiques
    - paragraph: Voir les indicateurs financiers
    - paragraph: Budget, coûts curatif/préventif, alertes RRI — page Statistiques
  - heading "Suivi de la consommation budgétaire" [level=2]
  - list:
    - listitem:
      - img "Budget alloué legend icon"
      - text: Budget alloué
    - listitem:
      - img "Dépenses réelles legend icon"
      - text: Dépenses réelles
  - application: Jan Fév Mar Avr Mai Jui 0 3000000 6000000 9000000 12000000
  - heading "Coûts par service clinique" [level=2]
  - application: Urgences Bloc Op. Laboratoire 0 1500000 3000000 4500000 6000000
  - heading "Repair vs Replace Index (RRI)" [level=2]
  - paragraph: Indicateur prédictif mondial comparant le cumul des frais de maintenance à la valeur d'acquisition à neuf de l'actif.
  - text: "IRM Siemens RRI: 62%"
  - paragraph: Remplacement requis
  - text: "Scanner GE RRI: 38%"
  - paragraph: Sain
  - text: "Respirateur Dräger RRI: 48%"
  - paragraph: À surveiller
  - text: "Défibrillateur Zoll RRI: 12%"
  - paragraph: Excellent
  - heading "Grand Livre des dépenses de maintenance" [level=2]
  - table:
    - rowgroup:
      - row "Référence Équipement Département Type de frais Montant Date Statut":
        - columnheader "Référence"
        - columnheader "Équipement"
        - columnheader "Département"
        - columnheader "Type de frais"
        - columnheader "Montant"
        - columnheader "Date"
        - columnheader "Statut"
    - rowgroup:
      - row "CST-001 IRM Siemens Magnetom Skyra Radiologie Curatif 1 250 000 F CFA 28 Juin 2026 Approuvé":
        - cell "CST-001"
        - cell "IRM Siemens Magnetom Skyra"
        - cell "Radiologie"
        - cell "Curatif"
        - cell "1 250 000 F CFA"
        - cell "28 Juin 2026"
        - cell "Approuvé"
      - row "CST-002 Scanner GE Optima CT660 Urgences Pièces détachées 3 500 000 F CFA 27 Juin 2026 Approuvé":
        - cell "CST-002"
        - cell "Scanner GE Optima CT660"
        - cell "Urgences"
        - cell "Pièces détachées"
        - cell "3 500 000 F CFA"
        - cell "27 Juin 2026"
        - cell "Approuvé"
      - row "CST-003 Échographe Sonosite Edge II Maternité Étalonnage 150 000 F CFA 25 Juin 2026 Approuvé":
        - cell "CST-003"
        - cell "Échographe Sonosite Edge II"
        - cell "Maternité"
        - cell "Étalonnage"
        - cell "150 000 F CFA"
        - cell "25 Juin 2026"
        - cell "Approuvé"
      - row "CST-004 Moniteur Philips IntelliVue MX800 Réanimation Préventif 85 000 F CFA 24 Juin 2026 Approuvé":
        - cell "CST-004"
        - cell "Moniteur Philips IntelliVue MX800"
        - cell "Réanimation"
        - cell "Préventif"
        - cell "85 000 F CFA"
        - cell "24 Juin 2026"
        - cell "Approuvé"
      - row "CST-05 Automate Sysmex XN Laboratoire Central Curatif 450 000 F CFA 28 Juin 2026 En attente":
        - cell "CST-05"
        - cell "Automate Sysmex XN"
        - cell "Laboratoire Central"
        - cell "Curatif"
        - cell "450 000 F CFA"
        - cell "28 Juin 2026"
        - cell "En attente"
  - heading "Prédiction Budget N+1 (6 mois)" [level=2]
  - text: "Algorithme: moyenne × 1.05 (inflation) ± 15%"
  - paragraph: "Alerte : projection totale (61 659 340 F CFA) dépasse le budget restant (60 200 000 F CFA) de 1 459 340 F CFA."
  - paragraph: Budget restant
  - paragraph: 60 200 000 F CFA
  - paragraph: Projection 6 mois
  - paragraph: 61 659 340 F CFA
  - paragraph: Moyenne mensuelle prédite
  - paragraph: 10 276 557 F CFA
  - application: Juil Aoû Sep Oct Nov Déc 0.0M 3.5M 7.0M 10.5M 14.0M Budget/mois
```

# Test source

```ts
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
> 550 |     await expect(page.locator('h1').filter({ hasText: /Finance|Budget/i })).toBeVisible({ timeout: 8000 });
      |                                                                             ^ Error: expect(locator).toBeVisible() failed
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
  637 |     await expect(page.locator('text=IRM Siemens')).toBeVisible();
  638 |     await expect(page.locator('text=/8[0-9]|9[0-9]/')).toBeVisible(); // Score > 80
  639 |   });
  640 | 
  641 |   test('WF-12-05 · Graphique Radial (précision modèle)', async ({ page }) => {
  642 |     await expect(page.locator('text=Précision, text=94%').first()).toBeVisible();
  643 |   });
  644 | 
  645 |   test('WF-12-06 · Like/Dislike sur une réponse IA', async ({ page }) => {
  646 |     const input = page.locator('textarea, input[placeholder*="question"]').first();
  647 |     await input.fill('stock');
  648 |     await page.keyboard.press('Enter');
  649 |     await page.waitForTimeout(1800);
  650 |     const likeBtn = page.locator('[aria-label="like"], button').filter({ has: page.locator('svg') }).last();
```