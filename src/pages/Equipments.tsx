import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Plus, Stethoscope, Eye, Pencil, Trash2,
  QrCode, MapPin, Calendar, X, CheckSquare2, BarChart2
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip
} from 'recharts';
import { useDataStore } from '../contexts/DataStore';
import type { Equipment } from '../contexts/DataStore';

const categories = ['Tous', 'Imagerie', 'Réanimation', 'Urgence', 'Chirurgie', 'Laboratoire'];
const statusFilters = ['Tous', 'Opérationnel', 'En Maintenance', 'En Panne'];

// ── Piste "Urgence Contrôlée" — badges pleins saturés, indépendants du
//    thème (poste de contrôle hospitalier, cf. index.css .uc-*) ──────────
const statusBadge: Record<string, string> = {
  'Opérationnel': 'uc-badge-ok',
  'En Panne': 'uc-badge-danger',
  'En Maintenance': 'uc-badge-warn',
};

const critBadge: Record<string, string> = {
  'Critique': 'uc-badge-danger',
  'Haute': 'uc-badge-warn',
  'Moyenne': 'uc-tag-blue',
  'Basse': 'uc-badge-neutral',
};

const CATEGORY_TAG: Record<string, string> = {
  'Imagerie':    'uc-tag-blue',
  'Réanimation': 'uc-tag-purple',
  'Urgence':     'uc-tag-rose',
  'Chirurgie':   'uc-tag-amber',
  'Laboratoire': 'uc-tag-teal',
};

const ROW_STRIPE: Record<string, string> = {
  'Opérationnel':   '#16a34a',
  'En Panne':       '#dc2626',
  'En Maintenance': '#f59e0b',
};

// ── Add Equipment Modal ──────────────────────────────────────────────────────

function AddEquipmentModal({ onClose, onAdd }: { onClose: () => void; onAdd: (eq: Equipment) => void }) {
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState('Imagerie');
  const [criticality, setCriticality] = useState('Haute');
  const [location, setLocation] = useState('');
  const [supplier, setSupplier] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Le nom est requis';
    if (!serialNumber.trim()) e.serialNumber = 'Le numéro de série est requis';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const newEq: Equipment = {
      id: `EQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name,
      serialNumber,
      category,
      status: 'Opérationnel',
      nextMaintenance: 'Non planifié',
      location: location || 'À définir',
      criticality,
      uptime: 100,
      age: 0,
      pss: 0,
      supplier,
      acquisitionDate,
    };
    onAdd(newEq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Nouvel Équipement</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom de l'équipement *</label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="ex: IRM Siemens..."
                className={`w-full bg-slate-800 border rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors ${errors.name ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-500'}`}
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Numéro de série *</label>
              <input
                type="text"
                value={serialNumber}
                onChange={e => { setSerialNumber(e.target.value); setErrors(p => ({ ...p, serialNumber: '' })); }}
                placeholder="SN-XXXX-XXXX"
                className={`w-full bg-slate-800 border rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors ${errors.serialNumber ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-500'}`}
              />
              {errors.serialNumber && <p className="text-xs text-rose-400 mt-1">{errors.serialNumber}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Catégorie *</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors">
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Criticité *</label>
              <select value={criticality} onChange={e => setCriticality(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors">
                <option>Critique</option>
                <option>Haute</option>
                <option>Moyenne</option>
                <option>Basse</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Localisation</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="ex: Radiologie – Salle 2" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Fournisseur</label>
              <input type="text" value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="Siemens, GE, Philips..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Date d'acquisition</label>
              <input type="date" value={acquisitionDate} onChange={e => setAcquisitionDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors">Annuler</button>
          <button type="submit" className="uc-btn-primary px-5 py-2 text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Equipment Drawer ─────────────────────────────────────────────────────────

function EquipmentDrawer({
  equipment,
  tickets,
  onClose,
  onCreateTicket,
}: {
  equipment: Equipment;
  tickets: { id: string; title: string; status: string; equipment: string }[];
  onClose: () => void;
  onCreateTicket: () => void;
}) {
  const linkedTickets = tickets.filter(t =>
    t.equipment.toLowerCase().includes(equipment.name.toLowerCase()) ||
    equipment.name.toLowerCase().includes(t.equipment.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[480px] h-full bg-slate-900 border-l border-slate-700/50 shadow-2xl flex flex-col animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 rounded-xl">
              <Stethoscope size={18} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">{equipment.name}</h2>
              <p className="text-xs text-slate-500 font-mono">{equipment.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5 flex-1">
          {/* Status badge */}
          <span className={`uc-badge ${statusBadge[equipment.status]}`}>
            <span className="uc-dot" />
            {equipment.status}
          </span>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Catégorie', value: equipment.category },
              { label: 'Criticité', value: equipment.criticality },
              { label: 'Uptime', value: `${equipment.uptime}%` },
              { label: 'Âge', value: `${equipment.age} ans` },
              { label: 'PSS', value: `${equipment.pss}/100` },
              { label: 'Prochaine PM', value: equipment.nextMaintenance },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <p className="text-[10px] text-slate-500 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-200">{value}</p>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={14} className="text-emerald-400" />
            {equipment.location}
          </div>

          {/* Uptime bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Uptime</span>
              <span className="font-bold text-emerald-400">{equipment.uptime}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${equipment.uptime >= 90 ? 'bg-emerald-500' : equipment.uptime >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                style={{ width: `${equipment.uptime}%` }}
              />
            </div>
          </div>

          {/* Linked tickets */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 mb-2">Tickets liés ({linkedTickets.length})</h3>
            {linkedTickets.length === 0 ? (
              <p className="text-xs text-slate-500">Aucun ticket pour cet équipement.</p>
            ) : (
              <div className="space-y-2">
                {linkedTickets.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                    <div>
                      <p className="text-xs font-mono text-slate-500">{t.id}</p>
                      <p className="text-xs text-slate-300 truncate max-w-[260px]">{t.title}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      t.status === 'Résolu' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      t.status === 'En Cours' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      t.status === 'Ouvert' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-slate-800 sticky bottom-0 bg-slate-900">
          <button
            onClick={() => { onCreateTicket(); onClose(); }}
            className="uc-btn-primary w-full py-2.5 text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            Créer un ticket pour cet équipement
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Compare Modal ────────────────────────────────────────────────────────────

function CompareModal({ equipments: eqs, onClose }: { equipments: Equipment[]; onClose: () => void }) {
  const radarData = [
    { subject: 'Uptime', ...Object.fromEntries(eqs.map(e => [e.id, e.uptime])) },
    { subject: 'PSS inversé', ...Object.fromEntries(eqs.map(e => [e.id, 100 - e.pss])) },
    { subject: 'Âge inversé', ...Object.fromEntries(eqs.map(e => [e.id, Math.max(0, 100 - e.age * 10)])) },
    { subject: 'Criticité', ...Object.fromEntries(eqs.map(e => [e.id, e.criticality === 'Critique' ? 100 : e.criticality === 'Haute' ? 75 : e.criticality === 'Moyenne' ? 50 : 25])) },
  ];

  const colors = ['#34d399', '#60a5fa', '#f59e0b'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Comparaison équipements</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Side-by-side table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs text-slate-500 font-medium pb-2 pr-4">Critère</th>
                {eqs.map((eq, i) => (
                  <th key={eq.id} className="text-left text-xs font-semibold pb-2 px-3" style={{ color: colors[i] }}>
                    {eq.name.split(' ').slice(0, 3).join(' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {[
                { label: 'Uptime', key: 'uptime' as keyof Equipment, fmt: (v: unknown) => `${v}%` },
                { label: 'PSS', key: 'pss' as keyof Equipment, fmt: (v: unknown) => `${v}/100` },
                { label: 'Criticité', key: 'criticality' as keyof Equipment, fmt: (v: unknown) => String(v) },
                { label: 'Âge', key: 'age' as keyof Equipment, fmt: (v: unknown) => `${v} ans` },
                { label: 'Localisation', key: 'location' as keyof Equipment, fmt: (v: unknown) => String(v) },
                { label: 'Statut', key: 'status' as keyof Equipment, fmt: (v: unknown) => String(v) },
              ].map(row => (
                <tr key={row.label} className="hover:bg-slate-800/20">
                  <td className="py-2.5 pr-4 text-xs text-slate-500 font-medium">{row.label}</td>
                  {eqs.map(eq => (
                    <td key={eq.id} className="py-2.5 px-3 text-xs text-slate-300">{row.fmt(eq[row.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Radar Chart */}
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/40">
          <h4 className="text-xs font-semibold text-slate-300 mb-3">Radar de performance</h4>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
              {eqs.map((eq, i) => (
                <Radar key={eq.id} name={eq.name} dataKey={eq.id} stroke={colors[i]} fill={colors[i]} fillOpacity={0.15} />
              ))}
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            {eqs.map((eq, i) => (
              <div key={eq.id} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                {eq.name.split(' ').slice(0, 2).join(' ')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Equipments() {
  const { equipments, setEquipments, tickets } = useDataStore();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeStatus, setActiveStatus] = useState('Tous');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEq, setSelectedEq] = useState<Equipment | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [prefillEquipmentForTicket, setPrefillEquipmentForTicket] = useState<string | undefined>();

  const filtered = equipments.filter(eq => {
    const matchCat = activeCategory === 'Tous' || eq.category === activeCategory;
    const matchSt = activeStatus === 'Tous' || eq.status === activeStatus;
    const matchSearch =
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.id.toLowerCase().includes(search.toLowerCase()) ||
      eq.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSt && matchSearch;
  });

  const toggleCompare = (id: string) => {
    setCompareList(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareEquipments = equipments.filter(e => compareList.includes(e.id));

  return (
    <>
      {showModal && (
        <AddEquipmentModal
          onClose={() => setShowModal(false)}
          onAdd={eq => setEquipments(prev => [...prev, eq])}
        />
      )}
      {selectedEq && (
        <EquipmentDrawer
          equipment={selectedEq}
          tickets={tickets}
          onClose={() => setSelectedEq(null)}
          onCreateTicket={() => {
            setPrefillEquipmentForTicket(selectedEq.name);
            navigate('/tickets');
          }}
        />
      )}
      {showCompare && compareEquipments.length >= 2 && (
        <CompareModal equipments={compareEquipments} onClose={() => setShowCompare(false)} />
      )}

      <div className="space-y-6 animate-fade-in-up">
        {/* Header — poste de contrôle : navy + liseré rouge */}
        <div className="uc-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 -mx-1">
          <div>
            <h1 className="uc-title text-2xl font-bold tracking-tight">Équipements</h1>
            <p className="uc-subtitle text-sm mt-1">
              <span className="uc-title font-semibold">{filtered.length}</span> équipements · Cycle de vie complet
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 text-sm font-medium rounded-xl transition-colors">
              <QrCode size={16} />
              <span className="hidden sm:inline">Scanner QR</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="uc-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95"
            >
              <Plus size={16} />
              Nouvel Équipement
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="glass border border-slate-700/40 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Rechercher par nom, ID, localisation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500" />
            <span className="text-sm text-slate-500">Statut:</span>
            {statusFilters.map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeStatus === st
                    ? 'bg-slate-700 text-slate-200'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          {compareList.length > 0 && (
            <span className="text-sm text-slate-400">
              {compareList.length}/3 sélectionnés pour comparaison
            </span>
          )}
        </div>

        {/* Equipment Table — liseré coloré par état, étiquettes de catégorie teintées */}
        <div className="rounded-2xl glass border border-slate-700/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-base text-left">
              <thead className="uc-thead text-xs uppercase tracking-wider border-b">
                <tr>
                  <th className="px-4 py-3 font-semibold w-8">
                    <CheckSquare2 size={13} className="text-slate-600" />
                  </th>
                  <th className="px-6 py-3 font-semibold">Équipement</th>
                  <th className="px-6 py-3 font-semibold">Catégorie</th>
                  <th className="px-6 py-3 font-semibold">Localisation</th>
                  <th className="px-6 py-3 font-semibold">Statut</th>
                  <th className="px-6 py-3 font-semibold">Criticité</th>
                  <th className="px-6 py-3 font-semibold">Patient Safety Score</th>
                  <th className="px-6 py-3 font-semibold">Uptime</th>
                  <th className="px-6 py-3 font-semibold">Prochaine Maint.</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((eq) => {
                  const stripeColor = ROW_STRIPE[eq.status] || 'transparent';
                  const catTag = CATEGORY_TAG[eq.category];
                  return (
                  <tr
                    key={eq.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                    style={{ boxShadow: `inset 4px 0 0 ${stripeColor}` }}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={compareList.includes(eq.id)}
                        onChange={() => toggleCompare(eq.id)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors flex-shrink-0">
                          <Stethoscope size={15} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-base text-slate-200">{eq.name}</p>
                          <p className="text-sm text-slate-500 font-mono">{eq.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {catTag && (
                        <span className={`uc-badge ${catTag}`}>
                          {eq.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <MapPin size={12} />
                        {eq.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`uc-badge ${statusBadge[eq.status]}`}>
                        <span className="uc-dot" />
                        {eq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`uc-badge ${critBadge[eq.criticality] || 'uc-badge-neutral'}`}>
                        {eq.criticality}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${eq.pss >= 80 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : eq.pss >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${eq.pss}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${eq.pss >= 80 ? 'text-rose-400' : eq.pss >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {eq.pss}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${eq.uptime >= 90 ? 'bg-emerald-500' : eq.uptime >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${eq.uptime}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400">{eq.uptime}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Calendar size={12} />
                        {eq.nextMaintenance}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedEq(eq)}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
                          title="Voir détails"
                        >
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"><Pencil size={14} /></button>
                        <button
                          onClick={() => setEquipments(prev => prev.filter(e => e.id !== eq.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Stethoscope size={40} className="mx-auto mb-3 text-slate-700" />
              <p className="font-medium text-slate-400">Aucun équipement trouvé</p>
              <p className="text-sm mt-1">Essayez de modifier vos filtres</p>
            </div>
          )}
        </div>
      </div>

      {/* Compare FAB */}
      {compareList.length >= 2 && (
        <button
          onClick={() => setShowCompare(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-bold rounded-2xl shadow-2xl shadow-blue-900/50 transition-all active:scale-95 animate-fade-in-up"
        >
          <BarChart2 size={16} />
          Comparer ({compareList.length} équipements)
        </button>
      )}
    </>
  );
}
