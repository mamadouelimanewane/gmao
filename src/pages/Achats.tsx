import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Plus, X, CheckCircle2, XCircle, Truck, PackageCheck,
  Wrench, Search
} from 'lucide-react';
import { useDataStore } from '../contexts/DataStore';
import type { PurchaseOrder } from '../contexts/DataStore';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const COLUMNS: { id: PurchaseOrder['status']; title: string; color: string }[] = [
  { id: 'Demande', title: 'Demande', color: 'border-t-slate-500' },
  { id: 'Validé', title: 'Validé', color: 'border-t-blue-500' },
  { id: 'Commandé', title: 'Commandé', color: 'border-t-amber-500' },
  { id: 'Reçu', title: 'Reçu', color: 'border-t-emerald-500' },
];

const canValidate = (role?: string) => role === 'director' || role === 'admin';

// ── New Purchase Request Modal ──────────────────────────────────────────────

function NewRequestModal({ onClose, onAdd }: { onClose: () => void; onAdd: (po: PurchaseOrder) => void }) {
  const { user } = useAuth();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('pcs');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !quantity || Number(quantity) < 1) { setError('Nom de l\'article et quantité valide requis'); return; }
    const po: PurchaseOrder = {
      id: `PO-${Date.now().toString().slice(-6)}`,
      itemName: itemName.trim(),
      quantity: Number(quantity),
      unit,
      supplierName: supplierName.trim(),
      requestedBy: user?.name || 'Utilisateur',
      requestDate: new Date().toLocaleDateString('fr-FR'),
      status: 'Demande',
      unitPrice: Number(unitPrice) || 0,
      notes: notes.trim() || undefined,
    };
    onAdd(po);
    onClose();
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-400" size={20} />
            <h3 className="text-lg font-bold text-white">Nouvelle Demande d'Achat</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Article / Pièce *</label>
            <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="ex: Filtre antibactérien respirateur" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Quantité *</label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Unité</label>
              <input type="text" value={unit} onChange={e => setUnit(e.target.value)} placeholder="pcs, boîtes…" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Fournisseur suggéré</label>
              <input type="text" value={supplierName} onChange={e => setSupplierName(e.target.value)} placeholder="ex: BioSénégal SARL" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Prix unitaire estimé (FCFA)</label>
              <input type="number" min="0" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes</label>
            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Justification, urgence…" className={inputCls} />
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors">Annuler</button>
          <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg active:scale-95">
            Soumettre la demande
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Achats() {
  const { purchaseOrders, setPurchaseOrders, stocks, setStocks } = useDataStore();
  const { user } = useAuth();
  const { push } = useNotifications();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleAdd = (po: PurchaseOrder) => {
    setPurchaseOrders(prev => [po, ...prev]);
    push({ type: 'success', title: 'Demande soumise', message: `${po.id} en attente de validation` });
  };

  const validate = (po: PurchaseOrder, approve: boolean) => {
    setPurchaseOrders(prev => prev.map(p => p.id === po.id ? {
      ...p, status: approve ? 'Validé' : 'Rejeté', approvedBy: user?.name,
    } : p));
    push({
      type: approve ? 'success' : 'warning',
      title: approve ? 'Demande validée' : 'Demande rejetée',
      message: po.id,
    });
  };

  const markOrdered = (po: PurchaseOrder) => {
    setPurchaseOrders(prev => prev.map(p => p.id === po.id ? {
      ...p, status: 'Commandé', orderDate: new Date().toLocaleDateString('fr-FR'),
    } : p));
    push({ type: 'info', title: 'Commande envoyée', message: `${po.id} → ${po.supplierName || 'fournisseur'}` });
  };

  const markReceived = (po: PurchaseOrder) => {
    setPurchaseOrders(prev => prev.map(p => p.id === po.id ? {
      ...p, status: 'Reçu', receivedDate: new Date().toLocaleDateString('fr-FR'),
    } : p));

    // Mise à jour automatique du stock si un article correspondant existe
    const matchIdx = stocks.findIndex(s =>
      s.id === po.linkedStockId || s.name.toLowerCase() === po.itemName.toLowerCase()
    );
    if (matchIdx >= 0) {
      setStocks(prev => prev.map((s, i) => i === matchIdx ? { ...s, quantity: s.quantity + po.quantity } : s));
      push({ type: 'success', title: 'Stock mis à jour', message: `+${po.quantity} ${po.unit} sur "${stocks[matchIdx].name}"` });
    } else {
      push({ type: 'success', title: 'Réception enregistrée', message: `${po.id} — aucun article de stock correspondant trouvé, mise à jour manuelle requise` });
    }
  };

  const filtered = purchaseOrders.filter(po =>
    po.itemName.toLowerCase().includes(search.toLowerCase()) ||
    po.supplierName?.toLowerCase().includes(search.toLowerCase()) ||
    po.id.toLowerCase().includes(search.toLowerCase())
  );
  const rejected = filtered.filter(po => po.status === 'Rejeté');

  return (
    <>
      {showModal && <NewRequestModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="space-y-6 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Workflow Achat</h1>
            <p className="text-sm text-slate-400 mt-1">
              Demande → Validation → Commande fournisseur → Réception → Mise à jour du stock.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95"
          >
            <Plus size={16} />
            Nouvelle Demande
          </button>
        </div>

        <div className="glass border border-slate-700/40 rounded-2xl p-4 flex items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Rechercher par article, fournisseur, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {COLUMNS.map(col => {
            const colOrders = filtered.filter(po => po.status === col.id);
            return (
              <div key={col.id} className="flex flex-col min-h-[400px] bg-slate-950/40 border border-slate-800 rounded-2xl p-4">
                <div className={`flex items-center justify-between pb-3 border-b border-slate-800/80 border-t-2 ${col.color} pt-1 mb-4`}>
                  <h3 className="font-semibold text-sm text-slate-200">{col.title}</h3>
                  <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full font-medium">{colOrders.length}</span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {colOrders.map(po => (
                    <div key={po.id} className="p-4 rounded-xl glass border border-slate-800/80 hover:border-slate-700/60 transition-all">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] font-mono text-slate-500">{po.id}</span>
                        {po.linkedTicketId && (
                          <button onClick={() => navigate('/tickets')} className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                            <Wrench size={9} /> {po.linkedTicketId}
                          </button>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-200 mb-1">{po.itemName}</h4>
                      <p className="text-xs text-slate-400 mb-2">{po.quantity} {po.unit} · {po.supplierName || 'Fournisseur à définir'}</p>
                      <p className="text-[10px] text-slate-500 mb-3">Par {po.requestedBy} · {po.requestDate}</p>
                      {po.notes && <p className="text-[10px] text-slate-500 italic mb-3">{po.notes}</p>}

                      {po.status === 'Demande' && canValidate(user?.role) && (
                        <div className="flex gap-2">
                          <button onClick={() => validate(po, true)} className="flex-1 flex items-center justify-center gap-1.5 text-[10px] py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                            <CheckCircle2 size={11} /> Valider
                          </button>
                          <button onClick={() => validate(po, false)} className="flex-1 flex items-center justify-center gap-1.5 text-[10px] py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition-colors">
                            <XCircle size={11} /> Rejeter
                          </button>
                        </div>
                      )}
                      {po.status === 'Demande' && !canValidate(user?.role) && (
                        <p className="text-[10px] text-slate-600 italic">En attente de validation (Directeur/Admin)</p>
                      )}
                      {po.status === 'Validé' && (
                        <button onClick={() => markOrdered(po)} className="w-full flex items-center justify-center gap-1.5 text-[10px] py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors">
                          <Truck size={11} /> Envoyer la commande
                        </button>
                      )}
                      {po.status === 'Commandé' && (
                        <button onClick={() => markReceived(po)} className="w-full flex items-center justify-center gap-1.5 text-[10px] py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                          <PackageCheck size={11} /> Réceptionner
                        </button>
                      )}
                      {po.status === 'Reçu' && (
                        <p className="text-[10px] text-emerald-400 flex items-center gap-1"><PackageCheck size={11} /> Reçu le {po.receivedDate}</p>
                      )}
                    </div>
                  ))}

                  {colOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                      <ShoppingCart size={20} className="mb-2 opacity-30" />
                      <span>Aucune demande</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {rejected.length > 0 && (
          <div className="glass border border-rose-500/20 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2"><XCircle size={15} /> Demandes rejetées ({rejected.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {rejected.map(po => (
                <div key={po.id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
                  <p className="font-mono text-slate-500 text-[10px] mb-1">{po.id}</p>
                  <p className="text-slate-300 font-medium">{po.itemName}</p>
                  <p className="text-slate-500 text-[10px] mt-1">Rejeté par {po.approvedBy}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
