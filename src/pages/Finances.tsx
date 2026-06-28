import { useState } from 'react';
import {
  TrendingUp, CircleDollarSign, ArrowUpRight, ArrowDownRight,
  TrendingDown, ShoppingBag, ShieldAlert, Sparkles, FileText, CheckCircle2,
  AlertTriangle, DollarSign, Wallet, X, Plus
} from 'lucide-react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line,
  AreaChart, Area, ReferenceLine
} from 'recharts';

interface CostItem {
  id: string;
  equipment: string;
  department: string;
  maintenanceType: 'Préventif' | 'Curatif' | 'Étalonnage' | 'Pièces détachées';
  cost: number; // in FCFA
  date: string;
  status: 'Approuvé' | 'En attente' | 'Rejeté';
}

const initialCosts: CostItem[] = [
  { id: 'CST-001', equipment: 'IRM Siemens Magnetom Skyra', department: 'Radiologie', maintenanceType: 'Curatif', cost: 1250000, date: '28 Juin 2026', status: 'Approuvé' },
  { id: 'CST-002', equipment: 'Scanner GE Optima CT660', department: 'Urgences', maintenanceType: 'Pièces détachées', cost: 3500000, date: '27 Juin 2026', status: 'Approuvé' },
  { id: 'CST-003', equipment: 'Échographe Sonosite Edge II', department: 'Maternité', maintenanceType: 'Étalonnage', cost: 150000, date: '25 Juin 2026', status: 'Approuvé' },
  { id: 'CST-004', equipment: 'Moniteur Philips IntelliVue MX800', department: 'Réanimation', maintenanceType: 'Préventif', cost: 85000, date: '24 Juin 2026', status: 'Approuvé' },
  { id: 'CST-05', equipment: 'Automate Sysmex XN', department: 'Laboratoire Central', maintenanceType: 'Curatif', cost: 450000, date: '28 Juin 2026', status: 'En attente' },
];

const yearlyFinancials = [
  { month: 'Jan', budget: 8000000, reel: 7100000 },
  { month: 'Fév', budget: 8000000, reel: 8200000 },
  { month: 'Mar', budget: 8000000, reel: 6800000 },
  { month: 'Avr', budget: 10000000, reel: 9500000 },
  { month: 'Mai', budget: 10000000, reel: 11400000 }, // Over budget due to IRM repair
  { month: 'Jui', budget: 10000000, reel: 8800000 },
];

const departmentCosts = [
  { name: 'Radiologie', value: 5800000 },
  { name: 'Urgences', value: 4200000 },
  { name: 'Bloc Op.', value: 3100000 },
  { name: 'Réanimation', value: 1800000 },
  { name: 'Laboratoire', value: 950000 },
];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(val);
};

// ── Budget Planning ────────────────────────────────────────────────────────

interface BudgetEntry {
  id: string;
  dept: string;
  annee: number;
  alloue: number;
  type: string;
  notes: string;
}

function useBudgets() {
  const [budgets, setBudgets] = useState<BudgetEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem('gmao_budgets') || '[]'); } catch { return []; }
  });
  const save = (b: BudgetEntry[]) => {
    setBudgets(b);
    localStorage.setItem('gmao_budgets', JSON.stringify(b));
  };
  return { budgets, save };
}

function BudgetModal({ onClose }: { onClose: () => void }) {
  const { budgets, save } = useBudgets();
  const [dept, setDept] = useState('Radiologie');
  const [alloue, setAlloue] = useState('');
  const [annee, setAnnee] = useState('2026');
  const [type, setType] = useState('Préventif');
  const [notes, setNotes] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alloue) return;
    const entry: BudgetEntry = {
      id: `BDG-${Date.now()}`, dept, annee: Number(annee), alloue: Number(alloue), type, notes,
    };
    save([entry, ...budgets]);
    setAlloue(''); setNotes('');
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="text-violet-400" size={20} />
            <h3 className="text-lg font-bold text-white">Planification Budgétaire</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <form onSubmit={handleAdd} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Département</label>
              <select value={dept} onChange={e => setDept(e.target.value)} className={inputCls}>
                {['Radiologie', 'Urgences', 'Réanimation', 'Bloc Opératoire', 'Laboratoire'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Année</label>
              <input type="number" value={annee} onChange={e => setAnnee(e.target.value)} className={inputCls} min="2024" max="2030" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Budget alloué (FCFA) *</label>
              <input type="number" value={alloue} onChange={e => setAlloue(e.target.value)} placeholder="ex: 15000000" className={inputCls} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Type de dépense</label>
              <select value={type} onChange={e => setType(e.target.value)} className={inputCls}>
                {['Préventif', 'Curatif', 'Pièces', 'Calibration'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes</label>
            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Remarques optionnelles…" className={inputCls} />
          </div>
          <button type="submit" className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
            <Plus size={15} /> Ajouter au plan
          </button>
        </form>

        {budgets.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-700/50">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] uppercase text-slate-500 bg-slate-900/40 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3">Département</th>
                  <th className="px-4 py-3">Année</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Budget alloué</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {budgets.map(b => (
                  <tr key={b.id} className="hover:bg-slate-800/20">
                    <td className="px-4 py-2.5 font-medium">{b.dept}</td>
                    <td className="px-4 py-2.5">{b.annee}</td>
                    <td className="px-4 py-2.5 text-violet-400">{b.type}</td>
                    <td className="px-4 py-2.5 font-bold text-emerald-400">{formatCurrency(b.alloue)}</td>
                    <td className="px-4 py-2.5 text-slate-500">{b.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {budgets.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">Aucun budget planifié pour l'instant.</p>
        )}
      </div>
    </div>
  );
}

export default function Finances() {
  const [costsList] = useState<CostItem[]>(initialCosts);
  const [filterDept, setFilterDept] = useState('Tous');
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const totalCurative = costsList
    .filter(c => c.maintenanceType === 'Curatif' || c.maintenanceType === 'Pièces détachées')
    .reduce((acc, c) => acc + c.cost, 0);

  const totalPreventive = costsList
    .filter(c => c.maintenanceType === 'Préventif' || c.maintenanceType === 'Étalonnage')
    .reduce((acc, c) => acc + c.cost, 0);

  // Repair vs Replace Index simulation
  // Typically RRI = (Cumulative Maintenance Cost / Acquisition Cost) * 100
  // Over 50% means replacement is highly recommended.
  const rriData = [
    { name: 'IRM Siemens', index: 62, status: 'Remplacement requis' },
    { name: 'Scanner GE', index: 38, status: 'Sain' },
    { name: 'Respirateur Dräger', index: 48, status: 'À surveiller' },
    { name: 'Défibrillateur Zoll', index: 12, status: 'Excellent' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Gestion des Coûts & TCO</h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyse financière, budgets par centre de coûts, TCO (Total Cost of Ownership) et indices de remplacement (RRI).
          </p>
        </div>
        {showBudgetModal && <BudgetModal onClose={() => setShowBudgetModal(false)} />}
        <button onClick={() => setShowBudgetModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95">
          <FileText size={16} />
          Planification Budgétaire
        </button>
      </div>

      {/* KPI Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <p className="text-xs font-semibold text-slate-500 uppercase">Budget Annuel Alloué</p>
          <p className="text-2xl font-bold text-white mt-1.5">{formatCurrency(112000000)}</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
            <Wallet size={12} className="text-emerald-400" />
            <span>Exécution Q2 : 78%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <p className="text-xs font-semibold text-slate-500 uppercase">Coûts Curatif & Pièces</p>
          <p className="text-2xl font-bold text-rose-400 mt-1.5">{formatCurrency(totalCurative)}</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-rose-400/80">
            <TrendingUp size={12} />
            <span>+12% vs trimestre dernier</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <p className="text-xs font-semibold text-slate-500 uppercase">Coûts Préventif & Étalons</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1.5">{formatCurrency(totalPreventive)}</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-400/80">
            <TrendingDown size={12} />
            <span>-4% (optimisation des cycles)</span>
          </div>
        </div>

        {/* Repair vs Replace Alert */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <p className="text-xs font-semibold text-slate-500 uppercase">Alertes Remplacement (RRI)</p>
          <p className="text-2xl font-bold text-amber-400 mt-1.5">2 Équipements</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-400/80">
            <AlertTriangle size={12} />
            <span>Coût maintenance &gt; 50% valeur</span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Budget vs Reel Chart */}
        <div className="xl:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
          <h2 className="text-base font-semibold text-white mb-4">Suivi de la consommation budgétaire</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearlyFinancials} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" name="Budget alloué" dataKey="budget" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" name="Dépenses réelles" dataKey="reel" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Costs Bar */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <h2 className="text-base font-semibold text-white mb-4">Coûts par service clinique</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentCosts} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]}>
                {departmentCosts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : index === 1 ? '#f59e0b' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Repair vs Replace Indices (World-Class standard) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 p-5 rounded-2xl glass border border-slate-700/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-emerald-400" size={16} />
              <h2 className="text-sm font-semibold text-white">Repair vs Replace Index (RRI)</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Indicateur prédictif mondial comparant le cumul des frais de maintenance à la valeur d'acquisition à neuf de l'actif.
            </p>
            
            <div className="space-y-4">
              {rriData.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.name}</span>
                    <span className={item.index >= 50 ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                      RRI: {item.index}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.index >= 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${item.index}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Ledger */}
        <div className="xl:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
          <h2 className="text-base font-semibold text-white mb-4">Grand Livre des dépenses de maintenance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] uppercase text-slate-500 tracking-wider border-b border-slate-800 bg-slate-900/30">
                <tr>
                  <th className="px-4 py-3 font-semibold">Référence</th>
                  <th className="px-4 py-3 font-semibold">Équipement</th>
                  <th className="px-4 py-3 font-semibold">Département</th>
                  <th className="px-4 py-3 font-semibold">Type de frais</th>
                  <th className="px-4 py-3 font-semibold">Montant</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {costsList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-200">{item.equipment}</td>
                    <td className="px-4 py-3 text-slate-400">{item.department}</td>
                    <td className="px-4 py-3 text-slate-400 font-semibold">{item.maintenanceType}</td>
                    <td className="px-4 py-3 font-bold text-slate-200">{formatCurrency(item.cost)}</td>
                    <td className="px-4 py-3 text-slate-500">{item.date}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        item.status === 'Approuvé' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Budget N+1 Prediction */}
      {(() => {
        const ANNUAL_BUDGET = 112000000;
        const spent = yearlyFinancials.reduce((s, m) => s + m.reel, 0);
        const remaining = ANNUAL_BUDGET - spent;
        const avgMonthly = spent / yearlyFinancials.length;
        const months = ['Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const predData = months.map((month, i) => {
          const predicted = Math.round(avgMonthly * Math.pow(1.05, i + 1));
          return {
            month,
            predicted,
            upper: Math.round(predicted * 1.15),
            lower: Math.round(predicted * 0.85),
          };
        });
        const totalPredicted = predData.reduce((s, d) => s + d.predicted, 0);
        const isOverBudget = totalPredicted > remaining;

        return (
          <div className="p-5 rounded-2xl glass border border-slate-700/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="text-violet-400" size={16} />
                <h2 className="text-base font-semibold text-white">Prédiction Budget N+1 (6 mois)</h2>
              </div>
              <span className="text-xs text-slate-500">Algorithme: moyenne × 1.05 (inflation) ± 15%</span>
            </div>
            {isOverBudget && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle size={14} className="text-rose-400 flex-shrink-0" />
                <p className="text-xs text-rose-300 font-semibold">
                  Alerte : projection totale ({formatCurrency(totalPredicted)}) dépasse le budget restant ({formatCurrency(remaining)}) de {formatCurrency(totalPredicted - remaining)}.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40">
                <p className="text-[10px] text-slate-500 mb-1">Budget restant</p>
                <p className="text-lg font-bold text-emerald-400">{formatCurrency(remaining)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40">
                <p className="text-[10px] text-slate-500 mb-1">Projection 6 mois</p>
                <p className={`text-lg font-bold ${isOverBudget ? 'text-rose-400' : 'text-slate-200'}`}>{formatCurrency(totalPredicted)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40">
                <p className="text-[10px] text-slate-500 mb-1">Moyenne mensuelle prédite</p>
                <p className="text-lg font-bold text-violet-400">{formatCurrency(Math.round(totalPredicted / 6))}</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={predData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#475569" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }} />
                <Area type="monotone" dataKey="upper" name="Borne haute (+15%)" stroke="none" fill="url(#confGrad)" />
                <Area type="monotone" dataKey="predicted" name="Projection" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#predGrad)" dot={{ r: 4, fill: '#8b5cf6' }} />
                <Area type="monotone" dataKey="lower" name="Borne basse (-15%)" stroke="none" fill="none" />
                {isOverBudget && <ReferenceLine y={remaining / 6} stroke="#f43f5e" strokeDasharray="5 3" label={{ value: 'Budget/mois', fill: '#f43f5e', fontSize: 10 }} />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      })()}
    </div>
  );
}
