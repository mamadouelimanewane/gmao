import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// ── Types ──────────────────────────────────────────────────────────────────

export interface Ticket {
  id: string;
  title: string;
  equipment: string;
  status: 'Ouvert' | 'En Cours' | 'En Attente' | 'Résolu';
  priority: 'Critique' | 'Haute' | 'Moyenne' | 'Basse';
  date: string;
  assignee: string;
  location: string;
  sla: string;
  slaUrgent: boolean;
  signature?: string;
  // ── Workflow de réparation ──
  repairStep: 'signalement' | 'diagnostic' | 'devis_pieces' | 'reparation' | 'test_validation' | 'cloture';
  contractType: 'interne' | 'externe';
  diagnosticNotes?: string;
  devisMontant?: number;
  devisValide?: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'Opérationnel' | 'En Panne' | 'En Maintenance';
  nextMaintenance: string;
  location: string;
  criticality: string;
  uptime: number;
  age: number;
  pss: number;
  serialNumber?: string;
  supplier?: string;
  acquisitionDate?: string;
}

export interface ChecklistItem {
  item: string;
  done: boolean;
}

export interface MaintenancePlan {
  id: string;
  equipment: string;
  dept: string;
  frequency: string;
  lastDone: string;
  nextDue: string;
  daysLeft: number;
  technician: string;
  techAvatar: string;
  status: 'done' | 'pending' | 'late' | 'inprogress' | 'planned';
  estimatedDuration: string;
  checklist: ChecklistItem[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  contractType: 'interne' | 'externe';
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  unit: string;
  price: number;
  supplier: string;
  status: 'Normal' | 'Critique' | 'Surstock';
  location: string;
  leadTimeWeeks: number;
  consumptionPerWeek: number;
}

// ── Workflow Achat ───────────────────────────────────────────────────────
export interface PurchaseOrder {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  supplierName: string;
  requestedBy: string;
  requestDate: string;
  status: 'Demande' | 'Validé' | 'Commandé' | 'Reçu' | 'Rejeté';
  approvedBy?: string;
  orderDate?: string;
  receivedDate?: string;
  unitPrice: number;
  notes?: string;
  linkedTicketId?: string;
  linkedStockId?: string;
}

// ── Repair workflow helpers ──────────────────────────────────────────────

export const REPAIR_STEPS: { id: Ticket['repairStep']; label: string }[] = [
  { id: 'signalement', label: 'Signalement' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'devis_pieces', label: 'Devis / Pièces' },
  { id: 'reparation', label: 'Réparation en cours' },
  { id: 'test_validation', label: 'Test & validation' },
  { id: 'cloture', label: 'Clôturé' },
];

export function repairStepToStatus(step: Ticket['repairStep']): Ticket['status'] {
  switch (step) {
    case 'signalement': return 'Ouvert';
    case 'devis_pieces': return 'En Attente';
    case 'cloture': return 'Résolu';
    default: return 'En Cours';
  }
}

// ── Initial Data ───────────────────────────────────────────────────────────

const initialTickets: Ticket[] = [
  { id: 'TKT-1042', title: 'Erreur de calibration & instabilité de champ', equipment: 'IRM Siemens Magnetom Skyra', status: 'Ouvert', priority: 'Critique', date: '28 Juin, 09:30', assignee: 'Dr. Jean Diallo', location: 'Radiologie – Salle 2', sla: '1h 15m restants', slaUrgent: true, repairStep: 'signalement', contractType: 'externe' },
  { id: 'TKT-1041', title: 'Bruit anormal et surchauffe du compresseur', equipment: 'Scanner GE Optima CT660', status: 'En Cours', priority: 'Haute', date: '27 Juin, 14:15', assignee: 'Tech. Amadou Ndiaye', location: 'Urgences', sla: '4h 30m restants', slaUrgent: false, repairStep: 'reparation', contractType: 'interne' },
  { id: 'TKT-1039', title: 'Remplacement de la sonde cardiaque défectueuse', equipment: 'Échographe Sonosite Edge II', status: 'En Attente', priority: 'Moyenne', date: '22 Juin, 11:45', assignee: 'Fournisseur (Import)', location: 'Maternité', sla: 'Attente livraison', slaUrgent: false, repairStep: 'devis_pieces', contractType: 'externe', devisMontant: 850000 },
  { id: 'TKT-1040', title: 'Maintenance préventive trimestrielle Q2', equipment: 'Moniteur Philips IntelliVue MX800', status: 'Résolu', priority: 'Basse', date: '25 Juin, 10:00', assignee: 'Équipe BioMed', location: 'Réanimation – Lit 4', sla: 'Résolu dans les temps', slaUrgent: false, repairStep: 'cloture', contractType: 'interne' },
  { id: 'TKT-1043', title: "Dysfonctionnement de l'alimentation électrique", equipment: 'Automate Sysmex XN', status: 'Ouvert', priority: 'Haute', date: '28 Juin, 11:00', assignee: 'Tech. Fatou Sow', location: 'Laboratoire Central', sla: '2h 45m restants', slaUrgent: true, repairStep: 'diagnostic', contractType: 'interne' },
];

const initialEquipments: Equipment[] = [
  { id: 'EQ-2026-001', name: 'IRM Siemens Magnetom Skyra', category: 'Imagerie', status: 'En Panne', nextMaintenance: '12 Jui. 2026', location: 'Radiologie – Salle 2', criticality: 'Critique', uptime: 71, age: 4, pss: 92 },
  { id: 'EQ-2026-002', name: 'Scanner GE Optima CT660', category: 'Imagerie', status: 'Opérationnel', nextMaintenance: '05 Aoû. 2026', location: 'Urgences', criticality: 'Critique', uptime: 98, age: 2, pss: 15 },
  { id: 'EQ-2026-003', name: 'Moniteur Philips IntelliVue MX800', category: 'Réanimation', status: 'Opérationnel', nextMaintenance: '20 Sep. 2026', location: 'Réanimation – Lit 4', criticality: 'Haute', uptime: 99, age: 3, pss: 8 },
  { id: 'EQ-2026-004', name: 'Échographe Sonosite Edge II', category: 'Imagerie', status: 'En Maintenance', nextMaintenance: 'En cours', location: 'Maternité', criticality: 'Moyenne', uptime: 85, age: 5, pss: 45 },
  { id: 'EQ-2026-005', name: 'Défibrillateur Zoll R Series', category: 'Urgence', status: 'Opérationnel', nextMaintenance: '10 Oct. 2026', location: 'Urgences – Salle Choc', criticality: 'Critique', uptime: 100, age: 1, pss: 5 },
  { id: 'EQ-2026-006', name: 'Respirateur Dräger Evita Infinity', category: 'Réanimation', status: 'Opérationnel', nextMaintenance: '18 Nov. 2026', location: 'Bloc Opératoire 1', criticality: 'Critique', uptime: 96, age: 2, pss: 97 },
  { id: 'EQ-2026-007', name: 'Table de chirurgie Maquet Alphastar', category: 'Chirurgie', status: 'Opérationnel', nextMaintenance: '30 Jui. 2026', location: 'Bloc Opératoire 3', criticality: 'Haute', uptime: 94, age: 6, pss: 22 },
  { id: 'EQ-2026-008', name: "Automate d'hématologie Sysmex XN", category: 'Laboratoire', status: 'En Panne', nextMaintenance: 'Non planifié', location: 'Laboratoire Central', criticality: 'Haute', uptime: 55, age: 7, pss: 84 },
];

const initialPlans: MaintenancePlan[] = [
  {
    id: 'PM-001', equipment: 'IRM Siemens Magnetom Skyra', dept: 'Radiologie',
    frequency: 'Trimestriel', lastDone: '2025-03-28', nextDue: '2025-06-28',
    daysLeft: 0, technician: 'Diallo A.', techAvatar: 'AD', status: 'late',
    estimatedDuration: '4h', priority: 'critical', contractType: 'externe',
    checklist: [
      { item: 'Vérification du champ magnétique (Tesla meter)', done: false },
      { item: 'Contrôle bobines de gradient', done: false },
      { item: 'Inspection système de refroidissement hélium', done: false },
      { item: 'Test QA imagerie (fantôme NEMA)', done: false },
      { item: 'Mise à jour firmware Siemens', done: false },
      { item: "Validation protocoles d'urgence", done: false },
    ]
  },
  {
    id: 'PM-002', equipment: 'Scanner GE Optima CT660', dept: 'Radiologie',
    frequency: 'Mensuel', lastDone: '2025-05-30', nextDue: '2025-06-30',
    daysLeft: 2, technician: 'Diallo A.', techAvatar: 'AD', status: 'pending',
    estimatedDuration: '3h', priority: 'high', contractType: 'externe',
    checklist: [
      { item: 'Contrôle tube radiogène (HU count)', done: true },
      { item: 'Nettoyage détecteurs', done: true },
      { item: 'Calibration géométrique', done: false },
      { item: 'Test de résolution spatiale', done: false },
      { item: 'Vérification système de refroidissement tube', done: false },
    ]
  },
  {
    id: 'PM-003', equipment: 'Respirateur Dräger Evita XL', dept: 'Réanimation',
    frequency: 'Hebdomadaire', lastDone: '2025-06-21', nextDue: '2025-06-28',
    daysLeft: 0, technician: 'Sow M.', techAvatar: 'MS', status: 'inprogress',
    estimatedDuration: '1h30', priority: 'critical', contractType: 'interne',
    checklist: [
      { item: 'Test étanchéité circuit respiratoire', done: true },
      { item: 'Vérification débit O₂ et Air médical', done: true },
      { item: 'Calibration capteurs de pression', done: true },
      { item: 'Contrôle alarmes (apnée, déconnexion)', done: false },
      { item: 'Nettoyage / désinfection pièces patient', done: false },
    ]
  },
  {
    id: 'PM-004', equipment: 'Automate Sysmex XN-1000', dept: 'Laboratoire',
    frequency: 'Quotidien', lastDone: '2025-06-27', nextDue: '2025-06-28',
    daysLeft: 0, technician: 'Ndiaye F.', techAvatar: 'FN', status: 'done',
    estimatedDuration: '45min', priority: 'high', contractType: 'interne',
    checklist: [
      { item: 'Contrôle qualité interne (XN-CHECK)', done: true },
      { item: 'Amorçage réactifs', done: true },
      { item: 'Nettoyage aiguille aspiration', done: true },
      { item: 'Vérification niveau réactifs + déchets', done: true },
      { item: 'Archivage résultats QC', done: true },
    ]
  },
  {
    id: 'PM-005', equipment: 'Défibrillateur Zoll R Series', dept: 'Urgences',
    frequency: 'Mensuel', lastDone: '2025-05-15', nextDue: '2025-07-15',
    daysLeft: 17, technician: 'Sow M.', techAvatar: 'MS', status: 'planned',
    estimatedDuration: '1h', priority: 'critical', contractType: 'interne',
    checklist: [
      { item: 'Test de décharge (test interne 200J)', done: false },
      { item: 'Vérification batterie (capacité résiduelle)', done: false },
      { item: 'Contrôle électrodes et câbles patient', done: false },
      { item: 'Test enregistrement ECG', done: false },
      { item: 'Vérification alarmes sonores et visuelles', done: false },
    ]
  },
  {
    id: 'PM-006', equipment: 'Autoclave STERIS Amsco 400', dept: 'Stérilisation',
    frequency: 'Mensuel', lastDone: '2025-06-01', nextDue: '2025-07-01',
    daysLeft: 3, technician: 'Ba K.', techAvatar: 'KB', status: 'pending',
    estimatedDuration: '2h', priority: 'high', contractType: 'interne',
    checklist: [
      { item: 'Test Bowie-Dick (test de pénétration vapeur)', done: false },
      { item: 'Vérification soupapes de sécurité', done: false },
      { item: 'Contrôle joints et garnitures de porte', done: false },
      { item: 'Étalonnage thermocouples', done: false },
      { item: 'Test cycle de stérilisation 134°C/18min', done: false },
    ]
  },
  {
    id: 'PM-007', equipment: 'Moniteur Patient Mindray VS-900', dept: 'Chirurgie',
    frequency: 'Semestriel', lastDone: '2024-12-20', nextDue: '2025-06-20',
    daysLeft: -8, technician: 'Ba K.', techAvatar: 'KB', status: 'late',
    estimatedDuration: '2h', priority: 'medium', contractType: 'interne',
    checklist: [
      { item: 'Vérification ECG et SpO₂', done: false },
      { item: 'Test IBP (pression invasive)', done: false },
      { item: 'Calibration capteur température', done: false },
      { item: 'Vérification batterie interne', done: false },
      { item: 'Mise à jour logicielle', done: false },
    ]
  },
  {
    id: 'PM-008', equipment: 'Pompes à perfusion Alaris GP', dept: 'Médecine Interne',
    frequency: 'Annuel', lastDone: '2024-07-10', nextDue: '2025-07-10',
    daysLeft: 12, technician: 'Ndiaye F.', techAvatar: 'FN', status: 'planned',
    estimatedDuration: '3h (lot de 8)', priority: 'medium', contractType: 'interne',
    checklist: [
      { item: 'Test précision débit (gravimétrie)', done: false },
      { item: "Vérification alarmes occlusion", done: false },
      { item: 'Contrôle batterie et autonomie', done: false },
      { item: 'Nettoyage mécanisme seringue', done: false },
      { item: 'Certification métrologique', done: false },
    ]
  },
];

const initialStocks: StockItem[] = [
  { id: 'STK-001', name: 'Électrodes pédiatriques ECG', category: 'Consommables', quantity: 120, minThreshold: 50, unit: 'boîtes', price: 15000, supplier: 'BioSénégal SARL', status: 'Normal', location: 'Armoire A - Urgences', leadTimeWeeks: 2, consumptionPerWeek: 15 },
  { id: 'STK-002', name: 'Filtre antibactérien respirateur', category: 'Pièces Détachées', quantity: 18, minThreshold: 15, unit: 'unités', price: 28000, supplier: 'Dräger France', status: 'Critique', location: 'Dépôt Principal B', leadTimeWeeks: 6, consumptionPerWeek: 4 },
  { id: 'STK-003', name: 'Gel conducteur ultrasons 5L', category: 'Consommables', quantity: 2, minThreshold: 5, unit: 'bidons', price: 8500, supplier: 'Medica-Dakar', status: 'Critique', location: 'Armoire B - Maternité', leadTimeWeeks: 1, consumptionPerWeek: 3 },
  { id: 'STK-004', name: 'Batterie de secours défibrillateur Zoll', category: 'Batteries', quantity: 18, minThreshold: 6, unit: 'unités', price: 110000, supplier: 'Zoll SAS', status: 'Surstock', location: 'Dépôt Principal A', leadTimeWeeks: 8, consumptionPerWeek: 0.5 },
  { id: 'STK-005', name: 'Lampe halogène pour scialytique', category: 'Pièces Détachées', quantity: 12, minThreshold: 10, unit: 'unités', price: 35000, supplier: 'Surgical Light Co.', status: 'Normal', location: 'Bloc Op. - Réserve', leadTimeWeeks: 4, consumptionPerWeek: 1 },
];

const initialPurchaseOrders: PurchaseOrder[] = [];

// ── LocalStorage helpers ───────────────────────────────────────────────────

function lsGet<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function lsSet<T>(key: string, val: T) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota */ }
}

// ── Supabase sync helpers ──────────────────────────────────────────────────

// Map app table name → Supabase table name
const TABLE: Record<string, string> = {
  tickets: 'tickets',
  equipments: 'equipments',
  pmPlans: 'pm_plans',
  stocks: 'stocks',
  purchaseOrders: 'purchase_orders',
};

async function sbFetch<T>(table: string): Promise<T[] | null> {
  try {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data as T[];
  } catch { return null; }
}

// Upsert all + delete removed rows
async function sbSync<T extends { id: string }>(table: string, rows: T[]) {
  if (!rows.length) return;
  try {
    // upsert all current rows
    const { error: upsertErr } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
    if (upsertErr) throw upsertErr;

    // delete rows no longer present
    const ids = rows.map(r => r.id);
    const { data: existing } = await supabase.from(table).select('id');
    if (existing) {
      const toDelete = (existing as { id: string }[]).map(r => r.id).filter(id => !ids.includes(id));
      if (toDelete.length) {
        await supabase.from(table).delete().in('id', toDelete);
      }
    }
  } catch (e) {
    console.warn(`[Supabase] sync ${table} failed:`, e);
  }
}

// ── Context ────────────────────────────────────────────────────────────────

interface DataStoreContextType {
  tickets: Ticket[];
  setTickets: (val: Ticket[] | ((prev: Ticket[]) => Ticket[])) => void;
  equipments: Equipment[];
  setEquipments: (val: Equipment[] | ((prev: Equipment[]) => Equipment[])) => void;
  pmPlans: MaintenancePlan[];
  setPmPlans: (val: MaintenancePlan[] | ((prev: MaintenancePlan[]) => MaintenancePlan[])) => void;
  stocks: StockItem[];
  setStocks: (val: StockItem[] | ((prev: StockItem[]) => StockItem[])) => void;
  purchaseOrders: PurchaseOrder[];
  setPurchaseOrders: (val: PurchaseOrder[] | ((prev: PurchaseOrder[]) => PurchaseOrder[])) => void;
  supabaseReady: boolean;
}

const DataStoreContext = createContext<DataStoreContextType | null>(null);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [tickets, _setTickets] = useState<Ticket[]>(() => lsGet('gmao_tickets', initialTickets));
  const [equipments, _setEquipments] = useState<Equipment[]>(() => lsGet('gmao_equipments', initialEquipments));
  const [pmPlans, _setPmPlans] = useState<MaintenancePlan[]>(() => lsGet('gmao_pm', initialPlans));
  const [stocks, _setStocks] = useState<StockItem[]>(() => lsGet('gmao_stocks', initialStocks));
  const [purchaseOrders, _setPurchaseOrders] = useState<PurchaseOrder[]>(() => lsGet('gmao_purchase_orders', initialPurchaseOrders));
  const [supabaseReady, setSupabaseReady] = useState(false);
  const syncing = useRef(false);

  // Load from Supabase once a session exists (RLS requires an authenticated user).
  useEffect(() => {
    const syncFromSupabase = async () => {
      if (syncing.current) return;
      syncing.current = true;

      const [sbTickets, sbEquipments, sbPlans, sbStocks, sbPOs] = await Promise.all([
        sbFetch<Ticket>('tickets'),
        sbFetch<Equipment>('equipments'),
        sbFetch<MaintenancePlan>('pm_plans'),
        sbFetch<StockItem>('stocks'),
        sbFetch<PurchaseOrder>('purchase_orders'),
      ]);

      if (sbTickets !== null) {
        if (sbTickets.length === 0) {
          await sbSync('tickets', initialTickets);
          _setTickets(initialTickets);
          lsSet('gmao_tickets', initialTickets);
        } else {
          _setTickets(sbTickets);
          lsSet('gmao_tickets', sbTickets);
        }
      }
      if (sbEquipments !== null) {
        if (sbEquipments.length === 0) {
          await sbSync('equipments', initialEquipments);
          _setEquipments(initialEquipments);
          lsSet('gmao_equipments', initialEquipments);
        } else {
          _setEquipments(sbEquipments);
          lsSet('gmao_equipments', sbEquipments);
        }
      }
      if (sbPlans !== null) {
        if (sbPlans.length === 0) {
          await sbSync('pm_plans', initialPlans);
          _setPmPlans(initialPlans);
          lsSet('gmao_pm', initialPlans);
        } else {
          _setPmPlans(sbPlans);
          lsSet('gmao_pm', sbPlans);
        }
      }
      if (sbStocks !== null) {
        if (sbStocks.length === 0) {
          await sbSync('stocks', initialStocks);
          _setStocks(initialStocks);
          lsSet('gmao_stocks', initialStocks);
        } else {
          _setStocks(sbStocks);
          lsSet('gmao_stocks', sbStocks);
        }
      }
      if (sbPOs !== null) {
        _setPurchaseOrders(sbPOs);
        lsSet('gmao_purchase_orders', sbPOs);
      }

      setSupabaseReady(true);
      syncing.current = false;
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) syncFromSupabase();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') syncFromSupabase();
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Wrapped setters: update state + localStorage + Supabase
  const setTickets = (val: Ticket[] | ((prev: Ticket[]) => Ticket[])) => {
    _setTickets(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      lsSet('gmao_tickets', next);
      sbSync(TABLE.tickets, next);
      return next;
    });
  };

  const setEquipments = (val: Equipment[] | ((prev: Equipment[]) => Equipment[])) => {
    _setEquipments(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      lsSet('gmao_equipments', next);
      sbSync(TABLE.equipments, next);
      return next;
    });
  };

  const setPmPlans = (val: MaintenancePlan[] | ((prev: MaintenancePlan[]) => MaintenancePlan[])) => {
    _setPmPlans(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      lsSet('gmao_pm', next);
      sbSync(TABLE.pmPlans, next);
      return next;
    });
  };

  const setStocks = (val: StockItem[] | ((prev: StockItem[]) => StockItem[])) => {
    _setStocks(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      lsSet('gmao_stocks', next);
      sbSync(TABLE.stocks, next);
      return next;
    });
  };

  const setPurchaseOrders = (val: PurchaseOrder[] | ((prev: PurchaseOrder[]) => PurchaseOrder[])) => {
    _setPurchaseOrders(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      lsSet('gmao_purchase_orders', next);
      sbSync(TABLE.purchaseOrders, next);
      return next;
    });
  };

  return (
    <DataStoreContext.Provider value={{
      tickets, setTickets, equipments, setEquipments, pmPlans, setPmPlans,
      stocks, setStocks, purchaseOrders, setPurchaseOrders, supabaseReady,
    }}>
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore() {
  const ctx = useContext(DataStoreContext);
  if (!ctx) throw new Error('useDataStore must be inside DataStoreProvider');
  return ctx;
}
