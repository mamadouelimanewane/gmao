import { useState, useEffect } from 'react';
import { useAuth, roleLabels, roleColors } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';
import { supabase } from '../lib/supabase';
import { createUser, updateUser, deleteUser } from '../lib/adminApi';
import {
  User, Bell, Palette, Database, Info, Save,
  RotateCcw, Download, CheckCircle2, Shield, Moon, Sun,
  Users, Plus, Trash2, X, KeyRound
} from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dept: string;
  avatar: string;
}

const ROLE_PRIVILEGES: { role: UserRole; privileges: string[] }[] = [
  { role: 'technician', privileges: ['Créer et traiter des tickets (workflow réparation)', 'Consulter équipements, stocks et plans PM', 'Créer des demandes d\'achat'] },
  { role: 'engineer', privileges: ['Tout ce que peut faire un technicien', 'Gérer les équipements et plans de maintenance', 'Marquer une commande comme envoyée/reçue'] },
  { role: 'director', privileges: ['Valider ou rejeter les demandes d\'achat', 'Consulter rapports, finances et tableaux de bord', 'Accès à tous les modules en lecture'] },
  { role: 'admin', privileges: ['Tous les droits ci-dessus', 'Gérer les comptes utilisateurs et leurs rôles', 'Accès aux paramètres système'] },
];

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

function AddUserModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('technician');
  const [dept, setDept] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password || !dept.trim()) { setError('Tous les champs sont requis'); return; }
    setSubmitting(true);
    setError('');
    const res = await createUser({ name: name.trim(), email: email.trim(), password, role, dept: dept.trim() });
    setSubmitting(false);
    if (res.error) { setError(res.error); return; }
    onCreated();
    onClose();
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Nouvel utilisateur</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom complet *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ex: Fatou Sow" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="prenom.nom@ndamatou.sn" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Mot de passe temporaire *</label>
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="min. 6 caractères" className={inputCls} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Rôle *</label>
              <select value={role} onChange={e => setRole(e.target.value as UserRole)} className={inputCls}>
                <option value="technician">Technicien</option>
                <option value="engineer">Ingénieur</option>
                <option value="director">Directeur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Département *</label>
              <input type="text" value={dept} onChange={e => setDept(e.target.value)} placeholder="ex: Urgences" className={inputCls} />
            </div>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors">Annuler</button>
          <button type="submit" disabled={submitting} className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95 disabled:opacity-60">
            {submitting ? 'Création…' : 'Créer le compte'}
          </button>
        </div>
      </form>
    </div>
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

  const isAdmin = user?.role === 'admin';
  const [users, setUsers] = useState<Profile[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const loadUsers = async () => {
    setUsersLoading(true);
    const { data } = await supabase.from('profiles').select('*').order('name');
    setUsers((data as Profile[]) || []);
    setUsersLoading(false);
  };

  useEffect(() => {
    if (activeSection === 'utilisateurs' && isAdmin) loadUsers();
  }, [activeSection, isAdmin]);

  const handleRoleChange = async (id: string, role: UserRole) => {
    const res = await updateUser(id, { role });
    if (res.error) { push({ type: 'error', title: 'Erreur', message: res.error }); return; }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    push({ type: 'success', title: 'Rôle mis à jour', message: `${users.find(u => u.id === id)?.name || ''} → ${roleLabels[role]}` });
  };

  const handleDeleteUser = async (u: Profile) => {
    if (!window.confirm(`Supprimer le compte de ${u.name} ? Cette action est irréversible.`)) return;
    const res = await deleteUser(u.id);
    if (res.error) { push({ type: 'error', title: 'Erreur', message: res.error }); return; }
    setUsers(prev => prev.filter(x => x.id !== u.id));
    push({ type: 'success', title: 'Utilisateur supprimé', message: u.name });
  };

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
    ...(isAdmin ? [{ id: 'utilisateurs', label: 'Utilisateurs & Rôles', icon: Users }] : []),
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

          {/* Utilisateurs & Rôles */}
          {activeSection === 'utilisateurs' && isAdmin && (
            <div className="space-y-6">
              {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} onCreated={loadUsers} />}

              <div className="glass border border-slate-700/40 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <h2 className="text-base font-semibold text-white">Comptes utilisateurs</h2>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
                  >
                    <Plus size={15} /> Nouvel utilisateur
                  </button>
                </div>

                {usersLoading ? (
                  <p className="text-sm text-slate-500 text-center py-8">Chargement…</p>
                ) : (
                  <div className="space-y-2">
                    {users.map(u => (
                      <div key={u.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColors[u.role]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {u.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-200 truncate">{u.name}</p>
                          <p className="text-xs text-slate-500 truncate">{u.email} · {u.dept}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u.id, e.target.value as UserRole)}
                            disabled={u.id === user?.id}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                          >
                            <option value="technician">Technicien</option>
                            <option value="engineer">Ingénieur</option>
                            <option value="director">Directeur</option>
                            <option value="admin">Administrateur</option>
                          </select>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={u.id === user?.id}
                            title={u.id === user?.id ? 'Vous ne pouvez pas supprimer votre propre compte' : 'Supprimer'}
                            className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {users.length === 0 && <p className="text-sm text-slate-500 text-center py-8">Aucun utilisateur</p>}
                  </div>
                )}
              </div>

              <div className="glass border border-slate-700/40 rounded-2xl p-6">
                <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <KeyRound size={16} className="text-emerald-400" /> Privilèges par rôle
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROLE_PRIVILEGES.map(({ role, privileges }) => (
                    <div key={role} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r ${roleColors[role]} text-white mb-3`}>
                        <Shield size={11} /> {roleLabels[role]}
                      </span>
                      <ul className="space-y-1.5">
                        {privileges.map(p => (
                          <li key={p} className="text-xs text-slate-400 flex items-start gap-1.5">
                            <span className="text-emerald-500 mt-0.5">•</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
