import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Search, Filter, AlertTriangle,
  Plus, MoreVertical, ShoppingCart,
  BrainCircuit, TrendingDown, Clock, Zap, X, BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useDataStore } from '../contexts/DataStore';
import type { StockItem } from '../contexts/DataStore';
import { useTheme } from '../contexts/ThemeContext';

// ── Piste "Confort clair" (cf. Équipements) — pastilles catégorie + liseré statut ──
const STOCK_CAT_TAG: Record<string, { bg: string; text: string; bgDark: string; textDark: string }> = {
  'Consommables':      { bg: '#e9edfc', text: '#2451d6', bgDark: 'rgba(96,165,250,0.14)',  textDark: '#93c5fd' },
  'Pièces Détachées':  { bg: '#fdedd6', text: '#8a4c07', bgDark: 'rgba(251,191,36,0.14)',  textDark: '#fcd34d' },
  'Batteries':         { bg: '#f3e8fd', text: '#7c3aed', bgDark: 'rgba(167,139,250,0.14)', textDark: '#c4b5fd' },
  'Énergie':           { bg: '#dcf5f0', text: '#0d6b5c', bgDark: 'rgba(45,212,191,0.14)',  textDark: '#5eead4' },
};

const STOCK_ROW_STRIPE: Record<string, { light: string; dark: string }> = {
  'Normal':   { light: '#047857', dark: '#10b981' },
  'Critique': { light: '#e11d48', dark: '#f43f5e' },
  'Surstock': { light: '#2451d6', dark: '#60a5fa' },
};

const forecastData = [
  { week: 'S0', stock: 18, threshold: 15 },
  { week: 'S1', stock: 14, threshold: 15 },
  { week: 'S2', stock: 10, threshold: 15 },
  { week: 'S3', stock: 6, threshold: 15 },
  { week: 'S4', stock: 2, threshold: 15 },
  { week: 'S5', stock: 0, threshold: 15 },
  { week: 'S6', stock: 0, threshold: 15 },
  { week: 'S7', stock: 50, threshold: 15 }, // Arrivée prévue de la commande si passée mtn
];

// ── Add Article Modal ──────────────────────────────────────────────────────

interface AddArticleForm {
  name: string; category: string; quantity: string; minThreshold: string;
  unit: string; price: string; supplier: string; location: string;
}

function AddArticleModal({ onClose, onAdd }: { onClose: () => void; onAdd: (item: StockItem) => void }) {
  const [form, setForm] = useState<AddArticleForm>({
    name: '', category: 'Consommables', quantity: '', minThreshold: '',
    unit: 'pcs', price: '', supplier: '', location: '',
  });
  const [errors, setErrors] = useState<Partial<AddArticleForm>>({});

  const set = (k: keyof AddArticleForm, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Partial<AddArticleForm> = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) < 0) e.quantity = 'Quantité invalide';
    if (!form.minThreshold || isNaN(Number(form.minThreshold)) || Number(form.minThreshold) < 0) e.minThreshold = 'Seuil invalide';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const qty = Number(form.quantity);
    const min = Number(form.minThreshold);
    const status: StockItem['status'] = qty <= min ? 'Critique' : qty > min * 3 ? 'Surstock' : 'Normal';
    const newItem: StockItem = {
      id: `STK-${Date.now().toString().slice(-4)}`,
      name: form.name.trim(),
      category: form.category,
      quantity: qty,
      minThreshold: min,
      unit: form.unit || 'pcs',
      price: Number(form.price) || 0,
      supplier: form.supplier.trim(),
      status,
      location: form.location.trim(),
      leadTimeWeeks: 4,
      consumptionPerWeek: 1,
    };
    onAdd(newItem);
    onClose();
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors";
  const errCls = "text-[10px] text-rose-400 mt-0.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Package className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Nouvel Article</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom *</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="ex: Électrodes pédiatriques" className={inputCls} />
            {errors.name && <p className={errCls}>{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Catégorie</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                <option>Consommables</option>
                <option>Pièces Détachées</option>
                <option>Batteries</option>
                <option>Énergie</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Unité</label>
              <input type="text" value={form.unit} onChange={e => set('unit', e.target.value)} placeholder="pcs, boîtes, flacons…" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Quantité *</label>
              <input type="number" min="0" value={form.quantity} onChange={e => set('quantity', e.target.value)} className={inputCls} />
              {errors.quantity && <p className={errCls}>{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Seuil minimum *</label>
              <input type="number" min="0" value={form.minThreshold} onChange={e => set('minThreshold', e.target.value)} className={inputCls} />
              {errors.minThreshold && <p className={errCls}>{errors.minThreshold}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Prix unitaire (FCFA)</label>
              <input type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Fournisseur</label>
              <input type="text" value={form.supplier} onChange={e => set('supplier', e.target.value)} placeholder="ex: BioSénégal SARL" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Localisation</label>
            <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="ex: Armoire A - Urgences" className={inputCls} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors">Annuler</button>
          <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Bon de Commande Modal ──────────────────────────────────────────────────

function BonCommandeModal({ stocks, onClose }: { stocks: StockItem[]; onClose: () => void }) {
  const critiques = stocks.filter(s => s.quantity < s.minThreshold);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Bon de Commande — Hôpital Ndamatou Touba', 14, 20);
    doc.setFontSize(10);
    doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 14, 28);
    doc.text('Département : Maintenance Biomédicale', 14, 34);

    const rows = critiques.map(s => {
      const suggQty = Math.max(1, s.minThreshold * 2 - s.quantity);
      return [s.name, s.supplier || '—', `${s.quantity} ${s.unit}`, `${s.minThreshold} ${s.unit}`, `${suggQty} ${s.unit}`, `${(s.price * suggQty).toLocaleString('fr-FR')} FCFA`];
    });

    autoTable(doc, {
      startY: 42,
      head: [['Article', 'Fournisseur', 'Stock actuel', 'Seuil min.', 'Qté suggérée', 'Coût estimé']],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    const total = critiques.reduce((acc, s) => {
      const q = Math.max(1, s.minThreshold * 2 - s.quantity);
      return acc + s.price * q;
    }, 0);

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total estimé : ${total.toLocaleString('fr-FR')} FCFA`, 14, finalY);
    doc.save(`bon_commande_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-400" size={20} />
            <h3 className="text-lg font-bold text-white">Bon de Commande Auto</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        {critiques.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">Aucun article sous le seuil minimum.</p>
        ) : (
          <>
            <p className="text-xs text-slate-500 mb-4">{critiques.length} article(s) sous le seuil minimum. Quantité suggérée = seuil × 2 − stock actuel.</p>
            <div className="overflow-x-auto rounded-xl border border-slate-700/50">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase text-slate-500 bg-slate-900/40 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Article</th>
                    <th className="px-4 py-3">Fournisseur</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Qté suggérée</th>
                    <th className="px-4 py-3">Coût estimé</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {critiques.map(s => {
                    const sugg = Math.max(1, s.minThreshold * 2 - s.quantity);
                    return (
                      <tr key={s.id} className="hover:bg-slate-800/20">
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3 text-slate-400">{s.supplier || '—'}</td>
                        <td className="px-4 py-3 text-rose-400">{s.quantity} {s.unit}</td>
                        <td className="px-4 py-3 text-emerald-400 font-semibold">{sugg} {s.unit}</td>
                        <td className="px-4 py-3">{(s.price * sugg).toLocaleString('fr-FR')} FCFA</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
              <div className="text-sm font-bold text-white">
                Total : {critiques.reduce((acc, s) => acc + s.price * Math.max(1, s.minThreshold * 2 - s.quantity), 0).toLocaleString('fr-FR')} FCFA
              </div>
              <button onClick={generatePDF} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all active:scale-95 flex items-center gap-2">
                <ShoppingCart size={14} />
                Télécharger PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Stocks() {
  const { stocks, setStocks } = useDataStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommandeModal, setShowCommandeModal] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const filtered = stocks.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.id.toLowerCase().includes(search.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'Tous' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Tous', 'Consommables', 'Pièces Détachées', 'Batteries'];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {showAddModal && <AddArticleModal onClose={() => setShowAddModal(false)} onAdd={item => setStocks(s => [item, ...s])} />}
      {showCommandeModal && <BonCommandeModal stocks={stocks} onClose={() => setShowCommandeModal(false)} />}

      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 -mx-1"
        style={isLight ? { background: 'linear-gradient(135deg, #f3f1fb 0%, #eef3fb 100%)' } : undefined}
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: isLight ? '#1e1b2e' : undefined }}>Stocks & Supply Chain IA</h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              PRÉDICTION
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: isLight ? '#5b5876' : 'var(--text-muted)' }}>
            Suivi des consommables et prévisions d'approvisionnement assistées par IA.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/statistiques" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-all">
            <BarChart3 size={16} />
            Statistiques
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95 ${isLight ? '' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-900/30'}`}
            style={isLight ? { background: '#4c3fb0' } : undefined}
          >
            <Plus size={16} />
            Ajouter un Article
          </button>
        </div>
      </div>

      {/* AI Supply Chain Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Forecast Chart */}
        <div className="lg:col-span-2 glass border border-slate-700/40 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingDown size={18} className="text-blue-400" />
              Prévision d'épuisement : Filtre antibactérien (STK-002)
            </h2>
            <span className="text-xs font-bold px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Délai Fournisseur : 6 sem.</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <ReferenceLine y={15} label={{ position: 'insideTopLeft', value: 'Seuil Sécurité', fill: '#f59e0b', fontSize: 10 }} stroke="#f59e0b" strokeDasharray="3 3" />
                <ReferenceLine x="S4" label={{ position: 'insideBottomRight', value: 'Rupture (S4)', fill: '#f43f5e', fontSize: 10 }} stroke="#f43f5e" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="stock" name="Stock Projeté" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass border border-blue-500/30 rounded-2xl p-5 relative overflow-hidden bg-blue-500/5">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500"><BrainCircuit size={64} /></div>
          
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <BrainCircuit size={18} className="text-blue-400" />
            Insights IA & Auto-Order
          </h2>

          <div className="space-y-4 relative z-10">
            <div className="p-3 bg-slate-900/60 border border-slate-700 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Alerte de Rupture Imminente</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Le stock de <span className="text-slate-300 font-semibold">Filtre antibactérien</span> sera épuisé dans 4 semaines. Le délai de livraison (Dräger France) est de 6 semaines. Vous serez en rupture de stock pendant 2 semaines.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-700 rounded-xl">
               <div className="flex items-start gap-3">
                <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Recommandation d'Urgence</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Passer commande aujourd'hui. Emprunter temporairement 8 unités via <span className="text-blue-400 font-semibold">MedPool</span> auprès de l'Hôpital de Thiès pour couvrir le gap de 2 semaines.
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => setShowCommandeModal(true)} className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-95">
              <ShoppingCart size={14} />
              Générer Bon de Commande Auto
            </button>
            <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700">
              <Zap size={14} className="text-amber-400" />
              Chercher sur MedPool
            </button>
          </div>
        </div>

      </div>

      {/* Filter panel */}
      <div className="glass border border-slate-700/40 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            placeholder="Rechercher un consommable, pièce, fournisseur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-500" />
          <span className="text-sm text-slate-500">Catégorie:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-all ${
                categoryFilter === c
                  ? 'bg-slate-700 text-slate-200'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Table — liseré coloré par statut, pastille catégorie */}
      <div className="rounded-2xl glass border border-slate-700/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-base text-left" style={isLight ? { background: '#fbfaff' } : undefined}>
            <thead
              className="text-xs uppercase tracking-wider border-b"
              style={isLight ? { color: '#6b6790', background: '#f3f1fb', borderColor: '#e6e3f5' } : { color: 'var(--text-muted)', borderColor: 'var(--border-base)' }}
            >
              <tr>
                <th className="px-6 py-3.5 font-semibold">Désignation</th>
                <th className="px-6 py-3.5 font-semibold">Catégorie</th>
                <th className="px-6 py-3.5 font-semibold">Stock & IA</th>
                <th className="px-6 py-3.5 font-semibold">Fournisseur</th>
                <th className="px-6 py-3.5 font-semibold">Statut</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => {
                const stripe = STOCK_ROW_STRIPE[item.status];
                const stripeColor = stripe ? (isLight ? stripe.light : stripe.dark) : 'transparent';
                const catTag = STOCK_CAT_TAG[item.category];
                return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/30 transition-colors group"
                  style={{ boxShadow: `inset 4px 0 0 ${stripeColor}` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg flex-shrink-0">
                        <Package size={15} className="text-emerald-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-base text-slate-200 block">{item.name}</span>
                        <span className="font-mono text-sm text-slate-500">{item.id} · {item.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {catTag && (
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-medium"
                        style={{ background: isLight ? catTag.bg : catTag.bgDark, color: isLight ? catTag.text : catTag.textDark }}
                      >
                        {item.category}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${item.status === 'Critique' ? 'text-rose-400' : 'text-slate-200'}`}>
                          {item.quantity} {item.unit}
                        </span>
                        <span className="text-sm text-slate-500">/ min: {item.minThreshold}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="flex items-center gap-0.5" title="Consommation par semaine"><TrendingDown size={10} /> {item.consumptionPerWeek}/sem</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5" title="Délai de livraison"><Clock size={10} /> {item.leadTimeWeeks} sem (Lead)</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{item.supplier}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold ${
                      item.status === 'Normal' ? 'bg-emerald-500/10 text-emerald-400' :
                      item.status === 'Critique' ? 'bg-rose-500/10 text-rose-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-white rounded transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
