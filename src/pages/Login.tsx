import { useState } from 'react';
import { Eye, EyeOff, Loader2, AlertCircle, Heart, Shield, Wrench, Settings } from 'lucide-react';
import { useAuth, roleLabels, roleColors } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';

// Note : par sécurité, les mots de passe ne sont jamais codés côté client.
// Ces raccourcis ne pré-remplissent que l'email ; le mot de passe reste à saisir.
const ACCOUNTS = [
  { role: 'technician' as UserRole, email: 'a.diallo@ndamatou.sn', name: 'Abdoulaye Diallo',   post: 'Technicien Biomédical'  },
  { role: 'engineer'   as UserRole, email: 'i.faye@ndamatou.sn',   name: 'Ibrahima Faye',      post: 'Ingénieur Biomédical'   },
  { role: 'director'   as UserRole, email: 'm.diop@ndamatou.sn',   name: 'Dr. Mariama Diop',   post: 'Directrice'             },
  { role: 'admin'      as UserRole, email: 'admin@ndamatou.sn',    name: 'Admin GMAO',         post: 'Administrateur Système' },
];

const RoleIcon: Record<UserRole, React.ElementType> = {
  technician: Wrench, engineer: Heart, director: Shield, admin: Settings,
};

const avatarColors: Record<UserRole, string> = {
  technician: 'from-cyan-400 to-blue-500',
  engineer:   'from-violet-400 to-purple-500',
  director:   'from-emerald-400 to-teal-500',
  admin:      'from-amber-400 to-orange-500',
};

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError('Identifiants incorrects. Vérifiez votre email et mot de passe.');
  };

  const quickFill = (acc: typeof ACCOUNTS[0], idx: number) => {
    setActiveCard(idx);
    setEmail(acc.email);
    setPassword('');
    setError('');
    document.getElementById('password-input')?.focus();
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#070d1a' }}>

      {/* ── PANNEAU GAUCHE — identité hôpital ─────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden">

        {/* Fond dégradé riche */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #0a3d2e 0%, #0d5c3a 30%, #0a4a30 60%, #052015 100%)'
        }} />

        {/* Motifs géométriques islamiques — SVG overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#d4af37" strokeWidth="0.8"/>
              <polygon points="40,16 64,28 64,52 40,64 16,52 16,28" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <circle cx="40" cy="40" r="6" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <line x1="40" y1="4" x2="40" y2="16" stroke="#d4af37" strokeWidth="0.4"/>
              <line x1="40" y1="64" x2="40" y2="76" stroke="#d4af37" strokeWidth="0.4"/>
              <line x1="4" y1="22" x2="16" y2="28" stroke="#d4af37" strokeWidth="0.4"/>
              <line x1="64" y1="52" x2="76" y2="58" stroke="#d4af37" strokeWidth="0.4"/>
              <line x1="76" y1="22" x2="64" y2="28" stroke="#d4af37" strokeWidth="0.4"/>
              <line x1="16" y1="52" x2="4" y2="58" stroke="#d4af37" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)"/>
        </svg>

        {/* Halos lumineux */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }} />

        {/* ── Header logo ── */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            {/* Croix médicale stylisée */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-2xl rotate-3"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f5d769)' }} />
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="12" y="3" width="8" height="26" rx="2" fill="#0a3d2e"/>
                  <rect x="3" y="12" width="26" height="8" rx="2" fill="#0a3d2e"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5" style={{ color: '#d4af37' }}>
                République du Sénégal
              </div>
              <div className="text-xs text-emerald-300/70 tracking-widest">Ministère de la Santé</div>
            </div>
          </div>

          {/* Nom de l'hôpital */}
          <div className="mb-3">
            <h1 className="font-black leading-tight" style={{
              fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
              background: 'linear-gradient(90deg, #f5d769 0%, #d4af37 40%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Hôpital<br/>Ndamatou
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px flex-1 opacity-30" style={{ background: '#d4af37' }} />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: '#d4af37' }}>Touba — Sénégal</span>
              <div className="h-px flex-1 opacity-30" style={{ background: '#d4af37' }} />
            </div>
          </div>

          <p className="text-emerald-200/60 text-sm leading-relaxed max-w-md mt-4">
            Système de Gestion de Maintenance Assistée par Ordinateur · Equipements biomédicaux, infrastructures et ressources hospitalières
          </p>
        </div>

        {/* ── Statistiques ── */}
        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { val: '400+', label: 'Équipements', icon: '🏥' },
              { val: '98.2%', label: 'Disponibilité', icon: '📈' },
              { val: '24/7', label: 'Surveillance', icon: '🛡️' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(212,175,55,0.2)' }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-black text-xl" style={{ color: '#f5d769' }}>{s.val}</div>
                <div className="text-xs text-emerald-300/60">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="flex items-center gap-3 flex-wrap">
            {['ISO 13485', 'JCI Accrédité', 'ISO 14001', 'OHSAS 18001'].map(cert => (
              <div key={cert} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold"
                style={{ borderColor: 'rgba(212,175,55,0.3)', color: '#d4af37', background: 'rgba(212,175,55,0.06)' }}>
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer gauche ── */}
        <div className="relative z-10">
          <div className="h-px w-full mb-4 opacity-20" style={{ background: '#d4af37' }} />
          <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span>© 2026 GMAO Health · Hôpital Ndamatou</span>
            <span>Développé par Antigravity AI</span>
          </div>
        </div>
      </div>

      {/* ── PANNEAU DROIT — formulaire ─────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-10 relative"
        style={{ background: 'linear-gradient(180deg, #090f1e 0%, #070d1a 100%)' }}>

        {/* Halo décoratif droit */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-10 blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0d5c3a 0%, transparent 70%)' }} />

        <div className="w-full max-w-[420px]">

          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f5d769)' }}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect x="12" y="3" width="8" height="26" rx="2" fill="#0a3d2e"/>
                <rect x="3" y="12" width="26" height="8" rx="2" fill="#0a3d2e"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Hôpital Ndamatou</div>
              <div className="text-[10px] text-slate-500">Touba, Sénégal</div>
            </div>
          </div>

          {/* Titre section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-0.5 rounded-full" style={{ background: '#d4af37' }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#d4af37' }}>
                Portail GMAO
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Connexion</h2>
            <p className="text-sm text-slate-500 mt-1">Accédez à votre espace de gestion</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 tracking-wide">
                EMAIL PROFESSIONNEL
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="prenom.nom@ndamatou.sn"
                required
                className="w-full rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.5)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 tracking-wide">
                MOT DE PASSE
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all pr-12"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.5)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                >
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <AlertCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              style={{
                background: loading ? 'rgba(212,175,55,0.5)' : 'linear-gradient(135deg, #d4af37 0%, #f5d769 50%, #d4af37 100%)',
                color: '#0a3d2e',
                boxShadow: '0 8px 32px rgba(212,175,55,0.25)',
              }}
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Connexion en cours…</>
                : <><span>Se connecter</span><span className="text-lg">→</span></>
              }
            </button>
          </form>

          {/* Accès rapide */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-600">Accès rapide</span>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {ACCOUNTS.map((acc, idx) => {
                const Icon = RoleIcon[acc.role];
                const isActive = activeCard === idx;
                return (
                  <button
                    type="button"
                    key={acc.role}
                    onClick={() => quickFill(acc, idx)}
                    disabled={loading}
                    className="relative flex items-center gap-3 p-3 rounded-xl text-left transition-all group disabled:opacity-50 overflow-hidden"
                    style={{
                      background: isActive ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                      border: isActive ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    }}
                    onMouseLeave={e => {
                      if (activeCard !== idx) {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                      }
                    }}
                  >
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${avatarColors[acc.role]} flex items-center justify-center shrink-0`}>
                      <Icon size={13} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-200 truncate">{acc.name.split(' ')[0]} {acc.name.split(' ')[1]}</p>
                      <p className="text-[9px] text-slate-600 truncate">{acc.post.split(' ')[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-[10px] text-slate-600 text-center">
              Cliquez sur votre profil pour pré-remplir l'email, puis saisissez votre mot de passe.
            </p>
          </div>

          {/* Indicateur statut système */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Système opérationnel · GMAO v3.0 · Touba, Sénégal
          </div>
        </div>
      </div>
    </div>
  );
}
