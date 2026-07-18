import { useState } from 'react';
import { Network, Search, Filter, MapPin, ShieldCheck, Clock, ExternalLink, X, Plus, Tag } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';

const mockParts = [
  {
    id: 'MP-001',
    name: 'Filtre HEPA H14',
    category: 'Consommable',
    compatibleWith: ['Dräger Evita', 'Maquet Servo-i'],
    hospital: 'CHU de Fann - Dakar',
    distance: '4.2 km',
    availability: 'Immédiate',
    stock: 12,
    trustScore: 98,
    type: 'Sale',
    price: '45 000 FCFA',
  },
  {
    id: 'MP-002',
    name: 'Sonde Échographique Linéaire L12-3',
    category: 'Pièce Critique',
    compatibleWith: ['Philips Lumify', 'Philips Affiniti'],
    hospital: 'Hôpital Régional de Thiès',
    distance: '72 km',
    availability: 'Sur demande',
    stock: 1,
    trustScore: 94,
    type: 'Loan',
    price: 'Gratuit (Prêt inter-hospitalier)',
  },
  {
    id: 'MP-003',
    name: 'Batterie Li-ion 14.4V',
    category: 'Énergie',
    compatibleWith: ['Défibrillateur Zoll R Series'],
    hospital: 'Hôpital Principal de Dakar',
    distance: '1.5 km',
    availability: 'Immédiate',
    stock: 3,
    trustScore: 99,
    type: 'Sale',
    price: '120 000 FCFA',
  },
  {
    id: 'MP-004',
    name: 'Lampe Halogène 24V/150W',
    category: 'Éclairage',
    compatibleWith: ['Éclairage Opératoire Berchtold'],
    hospital: 'Centre de Santé de Rufisque',
    distance: '28 km',
    availability: 'Immédiate',
    stock: 8,
    trustScore: 85,
    type: 'Sale',
    price: '15 000 FCFA',
  },
  {
    id: 'MP-005',
    name: 'Capteur SpO2 Réutilisable Enfant',
    category: 'Capteur',
    compatibleWith: ['Moniteur Mindray BeneVision'],
    hospital: 'Hôpital de Pikine',
    distance: '12 km',
    availability: 'En transit',
    stock: 0,
    trustScore: 91,
    type: 'Loan',
    price: 'Gratuit',
  },
];

interface Part {
  id: string; name: string; category: string; compatibleWith: string[];
  hospital: string; distance: string; availability: string; stock: number;
  trustScore: number; type: string; price: string;
}

function ProposerModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Part) => void }) {
  const { push } = useNotifications();
  const [name, setName] = useState('');
  const [compat, setCompat] = useState('');
  const [compatTags, setCompatTags] = useState<string[]>([]);
  const [type, setType] = useState('Vente');
  const [prix, setPrix] = useState('');
  const [qty, setQty] = useState('');
  const [dispo, setDispo] = useState('Immédiate');
  const [desc, setDesc] = useState('');
  const [errors, setErrors] = useState<{name?: string; qty?: string}>({});

  const addTag = () => {
    if (compat.trim() && !compatTags.includes(compat.trim())) {
      setCompatTags(t => [...t, compat.trim()]);
      setCompat('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Nom requis';
    if (!qty || isNaN(Number(qty)) || Number(qty) < 1) errs.qty = 'Quantité invalide';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const prixLabel = type === 'Prêt' ? 'Gratuit (Prêt inter-hospitalier)' :
      Number(prix) > 0 ? `${Number(prix).toLocaleString('fr-FR')} FCFA` : 'Gratuit';

    const newPart: Part = {
      id: `MP-${Date.now().toString().slice(-4)}`,
      name: name.trim(), category: 'Pièce Proposée',
      compatibleWith: compatTags.length ? compatTags : ['Universel'],
      hospital: 'Hôpital Ndamatou Touba', distance: '0 km',
      availability: dispo, stock: Number(qty),
      trustScore: 99, type: type === 'Vente' ? 'Sale' : 'Loan',
      price: prixLabel,
    };
    onAdd(newPart);
    push({ type: 'success', title: 'Pièce proposée', message: `"${name}" publiée sur MedPool avec succès.` });
    onClose();
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Network className="text-violet-400" size={20} />
            <h3 className="text-lg font-bold text-white">Proposer une pièce</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom de la pièce *</label>
            <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(v => ({...v, name: ''})); }} placeholder="ex: Filtre HEPA H14" className={inputCls} />
            {errors.name && <p className="text-sm text-rose-400 mt-0.5">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Équipements compatibles (tags)</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={compat} onChange={e => setCompat(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="ex: Dräger Evita" className={inputCls} />
              <button type="button" onClick={addTag} className="px-3 py-2 bg-violet-600 rounded-xl text-white text-sm hover:bg-violet-500 transition-colors"><Plus size={14} /></button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {compatTags.map(t => (
                <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-sm border border-violet-500/30">
                  <Tag size={10} />{t}
                  <button type="button" onClick={() => setCompatTags(tags => tags.filter(x => x !== t))} className="ml-0.5 text-violet-400 hover:text-white"><X size={9} /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className={inputCls}>
                <option>Vente</option>
                <option>Prêt</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Prix (FCFA, 0 = gratuit)</label>
              <input type="number" min="0" value={prix} onChange={e => setPrix(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Quantité disponible *</label>
              <input type="number" min="1" value={qty} onChange={e => { setQty(e.target.value); setErrors(v => ({...v, qty: ''})); }} className={inputCls} />
              {errors.qty && <p className="text-sm text-rose-400 mt-0.5">{errors.qty}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Disponibilité</label>
              <select value={dispo} onChange={e => setDispo(e.target.value)} className={inputCls}>
                <option>Immédiate</option>
                <option>Sur demande</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Remarques, état, conditions de cession…" className={inputCls} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors">Annuler</button>
          <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-lg active:scale-95">
            Publier sur MedPool
          </button>
        </div>
      </form>
    </div>
  );
}

export default function MedPool() {
  const [parts, setParts] = useState(mockParts);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [showProposer, setShowProposer] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const filtered = parts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.compatibleWith.join(' ').toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'Tous' || 
                      (filterType === 'Vente' && p.type === 'Sale') || 
                      (filterType === 'Prêt' && p.type === 'Loan');
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {showProposer && <ProposerModal onClose={() => setShowProposer(false)} onAdd={p => setParts(prev => [p as typeof prev[0], ...prev])} />}

      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 -mx-1"
        style={isLight ? { background: 'linear-gradient(135deg, #f3f1fb 0%, #eef3fb 100%)' } : undefined}
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: isLight ? '#1e1b2e' : undefined }}>MedPool</h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30">
              RÉSEAU PARTENAIRE
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: isLight ? '#5b5876' : 'var(--text-muted)' }}>
            Marketplace d'entraide inter-hospitalière pour pièces détachées et consommables.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowProposer(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95 ${isLight ? 'text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
            style={isLight ? { background: '#4c3fb0' } : undefined}
          >
            <Network size={16} />
            Proposer une pièce
          </button>
        </div>
      </div>

      {/* Filters row */}
      <div className="glass border border-slate-700/40 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            placeholder="Rechercher une pièce, un modèle compatible..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-500" />
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700/50">
            {['Tous', 'Prêt', 'Vente'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  filterType === t
                    ? 'bg-slate-700 text-slate-200 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Parts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((part) => (
          <div key={part.id} className="glass border border-slate-700/40 rounded-2xl p-5 hover:border-violet-500/40 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-200 text-lg group-hover:text-violet-400 transition-colors">{part.name}</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 mt-1 inline-block">
                  {part.category}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${part.type === 'Loan' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                {part.type === 'Loan' ? 'Prêt' : 'Vente'}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">Compatible avec :</p>
                  <p className="text-xs">{part.compatibleWith.join(', ')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={16} className="text-slate-500 shrink-0" />
                <span className="truncate">{part.hospital}</span>
                <span className="text-xs font-medium bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 ml-auto shrink-0">{part.distance}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} className="text-slate-500 shrink-0" />
                  <span>Disponibilité :</span>
                </div>
                <span className={`font-medium ${part.availability === 'Immédiate' ? 'text-emerald-400' : part.availability === 'En transit' ? 'text-amber-400' : 'text-slate-300'}`}>
                  {part.availability} ({part.stock} en stock)
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Prix / Conditions</p>
                <p className="font-bold text-slate-200">{part.price}</p>
              </div>
              <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-900/20 active:scale-95 flex items-center gap-2">
                Demander <ExternalLink size={14} />
              </button>
            </div>
            
            {/* Trust Score indicator */}
            <div className="mt-3 flex items-center gap-1.5 justify-end">
               <span className="text-sm text-slate-500">Fiabilité Partenaire:</span>
               <span className="text-sm font-bold text-emerald-400">{part.trustScore}%</span>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500 glass rounded-2xl border border-slate-700/40">
          <Network size={40} className="mx-auto mb-3 text-slate-700" />
          <p className="font-medium text-slate-400">Aucune pièce trouvée sur le réseau</p>
          <p className="text-sm mt-1">Élargissez votre recherche ou demandez à un partenaire</p>
        </div>
      )}
    </div>
  );
}
