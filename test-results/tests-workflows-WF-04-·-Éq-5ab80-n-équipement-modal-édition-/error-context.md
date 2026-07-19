# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\workflows.spec.ts >> WF-04 · Équipements >> WF-04-07 · Modifier un équipement (modal édition)
- Location: tests\workflows.spec.ts:249:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('text=Modifier l\'équipement')
Expected: not visible
Received: visible
Timeout:  3000ms

Call log:
  - Expect "not toBeVisible" with timeout 3000ms
  - waiting for locator('text=Modifier l\'équipement')
    10 × locator resolved to <h3 class="text-lg font-bold text-white">Modifier l'équipement</h3>
       - unexpected value "visible"

```

```yaml
- heading "Modifier l'équipement" [level=3]
```

# Test source

```ts
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
> 262 |     await expect(page.locator('text=Modifier l\'équipement')).not.toBeVisible({ timeout: 3000 });
      |                                                                   ^ Error: expect(locator).not.toBeVisible() failed
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
```