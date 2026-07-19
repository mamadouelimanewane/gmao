# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-04 · Équipements >> WF-04-02 · Recherche par nom
- Location: tests\workflows.spec.ts:206:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Scanner')
Expected: visible
Error: strict mode violation: locator('text=Scanner') resolved to 2 elements:
    1) <span class="hidden sm:inline">Scanner QR</span> aka getByRole('button', { name: 'Scanner QR' })
    2) <p class="font-semibold text-base text-slate-200">Scanner GE Optima CT660</p> aka getByText('Scanner GE Optima CT660')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Scanner')

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
        - img [ref=e34]
      - link "Interventions 5" [ref=e36] [cursor=pointer]:
        - /url: /tickets
        - generic [ref=e37]:
          - img [ref=e38]
          - text: Interventions
        - generic [ref=e40]: "5"
      - link "Workflow Réparation" [ref=e41] [cursor=pointer]:
        - /url: /tickets
        - generic [ref=e42]:
          - img [ref=e43]
          - text: Workflow Réparation
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
        - generic [ref=e156]: Équipements
      - generic [ref=e158]:
        - img [ref=e159]
        - textbox "Rechercher…" [active] [ref=e162]: Scanner
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
            - heading "Équipements" [level=1] [ref=e196]
            - paragraph [ref=e197]: 8 équipements · Cycle de vie complet
          - generic [ref=e198]:
            - button "Scanner QR" [ref=e199]:
              - img [ref=e200]
              - generic [ref=e206]: Scanner QR
            - button "Nouvel Équipement" [ref=e207]:
              - img [ref=e208]
              - text: Nouvel Équipement
        - generic [ref=e209]:
          - button "Tous" [ref=e210]
          - button "Imagerie" [ref=e211]
          - button "Réanimation" [ref=e212]
          - button "Urgence" [ref=e213]
          - button "Chirurgie" [ref=e214]
          - button "Laboratoire" [ref=e215]
        - generic [ref=e216]:
          - generic [ref=e217]:
            - img [ref=e218]
            - textbox "Rechercher par nom, ID, localisation..." [ref=e221]
          - generic [ref=e222]:
            - img [ref=e223]
            - generic [ref=e225]: "Statut:"
            - button "Tous" [ref=e226]
            - button "Opérationnel" [ref=e227]
            - button "En Maintenance" [ref=e228]
            - button "En Panne" [ref=e229]
        - table [ref=e232]:
          - rowgroup [ref=e233]:
            - row "Équipement Catégorie Localisation Statut Criticité Patient Safety Score Uptime Prochaine Maint. Actions" [ref=e234]:
              - columnheader [ref=e235]:
                - img [ref=e236]
              - columnheader "Équipement" [ref=e239]
              - columnheader "Catégorie" [ref=e240]
              - columnheader "Localisation" [ref=e241]
              - columnheader "Statut" [ref=e242]
              - columnheader "Criticité" [ref=e243]
              - columnheader "Patient Safety Score" [ref=e244]
              - columnheader "Uptime" [ref=e245]
              - columnheader "Prochaine Maint." [ref=e246]
              - columnheader "Actions" [ref=e247]
          - rowgroup [ref=e248]:
            - row "IRM Siemens Magnetom Skyra EQ-2026-001 Imagerie Radiologie – Salle 2 En Panne Critique 92 71% 12 Jui. 2026" [ref=e249]:
              - cell [ref=e250]:
                - checkbox [ref=e251]
              - cell "IRM Siemens Magnetom Skyra EQ-2026-001" [ref=e252]:
                - generic [ref=e253]:
                  - img [ref=e255]
                  - generic [ref=e259]:
                    - paragraph [ref=e260]: IRM Siemens Magnetom Skyra
                    - paragraph [ref=e261]: EQ-2026-001
              - cell "Imagerie" [ref=e262]:
                - generic [ref=e263]: Imagerie
              - cell "Radiologie – Salle 2" [ref=e264]:
                - generic [ref=e265]:
                  - img [ref=e266]
                  - text: Radiologie – Salle 2
              - cell "En Panne" [ref=e269]:
                - generic [ref=e270]: En Panne
              - cell "Critique" [ref=e272]:
                - generic [ref=e273]: Critique
              - cell "92" [ref=e274]:
                - generic [ref=e278]: "92"
              - cell "71%" [ref=e279]:
                - generic [ref=e283]: 71%
              - cell "12 Jui. 2026" [ref=e284]:
                - generic [ref=e285]:
                  - img [ref=e286]
                  - text: 12 Jui. 2026
              - cell [ref=e288]:
                - generic [ref=e289]:
                  - button "Voir détails" [ref=e290]:
                    - img [ref=e291]
                  - button "Modifier" [ref=e294]:
                    - img [ref=e295]
                  - button [ref=e298]:
                    - img [ref=e299]
            - row "Scanner GE Optima CT660 EQ-2026-002 Imagerie Urgences Opérationnel Critique 15 98% 05 Aoû. 2026" [ref=e302]:
              - cell [ref=e303]:
                - checkbox [ref=e304]
              - cell "Scanner GE Optima CT660 EQ-2026-002" [ref=e305]:
                - generic [ref=e306]:
                  - img [ref=e308]
                  - generic [ref=e312]:
                    - paragraph [ref=e313]: Scanner GE Optima CT660
                    - paragraph [ref=e314]: EQ-2026-002
              - cell "Imagerie" [ref=e315]:
                - generic [ref=e316]: Imagerie
              - cell "Urgences" [ref=e317]:
                - generic [ref=e318]:
                  - img [ref=e319]
                  - text: Urgences
              - cell "Opérationnel" [ref=e322]:
                - generic [ref=e323]: Opérationnel
              - cell "Critique" [ref=e325]:
                - generic [ref=e326]: Critique
              - cell "15" [ref=e327]:
                - generic [ref=e331]: "15"
              - cell "98%" [ref=e332]:
                - generic [ref=e336]: 98%
              - cell "05 Aoû. 2026" [ref=e337]:
                - generic [ref=e338]:
                  - img [ref=e339]
                  - text: 05 Aoû. 2026
              - cell [ref=e341]:
                - generic [ref=e342]:
                  - button "Voir détails" [ref=e343]:
                    - img [ref=e344]
                  - button "Modifier" [ref=e347]:
                    - img [ref=e348]
                  - button [ref=e351]:
                    - img [ref=e352]
            - row "Moniteur Philips IntelliVue MX800 EQ-2026-003 Réanimation Réanimation – Lit 4 Opérationnel Haute 8 99% 20 Sep. 2026" [ref=e355]:
              - cell [ref=e356]:
                - checkbox [ref=e357]
              - cell "Moniteur Philips IntelliVue MX800 EQ-2026-003" [ref=e358]:
                - generic [ref=e359]:
                  - img [ref=e361]
                  - generic [ref=e365]:
                    - paragraph [ref=e366]: Moniteur Philips IntelliVue MX800
                    - paragraph [ref=e367]: EQ-2026-003
              - cell "Réanimation" [ref=e368]:
                - generic [ref=e369]: Réanimation
              - cell "Réanimation – Lit 4" [ref=e370]:
                - generic [ref=e371]:
                  - img [ref=e372]
                  - text: Réanimation – Lit 4
              - cell "Opérationnel" [ref=e375]:
                - generic [ref=e376]: Opérationnel
              - cell "Haute" [ref=e378]:
                - generic [ref=e379]: Haute
              - cell "8" [ref=e380]:
                - generic [ref=e384]: "8"
              - cell "99%" [ref=e385]:
                - generic [ref=e389]: 99%
              - cell "20 Sep. 2026" [ref=e390]:
                - generic [ref=e391]:
                  - img [ref=e392]
                  - text: 20 Sep. 2026
              - cell [ref=e394]:
                - generic [ref=e395]:
                  - button "Voir détails" [ref=e396]:
                    - img [ref=e397]
                  - button "Modifier" [ref=e400]:
                    - img [ref=e401]
                  - button [ref=e404]:
                    - img [ref=e405]
            - row "Échographe Sonosite Edge II EQ-2026-004 Imagerie Maternité En Maintenance Moyenne 45 85% En cours" [ref=e408]:
              - cell [ref=e409]:
                - checkbox [ref=e410]
              - cell "Échographe Sonosite Edge II EQ-2026-004" [ref=e411]:
                - generic [ref=e412]:
                  - img [ref=e414]
                  - generic [ref=e418]:
                    - paragraph [ref=e419]: Échographe Sonosite Edge II
                    - paragraph [ref=e420]: EQ-2026-004
              - cell "Imagerie" [ref=e421]:
                - generic [ref=e422]: Imagerie
              - cell "Maternité" [ref=e423]:
                - generic [ref=e424]:
                  - img [ref=e425]
                  - text: Maternité
              - cell "En Maintenance" [ref=e428]:
                - generic [ref=e429]: En Maintenance
              - cell "Moyenne" [ref=e431]:
                - generic [ref=e432]: Moyenne
              - cell "45" [ref=e433]:
                - generic [ref=e437]: "45"
              - cell "85%" [ref=e438]:
                - generic [ref=e442]: 85%
              - cell "En cours" [ref=e443]:
                - generic [ref=e444]:
                  - img [ref=e445]
                  - text: En cours
              - cell [ref=e447]:
                - generic [ref=e448]:
                  - button "Voir détails" [ref=e449]:
                    - img [ref=e450]
                  - button "Modifier" [ref=e453]:
                    - img [ref=e454]
                  - button [ref=e457]:
                    - img [ref=e458]
            - row "Défibrillateur Zoll R Series EQ-2026-005 Urgence Urgences – Salle Choc Opérationnel Critique 5 100% 10 Oct. 2026" [ref=e461]:
              - cell [ref=e462]:
                - checkbox [ref=e463]
              - cell "Défibrillateur Zoll R Series EQ-2026-005" [ref=e464]:
                - generic [ref=e465]:
                  - img [ref=e467]
                  - generic [ref=e471]:
                    - paragraph [ref=e472]: Défibrillateur Zoll R Series
                    - paragraph [ref=e473]: EQ-2026-005
              - cell "Urgence" [ref=e474]:
                - generic [ref=e475]: Urgence
              - cell "Urgences – Salle Choc" [ref=e476]:
                - generic [ref=e477]:
                  - img [ref=e478]
                  - text: Urgences – Salle Choc
              - cell "Opérationnel" [ref=e481]:
                - generic [ref=e482]: Opérationnel
              - cell "Critique" [ref=e484]:
                - generic [ref=e485]: Critique
              - cell "5" [ref=e486]:
                - generic [ref=e490]: "5"
              - cell "100%" [ref=e491]:
                - generic [ref=e495]: 100%
              - cell "10 Oct. 2026" [ref=e496]:
                - generic [ref=e497]:
                  - img [ref=e498]
                  - text: 10 Oct. 2026
              - cell [ref=e500]:
                - generic [ref=e501]:
                  - button "Voir détails" [ref=e502]:
                    - img [ref=e503]
                  - button "Modifier" [ref=e506]:
                    - img [ref=e507]
                  - button [ref=e510]:
                    - img [ref=e511]
            - row "Respirateur Dräger Evita Infinity EQ-2026-006 Réanimation Bloc Opératoire 1 Opérationnel Critique 97 96% 18 Nov. 2026" [ref=e514]:
              - cell [ref=e515]:
                - checkbox [ref=e516]
              - cell "Respirateur Dräger Evita Infinity EQ-2026-006" [ref=e517]:
                - generic [ref=e518]:
                  - img [ref=e520]
                  - generic [ref=e524]:
                    - paragraph [ref=e525]: Respirateur Dräger Evita Infinity
                    - paragraph [ref=e526]: EQ-2026-006
              - cell "Réanimation" [ref=e527]:
                - generic [ref=e528]: Réanimation
              - cell "Bloc Opératoire 1" [ref=e529]:
                - generic [ref=e530]:
                  - img [ref=e531]
                  - text: Bloc Opératoire 1
              - cell "Opérationnel" [ref=e534]:
                - generic [ref=e535]: Opérationnel
              - cell "Critique" [ref=e537]:
                - generic [ref=e538]: Critique
              - cell "97" [ref=e539]:
                - generic [ref=e543]: "97"
              - cell "96%" [ref=e544]:
                - generic [ref=e548]: 96%
              - cell "18 Nov. 2026" [ref=e549]:
                - generic [ref=e550]:
                  - img [ref=e551]
                  - text: 18 Nov. 2026
              - cell [ref=e553]:
                - generic [ref=e554]:
                  - button "Voir détails" [ref=e555]:
                    - img [ref=e556]
                  - button "Modifier" [ref=e559]:
                    - img [ref=e560]
                  - button [ref=e563]:
                    - img [ref=e564]
            - row "Table de chirurgie Maquet Alphastar EQ-2026-007 Chirurgie Bloc Opératoire 3 Opérationnel Haute 22 94% 30 Jui. 2026" [ref=e567]:
              - cell [ref=e568]:
                - checkbox [ref=e569]
              - cell "Table de chirurgie Maquet Alphastar EQ-2026-007" [ref=e570]:
                - generic [ref=e571]:
                  - img [ref=e573]
                  - generic [ref=e577]:
                    - paragraph [ref=e578]: Table de chirurgie Maquet Alphastar
                    - paragraph [ref=e579]: EQ-2026-007
              - cell "Chirurgie" [ref=e580]:
                - generic [ref=e581]: Chirurgie
              - cell "Bloc Opératoire 3" [ref=e582]:
                - generic [ref=e583]:
                  - img [ref=e584]
                  - text: Bloc Opératoire 3
              - cell "Opérationnel" [ref=e587]:
                - generic [ref=e588]: Opérationnel
              - cell "Haute" [ref=e590]:
                - generic [ref=e591]: Haute
              - cell "22" [ref=e592]:
                - generic [ref=e596]: "22"
              - cell "94%" [ref=e597]:
                - generic [ref=e601]: 94%
              - cell "30 Jui. 2026" [ref=e602]:
                - generic [ref=e603]:
                  - img [ref=e604]
                  - text: 30 Jui. 2026
              - cell [ref=e606]:
                - generic [ref=e607]:
                  - button "Voir détails" [ref=e608]:
                    - img [ref=e609]
                  - button "Modifier" [ref=e612]:
                    - img [ref=e613]
                  - button [ref=e616]:
                    - img [ref=e617]
            - row "Automate d'hématologie Sysmex XN EQ-2026-008 Laboratoire Laboratoire Central En Panne Haute 84 55% Non planifié" [ref=e620]:
              - cell [ref=e621]:
                - checkbox [ref=e622]
              - cell "Automate d'hématologie Sysmex XN EQ-2026-008" [ref=e623]:
                - generic [ref=e624]:
                  - img [ref=e626]
                  - generic [ref=e630]:
                    - paragraph [ref=e631]: Automate d'hématologie Sysmex XN
                    - paragraph [ref=e632]: EQ-2026-008
              - cell "Laboratoire" [ref=e633]:
                - generic [ref=e634]: Laboratoire
              - cell "Laboratoire Central" [ref=e635]:
                - generic [ref=e636]:
                  - img [ref=e637]
                  - text: Laboratoire Central
              - cell "En Panne" [ref=e640]:
                - generic [ref=e641]: En Panne
              - cell "Haute" [ref=e643]:
                - generic [ref=e644]: Haute
              - cell "84" [ref=e645]:
                - generic [ref=e649]: "84"
              - cell "55%" [ref=e650]:
                - generic [ref=e654]: 55%
              - cell "Non planifié" [ref=e655]:
                - generic [ref=e656]:
                  - img [ref=e657]
                  - text: Non planifié
              - cell [ref=e659]:
                - generic [ref=e660]:
                  - button "Voir détails" [ref=e661]:
                    - img [ref=e662]
                  - button "Modifier" [ref=e665]:
                    - img [ref=e666]
                  - button [ref=e669]:
                    - img [ref=e670]
```

# Test source

```ts
  108 |       await page.goto(`${BASE}/login`);
  109 |     }
  110 |   });
  111 |       // Try sidebar logout
  112 | 
  113 |   test('WF-01-06 · Accès protégé sans authentification → redirige vers login', async ({ page }) => {
  114 |     await page.goto(`${BASE}/equipements`);
  115 |     await expect(page).toHaveURL(/.*login.*/, { timeout: 15000 }).catch(() => {});
  116 |   });
  117 | });
  118 | 
  119 | // ─────────────────────────────────────────────────────────────────────────────
  120 | // WORKFLOW 2 — AppsHub (Portail)
  121 | // ─────────────────────────────────────────────────────────────────────────────
  122 | test.describe('WF-02 · AppsHub', () => {
  123 | 
  124 |   test.beforeEach(async ({ page }) => { await loginAs(page, 'admin'); });
  125 | 
  126 |   test('WF-02-01 · Portail affiche les tuiles de modules', async ({ page }) => {
  127 |     await page.goto(`${BASE}/apps`);
  128 |     await expect(page.locator('text=Tableau de bord')).toBeVisible({ timeout: 8000 });
  129 |     await expect(page.locator('text=Équipements')).toBeVisible();
  130 |     await expect(page.locator('text=IA Copilot')).toBeVisible();
  131 |   });
  132 | 
  133 |   test('WF-02-02 · Recherche dans le portail', async ({ page }) => {
  134 |     await page.goto(`${BASE}/apps`);
  135 |     const searchBox = page.locator('input').first();
  136 |     await searchBox.fill('stocks');
  137 |     await expect(page.locator('text=Stocks')).toBeVisible({ timeout: 10000 });
  138 |   });
  139 | 
  140 |   test('WF-02-03 · Navigation vers un module depuis une tuile', async ({ page }) => {
  141 |     await page.goto(`${BASE}/apps`);
  142 |     // Click Équipements tile
  143 |     await page.locator('text=Équipements').first().click();
  144 |     await expect(page).toHaveURL(/\/equipements/);
  145 |   });
  146 | });
  147 | 
  148 | // ─────────────────────────────────────────────────────────────────────────────
  149 | // WORKFLOW 3 — Dashboard
  150 | // ─────────────────────────────────────────────────────────────────────────────
  151 | test.describe('WF-03 · Tableau de bord', () => {
  152 | 
  153 |   test.beforeEach(async ({ page }) => {
  154 |     await loginAs(page, 'admin');
  155 |     await page.goto(`${BASE}/dashboard`);
  156 |   });
  157 | 
  158 |   test('WF-03-01 · Dashboard s\'affiche avec graphiques', async ({ page }) => {
  159 |     await expect(page.locator('h1, h2').filter({ hasText: /Tableau de bord/i })).toBeVisible({ timeout: 8000 });
  160 |     await expect(page.locator('text=Activité de la semaine')).toBeVisible();
  161 |     await expect(page.locator('text=État du parc')).toBeVisible();
  162 |   });
  163 | 
  164 |   test('WF-03-02 · Alertes actives affichées', async ({ page }) => {
  165 |     await expect(page.locator('text=Alertes actives')).toBeVisible();
  166 |     await expect(page.locator('text=IRM Siemens')).toBeVisible();
  167 |   });
  168 | 
  169 |   test('WF-03-03 · Indicateur Live visible et animé', async ({ page }) => {
  170 |     await expect(page.locator('text=Live')).toBeVisible();
  171 |   });
  172 | 
  173 |   test('WF-03-04 · Bouton Générer Rapport → navigation rapports', async ({ page }) => {
  174 |     await page.click('button:has-text("Générer Rapport")');
  175 |     await expect(page).toHaveURL(/\/rapports/);
  176 |   });
  177 | 
  178 |   test('WF-03-05 · Lien Statistiques depuis dashboard', async ({ page }) => {
  179 |     await page.locator('text=Voir tous les indicateurs').first().click();
  180 |     await expect(page).toHaveURL(/\/statistiques/);
  181 |   });
  182 | 
  183 |   test('WF-03-06 · Uptime par service (barre de progression)', async ({ page }) => {
  184 |     await expect(page.locator('text=Uptime par service')).toBeVisible();
  185 |     await expect(page.locator('text=Radiologie')).toBeVisible();
  186 |     await expect(page.locator('text=Urgences')).toBeVisible();
  187 |   });
  188 | });
  189 | 
  190 | // ─────────────────────────────────────────────────────────────────────────────
  191 | // WORKFLOW 4 — Équipements
  192 | // ─────────────────────────────────────────────────────────────────────────────
  193 | test.describe('WF-04 · Équipements', () => {
  194 | 
  195 |   test.beforeEach(async ({ page }) => {
  196 |     await loginAs(page, 'admin');
  197 |     await page.goto(`${BASE}/equipements`);
  198 |     await expect(page.locator('h1').filter({ hasText: /Équipements/i })).toBeVisible({ timeout: 8000 });
  199 |   });
  200 | 
  201 |   test('WF-04-01 · Liste des équipements affichée', async ({ page }) => {
  202 |     await expect(page.locator('table')).toBeVisible();
  203 |     await expect(page.locator('text=IRM Siemens')).toBeVisible();
  204 |   });
  205 | 
  206 |   test('WF-04-02 · Recherche par nom', async ({ page }) => {
  207 |     await page.fill('input[placeholder*="Rechercher"]', 'Scanner');
> 208 |     await expect(page.locator('text=Scanner')).toBeVisible();
      |                                                ^ Error: expect(locator).toBeVisible() failed
  209 |   });
  210 | 
  211 |   test('WF-04-03 · Filtre par catégorie', async ({ page }) => {
  212 |     await page.click('button:has-text("Imagerie")');
  213 |     // Only Imagerie equipment should be shown
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
```