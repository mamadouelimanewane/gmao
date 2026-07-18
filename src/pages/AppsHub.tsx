import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, LayoutGrid, Search } from 'lucide-react';
import { useAuth, roleLabels } from '../contexts/AuthContext';
import {
  MODULE_GROUPS, CATEGORY_STYLE, totalModules, setActiveCategory, clearActiveCategory,
} from '../lib/appModules';
import type { CategoryKey } from '../lib/appModules';

const TEXT = '#111827';
const MUTED = '#5b6472';
const FAINT = '#8b93a1';
const PAGE_BG = '#eef1f8';

export default function AppsHub() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MODULE_GROUPS;
    return MODULE_GROUPS
      .map(g => ({ ...g, tiles: g.tiles.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) }))
      .filter(g => g.tiles.length > 0);
  }, [search]);

  const openTile = (categoryKey: CategoryKey, href: string) => {
    // La barre latérale ne montrera que les modules de cette catégorie.
    setActiveCategory(categoryKey);
    navigate(href);
  };

  const goClassic = () => {
    clearActiveCategory();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen" style={{ background: PAGE_BG, color: TEXT }}>
      {/* Barre d'accent multicolore */}
      <div className="h-1 w-full flex">
        {(Object.keys(CATEGORY_STYLE) as CategoryKey[]).map(k => (
          <div key={k} className="flex-1" style={{ background: CATEGORY_STYLE[k].color }} />
        ))}
      </div>

      {/* Header */}
      <header className="border-b" style={{ borderColor: '#e2e6f0', background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d769)' }}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <rect x="12" y="3" width="8" height="26" rx="2" fill="#0a3d2e" />
                <rect x="3" y="12" width="26" height="8" rx="2" fill="#0a3d2e" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-base leading-tight" style={{ color: TEXT }}>Portail GMAO</p>
              <p className="text-xs" style={{ color: MUTED }}>Hôpital Ndamatou Touba</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2 pr-3 border-r" style={{ borderColor: '#e2e6f0' }}>
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  {user.avatar}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold" style={{ color: TEXT }}>{user.name}</p>
                  <p className="text-[11px] text-emerald-600 font-medium">{roleLabels[user.role]}</p>
                </div>
              </div>
            )}
            <button
              onClick={goClassic}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border hover:shadow-sm"
              style={{ color: TEXT, borderColor: '#dfe3ee', background: '#f8f9fc' }}
            >
              <ArrowLeft size={15} /> Tableau de bord classique
            </button>
          </div>
        </div>
      </header>

      {/* Hero — Sable & Or */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f3d883 0%, #e0b54c 100%)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo-hub" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
              <polygon points="36,4 68,20 68,52 36,68 4,52 4,20" fill="none" stroke="#6b4a06" strokeWidth="0.8" />
              <circle cx="36" cy="36" r="5" fill="none" stroke="#6b4a06" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo-hub)" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5"
            style={{ borderColor: 'rgba(107,74,6,0.3)', background: 'rgba(255,255,255,0.5)' }}>
            <LayoutGrid size={14} style={{ color: '#6b4a06' }} />
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#6b4a06' }}>Portail d'accès</span>
          </div>
          <h1 className="font-black text-4xl sm:text-5xl tracking-tight mb-3" style={{ color: '#2b1f04' }}>
            {totalModules} modules GMAO
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8" style={{ color: '#5c4408' }}>
            Un seul écosystème pour la maintenance biomédicale, l'approvisionnement et le pilotage de l'Hôpital Ndamatou Touba.
          </p>

          {/* Stat chips */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            {MODULE_GROUPS.map(g => {
              const style = CATEGORY_STYLE[g.key];
              return (
                <div key={g.key} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border"
                  style={{ borderColor: 'rgba(107,74,6,0.25)', background: 'rgba(255,255,255,0.5)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: style.color }} />
                  <span className="text-xs font-semibold" style={{ color: '#4a3505' }}>{g.tiles.length}</span>
                  <span className="text-xs" style={{ color: '#6b4a06' }}>{g.label.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6b4a06' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un module…"
              className="w-full rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all placeholder-[#6b4a06]/50"
              style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(107,74,6,0.3)', color: '#5c4408' }}
              onFocus={e => { e.target.style.background = 'rgba(255,255,255,0.75)'; e.target.style.borderColor = 'rgba(107,74,6,0.5)'; }}
              onBlur={e => { e.target.style.background = 'rgba(255,255,255,0.55)'; e.target.style.borderColor = 'rgba(107,74,6,0.3)'; }}
            />
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {filteredGroups.length === 0 && (
          <p className="text-center py-16" style={{ color: MUTED }}>Aucun module ne correspond à « {search} ».</p>
        )}
        {filteredGroups.map(group => {
          const style = CATEGORY_STYLE[group.key];
          const CatIcon = style.icon;
          return (
            <section key={group.label}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: style.tint, color: style.color }}>
                  <CatIcon size={19} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold" style={{ color: TEXT }}>{group.label}</h2>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: style.tint, color: style.color }}>
                      {group.tiles.length}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: FAINT }}>{group.hint}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.tiles.map(tile => (
                  <button
                    key={tile.name}
                    onClick={() => openTile(group.key, tile.href)}
                    className="group relative flex items-start gap-4 p-5 rounded-2xl text-left transition-all hover:-translate-y-1 bg-white border-2"
                    style={{ borderColor: '#e7eaf3', boxShadow: '0 1px 3px rgba(17,24,39,0.06)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = style.color; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 24px -8px ${style.ring}`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7eaf3'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(17,24,39,0.06)'; }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: style.tint, color: style.color }}>
                      <tile.icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold truncate" style={{ color: TEXT }}>{tile.name}</p>
                      <p className="text-sm leading-snug mt-1" style={{ color: MUTED }}>{tile.desc}</p>
                      <div className="inline-flex items-center gap-1 mt-3 text-xs font-bold uppercase tracking-wide"
                        style={{ color: style.color }}>
                        Ouvrir <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="text-center pb-10">
        <p className="text-xs" style={{ color: FAINT }}>© 2026 GMAO Health · Hôpital Ndamatou Touba, Sénégal</p>
      </footer>
    </div>
  );
}
