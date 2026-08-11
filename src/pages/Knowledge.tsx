import React, { useState } from 'react';
import { BookOpen, Search, Plus, Filter, FileText, Download, X, Printer, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fake Data for realistic documents
const MOCK_DOCUMENTS = [
  {
    id: 'doc-1',
    title: "Manuel de service IRM Philips Ingenia 1.5T",
    type: "PDF",
    size: "14 MB",
    date: "12 Mars 2024",
    content: `
# MANUEL DE SERVICE TECHNIQUE
## Système IRM Philips Ingenia 1.5T

**Chapitre 4 : Maintenance du Système de Refroidissement (Cryogène)**

### 4.1. Vérification du niveau d'Hélium
Le niveau d'hélium liquide ne doit jamais descendre en dessous de 40% sous peine d'un "Quench" spontané.
1. Accéder au panneau de contrôle de la cold head (tête froide).
2. Lire le pourcentage de remplissage sur le moniteur F2.
3. Si le niveau est compris entre 45% et 50%, planifier une recharge d'hélium d'ici 30 jours.

### 4.2. Diagnostic de la Tête Froide (Cold Head)
- Pression de retour du compresseur : L'aiguille doit être à 1.4 - 1.5 MPa.
- Bruit anormal (cliquetis irrégulier) : Indique une usure des joints internes. Remplacement de la cold head requis (Référence pièce : CH-9002A).

**Attention :** Le port d'EPI non magnétiques est obligatoire lors de l'intervention en Zone 4 (Cage de Faraday).
    `
  },
  {
    id: 'doc-2',
    title: "Procédure d'étalonnage Respirateur PB 840",
    type: "DOCX",
    size: "2 MB",
    date: "05 Janvier 2024",
    content: `
# PROTOCOLE D'ÉTALONNAGE ET DE SÉCURITÉ
## Équipement : Respirateur Puritan Bennett 840

**Fréquence requise :** Tous les 12 mois ou après chaque maintenance curative majeure.

### 1. Test de Sécurité Électrique (SST / EST)
- Connecter le respirateur à l'analyseur de sécurité électrique (ex: Fluke ESA620).
- Courant de fuite boîtier : Doit être < 100 µA (Classe I, Type B).
- Résistance de protection (Terre) : Doit être < 0.2 Ω.

### 2. Étalonnage des Capteurs de Débit
1. Déconnecter le patient et brancher un poumon d'essai (Test Lung).
2. Accéder au menu "Service Mode" (Appuyer sur 'Test' pendant le démarrage).
3. Lancer la procédure "Flow Sensor Calibration".
4. Vérifier la marge d'erreur : +/- 10% pour un volume courant (Vt) de 500 mL.

*Note du constructeur : Remplacer le filtre expiratoire (Q3) avant chaque nouvelle calibration annuelle.*
    `
  },
  {
    id: 'doc-3',
    title: "Codes Erreurs Défibrillateur Zoll M Series",
    type: "PDF",
    size: "1 MB",
    date: "18 Février 2023",
    content: `
# GUIDE DE DÉPANNAGE RAPIDE
## Défibrillateur ZOLL M-Series - Liste des Codes d'Erreurs Fréquents

| Code | Description de l'erreur | Action Corrective Recommandée |
|------|--------------------------|-------------------------------|
| **ERR 12** | Défaut de communication module ECG. | Vérifier le faisceau de câbles interne J14. Si oxydé, nettoyer au spray contact. Sinon, remplacer la carte d'acquisition. |
| **ERR 32** | Temps de charge condensateur trop long (> 10 sec pour 200J). | Remplacer la batterie principale (SLA). Si le défaut persiste, le condensateur HT est défectueux. **DANGER HAUTE TENSION**. |
| **ERR 44** | Panne du système d'impression thermique. | Rouleau coincé ou tête thermique endommagée. Ouvrir la porte latérale et nettoyer la tête avec de l'alcool isopropylique. |
| **WARN 1** | Test de décharge à 30J non effectué depuis 24h. | Réaliser le test quotidien de chocs sur la charge de test intégrée. |

Pour toute erreur fatale (Code > 100), veuillez contacter le support technique certifié ZOLL. Ne pas ouvrir le boîtier scellé.
    `
  }
];

export default function Knowledge() {
  const [selectedDoc, setSelectedDoc] = useState<typeof MOCK_DOCUMENTS[0] | null>(null);

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
        {MOCK_DOCUMENTS.map((doc) => (
          <div 
            key={doc.id} 
            onClick={() => setSelectedDoc(doc)}
            className="glass rounded-xl p-5 border border-slate-700/40 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-900/20 cursor-pointer group hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800/80 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); alert('Téléchargement simulé...'); }}
                className="p-2 text-slate-500 hover:text-emerald-400 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Download size={16} />
              </button>
            </div>
            <h3 className="text-slate-200 font-semibold mb-1 line-clamp-2">{doc.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 border-t border-slate-700/50 pt-3">
              <span className={`px-2 py-1 rounded-md font-mono ${doc.type === 'PDF' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {doc.type}
              </span>
              <span>{doc.size}</span>
              <span className="ml-auto">{doc.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── DOCUMENT VIEWER MODAL ── */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setSelectedDoc(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedDoc.type === 'PDF' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-slate-200 font-semibold">{selectedDoc.title}</h2>
                    <p className="text-xs text-slate-400">{selectedDoc.type} • {selectedDoc.size} • Modifié le {selectedDoc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                    <Printer size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                    <Share2 size={18} />
                  </button>
                  <div className="w-px h-6 bg-slate-700 mx-1"></div>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Document Content Simulation (Markdown Rendered style) */}
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50 text-slate-900">
                <div className="max-w-3xl mx-auto bg-white min-h-full p-10 shadow-sm border border-slate-200 rounded-sm">
                  {/* Fake "Page" effect */}
                  <div className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-h1:text-center prose-h1:text-2xl prose-h1:mb-2 prose-h2:text-center prose-h2:text-emerald-600 prose-h2:mt-0 prose-h3:text-slate-800 prose-h3:border-b prose-h3:border-slate-200 prose-h3:pb-2 prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-2 prose-th:border prose-th:border-slate-300 prose-td:p-2 prose-td:border prose-td:border-slate-300 prose-strong:text-emerald-700">
                    <div dangerouslySetInnerHTML={{
                      // Very basic markdown to HTML converter for the demo
                      __html: selectedDoc.content
                        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                        .replace(/\*(.*)\*/gim, '<em>$1</em>')
                        .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
                        .replace(/^1\. (.*$)/gim, '<ol><li>$1</li></ol>')
                        .replace(/^2\. (.*$)/gim, '<ol start="2"><li>$1</li></ol>')
                        .replace(/^3\. (.*$)/gim, '<ol start="3"><li>$1</li></ol>')
                        .replace(/^4\. (.*$)/gim, '<ol start="4"><li>$1</li></ol>')
                        .replace(/\|(.*)\|/gim, (match) => {
                          if (match.includes('---')) return ''; // Skip separator
                          const isHeader = match.includes('Code'); // Hack for table header
                          const cells = match.split('|').filter(c => c.trim() !== '');
                          const tag = isHeader ? 'th' : 'td';
                          return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
                        })
                        .replace(/(<tr>.*<\/tr>)/gim, (match, p1, offset, string) => {
                          if (offset === string.indexOf('<tr>')) return `<table><tbody>${match}`;
                          if (offset === string.lastIndexOf('<tr>')) return `${match}</tbody></table>`;
                          return match;
                        })
                        .replace(/<\/ul>\n<ul>/gim, '')
                        .replace(/<\/ol>\n<ol.*>/gim, '')
                    }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
