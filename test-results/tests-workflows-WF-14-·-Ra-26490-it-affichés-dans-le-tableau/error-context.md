# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-14 · Rapports >> WF-14-06 · Logs d'audit affichés dans le tableau
- Location: tests\workflows.spec.ts:742:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=AUD-901')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=AUD-901')

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
  - text: GMAO Rapports
  - textbox "Rechercher…"
  - button "Portail des applications"
  - button "Clair"
  - button "🇫🇷"
  - button "4"
- main:
  - heading "Rapports & Audit de Conformité" [level=1]
  - paragraph: Garantissez la traçabilité à 100% de toutes les interventions pour les certifications hospitalières.
  - button "Trimestre Q2 2026"
  - heading "Standards & Certifications suivis" [level=2]
  - link "Score global & statistiques":
    - /url: /statistiques
  - text: ISO 13485 (Dispositifs Médicaux) 95% (Conforme) Joint Commission International (JCI) 88% (Conforme) Loi Sénégalaise Protection Données 100% (Excellence) NFPA 99 (Hôpitaux & Énergies) 75% (Action requise)
  - heading "Centre d'exports" [level=2]
  - paragraph: Téléchargez les rapports périodiques et données d'audit.
  - button "Télécharger Rapport PDF"
  - button "Inventaire Équipements (CSV)"
  - button "Registre de sécurité JCI (CSV)"
  - button "Historique d'audit complet (CSV)"
  - paragraph: Les rapports générés intègrent des signatures électroniques certifiées et des hachages d'intégrité immuables pour conformité d'audit légal.
  - heading "Audit Logs (Chiffrement W3C)" [level=2]
  - table:
    - rowgroup:
      - row "Horodatage Utilisateur Action Détails Statut":
        - columnheader "Horodatage"
        - columnheader "Utilisateur"
        - columnheader "Action"
        - columnheader "Détails"
        - columnheader "Statut"
    - rowgroup:
      - row "28 Juin 2026, 14:32 Jean Diallo (Resp.) Modification équipement Changement statut IRM Siemens -> En Panne Succès":
        - cell "28 Juin 2026, 14:32"
        - cell "Jean Diallo (Resp.)"
        - cell "Modification équipement"
        - cell "Changement statut IRM Siemens -> En Panne"
        - cell "Succès"
      - row "28 Juin 2026, 11:15 Fatou Sow (Tech) Création Ticket TKT-1043 généré pour dysfonctionnement alimentation Succès":
        - cell "28 Juin 2026, 11:15"
        - cell "Fatou Sow (Tech)"
        - cell "Création Ticket"
        - cell "TKT-1043 généré pour dysfonctionnement alimentation"
        - cell "Succès"
      - row "27 Juin 2026, 16:45 Amadou Ndiaye (Tech) Clôture Ticket Fermeture TKT-1040 (Maintenance trimestrielle) Succès":
        - cell "27 Juin 2026, 16:45"
        - cell "Amadou Ndiaye (Tech)"
        - cell "Clôture Ticket"
        - cell "Fermeture TKT-1040 (Maintenance trimestrielle)"
        - cell "Succès"
      - row "26 Juin 2026, 09:12 Système Génération Alerte RUL Prédiction usure filament tube RX à 12 jours Succès":
        - cell "26 Juin 2026, 09:12"
        - cell "Système"
        - cell "Génération Alerte RUL"
        - cell "Prédiction usure filament tube RX à 12 jours"
        - cell "Succès"
      - row "25 Juin 2026, 18:22 Jean Diallo (Resp.) Accès base de données Tentative de connexion depuis IP externe refusée Échec":
        - cell "25 Juin 2026, 18:22"
        - cell "Jean Diallo (Resp.)"
        - cell "Accès base de données"
        - cell "Tentative de connexion depuis IP externe refusée"
        - cell "Échec"
```

# Test source

```ts
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
> 743 |     await expect(page.locator('text=AUD-901')).toBeVisible();
      |                                                ^ Error: expect(locator).toBeVisible() failed
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
```