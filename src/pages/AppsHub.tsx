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

export default function AppsHub() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen" style={{ background: '#070d1a' }}>
      {/* Motif géométrique de fond */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geo-hub" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#d4af37" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="6" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo-hub)" />
      </svg>

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
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
              <p className="text-white font-bold text-sm leading-tight">Portail GMAO</p>
              <p className="text-[11px] text-slate-500">Hôpital Ndamatou Touba</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:inline text-xs text-slate-400">
                {user.name} · <span className="text-emerald-400">{roleLabels[user.role]}</span>
              </span>
            )}
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ArrowLeft size={14} /> Tableau de bord classique
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
          style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.06)' }}>
          <LayoutGrid size={13} style={{ color: '#d4af37' }} />
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: '#d4af37' }}>Portail d'accès</span>
        </div>
        <h1 className="font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
          {totalApps} modules GMAO
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Un seul écosystème pour la maintenance biomédicale, l'approvisionnement et le pilotage de l'Hôpital Ndamatou Touba.
        </p>
      </div>

      {/* Groups */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 space-y-10">
        {GROUPS.map(group => (
          <section key={group.label}>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">{group.label}</h2>
              <span className="text-xs text-slate-500">{group.hint}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.tiles.map(tile => (
                <button
                  key={tile.name}
                  onClick={() => navigate(tile.href)}
                  className="group flex items-start gap-3.5 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/15 transition-colors">
                    <tile.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{tile.name}</p>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{tile.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: '#d4af37' }}>
                      Ouvrir <ArrowRight size={10} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="relative z-10 text-center pb-8">
        <p className="text-[10px] text-slate-600">© 2026 GMAO Health · Hôpital Ndamatou Touba, Sénégal</p>
      </footer>
    </div>
  );
}
