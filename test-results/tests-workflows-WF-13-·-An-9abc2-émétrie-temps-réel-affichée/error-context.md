# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-13 · Analytics IoT >> WF-13-01 · Télémétrie temps réel affichée
- Location: tests\workflows.spec.ts:666:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Température')
Expected: visible
Error: strict mode violation: locator('text=Température') resolved to 2 elements:
    1) <span class="text-slate-400 font-medium">Température max (°C)</span> aka getByText('Température max (°C)')
    2) <span class="text-slate-400">Température (°C)</span> aka getByText('Température (°C)')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Température')

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
          - img [ref=e114]
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
          - generic [ref=e156]: Analytics IoT
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
              - heading "Analytics Prédictifs & IoT" [level=1] [ref=e196]
              - paragraph [ref=e197]: Modèles de Machine Learning pour la prédiction de panne (RUL) et surveillance IoT en continu.
            - button "Simuler Anomalie IoT" [ref=e198]:
              - img [ref=e199]
              - text: Simuler Anomalie IoT
          - generic [ref=e201]:
            - generic [ref=e202]:
              - img [ref=e203]
              - heading "Configuration des seuils IoT" [level=2] [ref=e206]
            - generic [ref=e207]:
              - generic [ref=e208]:
                - generic [ref=e209]:
                  - generic [ref=e210]: Température max (°C)
                  - generic [ref=e211]: 45°C
                - slider [ref=e212]: "45"
                - generic [ref=e213]:
                  - generic [ref=e214]: 40°C
                  - generic [ref=e215]: 60°C
              - generic [ref=e216]:
                - generic [ref=e217]:
                  - generic [ref=e218]: Vibration max (mm/s)
                  - generic [ref=e219]: 4 mm/s
                - slider [ref=e220]: "4"
                - generic [ref=e221]:
                  - generic [ref=e222]: 2 mm/s
                  - generic [ref=e223]: 8 mm/s
              - generic [ref=e224]:
                - generic [ref=e225]:
                  - generic [ref=e226]: Tension min (V)
                  - generic [ref=e227]: 210V
                - slider [ref=e228]: "210"
                - generic [ref=e229]:
                  - generic [ref=e230]: 190V
                  - generic [ref=e231]: 220V
            - paragraph [ref=e232]: Seuils actifs · Le bouton "Simuler Anomalie" teste les valeurs contre ces seuils et déclenche des notifications si dépassés.
          - generic [ref=e233]:
            - generic [ref=e234]:
              - generic [ref=e235]:
                - generic [ref=e236]:
                  - heading "Remaining Useful Life (RUL) – Prédictions IA" [level=2] [ref=e237]
                  - paragraph [ref=e238]: Durée de vie utile estimée avant défaillance critique
                - generic [ref=e239]: Modèles LSTM actifs
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - generic [ref=e242]:
                    - img [ref=e244]
                    - generic [ref=e247]:
                      - heading "IRM Siemens Magnetom Skyra" [level=4] [ref=e248]
                      - paragraph [ref=e249]: Dégradation bobine gradient
                  - generic [ref=e250]:
                    - generic [ref=e251]:
                      - paragraph [ref=e252]: RUL Prédit
                      - paragraph [ref=e253]: 45 jours
                    - generic [ref=e254]:
                      - paragraph [ref=e255]: Fiabilité IA
                      - generic [ref=e259]: 92%
                    - button [ref=e260]:
                      - img [ref=e261]
                - generic [ref=e263]:
                  - generic [ref=e264]:
                    - img [ref=e266]
                    - generic [ref=e269]:
                      - heading "Scanner GE Optima CT660" [level=4] [ref=e270]
                      - paragraph [ref=e271]: Usure filament tube RX
                  - generic [ref=e272]:
                    - generic [ref=e273]:
                      - paragraph [ref=e274]: RUL Prédit
                      - paragraph [ref=e275]: 12 jours
                    - generic [ref=e276]:
                      - paragraph [ref=e277]: Fiabilité IA
                      - generic [ref=e281]: 97%
                    - button [ref=e282]:
                      - img [ref=e283]
                - generic [ref=e285]:
                  - generic [ref=e286]:
                    - img [ref=e288]
                    - generic [ref=e291]:
                      - heading "Respirateur Dräger Evita" [level=4] [ref=e292]
                      - paragraph [ref=e293]: Diminution débit d'oxygène
                  - generic [ref=e294]:
                    - generic [ref=e295]:
                      - paragraph [ref=e296]: RUL Prédit
                      - paragraph [ref=e297]: 180 jours
                    - generic [ref=e298]:
                      - paragraph [ref=e299]: Fiabilité IA
                      - generic [ref=e303]: 88%
                    - button [ref=e304]:
                      - img [ref=e305]
                - generic [ref=e307]:
                  - generic [ref=e308]:
                    - img [ref=e310]
                    - generic [ref=e313]:
                      - heading "Automate Sysmex XN" [level=4] [ref=e314]
                      - paragraph [ref=e315]: Instabilité pompe aspiration
                  - generic [ref=e316]:
                    - generic [ref=e317]:
                      - paragraph [ref=e318]: RUL Prédit
                      - paragraph [ref=e319]: 3 jours
                    - generic [ref=e320]:
                      - paragraph [ref=e321]: Fiabilité IA
                      - generic [ref=e325]: 95%
                    - button [ref=e326]:
                      - img [ref=e327]
            - generic [ref=e329]:
              - generic [ref=e330]:
                - heading "Indice de santé des équipements" [level=2] [ref=e331]
                - paragraph [ref=e332]: Diagnostic comparatif global
              - application [ref=e336]:
                - generic [ref=e356]:
                  - generic [ref=e359]:
                    - generic [ref=e361]: Stabilité Thermique
                    - generic [ref=e364]: Vibration Mécanique
                    - generic [ref=e367]: Régulation Tension
                    - generic [ref=e370]: Cycles d'utilisation
                    - generic [ref=e373]: Qualité Signal/Résolution
                  - generic [ref=e375]:
                    - generic [ref=e377]: "0"
                    - generic [ref=e379]: "25"
                    - generic [ref=e381]: "50"
                    - generic [ref=e383]: "75"
                    - generic [ref=e385]: "100"
              - generic [ref=e386]:
                - generic [ref=e389]: IRM Siemens
                - generic [ref=e392]: Scanner GE
          - generic [ref=e393]:
            - generic [ref=e394]:
              - generic [ref=e395]:
                - heading "Télémétrie Capteurs IoT en Direct" [level=2] [ref=e396]
                - paragraph [ref=e397]: Graphique d'évolution des paramètres physiques du compresseur
              - generic [ref=e398]:
                - generic [ref=e401]: Température (°C)
                - generic [ref=e404]: Vibrations (mm/s)
            - application [ref=e407]:
              - generic [ref=e435]:
                - generic [ref=e436]:
                  - generic [ref=e438]: 12:00
                  - generic [ref=e440]: 12:10
                  - generic [ref=e442]: 12:20
                  - generic [ref=e444]: 12:30
                  - generic [ref=e446]: 12:40
                  - generic [ref=e448]: 12:50
                  - generic [ref=e450]: 13:00
                - generic [ref=e451]:
                  - generic [ref=e453]: "0"
                  - generic [ref=e455]: "15"
                  - generic [ref=e457]: "30"
                  - generic [ref=e459]: "45"
                  - generic [ref=e461]: "60"
  - generic [ref=e462]: "0"
```

# Test source

```ts
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
> 667 |     await expect(page.locator('text=Température')).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
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
  689 |     await expect(page.locator('text=jours, text=RUL').first()).toBeVisible();
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
```