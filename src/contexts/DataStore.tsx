import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
  quantity: number;
  minQuantity: number;
  unit: string;
  location: string;
  supplier: string;
}

// ── Initial Data ───────────────────────────────────────────────────────────

const initialTickets: Ticket[] = [
  { id: 'TKT-1042', title: 'Erreur de calibration & instabilité de champ', equipment: 'IRM Siemens Magnetom Skyra', status: 'Ouvert', priority: 'Critique', date: '28 Juin, 09:30', assignee: 'Dr. Jean Diallo', location: 'Radiologie – Salle 2', sla: '1h 15m restants', slaUrgent: true },
  { id: 'TKT-1041', title: 'Bruit anormal et surchauffe du compresseur', equipment: 'Scanner GE Optima CT660', status: 'En Cours', priority: 'Haute', date: '27 Juin, 14:15', assignee: 'Tech. Amadou Ndiaye', location: 'Urgences', sla: '4h 30m restants', slaUrgent: false },
  { id: 'TKT-1039', title: 'Remplacement de la sonde cardiaque défectueuse', equipment: 'Échographe Sonosite Edge II', status: 'En Attente', priority: 'Moyenne', date: '22 Juin, 11:45', assignee: 'Fournisseur (Import)', location: 'Maternité', sla: 'Attente livraison', slaUrgent: false },
  { id: 'TKT-1040', title: 'Maintenance préventive trimestrielle Q2', equipment: 'Moniteur Philips IntelliVue MX800', status: 'Résolu', priority: 'Basse', date: '25 Juin, 10:00', assignee: 'Équipe BioMed', location: 'Réanimation – Lit 4', sla: 'Résolu dans les temps', slaUrgent: false },
  { id: 'TKT-1043', title: "Dysfonctionnement de l'alimentation électrique", equipment: 'Automate Sysmex XN', status: 'Ouvert', priority: 'Haute', date: '28 Juin, 11:00', assignee: 'Tech. Fatou Sow', location: 'Laboratoire Central', sla: '2h 45m restants', slaUrgent: true },
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
  { id: 'STK-001', name: 'Filtre HEPA', quantity: 2, minQuantity: 5, unit: 'pcs', location: 'Magasin A', supplier: 'Siemens' },
  { id: 'STK-002', name: 'Électrodes ECG', quantity: 150, minQuantity: 50, unit: 'pcs', location: 'Magasin B', supplier: 'Philips' },
  { id: 'STK-003', name: 'Réactif hématologie', quantity: 8, minQuantity: 10, unit: 'flacons', location: 'Labo', supplier: 'Sysmex' },
];

// ── LocalStorage Hook ──────────────────────────────────────────────────────

function useLocalStorage<T>(key: string, initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      // Écrire la valeur initiale pour que la clé apparaisse immédiatement
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    } catch {
      return initial;
    }
  });

  const setValue = (val: T | ((prev: T) => T)) => {
    setState(prev => {
      const next = typeof val === 'function' ? (val as (prev: T) => T)(prev) : val;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch { /* quota exceeded */ }
      return next;
    });
  };

  return [state, setValue];
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
}

const DataStoreContext = createContext<DataStoreContextType | null>(null);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useLocalStorage<Ticket[]>('gmao_tickets', initialTickets);
  const [equipments, setEquipments] = useLocalStorage<Equipment[]>('gmao_equipments', initialEquipments);
  const [pmPlans, setPmPlans] = useLocalStorage<MaintenancePlan[]>('gmao_pm', initialPlans);
  const [stocks, setStocks] = useLocalStorage<StockItem[]>('gmao_stocks', initialStocks);

  return (
    <DataStoreContext.Provider value={{ tickets, setTickets, equipments, setEquipments, pmPlans, setPmPlans, stocks, setStocks }}>
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore() {
  const ctx = useContext(DataStoreContext);
  if (!ctx) throw new Error('useDataStore must be inside DataStoreProvider');
  return ctx;
}
