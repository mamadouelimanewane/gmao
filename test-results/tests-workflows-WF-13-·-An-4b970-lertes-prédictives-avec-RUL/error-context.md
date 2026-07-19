# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-13 · Analytics IoT >> WF-13-04 · Liste alertes prédictives avec RUL
- Location: tests\workflows.spec.ts:688:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=jours, text=RUL').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=jours, text=RUL').first()

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
  - text: GMAO Analytics IoT
  - textbox "Rechercher…"
  - button "Portail des applications"
  - button "Clair"
  - button "🇫🇷"
  - button "4"
- main:
  - heading "Analytics Prédictifs & IoT" [level=1]
  - paragraph: Modèles de Machine Learning pour la prédiction de panne (RUL) et surveillance IoT en continu.
  - button "Simuler Anomalie IoT"
  - heading "Configuration des seuils IoT" [level=2]
  - text: Température max (°C) 45°C
  - slider: "45"
  - text: 40°C 60°C Vibration max (mm/s) 4 mm/s
  - slider: "4"
  - text: 2 mm/s 8 mm/s Tension min (V) 210V
  - slider: "210"
  - text: 190V 220V
  - paragraph: Seuils actifs · Le bouton "Simuler Anomalie" teste les valeurs contre ces seuils et déclenche des notifications si dépassés.
  - heading "Remaining Useful Life (RUL) – Prédictions IA" [level=2]
  - paragraph: Durée de vie utile estimée avant défaillance critique
  - text: Modèles LSTM actifs
  - heading "IRM Siemens Magnetom Skyra" [level=4]
  - paragraph: Dégradation bobine gradient
  - paragraph: RUL Prédit
  - paragraph: 45 jours
  - paragraph: Fiabilité IA
  - text: 92%
  - button
  - heading "Scanner GE Optima CT660" [level=4]
  - paragraph: Usure filament tube RX
  - paragraph: RUL Prédit
  - paragraph: 12 jours
  - paragraph: Fiabilité IA
  - text: 97%
  - button
  - heading "Respirateur Dräger Evita" [level=4]
  - paragraph: Diminution débit d'oxygène
  - paragraph: RUL Prédit
  - paragraph: 180 jours
  - paragraph: Fiabilité IA
  - text: 88%
  - button
  - heading "Automate Sysmex XN" [level=4]
  - paragraph: Instabilité pompe aspiration
  - paragraph: RUL Prédit
  - paragraph: 3 jours
  - paragraph: Fiabilité IA
  - text: 95%
  - button
  - heading "Indice de santé des équipements" [level=2]
  - paragraph: Diagnostic comparatif global
  - application: 0 25 50 75 100 Stabilité Thermique Vibration Mécanique Régulation Tension Cycles d'utilisation Qualité Signal/Résolution
  - text: IRM Siemens Scanner GE
  - heading "Télémétrie Capteurs IoT en Direct" [level=2]
  - paragraph: Graphique d'évolution des paramètres physiques du compresseur
  - text: Température (°C) Vibrations (mm/s)
  - application: 12:00 12:10 12:20 12:30 12:40 12:50 13:00 0 15 30 45 60
```

# Test source

```ts
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
  651 |     if (await likeBtn.isVisible()) await likeBtn.click();
  652 |   });
  653 | });
  654 | 
  655 | // ─────────────────────────────────────────────────────────────────────────────
  656 | // WORKFLOW 13 — Analytics IoT
  657 | // ─────────────────────────────────────────────────────────────────────────────
  658 | test.describe('WF-13 · Analytics IoT', () => {
  659 | 
  660 |   test.beforeEach(async ({ page }) => {
  661 |     await loginAs(page, 'admin');
  662 |     await page.goto(`${BASE}/analytics`);
  663 |     await expect(page.locator('h1').filter({ hasText: /Analytics|IoT/i })).toBeVisible({ timeout: 8000 });
  664 |   });
  665 | 
  666 |   test('WF-13-01 · Télémétrie temps réel affichée', async ({ page }) => {
  667 |     await expect(page.locator('text=Température')).toBeVisible();
  668 |     await expect(page.locator('text=Vibration')).toBeVisible();
  669 |     await expect(page.locator('svg')).toBeVisible();
  670 |   });
  671 | 
  672 |   test('WF-13-02 · Modifier le seuil de température', async ({ page }) => {
  673 |     const tempInput = page.locator('input[type="number"]').first();
  674 |     if (await tempInput.isVisible()) {
  675 |       await tempInput.fill('50');
  676 |       await page.keyboard.press('Tab');
  677 |     }
  678 |   });
  679 | 
  680 |   test('WF-13-03 · Simuler des données IoT', async ({ page }) => {
  681 |     const simBtn = page.locator('button:has-text("Simuler"), button:has-text("Simulation")').first();
  682 |     if (await simBtn.isVisible()) {
  683 |       await simBtn.click();
  684 |       await page.waitForTimeout(500);
  685 |     }
  686 |   });
  687 | 
  688 |   test('WF-13-04 · Liste alertes prédictives avec RUL', async ({ page }) => {
> 689 |     await expect(page.locator('text=jours, text=RUL').first()).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  690 |   });
  691 | });
  692 | 
  693 | // ─────────────────────────────────────────────────────────────────────────────
  694 | // WORKFLOW 14 — Rapports & Exports
  695 | // ─────────────────────────────────────────────────────────────────────────────
  696 | test.describe('WF-14 · Rapports', () => {
  697 | 
  698 |   test.beforeEach(async ({ page }) => {
  699 |     await loginAs(page, 'admin');
  700 |     await page.goto(`${BASE}/rapports`);
  701 |     await expect(page.locator('h1').filter({ hasText: /Rapport|Audit/i })).toBeVisible({ timeout: 8000 });
  702 |   });
  703 | 
  704 |   test('WF-14-01 · Standards de conformité affichés', async ({ page }) => {
  705 |     await expect(page.locator('text=ISO 13485')).toBeVisible();
  706 |     await expect(page.locator('text=JCI')).toBeVisible();
  707 |     await expect(page.locator('text=NFPA 99')).toBeVisible();
  708 |   });
  709 | 
  710 |   test('WF-14-02 · Export Rapport PDF', async ({ page }) => {
  711 |     const [download] = await Promise.all([
  712 |       page.waitForEvent('download', { timeout: 10000 }),
  713 |       page.click('button:has-text("Télécharger Rapport PDF")'),
  714 |     ]);
  715 |     expect(download.suggestedFilename()).toContain('.pdf');
  716 |   });
  717 | 
  718 |   test('WF-14-03 · Export Inventaire Équipements CSV', async ({ page }) => {
  719 |     const [download] = await Promise.all([
  720 |       page.waitForEvent('download', { timeout: 8000 }),
  721 |       page.click('button:has-text("Inventaire Équipements")'),
  722 |     ]);
  723 |     expect(download.suggestedFilename()).toContain('.csv');
  724 |   });
  725 | 
  726 |   test('WF-14-04 · Export Registre JCI CSV', async ({ page }) => {
  727 |     const [download] = await Promise.all([
  728 |       page.waitForEvent('download', { timeout: 8000 }),
  729 |       page.click('button:has-text("Registre de sécurité JCI")'),
  730 |     ]);
  731 |     expect(download.suggestedFilename()).toContain('.csv');
  732 |   });
  733 | 
  734 |   test('WF-14-05 · Export Historique Audit CSV', async ({ page }) => {
  735 |     const [download] = await Promise.all([
  736 |       page.waitForEvent('download', { timeout: 8000 }),
  737 |       page.click('button:has-text("Historique d\'audit")'),
  738 |     ]);
  739 |     expect(download.suggestedFilename()).toContain('.csv');
  740 |   });
  741 | 
  742 |   test('WF-14-06 · Logs d\'audit affichés dans le tableau', async ({ page }) => {
  743 |     await expect(page.locator('text=AUD-901')).toBeVisible();
  744 |     await expect(page.locator('text=Succès')).toBeVisible();
  745 |     await expect(page.locator('text=Échec')).toBeVisible();
  746 |   });
  747 | });
  748 | 
  749 | // ─────────────────────────────────────────────────────────────────────────────
  750 | // WORKFLOW 15 — Plan Interactif Hôpital
  751 | // ─────────────────────────────────────────────────────────────────────────────
  752 | test.describe('WF-15 · Plan Hôpital', () => {
  753 | 
  754 |   test.beforeEach(async ({ page }) => {
  755 |     await loginAs(page, 'admin');
  756 |     await page.goto(`${BASE}/plan`);
  757 |     await expect(page.locator('h1').filter({ hasText: /Plan|Carte/i })).toBeVisible({ timeout: 8000 });
  758 |   });
  759 | 
  760 |   test('WF-15-01 · SVG du plan affiché', async ({ page }) => {
  761 |     await expect(page.locator('svg')).toBeVisible();
  762 |     await expect(page.locator('text=Radiologie')).toBeVisible();
  763 |     await expect(page.locator('text=Urgences')).toBeVisible();
  764 |   });
  765 | 
  766 |   test('WF-15-02 · Légende de couleurs visible', async ({ page }) => {
  767 |     await expect(page.locator('text=Opérationnel')).toBeVisible();
  768 |     await expect(page.locator('text=Panne')).toBeVisible();
  769 |   });
  770 | 
  771 |   test('WF-15-03 · Cliquer sur une salle → détail', async ({ page }) => {
  772 |     const room = page.locator('rect').first();
  773 |     await room.click();
  774 |     // Some panel or info should appear
  775 |     await page.waitForTimeout(500);
  776 |   });
  777 | });
  778 | 
  779 | // ─────────────────────────────────────────────────────────────────────────────
  780 | // WORKFLOW 16 — MedPool
  781 | // ─────────────────────────────────────────────────────────────────────────────
  782 | test.describe('WF-16 · MedPool', () => {
  783 | 
  784 |   test.beforeEach(async ({ page }) => {
  785 |     await loginAs(page, 'admin');
  786 |     await page.goto(`${BASE}/medpool`);
  787 |     await expect(page.locator('h1').filter({ hasText: /MedPool|Réseau/i })).toBeVisible({ timeout: 8000 });
  788 |   });
  789 | 
```