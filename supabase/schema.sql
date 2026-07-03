-- ══════════════════════════════════════════════════════════════
-- GMAO Health v3.0 — Schema Supabase
-- Hôpital Ndamatou Touba, Sénégal
--
-- Reflète le schéma réellement déployé (colonnes en camelCase,
-- alignées avec les interfaces TypeScript de src/contexts/DataStore.tsx).
-- Ce fichier sert de référence : les tables tickets/equipments/
-- pm_plans/stocks existent déjà en prod ; profiles et
-- purchase_orders sont nouvelles (workflows auth + achat).
-- ══════════════════════════════════════════════════════════════

-- ── Profils utilisateurs (liés à Supabase Auth) ────────────────
-- Remplace les comptes MOCK_USERS codés en dur côté client.
create table if not exists profiles (
  id      uuid primary key references auth.users(id) on delete cascade,
  name    text not null,
  email   text not null,
  role    text not null check (role in ('technician','engineer','director','admin')),
  dept    text not null,
  avatar  text not null,
  lang    text not null default 'fr' check (lang in ('fr','wo','en')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
drop policy if exists "profiles_select_authenticated" on profiles;
create policy "profiles_select_authenticated" on profiles for select to authenticated using (true);
drop policy if exists "profiles_update_self" on profiles;
create policy "profiles_update_self" on profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- ── Tickets (interventions) — table existante + colonnes workflow réparation
alter table tickets add column if not exists "repairStep" text not null default 'signalement';
alter table tickets add column if not exists "contractType" text not null default 'interne';
alter table tickets add column if not exists "diagnosticNotes" text;
alter table tickets add column if not exists "devisMontant" numeric(12,2);
alter table tickets add column if not exists "devisValide" boolean;

-- ── Workflow Achat (demandes d'achat / bons de commande) ───────
create table if not exists purchase_orders (
  id              text primary key,
  "itemName"      text not null,
  quantity        int not null,
  unit            text not null default 'pcs',
  "supplierName"  text,
  "requestedBy"   text not null,
  "requestDate"   text not null,
  status          text not null default 'Demande' check (status in ('Demande','Validé','Commandé','Reçu','Rejeté')),
  "approvedBy"    text,
  "orderDate"     text,
  "receivedDate"  text,
  "unitPrice"     numeric(12,2) not null default 0,
  notes           text,
  "linkedTicketId" text references tickets(id) on delete set null,
  "linkedStockId"  text references stocks(id) on delete set null,
  created_at      timestamptz not null default now()
);

alter table purchase_orders enable row level security;
drop policy if exists "purchase_orders_authenticated" on purchase_orders;
create policy "purchase_orders_authenticated" on purchase_orders for all to authenticated using (true) with check (true);

-- ── Stocks — étendu pour la page Stocks.tsx (auparavant état local
--    non persisté) : catégorie, seuil, prix, statut, délais fournisseur
alter table stocks add column if not exists category text not null default 'Consommables';
alter table stocks add column if not exists "minThreshold" int;
alter table stocks add column if not exists price numeric(12,2) not null default 0;
alter table stocks add column if not exists status text not null default 'Normal' check (status in ('Normal','Critique','Surstock'));
alter table stocks add column if not exists "leadTimeWeeks" numeric(4,1) not null default 1;
alter table stocks add column if not exists "consumptionPerWeek" numeric(6,2) not null default 0;
update stocks set "minThreshold" = "minQuantity" where "minThreshold" is null;

-- ══════════════════════════════════════════════════════════════
-- RLS — accès restreint aux utilisateurs authentifiés
-- (remplace les policies "anon_all" qui permettaient un accès
-- total à quiconque possède la clé anon publique du bundle JS)
-- ══════════════════════════════════════════════════════════════
drop policy if exists "anon_all" on tickets;
drop policy if exists "tickets_authenticated" on tickets;
create policy "tickets_authenticated" on tickets for all to authenticated using (true) with check (true);

drop policy if exists "anon_all" on equipments;
drop policy if exists "equipments_authenticated" on equipments;
create policy "equipments_authenticated" on equipments for all to authenticated using (true) with check (true);

drop policy if exists "anon_all" on pm_plans;
drop policy if exists "pm_plans_authenticated" on pm_plans;
create policy "pm_plans_authenticated" on pm_plans for all to authenticated using (true) with check (true);

drop policy if exists "anon_all" on stocks;
drop policy if exists "stocks_authenticated" on stocks;
create policy "stocks_authenticated" on stocks for all to authenticated using (true) with check (true);
