import { useState } from 'react';
import { Stethoscope, Wrench, Shield, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth, roleLabels, roleColors } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';

const DEMO_ACCOUNTS = [
  { role: 'technician' as UserRole, email: 'a.diallo@hopital.sn', password: 'tech123', name: 'Abdoulaye Diallo' },
  { role: 'engineer'   as UserRole, email: 'i.faye@hopital.sn',   password: 'ing123',  name: 'Ibrahima Faye'   },
  { role: 'director'   as UserRole, email: 'm.diop@hopital.sn',   password: 'dir123',  name: 'Dr. Mariama Diop'},
  { role: 'admin'      as UserRole, email: 'admin@hopital.sn',    password: 'admin123', name: 'Admin GMAO'     },
];

const roleIcons: Record<UserRole, React.ElementType> = {
  technician: Wrench, engineer: Stethoscope, director: Shield, admin: Shield,
};

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError('Email ou mot de passe incorrect.');
  };

  const quickLogin = async (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
    setLoading(true);
    await login(acc.email, acc.password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-xl shadow-blue-950/60 mb-4">
            <Stethoscope size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">GMAO Health</h1>
          <p className="text-sm text-slate-400 mt-1">Gestion de Maintenance Hospitalière</p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-slate-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Hôpital Principal de Dakar — Sénégal
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-7 shadow-2xl shadow-slate-950/80">
          <h2 className="text-base font-semibold text-white mb-5">Connexion à votre espace</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email professionnel</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="prenom.nom@hopital.sn"
                required
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <AlertCircle size={13} className="text-rose-400 shrink-0" />
                <p className="text-xs text-rose-300">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-950/50 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Connexion…</> : 'Se connecter'}
            </button>
          </form>

          {/* Quick Login */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Accès rapide — Comptes démo</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map(acc => {
                const Icon = roleIcons[acc.role];
                return (
                  <button
                    key={acc.role}
                    onClick={() => quickLogin(acc)}
                    disabled={loading}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border border-slate-700/60 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800 transition-all text-left group disabled:opacity-50`}
                  >
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${roleColors[acc.role]}`}>
                      <Icon size={11} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-200">{acc.name.split(' ')[0]}</p>
                      <p className="text-[9px] text-slate-500">{roleLabels[acc.role].split(' ')[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-[9px] text-slate-600 text-center mt-3">Mots de passe démo : tech123 · ing123 · dir123 · admin123</p>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-5">
          © 2025 GMAO Health · Développé par Antigravity AI · Certifié ISO 13485
        </p>
      </div>
    </div>
  );
}
