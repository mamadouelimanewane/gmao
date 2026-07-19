# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-04 · Équipements >> WF-04-06 · Ouvrir le drawer de détail
- Location: tests\workflows.spec.ts:239:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Catégorie')
Expected: visible
Error: strict mode violation: locator('text=Catégorie') resolved to 2 elements:
    1) <p class="text-[10px] text-slate-500 mb-0.5">Catégorie</p> aka getByRole('paragraph').filter({ hasText: 'Catégorie' })
    2) <th class="px-6 py-3 font-semibold">Catégorie</th> aka getByRole('columnheader', { name: 'Catégorie' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Catégorie')

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
      - generic [ref=e192]:
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]:
              - img [ref=e199]
              - generic [ref=e203]:
                - heading "IRM Siemens Magnetom Skyra" [level=2] [ref=e204]
                - paragraph [ref=e205]: EQ-2026-001
            - button [ref=e206]:
              - img [ref=e207]
          - generic [ref=e210]:
            - generic [ref=e211]: En Panne
            - generic [ref=e213]:
              - generic [ref=e214]:
                - paragraph [ref=e215]: Catégorie
                - paragraph [ref=e216]: Imagerie
              - generic [ref=e217]:
                - paragraph [ref=e218]: Criticité
                - paragraph [ref=e219]: Critique
              - generic [ref=e220]:
                - paragraph [ref=e221]: Uptime
                - paragraph [ref=e222]: 71%
              - generic [ref=e223]:
                - paragraph [ref=e224]: Âge
                - paragraph [ref=e225]: 4 ans
              - generic [ref=e226]:
                - paragraph [ref=e227]: PSS
                - paragraph [ref=e228]: 92/100
              - generic [ref=e229]:
                - paragraph [ref=e230]: Prochaine PM
                - paragraph [ref=e231]: 12 Jui. 2026
            - generic [ref=e232]:
              - img [ref=e233]
              - text: Radiologie – Salle 2
            - generic [ref=e237]:
              - generic [ref=e238]: Uptime
              - generic [ref=e239]: 71%
            - generic [ref=e242]:
              - heading "Tickets liés (1)" [level=3] [ref=e243]
              - generic [ref=e245]:
                - generic [ref=e246]:
                  - paragraph [ref=e247]: TKT-1042
                  - paragraph [ref=e248]: Erreur de calibration & instabilité de champ
                - generic [ref=e249]: Ouvert
          - button "Créer un ticket pour cet équipement" [ref=e251]:
            - img [ref=e252]
            - text: Créer un ticket pour cet équipement
        - generic [ref=e253]:
          - generic [ref=e254]:
            - generic [ref=e255]:
              - heading "Équipements" [level=1] [ref=e256]
              - paragraph [ref=e257]: 8 équipements · Cycle de vie complet
            - generic [ref=e258]:
              - button "Scanner QR" [ref=e259]:
                - img [ref=e260]
                - generic [ref=e266]: Scanner QR
              - button "Nouvel Équipement" [ref=e267]:
                - img [ref=e268]
                - text: Nouvel Équipement
          - generic [ref=e269]:
            - button "Tous" [ref=e270]
            - button "Imagerie" [ref=e271]
            - button "Réanimation" [ref=e272]
            - button "Urgence" [ref=e273]
            - button "Chirurgie" [ref=e274]
            - button "Laboratoire" [ref=e275]
          - generic [ref=e276]:
            - generic [ref=e277]:
              - img [ref=e278]
              - textbox "Rechercher par nom, ID, localisation..." [ref=e281]
            - generic [ref=e282]:
              - img [ref=e283]
              - generic [ref=e285]: "Statut:"
              - button "Tous" [ref=e286]
              - button "Opérationnel" [ref=e287]
              - button "En Maintenance" [ref=e288]
              - button "En Panne" [ref=e289]
          - table [ref=e292]:
            - rowgroup [ref=e293]:
              - row "Équipement Catégorie Localisation Statut Criticité Patient Safety Score Uptime Prochaine Maint. Actions" [ref=e294]:
                - columnheader [ref=e295]:
                  - img [ref=e296]
                - columnheader "Équipement" [ref=e299]
                - columnheader "Catégorie" [ref=e300]
                - columnheader "Localisation" [ref=e301]
                - columnheader "Statut" [ref=e302]
                - columnheader "Criticité" [ref=e303]
                - columnheader "Patient Safety Score" [ref=e304]
                - columnheader "Uptime" [ref=e305]
                - columnheader "Prochaine Maint." [ref=e306]
                - columnheader "Actions" [ref=e307]
            - rowgroup [ref=e308]:
              - row "IRM Siemens Magnetom Skyra EQ-2026-001 Imagerie Radiologie – Salle 2 En Panne Critique 92 71% 12 Jui. 2026" [ref=e309]:
                - cell [ref=e310]:
                  - checkbox [ref=e311]
                - cell "IRM Siemens Magnetom Skyra EQ-2026-001" [ref=e312]:
                  - generic [ref=e313]:
                    - img [ref=e315]
                    - generic [ref=e319]:
                      - paragraph [ref=e320]: IRM Siemens Magnetom Skyra
                      - paragraph [ref=e321]: EQ-2026-001
                - cell "Imagerie" [ref=e322]:
                  - generic [ref=e323]: Imagerie
                - cell "Radiologie – Salle 2" [ref=e324]:
                  - generic [ref=e325]:
                    - img [ref=e326]
                    - text: Radiologie – Salle 2
                - cell "En Panne" [ref=e329]:
                  - generic [ref=e330]: En Panne
                - cell "Critique" [ref=e332]:
                  - generic [ref=e333]: Critique
                - cell "92" [ref=e334]:
                  - generic [ref=e338]: "92"
                - cell "71%" [ref=e339]:
                  - generic [ref=e343]: 71%
                - cell "12 Jui. 2026" [ref=e344]:
                  - generic [ref=e345]:
                    - img [ref=e346]
                    - text: 12 Jui. 2026
                - cell [ref=e348]:
                  - generic [ref=e349]:
                    - button "Voir détails" [active] [ref=e350]:
                      - img [ref=e351]
                    - button "Modifier" [ref=e354]:
                      - img [ref=e355]
                    - button [ref=e358]:
                      - img [ref=e359]
              - row "Scanner GE Optima CT660 EQ-2026-002 Imagerie Urgences Opérationnel Critique 15 98% 05 Aoû. 2026" [ref=e362]:
                - cell [ref=e363]:
                  - checkbox [ref=e364]
                - cell "Scanner GE Optima CT660 EQ-2026-002" [ref=e365]:
                  - generic [ref=e366]:
                    - img [ref=e368]
                    - generic [ref=e372]:
                      - paragraph [ref=e373]: Scanner GE Optima CT660
                      - paragraph [ref=e374]: EQ-2026-002
                - cell "Imagerie" [ref=e375]:
                  - generic [ref=e376]: Imagerie
                - cell "Urgences" [ref=e377]:
                  - generic [ref=e378]:
                    - img [ref=e379]
                    - text: Urgences
                - cell "Opérationnel" [ref=e382]:
                  - generic [ref=e383]: Opérationnel
                - cell "Critique" [ref=e385]:
                  - generic [ref=e386]: Critique
                - cell "15" [ref=e387]:
                  - generic [ref=e391]: "15"
                - cell "98%" [ref=e392]:
                  - generic [ref=e396]: 98%
                - cell "05 Aoû. 2026" [ref=e397]:
                  - generic [ref=e398]:
                    - img [ref=e399]
                    - text: 05 Aoû. 2026
                - cell [ref=e401]:
                  - generic [ref=e402]:
                    - button "Voir détails" [ref=e403]:
                      - img [ref=e404]
                    - button "Modifier" [ref=e407]:
                      - img [ref=e408]
                    - button [ref=e411]:
                      - img [ref=e412]
              - row "Moniteur Philips IntelliVue MX800 EQ-2026-003 Réanimation Réanimation – Lit 4 Opérationnel Haute 8 99% 20 Sep. 2026" [ref=e415]:
                - cell [ref=e416]:
                  - checkbox [ref=e417]
                - cell "Moniteur Philips IntelliVue MX800 EQ-2026-003" [ref=e418]:
                  - generic [ref=e419]:
                    - img [ref=e421]
                    - generic [ref=e425]:
                      - paragraph [ref=e426]: Moniteur Philips IntelliVue MX800
                      - paragraph [ref=e427]: EQ-2026-003
                - cell "Réanimation" [ref=e428]:
                  - generic [ref=e429]: Réanimation
                - cell "Réanimation – Lit 4" [ref=e430]:
                  - generic [ref=e431]:
                    - img [ref=e432]
                    - text: Réanimation – Lit 4
                - cell "Opérationnel" [ref=e435]:
                  - generic [ref=e436]: Opérationnel
                - cell "Haute" [ref=e438]:
                  - generic [ref=e439]: Haute
                - cell "8" [ref=e440]:
                  - generic [ref=e444]: "8"
                - cell "99%" [ref=e445]:
                  - generic [ref=e449]: 99%
                - cell "20 Sep. 2026" [ref=e450]:
                  - generic [ref=e451]:
                    - img [ref=e452]
                    - text: 20 Sep. 2026
                - cell [ref=e454]:
                  - generic [ref=e455]:
                    - button "Voir détails" [ref=e456]:
                      - img [ref=e457]
                    - button "Modifier" [ref=e460]:
                      - img [ref=e461]
                    - button [ref=e464]:
                      - img [ref=e465]
              - row "Échographe Sonosite Edge II EQ-2026-004 Imagerie Maternité En Maintenance Moyenne 45 85% En cours" [ref=e468]:
                - cell [ref=e469]:
                  - checkbox [ref=e470]
                - cell "Échographe Sonosite Edge II EQ-2026-004" [ref=e471]:
                  - generic [ref=e472]:
                    - img [ref=e474]
                    - generic [ref=e478]:
                      - paragraph [ref=e479]: Échographe Sonosite Edge II
                      - paragraph [ref=e480]: EQ-2026-004
                - cell "Imagerie" [ref=e481]:
                  - generic [ref=e482]: Imagerie
                - cell "Maternité" [ref=e483]:
                  - generic [ref=e484]:
                    - img [ref=e485]
                    - text: Maternité
                - cell "En Maintenance" [ref=e488]:
                  - generic [ref=e489]: En Maintenance
                - cell "Moyenne" [ref=e491]:
                  - generic [ref=e492]: Moyenne
                - cell "45" [ref=e493]:
                  - generic [ref=e497]: "45"
                - cell "85%" [ref=e498]:
                  - generic [ref=e502]: 85%
                - cell "En cours" [ref=e503]:
                  - generic [ref=e504]:
                    - img [ref=e505]
                    - text: En cours
                - cell [ref=e507]:
                  - generic [ref=e508]:
                    - button "Voir détails" [ref=e509]:
                      - img [ref=e510]
                    - button "Modifier" [ref=e513]:
                      - img [ref=e514]
                    - button [ref=e517]:
                      - img [ref=e518]
              - row "Défibrillateur Zoll R Series EQ-2026-005 Urgence Urgences – Salle Choc Opérationnel Critique 5 100% 10 Oct. 2026" [ref=e521]:
                - cell [ref=e522]:
                  - checkbox [ref=e523]
                - cell "Défibrillateur Zoll R Series EQ-2026-005" [ref=e524]:
                  - generic [ref=e525]:
                    - img [ref=e527]
                    - generic [ref=e531]:
                      - paragraph [ref=e532]: Défibrillateur Zoll R Series
                      - paragraph [ref=e533]: EQ-2026-005
                - cell "Urgence" [ref=e534]:
                  - generic [ref=e535]: Urgence
                - cell "Urgences – Salle Choc" [ref=e536]:
                  - generic [ref=e537]:
                    - img [ref=e538]
                    - text: Urgences – Salle Choc
                - cell "Opérationnel" [ref=e541]:
                  - generic [ref=e542]: Opérationnel
                - cell "Critique" [ref=e544]:
                  - generic [ref=e545]: Critique
                - cell "5" [ref=e546]:
                  - generic [ref=e550]: "5"
                - cell "100%" [ref=e551]:
                  - generic [ref=e555]: 100%
                - cell "10 Oct. 2026" [ref=e556]:
                  - generic [ref=e557]:
                    - img [ref=e558]
                    - text: 10 Oct. 2026
                - cell [ref=e560]:
                  - generic [ref=e561]:
                    - button "Voir détails" [ref=e562]:
                      - img [ref=e563]
                    - button "Modifier" [ref=e566]:
                      - img [ref=e567]
                    - button [ref=e570]:
                      - img [ref=e571]
              - row "Respirateur Dräger Evita Infinity EQ-2026-006 Réanimation Bloc Opératoire 1 Opérationnel Critique 97 96% 18 Nov. 2026" [ref=e574]:
                - cell [ref=e575]:
                  - checkbox [ref=e576]
                - cell "Respirateur Dräger Evita Infinity EQ-2026-006" [ref=e577]:
                  - generic [ref=e578]:
                    - img [ref=e580]
                    - generic [ref=e584]:
                      - paragraph [ref=e585]: Respirateur Dräger Evita Infinity
                      - paragraph [ref=e586]: EQ-2026-006
                - cell "Réanimation" [ref=e587]:
                  - generic [ref=e588]: Réanimation
                - cell "Bloc Opératoire 1" [ref=e589]:
                  - generic [ref=e590]:
                    - img [ref=e591]
                    - text: Bloc Opératoire 1
                - cell "Opérationnel" [ref=e594]:
                  - generic [ref=e595]: Opérationnel
                - cell "Critique" [ref=e597]:
                  - generic [ref=e598]: Critique
                - cell "97" [ref=e599]:
                  - generic [ref=e603]: "97"
                - cell "96%" [ref=e604]:
                  - generic [ref=e608]: 96%
                - cell "18 Nov. 2026" [ref=e609]:
                  - generic [ref=e610]:
                    - img [ref=e611]
                    - text: 18 Nov. 2026
                - cell [ref=e613]:
                  - generic [ref=e614]:
                    - button "Voir détails" [ref=e615]:
                      - img [ref=e616]
                    - button "Modifier" [ref=e619]:
                      - img [ref=e620]
                    - button [ref=e623]:
                      - img [ref=e624]
              - row "Table de chirurgie Maquet Alphastar EQ-2026-007 Chirurgie Bloc Opératoire 3 Opérationnel Haute 22 94% 30 Jui. 2026" [ref=e627]:
                - cell [ref=e628]:
                  - checkbox [ref=e629]
                - cell "Table de chirurgie Maquet Alphastar EQ-2026-007" [ref=e630]:
                  - generic [ref=e631]:
                    - img [ref=e633]
                    - generic [ref=e637]:
                      - paragraph [ref=e638]: Table de chirurgie Maquet Alphastar
                      - paragraph [ref=e639]: EQ-2026-007
                - cell "Chirurgie" [ref=e640]:
                  - generic [ref=e641]: Chirurgie
                - cell "Bloc Opératoire 3" [ref=e642]:
                  - generic [ref=e643]:
                    - img [ref=e644]
                    - text: Bloc Opératoire 3
                - cell "Opérationnel" [ref=e647]:
                  - generic [ref=e648]: Opérationnel
                - cell "Haute" [ref=e650]:
                  - generic [ref=e651]: Haute
                - cell "22" [ref=e652]:
                  - generic [ref=e656]: "22"
                - cell "94%" [ref=e657]:
                  - generic [ref=e661]: 94%
                - cell "30 Jui. 2026" [ref=e662]:
                  - generic [ref=e663]:
                    - img [ref=e664]
                    - text: 30 Jui. 2026
                - cell [ref=e666]:
                  - generic [ref=e667]:
                    - button "Voir détails" [ref=e668]:
                      - img [ref=e669]
                    - button "Modifier" [ref=e672]:
                      - img [ref=e673]
                    - button [ref=e676]:
                      - img [ref=e677]
              - row "Automate d'hématologie Sysmex XN EQ-2026-008 Laboratoire Laboratoire Central En Panne Haute 84 55% Non planifié" [ref=e680]:
                - cell [ref=e681]:
                  - checkbox [ref=e682]
                - cell "Automate d'hématologie Sysmex XN EQ-2026-008" [ref=e683]:
                  - generic [ref=e684]:
                    - img [ref=e686]
                    - generic [ref=e690]:
                      - paragraph [ref=e691]: Automate d'hématologie Sysmex XN
                      - paragraph [ref=e692]: EQ-2026-008
                - cell "Laboratoire" [ref=e693]:
                  - generic [ref=e694]: Laboratoire
                - cell "Laboratoire Central" [ref=e695]:
                  - generic [ref=e696]:
                    - img [ref=e697]
                    - text: Laboratoire Central
                - cell "En Panne" [ref=e700]:
                  - generic [ref=e701]: En Panne
                - cell "Haute" [ref=e703]:
                  - generic [ref=e704]: Haute
                - cell "84" [ref=e705]:
                  - generic [ref=e709]: "84"
                - cell "55%" [ref=e710]:
                  - generic [ref=e714]: 55%
                - cell "Non planifié" [ref=e715]:
                  - generic [ref=e716]:
                    - img [ref=e717]
                    - text: Non planifié
                - cell [ref=e719]:
                  - generic [ref=e720]:
                    - button "Voir détails" [ref=e721]:
                      - img [ref=e722]
                    - button "Modifier" [ref=e725]:
                      - img [ref=e726]
                    - button [ref=e729]:
                      - img [ref=e730]
```

# Test source

```ts
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
  208 |     await expect(page.locator('text=Scanner')).toBeVisible();
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
> 245 |     await expect(page.locator('text=Catégorie')).toBeVisible({ timeout: 5000 });
      |                                                  ^ Error: expect(locator).toBeVisible() failed
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
```