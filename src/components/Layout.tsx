import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Wrench, Package, Settings, Bell, Search,
  Menu, Stethoscope, TrendingUp, FileBarChart, X, ChevronRight,
  Wifi, WifiOff, LogOut, Users, Coins, Sparkles, UserCog,
  CalendarClock, CheckCircle2, AlertTriangle, Info, XCircle,
  Globe, Shield, Network, Leaf, Sun, Moon, Map, ShoppingCart, ClipboardList, LayoutGrid, BarChart3
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';
import { useState, useEffect, useRef } from 'react';
import { useAuth, roleColors, roleLabels } from '../contexts/AuthContext';
import { useLang, langMeta } from '../contexts/LanguageContext';
import type { Lang } from '../contexts/LanguageContext';
import { useNotifications, toastIconColors } from '../contexts/NotificationContext';
import type { Notification } from '../contexts/NotificationContext';
import { getActiveCategory, clearActiveCategory, MODULE_GROUPS, CATEGORY_STYLE } from '../lib/appModules';

const buildNav = (t: (k: string) => string) => [
  { name: t('dashboard'),     href: '/apps',        icon: LayoutGrid,      badge: null  },
  { name: t('equipements'),   href: '/equipements', icon: Stethoscope,     badge: null  },
  { name: t('interventions'), href: '/tickets',      icon: Wrench,          badge: '5'   },
  { name: t('reparation'),    href: '/tickets',      icon: ClipboardList,   badge: null  },
  { name: t('pm'),            href: '/pm',           icon: CalendarClock,   badge: '2'   },
  { name: t('medpool'),       href: '/medpool',      icon: Network,         badge: null  },
  { name: t('energie'),       href: '/energie',      icon: Leaf,            badge: null  },
  { name: t('stocks'),        href: '/stocks',       icon: Package,         badge: null  },
  { name: t('achats'),        href: '/achats',       icon: ShoppingCart,    badge: null  },
  { name: t('fournisseurs'),  href: '/fournisseurs', icon: Users,           badge: null  },
  { name: t('finances'),      href: '/finances',     icon: Coins,           badge: null  },
  { name: t('rh'),            href: '/rh',           icon: UserCog,         badge: null  },
  { name: t('ia_copilot'),    href: '/ia',           icon: Sparkles,        badge: 'NEW' },
  { name: t('analytics'),     href: '/analytics',    icon: TrendingUp,      badge: null  },
  { name: t('statistiques'),  href: '/statistiques', icon: BarChart3,       badge: null  },
  { name: t('rapports'),      href: '/rapports',     icon: FileBarChart,    badge: null  },
  { name: 'Plan Hôpital',    href: '/plan',          icon: Map,             badge: null  },
];

const notifTypeIcon = { success: CheckCircle2, warning: AlertTriangle, error: XCircle, info: Info };
const notifTypeBg = {
  success: 'bg-emerald-500/10 border-emerald-500/20',
  warning: 'bg-amber-500/10 border-amber-500/20',
  error:   'bg-rose-500/10 border-rose-500/20',
  info:    'bg-blue-500/10 border-blue-500/20',
};

function timeAgo(ts: Date): string {
  const diff = Math.round((Date.now() - ts.getTime()) / 60000);
  if (diff < 1) return 'À l\'instant';
  if (diff < 60) return `Il y a ${diff} min`;
  if (diff < 1440) return `Il y a ${Math.round(diff / 60)}h`;
  return `Il y a ${Math.round(diff / 1440)}j`;
}

export default function Layout() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLang();
  const { notifications, unreadCount, markAllRead, dismiss } = useNotifications();

  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [langOpen,     setLangOpen]     = useState(false);
  const [online,       setOnline]       = useState(navigator.onLine);
  const [searchQuery,  setSearchQuery]  = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const langRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on  = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online',  on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (langRef.current  && !langRef.current.contains(e.target as Node))  setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allNavigation = buildNav((k) => t(k as Parameters<typeof t>[0]));

  // Si on est arrivé via une boîte du portail (/apps), la barre latérale ne
  // montre que les modules de cette catégorie — Dashboard et Paramètres
  // restent toujours accessibles.
  const activeCategory = getActiveCategory();
  const activeGroup = activeCategory ? MODULE_GROUPS.find(g => g.key === activeCategory) : null;
  const pinnedHrefs = new Set(['/apps', '/settings']);
  const categoryHrefs = activeGroup ? new Set(activeGroup.tiles.map(tl => tl.href)) : null;
  const navigation = categoryHrefs
    ? allNavigation.filter(n => pinnedHrefs.has(n.href) || categoryHrefs.has(n.href))
    : allNavigation;

  const currentPage = allNavigation.find(n => n.href === location.pathname)?.name || t('statistiques');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const showAllModules = () => {
    clearActiveCategory();
    navigate('/apps');
  };

  const isLight = theme === 'light';

  return (
    <div className="min-h-screen flex font-['Inter',system-ui,sans-serif]"
      style={{ background: 'var(--bg-app)', color: 'var(--text-primary)' }}>

      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-base)',
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5"
          style={{ borderBottom: '1px solid var(--border-base)' }}>
          <Link to="/apps" className="flex items-center gap-2.5" title="Retour au portail des applications">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Stethoscope size={22} className="text-emerald-500" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>GMAO Health</span>
              <div className="text-[10px] leading-none" style={{ color: 'var(--text-muted)' }}>v3.0 · Ndamatou</div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)}
            className="p-1 rounded lg:hidden transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Online / offline banner */}
        <div className={cn(
          "mx-3 mt-3 mb-1 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium",
          online ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
        )}>
          {online ? <Wifi size={13} /> : <WifiOff size={13} />}
          {online ? t('online') + ' · Synchronisé' : t('offline') + ' · Mode cache'}
        </div>

        {/* Vue filtrée par catégorie (arrivée depuis le portail /apps) */}
        {activeGroup && (
          <div className="mx-3 mt-3 mb-1 p-3 rounded-lg border" style={{ borderColor: CATEGORY_STYLE[activeGroup.key].color + '40', background: CATEGORY_STYLE[activeGroup.key].tint }}>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: CATEGORY_STYLE[activeGroup.key].color }}>
              Vue filtrée
            </p>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{activeGroup.label}</p>
            <button
              onClick={showAllModules}
              className="text-[11px] font-semibold underline"
              style={{ color: CATEGORY_STYLE[activeGroup.key].color }}
            >
              Voir tous les modules →
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 py-2"
            style={{ color: 'var(--text-faint)' }}>Principal</p>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
                style={isActive ? {
                  background: 'rgba(16,185,129,0.12)',
                  color: '#10b981',
                } : {
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; } }}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="flex-shrink-0 transition-colors"
                    style={{ color: isActive ? '#10b981' : 'var(--text-faint)' }} />
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
                    item.badge === 'NEW' ? 'bg-violet-500 text-white' : 'bg-rose-500 text-white'
                  }`}>{item.badge}</span>
                )}
                {isActive && !item.badge && <ChevronRight size={14} className="text-emerald-500" />}
              </Link>
            );
          })}

          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 py-2 mt-4"
            style={{ color: 'var(--text-faint)' }}>Système</p>
          <Link
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
            style={location.pathname === '/settings' ? { background: 'rgba(16,185,129,0.12)', color: '#10b981' } : { color: 'var(--text-muted)' }}
            onMouseEnter={e => { if (location.pathname !== '/settings') { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; } }}
            onMouseLeave={e => { if (location.pathname !== '/settings') { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; } }}
          >
            <Settings size={18} className="flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
            {t('settings')}
          </Link>
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-3" style={{ borderTop: '1px solid var(--border-base)' }}>
            <div className={`px-3 py-2 mb-2 rounded-xl bg-gradient-to-r ${roleColors[user.role]} bg-opacity-10`}>
              <div className="flex items-center gap-1.5">
                <Shield size={10} className="text-white/70" />
                <span className="text-[10px] font-bold text-white/80">{roleLabels[user.role]}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
              style={{ background: 'var(--bg-elevated)' }}>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${roleColors[user.role]} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user.dept}</p>
              </div>
              <button onClick={handleLogout} title={t('logout')}>
                <LogOut size={15} className="text-rose-400 hover:text-rose-500 transition-colors flex-shrink-0" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 backdrop-blur-xl"
          style={{
            background: 'var(--bg-topbar)',
            borderBottom: '1px solid var(--border-base)',
          }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg lg:hidden transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span>GMAO</span>
              <ChevronRight size={14} />
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{currentPage}</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16}
                style={{ color: 'var(--text-faint)' }} />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-soft)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1">

            {/* Portail des applications */}
            <button
              onClick={() => navigate('/apps')}
              title="Portail des applications"
              className="p-2 rounded-xl transition-colors hidden sm:flex"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; }}
            >
              <LayoutGrid size={17} />
            </button>

            {/* Theme Toggle — pill switch. Le libellé reflète le thème
                ACTUELLEMENT actif (pas la destination du clic), pour éviter
                toute confusion sur l'état réel de l'interface. */}
            <button
              onClick={toggleTheme}
              title={isLight ? 'Thème clair actif — cliquer pour passer en sombre' : 'Thème sombre actif — cliquer pour passer en clair'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: isLight ? '#f1f5f9' : '#0f172a',
                color: isLight ? '#0f172a' : '#f8fafc',
                border: '1px solid var(--border-base)',
              }}
            >
              {isLight ? <Sun size={14} /> : <Moon size={14} />}
              <span className="hidden sm:inline">{isLight ? 'Clair' : 'Sombre'}</span>
            </button>

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ color: 'var(--text-muted)', background: langOpen ? 'var(--bg-elevated)' : '' }}
              >
                <Globe size={15} />
                <span>{langMeta[lang].flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl shadow-2xl overflow-hidden z-50"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-base)' }}>
                  {(Object.entries(langMeta) as [Lang, typeof langMeta[Lang]][]).map(([code, meta]) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left transition-colors"
                      style={lang === code
                        ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
                        : { color: 'var(--text-muted)' }}
                      onMouseEnter={e => { if (lang !== code) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                      onMouseLeave={e => { if (lang !== code) (e.currentTarget as HTMLElement).style.background = ''; }}
                    >
                      <span className="text-base">{meta.flag}</span>
                      <span className="font-medium">{meta.label}</span>
                      {lang === code && <CheckCircle2 size={10} className="ml-auto text-emerald-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); }}
                className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-base)' }}>
                  <div className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: '1px solid var(--border-soft)' }}>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('notif_title')}</h3>
                    <button onClick={markAllRead} className="text-[10px] text-emerald-500 transition-colors">
                      {t('mark_read')}
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-center py-6" style={{ color: 'var(--text-muted)' }}>{t('notif_empty')}</p>
                    ) : notifications.slice(0, 8).map((n: Notification) => {
                      const NIcon = notifTypeIcon[n.type];
                      return (
                        <div key={n.id}
                          className={`flex gap-3 px-4 py-3 transition-colors ${!n.read ? 'bg-emerald-500/5' : ''}`}
                          style={{ borderBottom: '1px solid var(--border-soft)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = !n.read ? 'rgba(16,185,129,0.05)' : ''}
                        >
                          <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${notifTypeBg[n.type]}`}>
                            <NIcon size={11} className={toastIconColors[n.type]} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <p className="text-[11px] font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                              {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1" />}
                            </div>
                            <p className="text-[10px] mt-0.5 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{n.message}</p>
                            <p className="text-[9px] mt-1" style={{ color: 'var(--text-faint)' }}>{timeAgo(n.ts)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5" style={{ borderTop: '1px solid var(--border-soft)' }}>
                    <button
                      onClick={() => { setNotifOpen(false); navigate('/settings'); }}
                      className="text-[11px] text-emerald-500 hover:text-emerald-400 transition-colors font-medium"
                    >
                      Voir toutes les notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {user && (
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${roleColors[user.role]} flex items-center justify-center text-xs font-bold text-white cursor-pointer shadow-lg ml-1`}>
                {user.avatar}
              </div>
            )}
          </div>
        </header>

        {/* Offline banner */}
        {!online && (
          <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center justify-center gap-2 text-xs text-amber-600">
            <WifiOff size={13} />
            Mode hors ligne actif — Données mises en cache disponibles. Modifications synchronisées dès le retour réseau.
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: 'var(--bg-app)' }}>
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
