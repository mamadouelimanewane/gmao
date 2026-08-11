import React, { useState } from 'react';
import { ShieldCheck, Search, Plus, Filter, AlertTriangle, CheckCircle2, Clock, Calendar, Briefcase, FileSignature, DollarSign, Activity } from 'lucide-react';

// Fausse base de données de contrats
const MOCK_CONTRATS = [
  {
    id: 'CT-2024-001',
    provider: 'Philips Healthcare',
    equipment: 'IRM Ingenia 1.5T',
    type: 'Full Omnium (Pièces et MO)',
    sla: 'Intervention < 12h',
    cost: '45 000 FCFA / an', // Just an example currency, usually it's millions, let's use a generic format
    costValue: '45.0M FCFA',
    status: 'Actif',
    startDate: '2023-01-15',
    endDate: '2026-01-14',
    health: 98
  },
  {
    id: 'CT-2023-089',
    provider: 'Dräger Medical',
    equipment: 'Flotte Respirateurs (x12)',
    type: 'Maintenance Préventive',
    sla: 'Intervention < 24h',
    costValue: '12.5M FCFA',
    status: 'Expire Bientôt',
    startDate: '2021-06-01',
    endDate: '2024-05-31',
    health: 45
  },
  {
    id: 'CT-2022-102',
    provider: 'Siemens Healthineers',
    equipment: 'Scanner Somatom',
    type: 'Garantie Constructeur',
    sla: 'Intervention < 48h',
    costValue: 'Inclus',
    status: 'Expiré',
    startDate: '2020-03-10',
    endDate: '2022-03-09',
    health: 0
  },
  {
    id: 'CT-2024-015',
    provider: 'GE Healthcare',
    equipment: 'Échographes Voluson (x3)',
    type: 'Contrat Partagé (MO uniquement)',
    sla: 'Intervention < 48h',
    costValue: '8.0M FCFA',
    status: 'Actif',
    startDate: '2024-02-01',
    endDate: '2027-01-31',
    health: 100
  },
  {
    id: 'CT-2023-044',
    provider: 'Stryker',
    equipment: 'Lits de réanimation',
    type: 'Extension de Garantie',
    sla: 'Intervention < 72h',
    costValue: '3.2M FCFA',
    status: 'Actif',
    startDate: '2023-09-01',
    endDate: '2025-08-31',
    health: 85
  }
];

export default function Contrats() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = MOCK_CONTRATS.filter(c => 
    c.provider.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Actif': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Expire Bientôt': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Expiré': return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Actif': return <CheckCircle2 size={14} className="text-emerald-400" />;
      case 'Expire Bientôt': return <Clock size={14} className="text-amber-400" />;
      case 'Expiré': return <AlertTriangle size={14} className="text-rose-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" />
            Contrats & Garanties
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez le cycle de vie de vos contrats de maintenance, garanties et SLAs.
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20">
          <Plus size={16} /> Nouveau Contrat
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Contrats Actifs</p>
            <p className="text-2xl font-bold text-slate-100">24</p>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">À Renouveler (30j)</p>
            <p className="text-2xl font-bold text-slate-100">3</p>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Budget Engagé</p>
            <p className="text-2xl font-bold text-slate-100">142M <span className="text-sm text-slate-500 font-normal">FCFA</span></p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass border border-slate-700/40 rounded-2xl p-4 flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par fournisseur, équipement ou référence..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm flex items-center gap-2 hover:bg-slate-700 transition-colors">
          <Filter size={15} />
          Filtres
        </button>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.map((contrat) => (
          <div key={contrat.id} className="glass rounded-2xl border border-slate-700/40 p-5 hover:border-emerald-500/50 transition-colors group relative overflow-hidden">
            
            {/* Status Indicator Bar (Left border effect) */}
            <div className={\`absolute left-0 top-0 bottom-0 w-1 \${
              contrat.status === 'Actif' ? 'bg-emerald-500' : 
              contrat.status === 'Expire Bientôt' ? 'bg-amber-500' : 'bg-rose-500'
            }\`}></div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {contrat.provider}
                </h3>
                <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                  <FileSignature size={14} /> {contrat.id}
                </p>
              </div>
              <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold \${getStatusBadge(contrat.status)}\`}>
                {getStatusIcon(contrat.status)}
                {contrat.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Équipement Couvert</p>
                  <p className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <Briefcase size={14} className="text-slate-400" />
                    {contrat.equipment}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Type de Contrat</p>
                  <p className="text-sm font-medium text-slate-200">{contrat.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">SLA (Temps d'Intervention)</p>
                  <p className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                    <Activity size={14} />
                    {contrat.sla}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Coût Annuel</p>
                  <p className="text-sm font-bold text-slate-200 font-mono">{contrat.costValue}</p>
                </div>
              </div>
            </div>

            {/* Timeline / Dates */}
            <div className="bg-slate-900/50 rounded-xl p-3 flex items-center justify-between border border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Début</p>
                  <p className="text-xs font-medium text-slate-300">{contrat.startDate}</p>
                </div>
              </div>
              
              {/* Progress bar representing time elapsed */}
              <div className="flex-1 mx-4">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={\`h-full rounded-full \${contrat.status === 'Expiré' ? 'bg-rose-500' : contrat.status === 'Expire Bientôt' ? 'bg-amber-500' : 'bg-emerald-500'}\`}
                    style={{ width: \`\${contrat.health}%\` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Fin</p>
                  <p className={\`text-xs font-medium \${contrat.status === 'Expiré' ? 'text-rose-400' : 'text-slate-300'}\`}>
                    {contrat.endDate}
                  </p>
                </div>
                <Calendar size={14} className={contrat.status === 'Expiré' ? 'text-rose-500' : 'text-slate-500'} />
              </div>
            </div>

          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            <ShieldCheck size={40} className="mx-auto mb-3 opacity-20" />
            <p>Aucun contrat ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
