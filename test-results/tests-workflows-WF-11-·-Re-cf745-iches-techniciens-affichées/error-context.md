# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-11 · Ressources Humaines >> WF-11-01 · Fiches techniciens affichées
- Location: tests\workflows.spec.ts:580:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Abdoulaye Diallo')
Expected: visible
Error: strict mode violation: locator('text=Abdoulaye Diallo') resolved to 2 elements:
    1) <p class="text-sm font-semibold text-white truncate">Abdoulaye Diallo</p> aka getByRole('button', { name: 'AD Abdoulaye Diallo Ingénieur' })
    2) <h2 class="text-xl font-bold text-white">Abdoulaye Diallo</h2> aka getByRole('heading', { name: 'Abdoulaye Diallo' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Abdoulaye Diallo')

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
        - img [ref=e103]
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
        - generic [ref=e156]: Ressources Humaines
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
            - heading "Ressources HumainesBiomédical" [level=1] [ref=e196]
            - paragraph [ref=e197]: Gestion des ingénieurs et techniciens · Planning · Compétences · Performance
          - generic [ref=e198]:
            - button "Équipe" [ref=e199]
            - button "Planning semaine" [ref=e200]
            - button "📊 Gantt" [ref=e201]
            - button [ref=e202]:
              - img [ref=e203]
            - button [ref=e204]:
              - img [ref=e205]
        - link "Voir les indicateurs équipe Effectif, disponibilité, MTTR, certifications — page Statistiques" [ref=e208] [cursor=pointer]:
          - /url: /statistiques
          - generic [ref=e209]:
            - img [ref=e211]
            - generic [ref=e216]:
              - paragraph [ref=e217]: Voir les indicateurs équipe
              - paragraph [ref=e218]: Effectif, disponibilité, MTTR, certifications — page Statistiques
          - img [ref=e219]
        - generic [ref=e221]:
          - generic [ref=e222]:
            - heading "Membres de l'équipe (5)" [level=2] [ref=e223]
            - button "AD Abdoulaye Diallo Ingénieur Biomédical · Senior 98% Résolution Charge de travail 87%" [ref=e224]:
              - generic [ref=e225]:
                - generic [ref=e226]: AD
                - generic [ref=e227]:
                  - paragraph [ref=e229]: Abdoulaye Diallo
                  - paragraph [ref=e230]: Ingénieur Biomédical · Senior
                - generic [ref=e231]:
                  - paragraph [ref=e232]: 98%
                  - paragraph [ref=e233]: Résolution
              - generic [ref=e235]:
                - generic [ref=e236]: Charge de travail
                - generic [ref=e237]: 87%
            - button "FN Fatou Ndiaye Technicienne Biomédicale · Confirmée 91% Résolution Charge de travail 72%" [ref=e240]:
              - generic [ref=e241]:
                - generic [ref=e242]: FN
                - generic [ref=e243]:
                  - paragraph [ref=e245]: Fatou Ndiaye
                  - paragraph [ref=e246]: Technicienne Biomédicale · Confirmée
                - generic [ref=e247]:
                  - paragraph [ref=e248]: 91%
                  - paragraph [ref=e249]: Résolution
              - generic [ref=e251]:
                - generic [ref=e252]: Charge de travail
                - generic [ref=e253]: 72%
            - button "MS Mamadou Sow CONGÉ Technicien Biomédical · Junior 95% Résolution" [ref=e256]:
              - generic [ref=e257]:
                - generic [ref=e258]: MS
                - generic [ref=e259]:
                  - generic [ref=e260]:
                    - paragraph [ref=e261]: Mamadou Sow
                    - generic [ref=e262]: CONGÉ
                  - paragraph [ref=e263]: Technicien Biomédical · Junior
                - generic [ref=e264]:
                  - paragraph [ref=e265]: 95%
                  - paragraph [ref=e266]: Résolution
            - button "KB Khadija Ba Technicienne Biomédicale · Confirmée 88% Résolution Charge de travail 65%" [ref=e267]:
              - generic [ref=e268]:
                - generic [ref=e269]: KB
                - generic [ref=e270]:
                  - paragraph [ref=e272]: Khadija Ba
                  - paragraph [ref=e273]: Technicienne Biomédicale · Confirmée
                - generic [ref=e274]:
                  - paragraph [ref=e275]: 88%
                  - paragraph [ref=e276]: Résolution
              - generic [ref=e278]:
                - generic [ref=e279]: Charge de travail
                - generic [ref=e280]: 65%
            - button "IF Ibrahima Faye Ingénieur Systèmes Médicaux · Expert 99% Résolution Charge de travail 55%" [ref=e283]:
              - generic [ref=e284]:
                - generic [ref=e285]: IF
                - generic [ref=e286]:
                  - paragraph [ref=e288]: Ibrahima Faye
                  - paragraph [ref=e289]: Ingénieur Systèmes Médicaux · Expert
                - generic [ref=e290]:
                  - paragraph [ref=e291]: 99%
                  - paragraph [ref=e292]: Résolution
              - generic [ref=e294]:
                - generic [ref=e295]: Charge de travail
                - generic [ref=e296]: 55%
          - generic [ref=e299]:
            - generic [ref=e300]:
              - generic [ref=e301]:
                - generic [ref=e302]: AD
                - generic [ref=e303]:
                  - generic [ref=e304]:
                    - heading "Abdoulaye Diallo" [level=2] [ref=e305]
                    - generic [ref=e306]: Disponible
                    - generic [ref=e307]: Senior
                  - paragraph [ref=e308]: Ingénieur Biomédical — Maintenance Biomédicale
                  - generic [ref=e309]:
                    - generic [ref=e310]:
                      - img [ref=e311]
                      - text: +221 77 123 45 67
                    - generic [ref=e313]:
                      - img [ref=e314]
                      - text: a.diallo@hopital.sn
                    - generic [ref=e317]:
                      - img [ref=e318]
                      - text: TEC-001
                - generic [ref=e320]:
                  - generic [ref=e321]:
                    - img [ref=e322]
                    - img [ref=e324]
                    - img [ref=e326]
                    - img [ref=e328]
                    - img [ref=e330]
                  - paragraph [ref=e332]: 4.8/5
                  - paragraph [ref=e333]: Satisfaction patient
              - generic [ref=e334]:
                - generic [ref=e335]:
                  - img [ref=e336]
                  - paragraph [ref=e339]: 2.1h
                  - paragraph [ref=e340]: MTTR
                - generic [ref=e341]:
                  - img [ref=e342]
                  - paragraph [ref=e345]: 98%
                  - paragraph [ref=e346]: Résolution
                - generic [ref=e347]:
                  - img [ref=e348]
                  - paragraph [ref=e350]: "142"
                  - paragraph [ref=e351]: Interventions
                - generic [ref=e352]:
                  - img [ref=e353]
                  - paragraph [ref=e355]: 87%
                  - paragraph [ref=e356]: Charge
            - generic [ref=e357]:
              - button "📅 Planning semaine" [ref=e358]
              - button "📊 Compétences" [ref=e359]
              - button "🏅 Certifications" [ref=e360]
            - generic [ref=e361]:
              - heading "Planning de la semaine — Abdoulaye" [level=3] [ref=e362]
              - generic [ref=e363]:
                - generic [ref=e364]:
                  - paragraph [ref=e366]: Lun
                  - generic [ref=e367]:
                    - paragraph [ref=e368]: IRM Siemens — Maintenance préventive
                    - paragraph [ref=e369]: Radiologie
                  - generic [ref=e370]: Préventif
                - generic [ref=e371]:
                  - paragraph [ref=e373]: Mar
                  - generic [ref=e374]:
                    - paragraph [ref=e375]: Scanner GE — Remplacement filament
                    - paragraph [ref=e376]: Radiologie
                  - generic [ref=e377]: Curatif
                - generic [ref=e378]:
                  - paragraph [ref=e380]: Mer
                  - generic [ref=e381]:
                    - paragraph [ref=e382]: Formation ISO 13485 interne
                    - paragraph [ref=e383]: Toute équipe
                  - generic [ref=e384]: Formation
                - generic [ref=e385]:
                  - paragraph [ref=e387]: Jeu
                  - generic [ref=e388]:
                    - paragraph [ref=e389]: Étalonnage moniteurs Réanimation
                    - paragraph [ref=e390]: Réanimation
                  - generic [ref=e391]: Étalonnage
                - generic [ref=e392]:
                  - paragraph [ref=e394]: Ven
                  - generic [ref=e395]:
                    - paragraph [ref=e396]: Rapport mensuel + audit RUL
                    - paragraph [ref=e397]: Bureau
                  - generic [ref=e398]: Administratif
```

# Test source

```ts
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
> 581 |     await expect(page.locator('text=Abdoulaye Diallo')).toBeVisible();
      |                                                         ^ Error: expect(locator).toBeVisible() failed
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
```