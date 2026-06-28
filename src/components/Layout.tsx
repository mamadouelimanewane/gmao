import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Wrench, Package, Settings, Bell, Search,
  Menu, Stethoscope, TrendingUp, FileBarChart, X, ChevronRight,
  Wifi, WifiOff, LogOut, Users, Coins, Sparkles, UserCog,
  CalendarClock, CheckCircle2, AlertTriangle, Info, XCircle,
  Globe, Shield, Network, Leaf, Sun, Moon, Map
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';
import { useState, useEffect, useRef } from 'react';
import { useAuth, roleColors, roleLabels } from '../contexts/AuthContext';
import { useLang, langMeta } from '../contexts/LanguageContext';
import type { Lang } from '../contexts/LanguageContext';
import { useNotifications, toastIconColors } from '../contexts/NotificationContext';
import type { Notification } from '../contexts/NotificationContext';

const buildNav = (t: (k: string) => string) => [
  { name: t('dashboard'),     href: '/',            icon: LayoutDashboard, badge: null  },
  { name: t('equipements'),   href: '/equipements', icon: Stethoscope,     badge: null  },
  { name: t('interventions'), href: '/tickets',      icon: Wrench,          badge: '5'   },
  { name: t('pm'),            href: '/pm',           icon: CalendarClock,   badge: '2'   },
  { name: t('medpool'),       href: '/medpool',      icon: Network,         badge: null  },
  { name: t('energie'),       href: '/energie',      icon: Leaf,            badge: null  },
  { name: t('stocks'),        href: '/stocks',       icon: Package,         badge: null  },
  { name: t('fournisseurs'),  href: '/fournisseurs', icon: Users,           badge: null  },
  { name: t('finances'),      href: '/finances',     icon: Coins,           badge: null  },
  { name: t('rh'),            href: '/rh',           icon: UserCog,         badge: null  },
  { name: t('ia_copilot'),    href: '/ia',           icon: Sparkles,        badge: 'NEW' },
  { name: t('analytics'),     href: '/analytics',    icon: TrendingUp,      badge: null  },
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

  const navigation = buildNav((k) => t(k as Parameters<typeof t>[0]));
  const currentPage = navigation.find(n => n.href === location.pathname)?.name || t('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-['Inter',system-ui,sans-serif]">

      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Stethoscope size={22} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white">GMAO Health</span>
              <div className="text-[10px] text-slate-500 leading-none">v3.0 · Sénégal</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-500 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Online / offline banner */}
        <div className={cn(
          "mx-3 mt-3 mb-1 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium",
          online ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
        )}>
          {online ? <Wifi size={13} /> : <WifiOff size={13} />}
          {online ? t('online') + ' · Synchronisé' : t('offline') + ' · Mode cache'}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 px-3 py-2">Principal</p>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={cn(
                    "transition-colors flex-shrink-0",
                    isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
                  )} />
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
                    item.badge === 'NEW' ? 'bg-violet-500 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && <ChevronRight size={14} className="text-emerald-400" />}
              </Link>
            );
          })}

          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 px-3 py-2 mt-4">Système</p>
          <Link
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
              location.pathname === '/settings' ? "bg-emerald-500/15 text-emerald-400" : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
            )}
          >
            <Settings size={18} className="flex-shrink-0 text-slate-500 group-hover:text-slate-300" />
            {t('settings')}
          </Link>
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-3 border-t border-slate-800">
            <div className={`px-3 py-2 mb-2 rounded-xl bg-gradient-to-r ${roleColors[user.role]} bg-opacity-10`}>
              <div className="flex items-center gap-1.5">
                <Shield size={10} className="text-white/70" />
                <span className="text-[10px] font-bold text-white/80">{roleLabels[user.role]}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${roleColors[user.role]} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.dept}</p>
              </div>
              <button onClick={handleLogout} title={t('logout')}>
                <LogOut size={15} className="text-slate-500 hover:text-rose-400 transition-colors flex-shrink-0" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 lg:hidden transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <span>GMAO Health</span>
              <ChevronRight size={14} />
              <span className="text-slate-200 font-medium">{currentPage}</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-800"
              title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <Globe size={15} />
                <span>{langMeta[lang].flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-slate-900 border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden z-50">
                  {(Object.entries(langMeta) as [Lang, typeof langMeta[Lang]][]).map(([code, meta]) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left transition-colors ${
                        lang === code ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{meta.flag}</span>
                      <span className="font-medium">{meta.label}</span>
                      {lang === code && <CheckCircle2 size={10} className="ml-auto text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); }}
                className="relative p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-800"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-80 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                    <h3 className="text-sm font-semibold text-white">{t('notif_title')}</h3>
                    <button onClick={markAllRead} className="text-[10px] text-slate-500 hover:text-emerald-400 transition-colors">
                      {t('mark_read')}
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-6">{t('notif_empty')}</p>
                    ) : notifications.slice(0, 8).map((n: Notification) => {
                      const NIcon = notifTypeIcon[n.type];
                      return (
                        <div
                          key={n.id}
                          className={`flex gap-3 px-4 py-3 hover:bg-slate-800/40 transition-colors ${!n.read ? 'bg-slate-800/20' : ''}`}
                        >
                          <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${notifTypeBg[n.type]}`}>
                            <NIcon size={11} className={toastIconColors[n.type]} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <p className={`text-[11px] font-semibold leading-snug ${!n.read ? 'text-white' : 'text-slate-400'}`}>{n.title}</p>
                              {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1" />}
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[9px] text-slate-600 mt-1">{timeAgo(n.ts)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-slate-800 px-4 py-2.5">
                    <button
                      onClick={() => { setNotifOpen(false); navigate('/settings'); }}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                    >
                      Voir toutes les notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {user && (
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${roleColors[user.role]} flex items-center justify-center text-xs font-bold text-white cursor-pointer shadow-lg`}>
                {user.avatar}
              </div>
            )}
          </div>
        </header>

        {/* Offline banner */}
        {!online && (
          <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center justify-center gap-2 text-xs text-amber-300">
            <WifiOff size={13} />
            Mode hors ligne actif — Données mises en cache disponibles. Modifications synchronisées dès le retour réseau.
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-slate-900">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
