# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-15 · Plan Hôpital >> WF-15-01 · SVG du plan affiché
- Location: tests\workflows.spec.ts:760:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('svg')
Expected: visible
Error: strict mode violation: locator('svg') resolved to 32 elements:
    1) <svg width="22" height="22" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-stethoscope text-emerald-500">…</svg> aka getByRole('link', { name: 'GMAO Health v3.0 · Ndamatou' })
    2) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg">…</svg> aka locator('svg').nth(1)
    3) <svg width="13" height="13" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi" xmlns="http://www.w3.org/2000/svg">…</svg> aka locator('svg').nth(2)
    4) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-layout-grid flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'Portail' })
    5) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-stethoscope flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'Équipements' })
    6) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-wrench flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'Interventions' })
    7) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-clipboard-list flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'Workflow Réparation' })
    8) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-calendar-clock flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'PM Planifiées' })
    9) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-network flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'MedPool (Réseau)' })
    10) <svg width="18" height="18" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-leaf flex-shrink-0 transition-colors">…</svg> aka getByRole('link', { name: 'Énergie & ESG' })
    ...

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('svg')

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
        - img [ref=e127]
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
        - generic [ref=e156]: Plan Hôpital
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
            - heading "Plan Hôpital Interactif" [level=1] [ref=e196]
            - paragraph [ref=e197]: Vue cartographique du CHU · Statut en temps réel des équipements par salle
          - generic [ref=e198]:
            - generic [ref=e199]: Opérationnel
            - generic [ref=e201]: Panne détectée
            - generic [ref=e203]: En maintenance
        - img [ref=e206]:
          - generic [ref=e209] [cursor=pointer]:
            - generic [ref=e211]: Radiologie
            - generic [ref=e212]: 1 équipement
          - generic [ref=e214] [cursor=pointer]:
            - generic [ref=e216]: Urgences
            - generic [ref=e217]: 2 équipements
          - generic [ref=e219] [cursor=pointer]:
            - generic [ref=e221]: Réanimation
            - generic [ref=e222]: 1 équipement
          - generic [ref=e224] [cursor=pointer]:
            - generic [ref=e226]: Bloc Op. 1
            - generic [ref=e227]: 1 équipement
          - generic [ref=e229] [cursor=pointer]:
            - generic [ref=e231]: Bloc Op. 2
            - generic [ref=e232]: Aucun équipement
          - generic [ref=e233] [cursor=pointer]:
            - generic [ref=e235]: Bloc Op. 3
            - generic [ref=e236]: 1 équipement
          - generic [ref=e238] [cursor=pointer]:
            - generic [ref=e240]: Maternité
            - generic [ref=e241]: 1 équipement
          - generic [ref=e243] [cursor=pointer]:
            - generic [ref=e245]: Laboratoire
            - generic [ref=e246]: 1 équipement
          - generic [ref=e248] [cursor=pointer]:
            - generic [ref=e250]: Pharmacie
            - generic [ref=e251]: Aucun équipement
          - generic [ref=e252] [cursor=pointer]:
            - generic [ref=e254]: Direction
            - generic [ref=e255]: Aucun équipement
          - generic [ref=e256] [cursor=pointer]:
            - generic [ref=e258]: Stérilisation
            - generic [ref=e259]: Aucun équipement
          - generic [ref=e260] [cursor=pointer]:
            - generic [ref=e262]: Consultations
            - generic [ref=e263]: Aucun équipement
          - generic [ref=e264] [cursor=pointer]:
            - generic [ref=e266]: Imagerie Générale
            - generic [ref=e267]: Aucun équipement
          - generic:
            - generic:
              - paragraph: Réanimation
              - paragraph: • Moniteur Philips IntelliVue
        - generic [ref=e268]:
          - heading "Tous les équipements par salle" [level=2] [ref=e269]
          - generic [ref=e270]:
            - generic [ref=e271] [cursor=pointer]:
              - generic [ref=e272]:
                - paragraph [ref=e274]: Radiologie
                - generic [ref=e275]: 1 éq.
              - paragraph [ref=e276]: IRM Siemens Magnetom Skyra
            - generic [ref=e277] [cursor=pointer]:
              - generic [ref=e278]:
                - paragraph [ref=e280]: Urgences
                - generic [ref=e281]: 2 éq.
              - paragraph [ref=e282]: Scanner GE Optima CT660
              - paragraph [ref=e283]: Défibrillateur Zoll R Series
            - generic [ref=e284] [cursor=pointer]:
              - generic [ref=e285]:
                - paragraph [ref=e287]: Réanimation
                - generic [ref=e288]: 1 éq.
              - paragraph [ref=e289]: Moniteur Philips IntelliVue MX800
            - generic [ref=e290] [cursor=pointer]:
              - generic [ref=e291]:
                - paragraph [ref=e293]: Bloc Op. 1
                - generic [ref=e294]: 1 éq.
              - paragraph [ref=e295]: Respirateur Dräger Evita Infinity
            - generic [ref=e296] [cursor=pointer]:
              - generic [ref=e297]:
                - paragraph [ref=e299]: Bloc Op. 3
                - generic [ref=e300]: 1 éq.
              - paragraph [ref=e301]: Table de chirurgie Maquet Alphastar
            - generic [ref=e302] [cursor=pointer]:
              - generic [ref=e303]:
                - paragraph [ref=e305]: Maternité
                - generic [ref=e306]: 1 éq.
              - paragraph [ref=e307]: Échographe Sonosite Edge II
            - generic [ref=e308] [cursor=pointer]:
              - generic [ref=e309]:
                - paragraph [ref=e311]: Laboratoire
                - generic [ref=e312]: 1 éq.
              - paragraph [ref=e313]: Automate d'hématologie Sysmex XN
```

# Test source

```ts
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
> 761 |     await expect(page.locator('svg')).toBeVisible();
      |                                       ^ Error: expect(locator).toBeVisible() failed
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
  790 |   test('WF-16-01 · Marketplace de pièces affichée', async ({ page }) => {
  791 |     await expect(page.locator('text=Filtre HEPA')).toBeVisible();
  792 |     await expect(page.locator('text=Trust Score, text=km').first()).toBeVisible();
  793 |   });
  794 | 
  795 |   test('WF-16-02 · Recherche dans MedPool', async ({ page }) => {
  796 |     await page.fill('input[placeholder*="Rechercher"]', 'HEPA');
  797 |     await expect(page.locator('text=Filtre HEPA H14')).toBeVisible();
  798 |   });
  799 | 
  800 |   test('WF-16-03 · Demander une pièce → notification', async ({ page }) => {
  801 |     const requestBtn = page.locator('button:has-text("Demander"), button:has-text("Réserver")').first();
  802 |     if (await requestBtn.isVisible()) {
  803 |       await requestBtn.click();
  804 |       // Notification should appear
  805 |       await page.waitForTimeout(500);
  806 |     }
  807 |   });
  808 | });
  809 | 
  810 | // ─────────────────────────────────────────────────────────────────────────────
  811 | // WORKFLOW 17 — EcoMed (Énergie)
  812 | // ─────────────────────────────────────────────────────────────────────────────
  813 | test.describe('WF-17 · EcoMed', () => {
  814 | 
  815 |   test.beforeEach(async ({ page }) => {
  816 |     await loginAs(page, 'admin');
  817 |     await page.goto(`${BASE}/energie`);
  818 |     await expect(page.locator('h1').filter({ hasText: /Éco|Énergie|EcoMed/i })).toBeVisible({ timeout: 8000 });
  819 |   });
  820 | 
  821 |   test('WF-17-01 · Graphique consommation 24h affiché', async ({ page }) => {
  822 |     await expect(page.locator('svg')).toBeVisible();
  823 |     await expect(page.locator('text=kWh, text=Consommation').first()).toBeVisible();
  824 |   });
  825 | 
  826 |   test('WF-17-02 · Algorithme Peak Shaving → modal détail', async ({ page }) => {
  827 |     await page.click('text=Peak Shaving');
  828 |     await expect(page.locator('.fixed.inset-0')).toBeVisible({ timeout: 3000 });
  829 |     await page.keyboard.press('Escape');
  830 |   });
  831 | 
  832 |   test('WF-17-03 · Tableau éclairage par zone', async ({ page }) => {
  833 |     await expect(page.locator('text=Couloirs')).toBeVisible();
  834 |     await expect(page.locator('text=Optimisé')).toBeVisible();
  835 |   });
  836 | 
  837 |   test('WF-17-04 · Export rapport énergie PDF', async ({ page }) => {
  838 |     const exportBtn = page.locator('button:has-text("PDF"), button:has-text("Export"), button:has-text("Rapport")').first();
  839 |     if (await exportBtn.isVisible()) {
  840 |       const [download] = await Promise.all([
  841 |         page.waitForEvent('download', { timeout: 8000 }),
  842 |         exportBtn.click(),
  843 |       ]).catch(() => [null]);
  844 |       if (download) expect(download.suggestedFilename()).toContain('.pdf');
  845 |     }
  846 |   });
  847 | });
  848 | 
  849 | // ─────────────────────────────────────────────────────────────────────────────
  850 | // WORKFLOW 18 — Paramètres
  851 | // ─────────────────────────────────────────────────────────────────────────────
  852 | test.describe('WF-18 · Paramètres', () => {
  853 | 
  854 |   test.beforeEach(async ({ page }) => {
  855 |     await loginAs(page, 'admin');
  856 |     await page.goto(`${BASE}/settings`);
  857 |     await expect(page.locator('h1').filter({ hasText: /Param/i })).toBeVisible({ timeout: 8000 });
  858 |   });
  859 | 
  860 |   test('WF-18-01 · Profil utilisateur visible', async ({ page }) => {
  861 |     await expect(page.locator('text=Admin GMAO')).toBeVisible();
```