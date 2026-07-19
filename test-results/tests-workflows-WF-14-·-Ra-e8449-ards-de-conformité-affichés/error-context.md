# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-14 · Rapports >> WF-14-01 · Standards de conformité affichés
- Location: tests\workflows.spec.ts:704:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=JCI')
Expected: visible
Error: strict mode violation: locator('text=JCI') resolved to 2 elements:
    1) <span class="text-slate-300">Joint Commission International (JCI)</span> aka getByText('Joint Commission')
    2) <span class="flex items-center gap-2">…</span> aka getByRole('button', { name: 'Registre de sécurité JCI (CSV)' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=JCI')

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
        - img [ref=e123]
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
        - generic [ref=e156]: Rapports
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
            - heading "Rapports & Audit de Conformité" [level=1] [ref=e196]
            - paragraph [ref=e197]: Garantissez la traçabilité à 100% de toutes les interventions pour les certifications hospitalières.
          - button "Trimestre Q2 2026" [ref=e199]:
            - img [ref=e200]
            - text: Trimestre Q2 2026
        - generic [ref=e202]:
          - generic [ref=e203]:
            - heading "Standards & Certifications suivis" [level=2] [ref=e204]
            - link "Score global & statistiques" [ref=e205] [cursor=pointer]:
              - /url: /statistiques
              - text: Score global & statistiques
              - img [ref=e206]
          - generic [ref=e208]:
            - generic [ref=e210]:
              - generic [ref=e211]: ISO 13485 (Dispositifs Médicaux)
              - generic [ref=e212]: 95% (Conforme)
            - generic [ref=e216]:
              - generic [ref=e217]: Joint Commission International (JCI)
              - generic [ref=e218]: 88% (Conforme)
            - generic [ref=e222]:
              - generic [ref=e223]: Loi Sénégalaise Protection Données
              - generic [ref=e224]: 100% (Excellence)
            - generic [ref=e228]:
              - generic [ref=e229]: NFPA 99 (Hôpitaux & Énergies)
              - generic [ref=e230]: 75% (Action requise)
        - generic [ref=e233]:
          - generic [ref=e234]:
            - generic [ref=e235]:
              - heading "Centre d'exports" [level=2] [ref=e236]
              - paragraph [ref=e237]: Téléchargez les rapports périodiques et données d'audit.
              - generic [ref=e238]:
                - button "Télécharger Rapport PDF" [ref=e239]:
                  - generic [ref=e240]:
                    - img [ref=e241]
                    - text: Télécharger Rapport PDF
                  - img [ref=e244]
                - button "Inventaire Équipements (CSV)" [ref=e247]:
                  - generic [ref=e248]:
                    - img [ref=e249]
                    - text: Inventaire Équipements (CSV)
                  - img [ref=e252]
                - button "Registre de sécurité JCI (CSV)" [ref=e255]:
                  - generic [ref=e256]:
                    - img [ref=e257]
                    - text: Registre de sécurité JCI (CSV)
                  - img [ref=e260]
                - button "Historique d'audit complet (CSV)" [ref=e263]:
                  - generic [ref=e264]:
                    - img [ref=e265]
                    - text: Historique d'audit complet (CSV)
                  - img [ref=e268]
            - generic [ref=e271]:
              - img [ref=e272]
              - paragraph [ref=e275]: Les rapports générés intègrent des signatures électroniques certifiées et des hachages d'intégrité immuables pour conformité d'audit légal.
          - generic [ref=e276]:
            - heading "Audit Logs (Chiffrement W3C)" [level=2] [ref=e277]
            - table [ref=e279]:
              - rowgroup [ref=e280]:
                - row "Horodatage Utilisateur Action Détails Statut" [ref=e281]:
                  - columnheader "Horodatage" [ref=e282]
                  - columnheader "Utilisateur" [ref=e283]
                  - columnheader "Action" [ref=e284]
                  - columnheader "Détails" [ref=e285]
                  - columnheader "Statut" [ref=e286]
              - rowgroup [ref=e287]:
                - row "28 Juin 2026, 14:32 Jean Diallo (Resp.) Modification équipement Changement statut IRM Siemens -> En Panne Succès" [ref=e288]:
                  - cell "28 Juin 2026, 14:32" [ref=e289]
                  - cell "Jean Diallo (Resp.)" [ref=e290]
                  - cell "Modification équipement" [ref=e291]
                  - cell "Changement statut IRM Siemens -> En Panne" [ref=e292]
                  - cell "Succès" [ref=e293]:
                    - generic [ref=e294]: Succès
                - row "28 Juin 2026, 11:15 Fatou Sow (Tech) Création Ticket TKT-1043 généré pour dysfonctionnement alimentation Succès" [ref=e295]:
                  - cell "28 Juin 2026, 11:15" [ref=e296]
                  - cell "Fatou Sow (Tech)" [ref=e297]
                  - cell "Création Ticket" [ref=e298]
                  - cell "TKT-1043 généré pour dysfonctionnement alimentation" [ref=e299]
                  - cell "Succès" [ref=e300]:
                    - generic [ref=e301]: Succès
                - row "27 Juin 2026, 16:45 Amadou Ndiaye (Tech) Clôture Ticket Fermeture TKT-1040 (Maintenance trimestrielle) Succès" [ref=e302]:
                  - cell "27 Juin 2026, 16:45" [ref=e303]
                  - cell "Amadou Ndiaye (Tech)" [ref=e304]
                  - cell "Clôture Ticket" [ref=e305]
                  - cell "Fermeture TKT-1040 (Maintenance trimestrielle)" [ref=e306]
                  - cell "Succès" [ref=e307]:
                    - generic [ref=e308]: Succès
                - row "26 Juin 2026, 09:12 Système Génération Alerte RUL Prédiction usure filament tube RX à 12 jours Succès" [ref=e309]:
                  - cell "26 Juin 2026, 09:12" [ref=e310]
                  - cell "Système" [ref=e311]
                  - cell "Génération Alerte RUL" [ref=e312]
                  - cell "Prédiction usure filament tube RX à 12 jours" [ref=e313]
                  - cell "Succès" [ref=e314]:
                    - generic [ref=e315]: Succès
                - row "25 Juin 2026, 18:22 Jean Diallo (Resp.) Accès base de données Tentative de connexion depuis IP externe refusée Échec" [ref=e316]:
                  - cell "25 Juin 2026, 18:22" [ref=e317]
                  - cell "Jean Diallo (Resp.)" [ref=e318]
                  - cell "Accès base de données" [ref=e319]
                  - cell "Tentative de connexion depuis IP externe refusée" [ref=e320]
                  - cell "Échec" [ref=e321]:
                    - generic [ref=e322]: Échec
```

# Test source

```ts
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
> 706 |     await expect(page.locator('text=JCI')).toBeVisible();
      |                                            ^ Error: expect(locator).toBeVisible() failed
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
```