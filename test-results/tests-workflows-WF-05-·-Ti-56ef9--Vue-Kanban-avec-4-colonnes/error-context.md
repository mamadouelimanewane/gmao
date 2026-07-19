# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-05 · Tickets >> WF-05-01 · Vue Kanban avec 4 colonnes
- Location: tests\workflows.spec.ts:312:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=En Cours')
Expected: visible
Error: strict mode violation: locator('text=En Cours') resolved to 2 elements:
    1) <h3 class="font-semibold text-sm text-slate-200">En Cours</h3> aka getByRole('heading', { name: 'En Cours' })
    2) <span class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">…</span> aka getByText('Réparation en cours')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=En Cours')

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
        - img [ref=e44]
      - link "PM Planifiées 2" [ref=e46] [cursor=pointer]:
        - /url: /pm
        - generic [ref=e47]:
          - img [ref=e48]
          - text: PM Planifiées
        - generic [ref=e52]: "2"
      - link "MedPool (Réseau)" [ref=e53] [cursor=pointer]:
        - /url: /medpool
        - generic [ref=e54]:
          - img [ref=e55]
          - text: MedPool (Réseau)
      - link "Énergie & ESG" [ref=e60] [cursor=pointer]:
        - /url: /energie
        - generic [ref=e61]:
          - img [ref=e62]
          - text: Énergie & ESG
      - link "Stocks & Achats" [ref=e65] [cursor=pointer]:
        - /url: /stocks
        - generic [ref=e66]:
          - img [ref=e67]
          - text: Stocks & Achats
      - link "Workflow Achat" [ref=e71] [cursor=pointer]:
        - /url: /achats
        - generic [ref=e72]:
          - img [ref=e73]
          - text: Workflow Achat
      - link "Fournisseurs" [ref=e77] [cursor=pointer]:
        - /url: /fournisseurs
        - generic [ref=e78]:
          - img [ref=e79]
          - text: Fournisseurs
      - link "Coûts & TCO" [ref=e84] [cursor=pointer]:
        - /url: /finances
        - generic [ref=e85]:
          - img [ref=e86]
          - text: Coûts & TCO
      - link "Ressources Humaines" [ref=e91] [cursor=pointer]:
        - /url: /rh
        - generic [ref=e92]:
          - img [ref=e93]
          - text: Ressources Humaines
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
        - generic [ref=e156]: Interventions
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
            - heading "Interventions" [level=1] [ref=e196]
            - paragraph [ref=e197]: Gérez les demandes de dépannage, interventions préventives et curatives. Cliquez sur un ticket pour ouvrir le workflow de réparation.
          - button "Créer un Ticket" [ref=e198]:
            - img [ref=e199]
            - text: Créer un Ticket
        - generic [ref=e200]:
          - generic [ref=e201]:
            - img [ref=e202]
            - textbox "Rechercher par sujet, équipement, ID..." [ref=e205]
          - generic [ref=e206]:
            - img [ref=e207]
            - generic [ref=e209]: "Priorité:"
            - button "Tous" [ref=e210]
            - button "Critique" [ref=e211]
            - button "Haute" [ref=e212]
            - button "Moyenne" [ref=e213]
            - button "Basse" [ref=e214]
        - generic [ref=e215]:
          - generic [ref=e216]:
            - generic [ref=e217]:
              - heading "À Faire (Ouverts)" [level=3] [ref=e218]
              - generic [ref=e219]: "2"
            - generic [ref=e220]:
              - generic [ref=e221] [cursor=pointer]:
                - generic [ref=e223]:
                  - generic [ref=e224]: TKT-1042
                  - generic [ref=e225]: Critique
                - generic [ref=e227]:
                  - img [ref=e228]
                  - text: Signalement · Externe
                - heading "Erreur de calibration & instabilité de champ" [level=4] [ref=e231]
                - paragraph [ref=e232]: IRM Siemens Magnetom Skyra
                - generic [ref=e233]:
                  - paragraph [ref=e234]: "Loc: Radiologie – Salle 2"
                  - paragraph [ref=e235]:
                    - text: "SLA:"
                    - generic [ref=e236]:
                      - img [ref=e237]
                      - text: 1h 15m restants
                - generic [ref=e239]:
                  - generic [ref=e240]:
                    - img [ref=e241]
                    - generic [ref=e244]: 28 Juin, 09:30
                  - generic [ref=e246]: D
              - generic [ref=e247] [cursor=pointer]:
                - generic [ref=e249]:
                  - generic [ref=e250]: TKT-1043
                  - generic [ref=e251]: Haute
                - generic [ref=e253]:
                  - img [ref=e254]
                  - text: Diagnostic
                - heading "Dysfonctionnement de l'alimentation électrique" [level=4] [ref=e257]
                - paragraph [ref=e258]: Automate Sysmex XN
                - generic [ref=e259]:
                  - paragraph [ref=e260]: "Loc: Laboratoire Central"
                  - paragraph [ref=e261]:
                    - text: "SLA:"
                    - generic [ref=e262]:
                      - img [ref=e263]
                      - text: 2h 45m restants
                - generic [ref=e265]:
                  - generic [ref=e266]:
                    - img [ref=e267]
                    - generic [ref=e270]: 28 Juin, 11:00
                  - generic [ref=e272]: T
          - generic [ref=e273]:
            - generic [ref=e274]:
              - heading "En Cours" [level=3] [ref=e275]
              - generic [ref=e276]: "1"
            - generic [ref=e278] [cursor=pointer]:
              - generic [ref=e280]:
                - generic [ref=e281]: TKT-1041
                - generic [ref=e282]: Haute
              - generic [ref=e284]:
                - img [ref=e285]
                - text: Réparation en cours
              - heading "Bruit anormal et surchauffe du compresseur" [level=4] [ref=e288]
              - paragraph [ref=e289]: Scanner GE Optima CT660
              - generic [ref=e290]:
                - paragraph [ref=e291]: "Loc: Urgences"
                - paragraph [ref=e292]:
                  - text: "SLA:"
                  - generic [ref=e293]: 4h 30m restants
              - button "Clôturer & Signer" [ref=e294]:
                - img [ref=e295]
                - text: Clôturer & Signer
              - generic [ref=e297]:
                - generic [ref=e298]:
                  - img [ref=e299]
                  - generic [ref=e302]: 27 Juin, 14:15
                - generic [ref=e304]: T
          - generic [ref=e305]:
            - generic [ref=e306]:
              - heading "En Attente (Pièces)" [level=3] [ref=e307]
              - generic [ref=e308]: "1"
            - generic [ref=e310] [cursor=pointer]:
              - generic [ref=e312]:
                - generic [ref=e313]: TKT-1039
                - generic [ref=e314]: Moyenne
              - generic [ref=e316]:
                - img [ref=e317]
                - text: Devis / Pièces · Externe
              - heading "Remplacement de la sonde cardiaque défectueuse" [level=4] [ref=e320]
              - paragraph [ref=e321]: Échographe Sonosite Edge II
              - generic [ref=e322]:
                - paragraph [ref=e323]: "Loc: Maternité"
                - paragraph [ref=e324]:
                  - text: "SLA:"
                  - generic [ref=e325]: Attente livraison
              - generic [ref=e326]:
                - generic [ref=e327]:
                  - img [ref=e328]
                  - generic [ref=e331]: 22 Juin, 11:45
                - generic [ref=e333]: F
          - generic [ref=e334]:
            - generic [ref=e335]:
              - heading "Résolus" [level=3] [ref=e336]
              - generic [ref=e337]: "1"
            - generic [ref=e339] [cursor=pointer]:
              - generic [ref=e341]:
                - generic [ref=e342]: TKT-1040
                - generic [ref=e343]: Basse
              - generic [ref=e345]:
                - img [ref=e346]
                - text: Clôturé
              - heading "Maintenance préventive trimestrielle Q2" [level=4] [ref=e349]
              - paragraph [ref=e350]: Moniteur Philips IntelliVue MX800
              - paragraph [ref=e352]: "Loc: Réanimation – Lit 4"
              - generic [ref=e353]:
                - generic [ref=e354]:
                  - img [ref=e355]
                  - generic [ref=e358]: 25 Juin, 10:00
                - generic [ref=e360]: É
```

# Test source

```ts
  214 |     const rows = page.locator('tbody tr');
  215 |     await expect(rows.first()).toBeVisible();
  216 |   });
  217 | 
  218 |   test('WF-04-04 · Filtre par statut En Panne', async ({ page }) => {
  219 |     await page.click('button:has-text("En Panne")');
  220 |     await page.waitForTimeout(300);
  221 |     const panneBadges = page.locator('.uc-badge-danger');
  222 |     if (await panneBadges.count() > 0) {
  223 |       await expect(panneBadges.first()).toBeVisible();
  224 |     }
  225 |   });
  226 | 
  227 |   test('WF-04-05 · Ajouter un équipement', async ({ page }) => {
  228 |     await page.click('button:has-text("Nouvel Équipement")');
  229 |     await expect(page.locator('text=Nouvel Équipement').last()).toBeVisible();
  230 | 
  231 |     await page.fill('input[placeholder*="IRM Siemens"]', 'Appareil Test E2E');
  232 |     await page.fill('input[placeholder*="SN-XXXX"]', 'SN-TEST-9999');
  233 |     await page.selectOption('select', { label: 'Réanimation' });
  234 |     await page.click('button:has-text("Enregistrer")');
  235 | 
  236 |     await expect(page.locator('text=Appareil Test E2E')).toBeVisible({ timeout: 5000 });
  237 |   });
  238 | 
  239 |   test('WF-04-06 · Ouvrir le drawer de détail', async ({ page }) => {
  240 |     // Hover first row to show action buttons
  241 |     const firstRow = page.locator('tbody tr').first();
  242 |     await firstRow.hover();
  243 |     const eyeBtn = firstRow.locator('[title="Voir détails"], button').filter({ has: page.locator('svg') }).first();
  244 |     await eyeBtn.click();
  245 |     await expect(page.locator('text=Catégorie')).toBeVisible({ timeout: 5000 });
  246 |     await expect(page.locator('text=Uptime')).toBeVisible();
  247 |   });
  248 | 
  249 |   test('WF-04-07 · Modifier un équipement (modal édition)', async ({ page }) => {
  250 |     const firstRow = page.locator('tbody tr').first();
  251 |     await firstRow.hover();
  252 |     // Click pencil icon (Modifier)
  253 |     await firstRow.locator('[title="Modifier"]').click();
  254 |     await expect(page.locator('text=Modifier l\'équipement')).toBeVisible({ timeout: 5000 });
  255 | 
  256 |     // Change uptime value
  257 |     const uptimeInput = page.locator('input[type="number"]');
  258 |     await uptimeInput.clear();
  259 |     await uptimeInput.fill('95');
  260 |     await page.click('button:has-text("Enregistrer les modifications")');
  261 |     // Modal should close
  262 |     await expect(page.locator('text=Modifier l\'équipement')).not.toBeVisible({ timeout: 3000 });
  263 |   });
  264 | 
  265 |   test('WF-04-08 · Supprimer un équipement', async ({ page }) => {
  266 |     // Add one first so we don't delete real data
  267 |     await page.click('button:has-text("Nouvel Équipement")');
  268 |     await page.fill('input[placeholder*="IRM Siemens"]', 'Équipement À Supprimer');
  269 |     await page.fill('input[placeholder*="SN-XXXX"]', 'SN-DEL-0000');
  270 |     await page.click('button:has-text("Enregistrer")');
  271 |     await expect(page.locator('text=Équipement À Supprimer')).toBeVisible();
  272 | 
  273 |     // Delete it
  274 |     const targetRow = page.locator('tr').filter({ hasText: 'Équipement À Supprimer' });
  275 |     await targetRow.hover();
  276 |     await targetRow.locator('button').last().click(); // Trash icon
  277 |     await expect(page.locator('text=Équipement À Supprimer')).not.toBeVisible({ timeout: 3000 });
  278 |   });
  279 | 
  280 |   test('WF-04-09 · Comparaison de 2 équipements', async ({ page }) => {
  281 |     const checkboxes = page.locator('input[type="checkbox"]');
  282 |     await checkboxes.nth(0).check();
  283 |     await checkboxes.nth(1).check();
  284 |     // FAB button should appear
  285 |     await expect(page.locator('button:has-text("Comparer")')).toBeVisible({ timeout: 3000 });
  286 |     await page.click('button:has-text("Comparer")');
  287 |     await expect(page.locator('text=Comparaison équipements')).toBeVisible();
  288 |     await expect(page.locator('text=Radar de performance')).toBeVisible();
  289 |   });
  290 | 
  291 |   test('WF-04-10 · Scanner QR Code — modal s\'ouvre', async ({ page }) => {
  292 |     await page.click('button:has-text("Scanner QR")');
  293 |     await expect(page.locator('text=Scanner QR Code')).toBeVisible({ timeout: 3000 });
  294 |     await expect(page.locator('text=Appuyer pour ouvrir la caméra')).toBeVisible();
  295 |     // Test manual input
  296 |     await page.fill('#qr-manual-input', 'EQ-2024-001');
  297 |     await page.click('button:has-text("Rechercher")');
  298 |   });
  299 | });
  300 | 
  301 | // ─────────────────────────────────────────────────────────────────────────────
  302 | // WORKFLOW 5 — Tickets Kanban
  303 | // ─────────────────────────────────────────────────────────────────────────────
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
> 314 |     await expect(page.locator('text=En Cours')).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
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
```