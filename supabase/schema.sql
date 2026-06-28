-- ══════════════════════════════════════════════════════════════
-- GMAO Health v3.0 — Schema Supabase
-- CHU Aristide Le Dantec, Dakar
-- ══════════════════════════════════════════════════════════════

-- Extension UUID
create extension if not exists "uuid-ossp";

-- ── Tickets ──────────────────────────────────────────────────
create table if not exists tickets (
  id          text primary key default ('TKT-' || to_char(nextval('ticket_seq'), 'FM0000')),
  title       text not null,
  equipment   text not null,
  location    text not null,
  priority    text not null default 'Moyenne' check (priority in ('Critique','Haute','Moyenne','Basse')),
  status      text not null default 'Ouvert' check (status in ('Ouvert','En Cours','Résolu')),
  description text,
  assignee    text,
  signature   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create sequence if not exists ticket_seq start 1000;

-- ── Équipements ───────────────────────────────────────────────
create table if not exists equipments (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  type        text not null,
  location    text not null,
  status      text not null default 'Opérationnel' check (status in ('Opérationnel','En Maintenance','Hors Service')),
  serial      text,
  brand       text,
  model       text,
  purchase_date date,
  last_pm     date,
  next_pm     date,
  sla_hours   int default 4,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Plans de maintenance préventive ───────────────────────────
create table if not exists pm_plans (
  id          uuid primary key default uuid_generate_v4(),
  equipment   text not null,
  frequency   text not null,
  technician  text not null,
  next_date   date not null,
  status      text not null default 'planifié' check (status in ('planifié','en cours','done','overdue')),
  tasks       jsonb not null default '[]',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Stocks ────────────────────────────────────────────────────
create table if not exists stocks (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  category    text not null,
  quantity    int not null default 0,
  unit        text not null default 'unité',
  threshold   int not null default 5,
  location    text,
  supplier    text,
  unit_price  numeric(10,2),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Fournisseurs ──────────────────────────────────────────────
create table if not exists suppliers (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  category    text not null,
  contact     text,
  email       text,
  phone       text,
  address     text,
  rating      int default 3 check (rating between 1 and 5),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Budgets ───────────────────────────────────────────────────
create table if not exists budgets (
  id          uuid primary key default uuid_generate_v4(),
  department  text not null,
  year        int not null,
  amount      numeric(15,2) not null,
  spent       numeric(15,2) not null default 0,
  type        text not null default 'Maintenance',
  notes       text,
  created_at  timestamptz not null default now()
);

-- ── Personnel RH ──────────────────────────────────────────────
create table if not exists staff (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  role        text not null,
  department  text,
  phone       text,
  email       text,
  status      text not null default 'Disponible' check (status in ('Disponible','En mission','En congé')),
  skills      text[] default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Tâches RH (Gantt) ─────────────────────────────────────────
create table if not exists rh_tasks (
  id          uuid primary key default uuid_generate_v4(),
  staff_id    uuid references staff(id) on delete cascade,
  title       text not null,
  type        text not null default 'Préventive',
  day         int not null check (day between 0 and 6),
  duration    int not null default 1,
  created_at  timestamptz not null default now()
);

-- ── MedPool (pièces) ──────────────────────────────────────────
create table if not exists medpool_parts (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  type            text not null default 'Vente',
  compatible_with text[] default '{}',
  price           numeric(10,2),
  contact         text,
  description     text,
  proposer_id     text,
  created_at      timestamptz not null default now()
);

-- ══════════════════════════════════════════════════════════════
-- Row Level Security — accès public en lecture/écriture
-- (à affiner avec auth Supabase ultérieurement)
-- ══════════════════════════════════════════════════════════════
alter table tickets       enable row level security;
alter table equipments    enable row level security;
alter table pm_plans      enable row level security;
alter table stocks        enable row level security;
alter table suppliers     enable row level security;
alter table budgets       enable row level security;
alter table staff         enable row level security;
alter table rh_tasks      enable row level security;
alter table medpool_parts enable row level security;

-- Policies ouvertes (anon full access) — à restreindre après auth
create policy "anon_all" on tickets       for all to anon using (true) with check (true);
create policy "anon_all" on equipments    for all to anon using (true) with check (true);
create policy "anon_all" on pm_plans      for all to anon using (true) with check (true);
create policy "anon_all" on stocks        for all to anon using (true) with check (true);
create policy "anon_all" on suppliers     for all to anon using (true) with check (true);
create policy "anon_all" on budgets       for all to anon using (true) with check (true);
create policy "anon_all" on staff         for all to anon using (true) with check (true);
create policy "anon_all" on rh_tasks      for all to anon using (true) with check (true);
create policy "anon_all" on medpool_parts for all to anon using (true) with check (true);

-- ══════════════════════════════════════════════════════════════
-- Données initiales — Équipements CHU Le Dantec
-- ══════════════════════════════════════════════════════════════
insert into equipments (name, type, location, status, serial, brand, model, sla_hours) values
  ('IRM 3T Skyra',          'Imagerie',       'Radiologie',   'Opérationnel',    'SIE-2023-001', 'Siemens',  'Skyra 3T',      4),
  ('Scanner CT 64 barrettes','Imagerie',      'Radiologie',   'Opérationnel',    'PHI-2022-002', 'Philips',  'Brilliance 64', 4),
  ('Respirateur Hamilton',  'Réanimation',    'Réanimation',  'En Maintenance',  'HAM-2021-003', 'Hamilton', 'G5',            2),
  ('Défibrillateur LIFEPAK','Urgences',       'Urgences',     'Opérationnel',    'STR-2023-004', 'Stryker',  'LIFEPAK 15',    1),
  ('Electrobisturi Valleylab','Chirurgie',    'Bloc Op 1',    'Opérationnel',    'MED-2022-005', 'Medtronic','Force FX',      4),
  ('Table op Maquet',       'Chirurgie',      'Bloc Op 2',    'Opérationnel',    'MAQ-2020-006', 'Maquet',   'Alphastar',     8),
  ('Moniteur Mindray',      'Surveillance',   'Réanimation',  'Opérationnel',    'MIN-2023-007', 'Mindray',  'BeneView T9',   2),
  ('Incubateur Caleo',      'Maternité',      'Maternité',    'Opérationnel',    'DRA-2022-008', 'Dräger',   'Caleo',         4),
  ('Analyseur Sysmex',      'Laboratoire',    'Labo',         'Opérationnel',    'SYS-2021-009', 'Sysmex',   'XN-1000',       8),
  ('Automate Abbott Alinity','Biochimie',     'Labo',         'Hors Service',    'ABB-2020-010', 'Abbott',   'Alinity c',     4)
on conflict do nothing;

-- Stocks initiaux
insert into stocks (name, category, quantity, unit, threshold, unit_price) values
  ('Gants nitrile M',       'Consommables', 450, 'boîte',  50,  3500),
  ('Seringues 10ml',        'Consommables', 800, 'unité',  100, 150),
  ('Filtre HEPA IRM',       'Pièces',       3,   'unité',  2,   85000),
  ('Batterie défibrillateur','Batteries',   2,   'unité',  2,   45000),
  ('Huile hydraulique',     'Consommables', 5,   'litre',  3,   8000),
  ('Sonde ultrasons 3.5MHz','Pièces',       1,   'unité',  1,   320000)
on conflict do nothing;

-- Fournisseurs
insert into suppliers (name, category, contact, email, phone, rating) values
  ('Siemens Healthineers SN', 'Constructeur', 'Ibrahima Diallo',  'idiallo@siemens.sn',    '+221 33 842 00 10', 5),
  ('MedAfrique SARL',         'Distributeur', 'Aminata Sow',      'asow@medafrique.sn',    '+221 77 512 34 56', 4),
  ('TechMed Dakar',           'Local',        'Ousmane Ndiaye',   'ondiaye@techmed.sn',    '+221 76 234 56 78', 3),
  ('Philips Healthcare SN',   'Constructeur', 'Marie Diop',       'mdiop@philips.sn',      '+221 33 849 12 00', 5),
  ('BioMedis SARL',           'Distributeur', 'Cheikh Touré',     'ctoure@biomedis.sn',    '+221 77 891 23 45', 4)
on conflict do nothing;
