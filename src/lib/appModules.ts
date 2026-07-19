import type { ElementType } from 'react';
import {
  Stethoscope, Wrench, ClipboardList, CalendarClock, Network,
  Leaf, Package, ShoppingCart, Users, Coins, UserCog, Sparkles, TrendingUp,
  FileBarChart, Map, Settings, BarChart3,
} from 'lucide-react';

export type CategoryKey = 'maintenance' | 'supply' | 'pilotage' | 'systeme';

export interface AppModule {
  name: string;
  desc: string;
  href: string;
  icon: ElementType;
}

export interface AppGroup {
  key: CategoryKey;
  label: string;
  hint: string;
  tiles: AppModule[];
}

export const CATEGORY_STYLE: Record<CategoryKey, { color: string; tint: string; ring: string; icon: ElementType }> = {
  maintenance: { color: '#059669', tint: '#ecfdf5', ring: 'rgba(5,150,105,0.35)', icon: Wrench },
  supply:      { color: '#2563eb', tint: '#eff6ff', ring: 'rgba(37,99,235,0.35)',  icon: Package },
  pilotage:    { color: '#7c3aed', tint: '#f5f3ff', ring: 'rgba(124,58,237,0.35)', icon: Sparkles },
  systeme:     { color: '#b8912a', tint: '#fdf8ea', ring: 'rgba(184,145,42,0.35)', icon: Settings },
};

// Source unique des modules — utilisée par le portail (/apps) ET
// par la barre latérale (Layout) pour rester toujours synchronisées.
export const MODULE_GROUPS: AppGroup[] = [
  {
    key: 'maintenance',
    label: 'Maintenance & Interventions',
    hint: 'Le quotidien biomédical',
    tiles: [
      { name: 'Équipements', desc: 'Inventaire, criticité, historique', href: '/equipements', icon: Stethoscope },
      { name: 'Interventions', desc: 'Tickets de dépannage et curatif', href: '/tickets', icon: Wrench },
      { name: 'Workflow Réparation', desc: 'Signalement → diagnostic → clôture', href: '/tickets', icon: ClipboardList },
      { name: 'PM Planifiées', desc: 'Maintenance préventive programmée', href: '/pm', icon: CalendarClock },
      { name: 'MedPool', desc: 'Réseau d\'entraide inter-hospitalière', href: '/medpool', icon: Network },
    ],
  },
  {
    key: 'supply',
    label: 'Approvisionnement & Ressources',
    hint: 'Stocks, achats et partenaires',
    tiles: [
      { name: 'Stocks & Achats', desc: 'Consommables et prévisions IA', href: '/stocks', icon: Package },
      { name: 'Workflow Achat', desc: 'Demande → validation → réception', href: '/achats', icon: ShoppingCart },
      { name: 'Fournisseurs', desc: 'Contrats, contacts, réactivité SLA', href: '/fournisseurs', icon: Users },
      { name: 'Coûts & TCO', desc: 'Budgets et coût total de possession', href: '/finances', icon: Coins },
      { name: 'Ressources Humaines', desc: 'Planning et équipe biomédicale', href: '/rh', icon: UserCog },
    ],
  },
  {
    key: 'pilotage',
    label: 'Pilotage & Innovation',
    hint: 'Décision, durabilité et IA',
    tiles: [
      { name: 'Analytics IoT', desc: 'Capteurs et analytique prédictive', href: '/analytics', icon: TrendingUp },
      { name: 'Statistiques', desc: 'Tous les indicateurs clés regroupés', href: '/statistiques', icon: BarChart3 },
      { name: 'Rapports', desc: 'Audit et conformité réglementaire', href: '/rapports', icon: FileBarChart },
      { name: 'IA Copilot', desc: 'Assistant intelligent de maintenance', href: '/ia', icon: Sparkles },
      { name: 'Énergie & ESG', desc: 'Optimisation énergétique et carbone', href: '/energie', icon: Leaf },
      { name: 'Plan Hôpital', desc: 'Cartographie interactive des services', href: '/plan', icon: Map },
    ],
  },
  {
    key: 'systeme',
    label: 'Système',
    hint: 'Réglages et comptes',
    tiles: [
      { name: 'Paramètres', desc: 'Profil, utilisateurs, apparence', href: '/settings', icon: Settings },
    ],
  },
];

export const totalModules = MODULE_GROUPS.reduce((n, g) => n + g.tiles.length, 0);

const ACTIVE_CATEGORY_KEY = 'gmao_active_category';

export function setActiveCategory(key: CategoryKey) {
  localStorage.setItem(ACTIVE_CATEGORY_KEY, key);
}

export function clearActiveCategory() {
  localStorage.removeItem(ACTIVE_CATEGORY_KEY);
}

export function getActiveCategory(): CategoryKey | null {
  const v = localStorage.getItem(ACTIVE_CATEGORY_KEY);
  return (v === 'maintenance' || v === 'supply' || v === 'pilotage' || v === 'systeme') ? v : null;
}

export function getGroupByKey(key: CategoryKey): AppGroup | undefined {
  return MODULE_GROUPS.find(g => g.key === key);
}
