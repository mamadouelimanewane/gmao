import { useState, useEffect } from 'react';
import { useAuth, roleLabels } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';
import {
  User, Bell, Palette, Database, Info, Save,
  RotateCcw, Download, CheckCircle2, Shield, Moon, Sun
} from 'lucide-react';

interface NotifPrefs {
  pmRetard: boolean;
  stockCritique: boolean;
  slaDepasse: boolean;
  certifExpiree: boolean;
  delaiAlerte: 'J-7' | 'J-3' | 'J-1';
}

const DEFAULT_PREFS: NotifPrefs = {
  pmRetard: true,
  stockCritique: true,
  slaDepasse: true,
  certifExpiree: true,
  delaiAlerte: 'J-3',
};

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-2">
      <span className="text-sm text-slate-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-emerald-500' : 'bg-slate-700'}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </label>
  );
}

export default function Parametres() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLang();
  const { push } = useNotifications();

  const [prefs, setPrefs] = useState<NotifPrefs>(() => {
    try {
      const stored = localStorage.getItem('gmao_notif_prefs');
      return stored ? JSON.parse(stored) : DEFAULT_PREFS;
    } catch { return DEFAULT_PREFS; }
  });

  const [activeSection, setActiveSection] = useState('profil');
  const [saved, setSaved] = useState(false);

  // Persist prefs
  useEffect(() => {
    localStorage.setItem('gmao_notif_prefs', JSON.stringify(prefs));
  }, [prefs]);

  const handleSave = () => {
    setSaved(true);
    push({ type: 'success', title: 'Paramètres sauvegardés', message: 'Vos préférences ont été enregistrées avec succès.' });
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Réinitialiser toutes les données aux valeurs initiales ? Cette action est irréversible.')) {
      const keysToRemove = ['gmao_tickets', 'gmao_equipments', 'gmao_pm', 'gmao_stocks',
                            'gmao_notif_prefs', 'gmao_budgets', 'gmao_eco_detectors',
                            'gmao_eco_schedule'];
      keysToRemove.forEach(k => localStorage.removeItem(k));
      push({ type: 'warning', title: 'Données réinitialisées', message: 'Toutes les données ont été remises aux valeurs initiales. Rechargez la page.' });
    }
  };

  const handleExport = () => {
    const data: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith('gmao_')) {
        try { data[key] = JSON.parse(localStorage.getItem(key)!); } catch { data[key] = localStorage.getItem(key); }
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gmao_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    push({ type: 'info', title: 'Export réussi', message: 'Données exportées en JSON.' });
  };

  const sections = [
    { id: 'profil', label: 'Profil utilisateur', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'apparence', label: 'Apparence', icon: Palette },
    { id: 'donnees', label: 'Données', icon: Database },
    { id: 'apropos', label: 'À propos', icon: Info },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Paramètres</h1>
          <p className="text-sm text-slate-400 mt-1">Gérez votre profil, notifications et préférences.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {saved ? 'Sauvegardé !' : 'Sauvegarder'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar navigation */}
        <div className="lg:col-span-1">
          <nav className="glass border border-slate-700/40 rounded-2xl p-2 space-y-0.5">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">

          {/* Profil */}
          {activeSection === 'profil' && user && (
            <div className="glass border border-slate-700/40 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">Profil utilisateur</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                  {user.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Shield size={10} />
                    {roleLabels[user.role]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom complet</label>
                  <input readOnly defaultValue={user.name}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                  <input readOnly defaultValue={user.email}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Département</label>
                  <input readOnly defaultValue={user.dept}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Rôle (lecture seule)</label>
                  <input readOnly defaultValue={roleLabels[user.role]}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-300 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="glass border border-slate-700/40 rounded-2xl p-6 space-y-6" id="notifications">
              <h2 className="text-base font-semibold text-white">Préférences de notifications</h2>

              <div className="space-y-1 divide-y divide-slate-800">
                <Toggle checked={prefs.pmRetard} onChange={v => setPrefs(p => ({ ...p, pmRetard: v }))} label="PM en retard" />
                <Toggle checked={prefs.stockCritique} onChange={v => setPrefs(p => ({ ...p, stockCritique: v }))} label="Stock critique" />
                <Toggle checked={prefs.slaDepasse} onChange={v => setPrefs(p => ({ ...p, slaDepasse: v }))} label="SLA dépassé" />
                <Toggle checked={prefs.certifExpiree} onChange={v => setPrefs(p => ({ ...p, certifExpiree: v }))} label="Certification expirée" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-300 mb-3">Délai d'alerte PM</p>
                <div className="flex gap-3">
                  {(['J-7', 'J-3', 'J-1'] as const).map(d => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delai"
                        value={d}
                        checked={prefs.delaiAlerte === d}
                        onChange={() => setPrefs(p => ({ ...p, delaiAlerte: d }))}
                        className="accent-emerald-500"
                      />
                      <span className="text-sm text-slate-300">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Apparence */}
          {activeSection === 'apparence' && (
            <div className="glass border border-slate-700/40 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">Apparence</h2>

              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <div>
                  <p className="text-sm text-slate-300">Thème</p>
                  <p className="text-xs text-slate-500">{theme === 'dark' ? 'Mode sombre actif' : 'Mode clair actif'}</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm text-slate-300 transition-colors border border-slate-700"
                >
                  {theme === 'dark' ? <><Sun size={15} /> Mode clair</> : <><Moon size={15} /> Mode sombre</>}
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-slate-300">Langue</p>
                  <p className="text-xs text-slate-500">Langue de l'interface</p>
                </div>
                <div className="flex gap-2">
                  {[{ code: 'fr', label: '🇫🇷 Français' }, { code: 'en', label: '🇬🇧 English' }, { code: 'wo', label: '🇸🇳 Wolof' }].map(l => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code as 'fr' | 'en' | 'wo')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${lang === l.code ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Données */}
          {activeSection === 'donnees' && (
            <div className="glass border border-slate-700/40 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">Gestion des données</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Exporter toutes les données</p>
                    <p className="text-xs text-slate-500 mt-0.5">Télécharge un fichier JSON avec toutes les données GMAO</p>
                  </div>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
                  >
                    <Download size={15} />
                    Exporter JSON
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-rose-300">Réinitialiser les données</p>
                    <p className="text-xs text-rose-400/70 mt-0.5">Remet tous les tickets, équipements et stocks aux valeurs initiales</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
                  >
                    <RotateCcw size={15} />
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* À propos */}
          {activeSection === 'apropos' && (
            <div className="glass border border-slate-700/40 rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-semibold text-white">À propos de GMAO Health</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Version</span>
                  <span className="text-white font-semibold">v3.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Établissement</span>
                  <span className="text-white">Hôpital Ndamatou Touba</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Localisation</span>
                  <span className="text-white">Touba, Sénégal</span>
                </div>
                <div className="py-2 border-b border-slate-800">
                  <p className="text-slate-400 mb-2">Certifications</p>
                  <div className="flex gap-2 flex-wrap">
                    {['ISO 13485 : Dispositifs médicaux', 'JCI : Joint Commission International', 'ISO 14001 : Management environnemental'].map(c => (
                      <span key={c} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Développé par</span>
                  <span className="text-slate-300">Équipe BioMed · 2026</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
