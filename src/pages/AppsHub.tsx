import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Stethoscope, Wrench, ClipboardList, CalendarClock, Network,
  Leaf, Package, ShoppingCart, Users, Coins, UserCog, Sparkles, TrendingUp,
  FileBarChart, Map, Settings, ArrowRight, ArrowLeft, LayoutGrid,
} from 'lucide-react';
import { useAuth, roleLabels } from '../contexts/AuthContext';

interface AppTile {
  name: string;
  desc: string;
  href: string;
  icon: React.ElementType;
}

interface AppGroup {
  label: string;
  hint: string;
  tiles: AppTile[];
}

const GROUPS: AppGroup[] = [
  {
    label: 'Maintenance & Interventions',
    hint: 'Le quotidien biomédical',
    tiles: [
      { name: 'Dashboard', desc: 'Vue temps réel du parc et des alertes', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Équipements', desc: 'Inventaire, criticité, historique', href: '/equipements', icon: Stethoscope },
      { name: 'Interventions', desc: 'Tickets de dépannage et curatif', href: '/tickets', icon: Wrench },
      { name: 'Workflow Réparation', desc: 'Signalement → diagnostic → clôture', href: '/tickets', icon: ClipboardList },
      { name: 'PM Planifiées', desc: 'Maintenance préventive programmée', href: '/pm', icon: CalendarClock },
      { name: 'MedPool', desc: 'Réseau d\'entraide inter-hospitalière', href: '/medpool', icon: Network },
    ],
  },
  {
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
    label: 'Pilotage & Innovation',
    hint: 'Décision, durabilité et IA',
    tiles: [
      { name: 'Analytics IoT', desc: 'Capteurs et analytique prédictive', href: '/analytics', icon: TrendingUp },
      { name: 'Rapports', desc: 'Audit et conformité réglementaire', href: '/rapports', icon: FileBarChart },
      { name: 'IA Copilot', desc: 'Assistant intelligent de maintenance', href: '/ia', icon: Sparkles },
      { name: 'Énergie & ESG', desc: 'Optimisation énergétique et carbone', href: '/energie', icon: Leaf },
      { name: 'Plan Hôpital', desc: 'Cartographie interactive des services', href: '/plan', icon: Map },
    ],
  },
  {
    label: 'Système',
    hint: 'Réglages et comptes',
    tiles: [
      { name: 'Paramètres', desc: 'Profil, utilisateurs, apparence', href: '/settings', icon: Settings },
    ],
  },
];

const totalApps = GROUPS.reduce((n, g) => n + g.tiles.length, 0);

// Palette fixe, douce et claire — indépendante du thème sombre/clair
// du reste de l'app, pour que le portail reste toujours lisible et
// accueillant (fond blanc cassé, jamais noir).
const C = {
  bg: '#f6f7fb',
  card: '#ffffff',
  border: '#e7e9f2',
  borderHover: 'rgba(212,175,55,0.4)',
  text: '#1e2532',
  muted: '#6b7280',
  faint: '#9aa1ae',
  gold: '#a9821f',
};

export default function AppsHub() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: C.border, background: C.card }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d769)' }}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <rect x="12" y="3" width="8" height="26" rx="2" fill="#0a3d2e" />
                <rect x="3" y="12" width="26" height="8" rx="2" fill="#0a3d2e" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-base leading-tight" style={{ color: C.text }}>Portail GMAO</p>
              <p className="text-xs" style={{ color: C.muted }}>Hôpital Ndamatou Touba</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:inline text-sm" style={{ color: C.muted }}>
                {user.name} · <span className="text-emerald-600 font-medium">{roleLabels[user.role]}</span>
              </span>
            )}
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors border"
              style={{ color: C.text, borderColor: C.border, background: '#f9fafc' }}
            >
              <ArrowLeft size={14} /> Tableau de bord classique
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
          style={{ borderColor: 'rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.08)' }}>
          <LayoutGrid size={14} style={{ color: C.gold }} />
          <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.gold }}>Portail d'accès</span>
        </div>
        <h1 className="font-black text-3xl sm:text-4xl tracking-tight mb-2" style={{ color: C.text }}>
          {totalApps} modules GMAO
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: C.muted }}>
          Un seul écosystème pour la maintenance biomédicale, l'approvisionnement et le pilotage de l'Hôpital Ndamatou Touba.
        </p>
      </div>

      {/* Groups */}
      <div className="max-w-6xl mx-auto px-6 pb-16 space-y-10">
        {GROUPS.map(group => (
          <section key={group.label}>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-base font-bold uppercase tracking-wide" style={{ color: C.text }}>{group.label}</h2>
              <span className="text-sm" style={{ color: C.faint }}>{group.hint}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.tiles.map(tile => (
                <button
                  key={tile.name}
                  onClick={() => navigate(tile.href)}
                  className="group flex items-start gap-3.5 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 border"
                  style={{ background: C.card, borderColor: C.border, boxShadow: '0 1px 2px rgba(16,24,40,0.04)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.borderHover; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(16,24,40,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(16,24,40,0.04)'; }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    <tile.icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold truncate" style={{ color: C.text }}>{tile.name}</p>
                    <p className="text-sm leading-snug mt-0.5" style={{ color: C.muted }}>{tile.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold uppercase tracking-wide"
                      style={{ color: C.gold }}>
                      Ouvrir <ArrowRight size={11} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="text-center pb-8">
        <p className="text-[10px]" style={{ color: C.faint }}>© 2026 GMAO Health · Hôpital Ndamatou Touba, Sénégal</p>
      </footer>
    </div>
  );
}
