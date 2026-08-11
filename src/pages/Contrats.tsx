import React from 'react';
import { ShieldCheck, Search, Plus, Filter, AlertTriangle } from 'lucide-react';

export default function Contrats() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" />
            Contrats & Garanties
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez les contrats de maintenance et les garanties constructeurs de vos équipements
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20">
          <Plus size={16} /> Nouveau Contrat
        </button>
      </div>

      <div className="glass border border-slate-700/40 rounded-2xl p-4 flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            placeholder="Rechercher un contrat..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm flex items-center gap-2 hover:bg-slate-700 transition-colors">
          <Filter size={15} />
          Filtres
        </button>
      </div>

      <div className="glass border border-slate-700/50 rounded-2xl p-12 text-center flex flex-col items-center justify-center text-slate-400">
        <ShieldCheck size={48} className="text-slate-600 mb-4" />
        <h3 className="text-lg font-semibold text-slate-200 mb-1">Module en construction</h3>
        <p className="text-sm max-w-md mx-auto text-slate-500">
          Ce module vous permettra de suivre l'expiration des garanties, les SLAs fournisseurs, 
          et de gérer le renouvellement automatique de vos contrats de maintenance.
        </p>
      </div>
    </div>
  );
}
