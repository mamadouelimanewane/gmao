import React from 'react';
import { BookOpen, Search, Plus, Filter, FileText, Download } from 'lucide-react';

export default function Knowledge() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="text-emerald-500" />
            Base de Connaissances
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Documentation, manuels de maintenance et protocoles biomédicaux
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20">
          <Plus size={16} /> Ajouter un manuel
        </button>
      </div>

      <div className="glass border border-slate-700/40 rounded-2xl p-4 flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            placeholder="Rechercher une notice, un équipement, un code d'erreur..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm flex items-center gap-2 hover:bg-slate-700 transition-colors">
          <Filter size={15} />
          Filtres
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Placeholder Items */}
        {[
          { title: "Manuel de service IRM Philips", type: "PDF", size: "14 MB" },
          { title: "Procédure d'étalonnage Respirateur", type: "DOCX", size: "2 MB" },
          { title: "Codes Erreurs Défibrillateur X12", type: "PDF", size: "1 MB" },
        ].map((doc, idx) => (
          <div key={idx} className="glass rounded-xl p-5 border border-slate-700/40 hover:border-emerald-500/50 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800/80 rounded-lg text-emerald-400">
                <FileText size={24} />
              </div>
              <button className="p-2 text-slate-500 hover:text-emerald-400 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                <Download size={16} />
              </button>
            </div>
            <h3 className="text-slate-200 font-semibold mb-1 line-clamp-2">{doc.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
              <span className="px-2 py-1 bg-slate-800 rounded-md font-mono">{doc.type}</span>
              <span>{doc.size}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass border border-slate-700/50 rounded-2xl p-12 text-center flex flex-col items-center justify-center text-slate-400 mt-8">
        <BookOpen size={48} className="text-slate-600 mb-4" />
        <h3 className="text-lg font-semibold text-slate-200 mb-1">Module en cours d'intégration</h3>
        <p className="text-sm max-w-md mx-auto text-slate-500">
          La bibliothèque complète sera synchronisée avec la base de données du Ministère de la Santé
          dans la prochaine version.
        </p>
      </div>
    </div>
  );
}
