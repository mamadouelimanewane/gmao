import { useState } from 'react';
import {
  Users, Search, Plus, Phone, Mail, Award, CheckCircle,
  AlertTriangle, ShieldCheck, ExternalLink, Globe, Star, X
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  category: 'Constructeur' | 'Distributeur Local' | 'Prestataire de service';
  contactName: string;
  email: string;
  phone: string;
  location: string;
  rating: number; // 1 to 5 stars
  providedParts: string[];
  activeContracts: number;
  slaResponsiveness: string; // e.g. "2h", "24h"
  status: 'Actif' | 'Sous évaluation' | 'Inactif';
}

const initialSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Siemens Healthineers Sénégal',
    category: 'Constructeur',
    contactName: 'M. Ibrahima Diop',
    email: 'ibrahima.diop@siemens.com',
    phone: '+221 33 824 55 66',
    location: 'Dakar, Almadies',
    rating: 4.8,
    providedParts: ['Tubes RX', 'Bobines IRM', 'Cartes électroniques de puissance'],
    activeContracts: 3,
    slaResponsiveness: '4h',
    status: 'Actif'
  },
  {
    id: 'SUP-002',
    name: 'BioSénégal SARL',
    category: 'Distributeur Local',
    contactName: 'Mme. Aminata Tall',
    email: 'contact@biosenegal.sn',
    phone: '+221 33 869 12 34',
    location: 'Dakar, Fann Résidence',
    rating: 4.2,
    providedParts: ['Électrodes ECG', 'Batteries de secours', 'Câbles de rechange'],
    activeContracts: 5,
    slaResponsiveness: '2h',
    status: 'Actif'
  },
  {
    id: 'SUP-003',
    name: 'Medica-Dakar',
    category: 'Distributeur Local',
    contactName: 'M. Cheikh Tidiane',
    email: 'cheikh.tidiane@medica.sn',
    phone: '+221 33 842 98 76',
    location: 'Dakar, Plateau',
    rating: 3.5,
    providedParts: ['Gel ultrasons', 'Papier ECG', 'Lampes de scialytique'],
    activeContracts: 1,
    slaResponsiveness: '24h',
    status: 'Sous évaluation'
  },
  {
    id: 'SUP-004',
    name: 'Dräger Service Afrique',
    category: 'Constructeur',
    contactName: 'M. Marc Dubois',
    email: 'marc.dubois@draeger.com',
    phone: '+33 1 46 11 20 00',
    location: 'France (Support Distant / Import)',
    rating: 4.7,
    providedParts: ['Filtres antibactériens', 'Valves expiratoires', 'Capteurs O2'],
    activeContracts: 2,
    slaResponsiveness: '48h',
    status: 'Actif'
  }
];

// Add Supplier Modal
function AddSupplierModal({ onClose, onAdd }: { onClose: () => void; onAdd: (supplier: Supplier) => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Constructeur' | 'Distributeur Local' | 'Prestataire de service'>('Distributeur Local');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [sla, setSla] = useState('24h');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactName || !email || !phone) return;
    const newSup: Supplier = {
      id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
      name,
      category,
      contactName,
      email,
      phone,
      location,
      rating: 5.0,
      providedParts: [],
      activeContracts: 0,
      slaResponsiveness: sla,
      status: 'Actif'
    };
    onAdd(newSup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Nouveau Fournisseur</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom de l'entreprise *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex: Siemens Healthineers Sénégal"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Catégorie *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Constructeur">Constructeur</option>
                <option value="Distributeur Local">Distributeur Local</option>
                <option value="Prestataire de service">Prestataire de service</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Temps de réponse (SLA) *</label>
              <input
                type="text"
                required
                value={sla}
                onChange={e => setSla(e.target.value)}
                placeholder="ex: 4h, 24h"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Nom du contact principal *</label>
            <input
              type="text"
              required
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              placeholder="ex: M. Ibrahima Diop"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email de contact *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ex: contact@entreprise.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Téléphone *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="ex: +221 33 800 00 00"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Adresse / Localisation</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="ex: Dakar, Almadies"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
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

export default function Fournisseurs() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('Tous');

  const handleAddSupplier = (newSup: Supplier) => {
    setSuppliers([newSup, ...suppliers]);
  };

  const filtered = suppliers.filter(sup => {
    const matchesSearch = sup.name.toLowerCase().includes(search.toLowerCase()) ||
                          sup.contactName.toLowerCase().includes(search.toLowerCase()) ||
                          sup.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'Tous' || sup.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {showModal && <AddSupplierModal onClose={() => setShowModal(false)} onAdd={handleAddSupplier} />}
      
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Fournisseurs & Constructeurs</h1>
            <p className="text-sm text-slate-400 mt-1">
              Gérez les relations, contrats de garantie et pièces détachées fournis par vos partenaires.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
          >
            <Plus size={16} />
            Ajouter un Fournisseur
          </button>
        </div>

        {/* Filters */}
        <div className="glass border border-slate-700/40 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Rechercher par entreprise, contact, adresse..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filtrer:</span>
            {['Tous', 'Constructeur', 'Distributeur Local', 'Prestataire de service'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-slate-700 text-slate-200'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Suppliers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((sup) => (
            <div key={sup.id} className="p-5 rounded-2xl glass border border-slate-700/40 hover:border-slate-600/50 transition-all flex flex-col justify-between">
              <div>
                {/* Top Badge & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                    sup.category === 'Constructeur' ? 'bg-blue-500/10 text-blue-400' :
                    sup.category === 'Distributeur Local' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    {sup.category}
                  </span>
                  
                  <span className={`inline-flex items-center text-xs font-semibold ${
                    sup.status === 'Actif' ? 'text-emerald-400' :
                    sup.status === 'Sous évaluation' ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      sup.status === 'Actif' ? 'bg-emerald-400' :
                      sup.status === 'Sous évaluation' ? 'bg-amber-400' : 'bg-slate-500'
                    }`} />
                    {sup.status}
                  </span>
                </div>

                {/* Company Name & Rating */}
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-base font-bold text-white tracking-tight">{sup.name}</h3>
                  <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-xs text-amber-400 font-semibold flex-shrink-0">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {sup.rating}
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-4">{sup.location}</p>

                {/* Main Contact info */}
                <div className="space-y-2 mb-4 p-3 rounded-xl bg-slate-900/40 border border-slate-850">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <span className="text-slate-500">Contact:</span> {sup.contactName}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400">
                    <a href={`tel:${sup.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                      <Phone size={12} /> {sup.phone}
                    </a>
                    <a href={`mailto:${sup.email}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                      <Mail size={12} /> {sup.email}
                    </a>
                  </div>
                </div>

                {/* Provided parts */}
                {sup.providedParts.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5">Pièces & consommables clés</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sup.providedParts.map((part) => (
                        <span key={part} className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700/50">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer info: Contracts and SLA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Award size={13} className="text-emerald-400" />
                  <span>{sup.activeContracts} contrats actifs</span>
                </div>
                <div className="text-slate-400">
                  SLA réactivité : <span className="font-semibold text-slate-200">{sup.slaResponsiveness}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
