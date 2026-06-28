import { useState, useRef, useEffect } from 'react';
import {
  Plus, Search, Filter, Clock, CheckCircle,
  Wrench, X, ShieldAlert, PenLine, Eye
} from 'lucide-react';
import { useDataStore } from '../contexts/DataStore';
import type { Ticket } from '../contexts/DataStore';
import { useNotifications } from '../contexts/NotificationContext';

const priorityStyles: Record<string, string> = {
  'Critique': 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  'Haute': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'Moyenne': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'Basse': 'bg-slate-700/50 text-slate-400 border border-slate-700/30',
};

const columnHeaders = [
  { id: 'Ouvert', title: 'À Faire (Ouverts)', color: 'border-t-rose-500' },
  { id: 'En Cours', title: 'En Cours', color: 'border-t-blue-500' },
  { id: 'En Attente', title: 'En Attente (Pièces)', color: 'border-t-amber-500' },
  { id: 'Résolu', title: 'Résolus', color: 'border-t-emerald-500' },
];

// ── Signature Modal ──────────────────────────────────────────────────────────

function SignatureModal({ onClose, onValidate }: { onClose: () => void; onValidate: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDraw = () => setDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const validate = () => {
    const canvas = canvasRef.current!;
    onValidate(canvas.toDataURL());
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-2xl animate-fade-in-up w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PenLine className="text-emerald-400" size={18} />
            <h3 className="text-base font-bold text-white">Signature électronique</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-3">Signez dans le cadre ci-dessous pour valider et clôturer le ticket.</p>
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full rounded-xl border-2 border-dashed border-slate-600 bg-slate-800 cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        />
        <div className="flex justify-between mt-4">
          <button onClick={clear} className="px-4 py-2 text-sm text-slate-400 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
            Effacer
          </button>
          <button onClick={validate} className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all active:scale-95">
            Valider & Clôturer
          </button>
        </div>
      </div>
    </div>
  );
}

// ── View Signature Modal ─────────────────────────────────────────────────────

function ViewSignatureModal({ signature, onClose }: { signature: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-2xl animate-fade-in-up w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Signature enregistrée</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <img src={signature} alt="Signature" className="w-full rounded-xl border border-slate-700 bg-slate-800" />
      </div>
    </div>
  );
}

// ── Add Ticket Modal ─────────────────────────────────────────────────────────

function AddTicketModal({
  onClose,
  onAdd,
  prefillEquipment,
}: {
  onClose: () => void;
  onAdd: (ticket: Ticket) => void;
  prefillEquipment?: string;
}) {
  const [title, setTitle] = useState('');
  const [equipment, setEquipment] = useState(prefillEquipment || '');
  const [priority, setPriority] = useState<Ticket['priority']>('Moyenne');
  const [location, setLocation] = useState('');
  const [assignee, setAssignee] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Le sujet est requis';
    if (!equipment.trim()) e.equipment = "L'équipement est requis";
    if (!location.trim()) e.location = 'La localisation est requise';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const newTkt: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      equipment,
      status: 'Ouvert',
      priority,
      date: "Aujourd'hui, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignee: assignee || 'Non assigné',
      location,
      sla: priority === 'Critique' ? '2h 00m restants' : '8h 00m restants',
      slaUrgent: priority === 'Critique' || priority === 'Haute',
    };
    onAdd(newTkt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Wrench className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Créer une Demande d'Intervention</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Sujet de la panne / Description *</label>
            <input
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: '' })); }}
              placeholder="ex: Problème d'allumage ou code d'erreur E04..."
              className={`w-full bg-slate-800 border rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors ${errors.title ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-emerald-500'}`}
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Équipement *</label>
              <input
                type="text"
                value={equipment}
                onChange={e => { setEquipment(e.target.value); setErrors(prev => ({ ...prev, equipment: '' })); }}
                placeholder="ex: IRM Siemens Skyra"
                className={`w-full bg-slate-800 border rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors ${errors.equipment ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-emerald-500'}`}
              />
              {errors.equipment && <p className="text-xs text-rose-400 mt-1">{errors.equipment}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Localisation *</label>
              <input
                type="text"
                value={location}
                onChange={e => { setLocation(e.target.value); setErrors(prev => ({ ...prev, location: '' })); }}
                placeholder="ex: Urgences - Salle 1"
                className={`w-full bg-slate-800 border rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors ${errors.location ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-emerald-500'}`}
              />
              {errors.location && <p className="text-xs text-rose-400 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Priorité / Gravité</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Ticket['priority'])}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Critique">Critique (Risque vital)</option>
                <option value="Haute">Haute (Équipement indisponible)</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse (Maintenance simple)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Assigner à (Technicien)</label>
              <input
                type="text"
                value={assignee}
                onChange={e => setAssignee(e.target.value)}
                placeholder="ex: Tech. Amadou Ndiaye"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors">Annuler</button>
          <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95">
            Créer le ticket
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Tickets() {
  const { tickets, setTickets } = useDataStore();
  const { push } = useNotifications();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('Tous');
  const [signTicketId, setSignTicketId] = useState<string | null>(null);
  const [viewSigTicketId, setViewSigTicketId] = useState<string | null>(null);
  const [prefillEquipment, setPrefillEquipment] = useState<string | undefined>();

  const handleAddTicket = (newTkt: Ticket) => {
    setTickets(prev => [newTkt, ...prev]);
    push({ type: 'success', title: 'Ticket créé', message: `${newTkt.id} — ${newTkt.title}` });
  };

  const handleSign = (dataUrl: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === signTicketId ? { ...t, status: 'Résolu', signature: dataUrl } : t
      )
    );
    setSignTicketId(null);
    push({ type: 'success', title: 'Ticket clôturé', message: 'Signature enregistrée. Ticket passé en Résolu.' });
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.equipment.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority === 'Tous' || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const viewSigTicket = tickets.find(t => t.id === viewSigTicketId);

  return (
    <>
      {showModal && (
        <AddTicketModal
          onClose={() => { setShowModal(false); setPrefillEquipment(undefined); }}
          onAdd={handleAddTicket}
          prefillEquipment={prefillEquipment}
        />
      )}
      {signTicketId && (
        <SignatureModal onClose={() => setSignTicketId(null)} onValidate={handleSign} />
      )}
      {viewSigTicket?.signature && viewSigTicketId && (
        <ViewSignatureModal signature={viewSigTicket.signature} onClose={() => setViewSigTicketId(null)} />
      )}

      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Interventions</h1>
            <p className="text-sm text-slate-400 mt-1">
              Gérez les demandes de dépannage, interventions préventives et curatives.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 active:scale-95"
          >
            <Plus size={16} />
            Créer un Ticket
          </button>
        </div>

        {/* Filters */}
        <div className="glass border border-slate-700/40 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Rechercher par sujet, équipement, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500">Priorité:</span>
            {['Tous', 'Critique', 'Haute', 'Moyenne', 'Basse'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterPriority === p
                    ? 'bg-slate-700 text-slate-200'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {columnHeaders.map((col) => {
            const colTickets = filteredTickets.filter(t => t.status === col.id);
            return (
              <div key={col.id} className="flex flex-col min-h-[500px] bg-slate-950/40 border border-slate-800 rounded-2xl p-4">
                <div className={`flex items-center justify-between pb-3 border-b border-slate-800/80 border-t-2 ${col.color} pt-1 mb-4`}>
                  <h3 className="font-semibold text-sm text-slate-200">{col.title}</h3>
                  <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    {colTickets.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {colTickets.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-xl glass border border-slate-800/80 hover:border-slate-700/60 transition-all duration-200 group cursor-pointer relative overflow-hidden"
                    >
                      {/* Priority strip */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        t.priority === 'Critique' ? 'bg-rose-500' :
                        t.priority === 'Haute' ? 'bg-orange-500' :
                        t.priority === 'Moyenne' ? 'bg-blue-500' : 'bg-slate-500'
                      }`} />

                      <div className="flex justify-between items-start gap-2 mb-2 pl-1.5">
                        <span className="text-[10px] font-mono text-slate-500">{t.id}</span>
                        <span className={`text-[9px] uppercase font-semibold px-2 py-0.5 rounded-md ${priorityStyles[t.priority]}`}>
                          {t.priority}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors mb-1.5 line-clamp-2 pl-1.5">
                        {t.title}
                      </h4>

                      <p className="text-xs text-slate-400 mb-4 pl-1.5 font-medium">
                        {t.equipment}
                      </p>

                      {/* Location & SLA */}
                      <div className="space-y-1.5 pl-1.5 mb-4 border-l border-slate-800 text-[11px] text-slate-500">
                        <p>Loc: <span className="text-slate-400 font-medium">{t.location}</span></p>
                        {t.status !== 'Résolu' && (
                          <p className="flex items-center gap-1">
                            SLA:
                            <span className={`font-semibold ${t.slaUrgent ? 'text-rose-400 flex items-center gap-1 pulse-critical' : 'text-slate-400'}`}>
                              {t.slaUrgent && <ShieldAlert size={10} />}
                              {t.sla}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Signature buttons */}
                      {t.status === 'Résolu' && t.signature && (
                        <button
                          onClick={() => setViewSigTicketId(t.id)}
                          className="flex items-center gap-1.5 text-[10px] text-emerald-400 hover:text-emerald-300 mb-3 pl-1.5"
                        >
                          <Eye size={11} /> Voir signature
                        </button>
                      )}
                      {t.status === 'En Cours' && (
                        <button
                          onClick={() => setSignTicketId(t.id)}
                          className="flex items-center gap-1.5 text-[10px] px-2.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors mb-3 ml-1.5"
                        >
                          <PenLine size={11} /> Clôturer & Signer
                        </button>
                      )}

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 pl-1.5">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                          <Clock size={12} />
                          <span>{t.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-300 ring-1 ring-slate-700">
                            {t.assignee.charAt(0) || 'N'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colTickets.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                      <CheckCircle size={24} className="mb-2 opacity-30" />
                      <span>Aucun ticket</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
