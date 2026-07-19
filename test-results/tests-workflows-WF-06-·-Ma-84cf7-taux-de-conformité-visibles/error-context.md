# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-06 · Maintenance Planifiée >> WF-06-07 · KPIs taux de conformité visibles
- Location: tests\workflows.spec.ts:403:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Conforme')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Conforme')

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
  - text: GMAO PM Planifiées
  - textbox "Rechercher…"
  - button "Portail des applications"
  - button "Clair"
  - button "🇫🇷"
  - button "4"
- main:
  - heading "Maintenances PlanifiéesPPM" [level=1]
  - paragraph: Planned Preventive Maintenance · Checklists · Conformité réglementaire
  - button "📋 Liste"
  - button "📅 Calendrier"
  - button "Nouveau plan PM"
  - button "Exporter iCal"
  - link "Voir les indicateurs de conformité PM Taux de conformité, retards, durée moyenne — page Statistiques":
    - /url: /statistiques
    - paragraph: Voir les indicateurs de conformité PM
    - paragraph: Taux de conformité, retards, durée moyenne — page Statistiques
  - button "Tous (8)"
  - button "En retard (2)"
  - button "En cours (1)"
  - button "Imminent (2)"
  - button "Réalisé (1)"
  - button "Planifié (2)"
  - button "IRM Siemens Magnetom Skyra En retard Radiologie · PM-001 Trimestriel 4h Aujourd'hui":
    - paragraph: IRM Siemens Magnetom Skyra
    - text: En retard
    - paragraph: Radiologie · PM-001
    - text: Trimestriel 4h Aujourd'hui
  - button "Scanner GE Optima CT660 Imminent Radiologie · PM-002 Mensuel 3h Dans 2j":
    - paragraph: Scanner GE Optima CT660
    - text: Imminent
    - paragraph: Radiologie · PM-002
    - text: Mensuel 3h Dans 2j
  - button "Respirateur Dräger Evita XL En cours Réanimation · PM-003 Hebdomadaire 1h30 Aujourd'hui":
    - paragraph: Respirateur Dräger Evita XL
    - text: En cours
    - paragraph: Réanimation · PM-003
    - text: Hebdomadaire 1h30 Aujourd'hui
  - button "Automate Sysmex XN-1000 Réalisé Laboratoire · PM-004 Quotidien 45min":
    - paragraph: Automate Sysmex XN-1000
    - text: Réalisé
    - paragraph: Laboratoire · PM-004
    - text: Quotidien 45min
  - button "Défibrillateur Zoll R Series Planifié Urgences · PM-005 Mensuel 1h Dans 17j":
    - paragraph: Défibrillateur Zoll R Series
    - text: Planifié
    - paragraph: Urgences · PM-005
    - text: Mensuel 1h Dans 17j
  - button "Autoclave STERIS Amsco 400 Imminent Stérilisation · PM-006 Mensuel 2h Dans 3j":
    - paragraph: Autoclave STERIS Amsco 400
    - text: Imminent
    - paragraph: Stérilisation · PM-006
    - text: Mensuel 2h Dans 3j
  - button "Moniteur Patient Mindray VS-900 En retard Chirurgie · PM-007 Semestriel 2h 8j retard":
    - paragraph: Moniteur Patient Mindray VS-900
    - text: En retard
    - paragraph: Chirurgie · PM-007
    - text: Semestriel 2h 8j retard
  - button "Pompes à perfusion Alaris GP Planifié Médecine Interne · PM-008 Annuel 3h (lot de 8) Dans 12j":
    - paragraph: Pompes à perfusion Alaris GP
    - text: Planifié
    - paragraph: Médecine Interne · PM-008
    - text: Annuel 3h (lot de 8) Dans 12j
  - heading "IRM Siemens Magnetom Skyra" [level=2]
  - text: Trimestriel En retard
  - paragraph: Radiologie · PM-001
  - text: "Technicien :"
  - strong: Diallo A.
  - text: "Durée estimée :"
  - strong: 4h
  - text: "Contrat :"
  - strong: Externe (constructeur)
  - paragraph: Dernière PM
  - paragraph: 28/03/2025
  - paragraph: Prochaine PM
  - paragraph: 28/06/2025
  - paragraph: Délai
  - paragraph: Aujourd'hui
  - heading "Checklist de maintenance" [level=3]
  - paragraph: 0 / 6 tâches réalisées
  - text: 0%
  - button "Vérification du champ magnétique (Tesla meter)"
  - button "Contrôle bobines de gradient"
  - button "Inspection système de refroidissement hélium"
  - button "Test QA imagerie (fantôme NEMA)"
  - button "Mise à jour firmware Siemens"
  - button "Validation protocoles d'urgence"
```

# Test source

```ts
  304 | test.describe('WF-05 · Tickets', () => {
  305 | 
  306 |   test.beforeEach(async ({ page }) => {
  307 |     await loginAs(page, 'admin');
  308 |     await page.goto(`${BASE}/tickets`);
  309 |     await expect(page.locator('h1').filter({ hasText: /Tickets|Interventions/i })).toBeVisible({ timeout: 8000 });
  310 |   });
  311 | 
  312 |   test('WF-05-01 · Vue Kanban avec 4 colonnes', async ({ page }) => {
  313 |     await expect(page.locator('text=À Faire')).toBeVisible();
  314 |     await expect(page.locator('text=En Cours')).toBeVisible();
  315 |     await expect(page.locator('text=En Attente')).toBeVisible();
  316 |     await expect(page.locator('text=Résolus')).toBeVisible();
  317 |   });
  318 | 
  319 |   test('WF-05-02 · Créer un ticket', async ({ page }) => {
  320 |     await page.click('button:has-text("Nouveau ticket"), button:has-text("Créer")');
  321 |     await expect(page.locator('[role="dialog"], .fixed.inset-0')).toBeVisible({ timeout: 5000 });
  322 | 
  323 |     await page.fill('input[placeholder*="titre"], input[name="title"]', 'Test Ticket E2E Playwright');
  324 |     await page.fill('input[placeholder*="équipement"], input[name="equipment"]', 'Scanner GE');
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
> 404 |     await expect(page.locator('text=Conforme')).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
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
```