# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-12 · IA Copilot >> WF-12-03 · Section Anomalies capteurs visible
- Location: tests\workflows.spec.ts:632:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=IA Copilot')
Expected: visible
Error: strict mode violation: locator('text=IA Copilot') resolved to 3 elements:
    1) <div class="flex items-center gap-3">…</div> aka getByRole('link', { name: 'IA Copilot NEW' })
    2) <span class="font-semibold">IA Copilot</span> aka getByRole('banner').getByText('IA Copilot')
    3) <span class="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">IA Copilot</span> aka getByRole('main').getByText('IA Copilot')

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for locator('text=IA Copilot')

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
      - paragraph [ref=e127]: Système
      - link "Paramètres" [ref=e128] [cursor=pointer]:
        - /url: /settings
        - img [ref=e129]
        - text: Paramètres
    - generic [ref=e132]:
      - generic [ref=e134]:
        - img [ref=e135]
        - generic [ref=e137]: Administrateur
      - generic [ref=e138]:
        - generic [ref=e140]:
          - paragraph [ref=e141]: admin
          - paragraph [ref=e142]: Tech
        - button "Déconnexion" [ref=e143]:
          - img [ref=e144]
  - generic [ref=e147]:
    - banner [ref=e148]:
      - generic [ref=e150]:
        - generic [ref=e151]: GMAO
        - img [ref=e152]
        - generic [ref=e154]: IA Copilot
      - generic [ref=e156]:
        - img [ref=e157]
        - textbox "Rechercher…" [ref=e160]
      - generic [ref=e161]:
        - button "Portail des applications" [ref=e162]:
          - img [ref=e163]
        - button "Clair" [ref=e168]:
          - img [ref=e169]
          - generic [ref=e175]: Clair
        - button "🇫🇷" [ref=e177]:
          - img [ref=e178]
          - generic [ref=e181]: 🇫🇷
        - button "4" [ref=e183]:
          - img [ref=e184]
          - generic [ref=e187]: "4"
    - main [ref=e189]:
      - generic [ref=e191]:
        - generic [ref=e192]:
          - generic [ref=e193]:
            - heading "IA Copilot BETA" [level=1] [ref=e194]:
              - generic [ref=e195]: IA Copilot
              - generic [ref=e196]: BETA
            - paragraph [ref=e197]: Intelligence Artificielle avancée pour la maintenance biomédicale · 5 modules actifs
          - generic [ref=e198]: Modèles IA en ligne
        - generic [ref=e200]:
          - generic [ref=e201]:
            - img [ref=e203]
            - generic [ref=e211]:
              - paragraph [ref=e212]: "Modèle actif : GMAO-BioMed-LSTM v2.3"
              - paragraph [ref=e213]: "Entraîné sur 24 mois · 4 200 interventions · Dernière mise à jour : 28/06/2025"
          - generic [ref=e214]:
            - generic [ref=e215]:
              - paragraph [ref=e216]: 94%
              - paragraph [ref=e217]: Précision Modèle
            - generic [ref=e218]:
              - paragraph [ref=e219]: 89%
              - paragraph [ref=e220]: Rappel (Recall)
            - generic [ref=e221]:
              - paragraph [ref=e222]: 91%
              - paragraph [ref=e223]: F1-Score
        - generic [ref=e224]:
          - generic [ref=e225]:
            - generic [ref=e226]:
              - img [ref=e228]
              - generic [ref=e230]:
                - heading "Assistant IA Conversationnel" [level=2] [ref=e231]
                - paragraph [ref=e232]: Posez des questions en langage naturel sur votre parc biomédical
            - generic [ref=e234]:
              - img [ref=e236]
              - generic [ref=e239]:
                - text: Je suis votre assistant GMAO intelligent. Posez-moi une question sur vos équipements, pannes, stocks ou plannings.
                - paragraph [ref=e240]: 13:01
            - generic [ref=e241]:
              - button "Quel équipement est le plus critique ?" [ref=e242]
              - button "Analyse du budget maintenance" [ref=e243]
              - button "Planning optimisé semaine prochaine" [ref=e244]
              - button "Alerte stock pièces détachées" [ref=e245]
              - button "MTTR actuel des techniciens" [ref=e246]
            - generic [ref=e247]:
              - 'textbox "Ex : Quel équipement risque de tomber en panne cette semaine ?" [ref=e249]'
              - button "Dicter" [ref=e250]:
                - img [ref=e251]
              - button [disabled] [ref=e254]:
                - img [ref=e255]
          - generic [ref=e258]:
            - generic [ref=e259]:
              - img [ref=e261]
              - generic [ref=e263]:
                - heading "Détection d'Anomalies Explicable (XAI)" [level=2] [ref=e264]
                - paragraph [ref=e265]: L'IA explique chaque anomalie détectée avec sa cause probable
            - generic [ref=e266]:
              - generic [ref=e267]:
                - generic [ref=e268]:
                  - generic [ref=e271]: Température
                  - generic [ref=e272]: CRITIQUE
                - generic [ref=e276]: 94%
                - generic [ref=e277]:
                  - img [ref=e278]
                  - paragraph [ref=e280]: "Hausse de +57°C sur 2h. Défaillance suspectée du système de refroidissement principal. Probabilité: 94%."
              - generic [ref=e281]:
                - generic [ref=e282]:
                  - generic [ref=e285]: Vibration Axiale
                  - generic [ref=e286]: ALERTE
                - generic [ref=e290]: 78%
                - generic [ref=e291]:
                  - img [ref=e292]
                  - paragraph [ref=e294]: Vibrations 3x au-dessus de la baseline. Possible déséquilibre du rotor ou jeu de palier.
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - generic [ref=e299]: Courant Moteur
                  - generic [ref=e300]: ALERTE
                - generic [ref=e304]: 62%
                - generic [ref=e305]:
                  - img [ref=e306]
                  - paragraph [ref=e308]: Pic de courant anormal. Indicateur de surcharge mécanique ou de court-circuit partiel.
              - generic [ref=e309]:
                - generic [ref=e310]:
                  - generic [ref=e313]: Pression Huile
                  - generic [ref=e314]: INFO
                - generic [ref=e318]: 45%
                - generic [ref=e319]:
                  - img [ref=e320]
                  - paragraph [ref=e322]: Légère chute de pression. Vérification du niveau de lubrifiant recommandée.
        - generic [ref=e323]:
          - generic [ref=e324]:
            - generic [ref=e325]:
              - img [ref=e327]
              - generic [ref=e329]:
                - heading "Modules d'Intelligence Avancée" [level=2] [ref=e330]
                - paragraph [ref=e331]: Scoring de panne · Optimisation Planning · Analyse de risque
            - generic [ref=e332]:
              - button "Scoring Panne" [ref=e333]
              - button "Planning IA" [ref=e334]
              - button "SHAP / XAI" [ref=e335]
          - generic [ref=e336]:
            - paragraph [ref=e337]: Score de risque de panne calculé par le modèle Random Forest + gradient boosting — 0 (sain) → 100 (panne imminente)
            - generic [ref=e338]:
              - generic [ref=e339]:
                - paragraph [ref=e340]: IRM Siemens Magnetom
                - paragraph [ref=e341]: "Panne estimée : 8 jours"
              - generic [ref=e345]: 87/100
              - generic [ref=e346]: Critique
            - generic [ref=e347]:
              - generic [ref=e348]:
                - paragraph [ref=e349]: Scanner GE Optima
                - paragraph [ref=e350]: "Panne estimée : 18 jours"
              - generic [ref=e354]: 73/100
              - generic [ref=e355]: Élevé
            - generic [ref=e356]:
              - generic [ref=e357]:
                - paragraph [ref=e358]: Respirateur Dräger
                - paragraph [ref=e359]: "Panne estimée : 45 jours"
              - generic [ref=e363]: 41/100
              - generic [ref=e364]: Modéré
            - generic [ref=e365]:
              - generic [ref=e366]:
                - paragraph [ref=e367]: Automate Sysmex XN
                - paragraph [ref=e368]: "Panne estimée : 3 jours"
              - generic [ref=e372]: 92/100
              - generic [ref=e373]: Critique
            - generic [ref=e374]:
              - generic [ref=e375]:
                - paragraph [ref=e376]: Défibrillateur Zoll
                - paragraph [ref=e377]: "Panne estimée : 120 jours"
              - generic [ref=e381]: 18/100
              - generic [ref=e382]: Faible
            - generic [ref=e383]:
              - generic [ref=e384]:
                - paragraph [ref=e385]: Moniteur Mindray
                - paragraph [ref=e386]: "Panne estimée : 95 jours"
              - generic [ref=e390]: 31/100
              - generic [ref=e391]: Faible
        - generic [ref=e392]:
          - generic [ref=e393]:
            - img [ref=e395]
            - generic [ref=e398]:
              - heading "Générateur de Rapports NLP Automatique" [level=2] [ref=e399]
              - paragraph [ref=e400]: L'IA génère des rapports de maintenance en langue naturelle à partir de vos données
          - generic [ref=e401]:
            - generic [ref=e402]:
              - img [ref=e404]
              - generic [ref=e406]:
                - paragraph [ref=e407]: Rapport Mensuel
                - paragraph [ref=e408]: Synthèse MTTR, disponibilité, coûts, alertes
            - generic [ref=e409]:
              - img [ref=e411]
              - generic [ref=e413]:
                - paragraph [ref=e414]: Rapport Directional
                - paragraph [ref=e415]: Résumé exécutif pour la direction (non technique)
            - generic [ref=e416]:
              - img [ref=e418]
              - generic [ref=e421]:
                - paragraph [ref=e422]: Audit de Conformité
                - paragraph [ref=e423]: Rapport ISO 13485 / JCI pour inspecteur externe
          - button "Générer le rapport IA du mois de Juin 2025" [ref=e424]:
            - img [ref=e425]
            - text: Générer le rapport IA du mois de Juin 2025
```

# Test source

```ts
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
> 612 |     await expect(page.locator('text=IA Copilot')).toBeVisible({ timeout: 8000 });
      |                                                   ^ Error: expect(locator).toBeVisible() failed
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
  706 |     await expect(page.locator('text=JCI')).toBeVisible();
  707 |     await expect(page.locator('text=NFPA 99')).toBeVisible();
  708 |   });
  709 | 
  710 |   test('WF-14-02 · Export Rapport PDF', async ({ page }) => {
  711 |     const [download] = await Promise.all([
  712 |       page.waitForEvent('download', { timeout: 10000 }),
```