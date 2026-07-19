import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays, CheckSquare, Clock, AlertTriangle, PlayCircle,
  ChevronLeft, ChevronRight, Plus, Download, Filter,
  Wrench, CheckCircle2, XCircle, Circle, Timer,
  Stethoscope, Cpu, Activity, HeartPulse, Microscope,
  Radio, FlaskConical, BarChart3, Target, TrendingUp,
  RotateCcw, ClipboardList, Zap, Bell, ArrowRight
} from 'lucide-react';
import { useDataStore } from '../contexts/DataStore';
import type { MaintenancePlan as DSMaintenancePlan } from '../contexts/DataStore';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';

// ─────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────

type Status = 'done' | 'pending' | 'late' | 'inprogress' | 'planned';
type MaintenancePlan = DSMaintenancePlan;


const freqColors: Record<string, string> = {
  'Quotidien': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Hebdomadaire': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Mensuel': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Trimestriel': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Semestriel': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Annuel': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const statusConfig: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
  done:       { label: 'Réalisé',     color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  pending:    { label: 'Imminent',    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',       icon: Timer },
  late:       { label: 'En retard',   color: 'bg-rose-500/20 text-rose-400 border-rose-500/30',          icon: AlertTriangle },
  inprogress: { label: 'En cours',    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',          icon: PlayCircle },
  planned:    { label: 'Planifié',    color: 'bg-slate-600/40 text-slate-400 border-slate-600/40',       icon: Circle },
};

const priorityColors: Record<string, string> = {
  critical: 'text-rose-400', high: 'text-amber-400', medium: 'text-blue-400', low: 'text-emerald-400'
};

const complianceHistory = [
  { month: 'Jan', rate: 88 }, { month: 'Fév', rate: 91 }, { month: 'Mar', rate: 85 },
  { month: 'Avr', rate: 94 }, { month: 'Mai', rate: 89 }, { month: 'Jun', rate: 76 },
];

const byFreq = [
  { name: 'Quotidien', total: 2, done: 2 },
  { name: 'Hebdo', total: 4, done: 3 },
  { name: 'Mensuel', total: 8, done: 5 },
  { name: 'Trim.', total: 6, done: 4 },
  { name: 'Semestr.', total: 4, done: 2 },
  { name: 'Annuel', total: 3, done: 2 },
];

// ─────────────────────────────────────────────
// MINI CALENDAR
// ─────────────────────────────────────────────
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const pmDates: Record<number, Status> = { 1: 'late', 6: 'done', 13: 'done', 20: 'done', 27: 'inprogress', 28: 'late', 30: 'pending', 15: 'planned', 10: 'planned' };

// Icon mapping for plans (not stored in DataStore)
const planIconMap: Record<string, React.ElementType> = {
  'PM-001': Radio,
  'PM-002': Cpu,
  'PM-003': HeartPulse,
  'PM-004': Microscope,
  'PM-005': Zap,
  'PM-006': FlaskConical,
  'PM-007': Activity,
  'PM-008': Stethoscope,
};
const defaultPlanIcon = Wrench;

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

function exportICal(pmPlans: DSMaintenancePlan[]) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const toICSDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  };

  const events = pmPlans.map(p => {
    const start = toICSDate(p.nextDue);
    const summary = `PM - ${p.equipment}`;
    const desc = `Technicien: ${p.technician} | Durée: ${p.estimatedDuration} | Contrat: ${p.contractType}`;
    return [
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${start}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${p.dept}`,
      `UID:${p.id}@gmao-health`,
      'END:VEVENT',
    ].join('\r\n');
  });

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GMAO Health//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'maintenance-plan.ics';
  a.click();
  URL.revokeObjectURL(url);
}

export default function MaintenancePlanifiee() {
  const { pmPlans, setPmPlans } = useDataStore();
  const [selectedId, setSelectedId] = useState<string>(pmPlans[0]?.id || '');
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');

  const selected = pmPlans.find(p => p.id === selectedId) || pmPlans[0];

  const handleSelect = (plan: DSMaintenancePlan) => {
    setSelectedId(plan.id);
  };

  const toggleCheck = (i: number) => {
    setPmPlans(prev => prev.map(p => {
      if (p.id !== selected.id) return p;
      const newChecklist = p.checklist.map((item, idx) =>
        idx === i ? { ...item, done: !item.done } : item
      );
      const allDone = newChecklist.every(c => c.done);
      return {
        ...p,
        checklist: newChecklist,
        status: allDone ? 'done' : p.status === 'done' ? 'pending' : p.status,
      };
    }));
  };

  const checklistState = selected?.checklist.map(c => c.done) || [];
  const filtered = filter === 'all' ? pmPlans : pmPlans.filter(p => p.status === filter);
  const doneChecks = checklistState.filter(Boolean).length;
  const progress = checklistState.length > 0 ? Math.round((doneChecks / checklistState.length) * 100) : 0;

  const statusCounts = {
    late:       pmPlans.filter(p => p.status === 'late').length,
    inprogress: pmPlans.filter(p => p.status === 'inprogress').length,
    pending:    pmPlans.filter(p => p.status === 'pending').length,
    done:       pmPlans.filter(p => p.status === 'done').length,
    planned:    pmPlans.filter(p => p.status === 'planned').length,
  };

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* ── Header — poste de contrôle : navy + liseré rouge ── */}
      <div className="uc-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 -mx-1">
        <div>
          <h1 className="uc-title text-2xl font-bold tracking-tight">
            Maintenances Planifiées
            <span className="ml-2 text-xs font-medium bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30 align-middle">PPM</span>
          </h1>
          <p className="uc-subtitle text-sm mt-1">Planned Preventive Maintenance · Checklists · Conformité réglementaire</p>
        </div>
        <div className="flex items-center gap-2">
          {(['list', 'calendar'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeView === v ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {v === 'list' ? '📋 Liste' : '📅 Calendrier'}
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all border border-blue-500">
            <Plus size={13} /> Nouveau plan PM
          </button>
          <button
            onClick={() => exportICal(pmPlans)}
            className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Exporter iCal"
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      {/* Lien vers les statistiques consolidées */}
      <Link
        to="/statistiques"
        className="flex items-center justify-between p-4 rounded-2xl glass border border-slate-700/40 hover:border-blue-500/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
            <Target size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Voir les indicateurs de conformité PM</p>
            <p className="text-xs text-slate-500">Taux de conformité, retards, durée moyenne — page Statistiques</p>
          </div>
        </div>
        <ArrowRight size={16} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </Link>

      {/* Status filter bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filter === 'all' ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-800 text-slate-500 hover:text-white'}`}
        >
          Tous ({pmPlans.length})
        </button>
        {(Object.entries(statusCounts) as [Status, number][]).map(([s, count]) => {
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                filter === s ? cfg.color + ' opacity-100' : 'border-slate-800 text-slate-500 hover:text-white opacity-70 hover:opacity-100'
              }`}
            >
              <cfg.icon size={11} /> {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* ══════════════ VIEW: LIST ══════════════ */}
      {activeView === 'list' && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* LEFT: Plan List */}
          <div className="xl:col-span-2 space-y-2.5">
            {filtered.map(plan => {
              const cfg = statusConfig[plan.status];
              const StatusIcon = cfg.icon;
              return (
                <button
                  key={plan.id}
                  onClick={() => handleSelect(plan)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all group ${
                    selected.id === plan.id
                      ? 'border-blue-500/50 bg-blue-950/20'
                      : 'border-slate-700/40 glass hover:border-slate-600/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-slate-700/60 transition-colors shrink-0">
                      {(() => { const PlanIcon = planIconMap[plan.id] || defaultPlanIcon; return <PlanIcon size={15} className={priorityColors[plan.priority]} />; })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-200 truncate">{plan.equipment}</p>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full border shrink-0 flex items-center gap-1 ${cfg.color}`}>
                          <StatusIcon size={8} /> {cfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{plan.dept} · {plan.id}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full border ${freqColors[plan.frequency]}`}>{plan.frequency}</span>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock size={9} /> {plan.estimatedDuration}
                        </span>
                        {plan.daysLeft <= 0 && plan.status !== 'done' ? (
                          <span className="text-sm text-rose-400 font-bold">{plan.daysLeft === 0 ? "Aujourd'hui" : `${Math.abs(plan.daysLeft)}j retard`}</span>
                        ) : plan.status !== 'done' ? (
                          <span className="text-sm text-slate-500">Dans {plan.daysLeft}j</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detail Panel */}
          <div className="xl:col-span-3 space-y-4">

            {/* Equipment Header */}
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-800">
                  {(() => { const SelIcon = planIconMap[selected.id] || defaultPlanIcon; return <SelIcon size={22} className={priorityColors[selected.priority]} />; })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-white">{selected.equipment}</h2>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${freqColors[selected.frequency]}`}>
                      {selected.frequency}
                    </span>
                    {(() => { const SelIcon = statusConfig[selected.status].icon; return (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusConfig[selected.status].color} flex items-center gap-1`}>
                      <SelIcon size={8} />
                      {statusConfig[selected.status].label}
                    </span>
                    ); })()}
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{selected.dept} · {selected.id}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-slate-500">
                    <span>Technicien : <strong className="text-slate-300">{selected.technician}</strong></span>
                    <span>Durée estimée : <strong className="text-slate-300">{selected.estimatedDuration}</strong></span>
                    <span>Contrat : <strong className={selected.contractType === 'externe' ? 'text-amber-400' : 'text-emerald-400'}>{selected.contractType === 'externe' ? 'Externe (constructeur)' : 'Interne (équipe)'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Dates row */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800">
                <div className="text-center p-2.5 rounded-xl bg-slate-900/50">
                  <p className="text-sm text-slate-500 mb-1">Dernière PM</p>
                  <p className="text-sm font-bold text-slate-200">{new Date(selected.lastDone).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-slate-900/50">
                  <p className="text-sm text-slate-500 mb-1">Prochaine PM</p>
                  <p className={`text-sm font-bold ${selected.daysLeft < 0 ? 'text-rose-400' : selected.daysLeft <= 3 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {new Date(selected.nextDue).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-slate-900/50">
                  <p className="text-sm text-slate-500 mb-1">Délai</p>
                  <p className={`text-sm font-bold ${selected.daysLeft < 0 ? 'text-rose-400' : selected.daysLeft === 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {selected.daysLeft < 0 ? `${Math.abs(selected.daysLeft)}j dépassé` : selected.daysLeft === 0 ? "Aujourd'hui" : `J-${selected.daysLeft}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <ClipboardList size={15} className="text-blue-400" />
                    Checklist de maintenance
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{doneChecks} / {checklistState.length} tâches réalisées</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${progress === 100 ? 'text-emerald-400' : 'text-slate-400'}`}>{progress}%</span>
                </div>
              </div>

              <div className="space-y-2">
                {selected.checklist.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toggleCheck(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      checklistState[i]
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                      checklistState[i]
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-600 bg-slate-800'
                    }`}>
                      {checklistState[i] && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm transition-all ${checklistState[i] ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.item}
                    </span>
                  </button>
                ))}
              </div>

              {progress === 100 && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <p className="text-xs text-emerald-300 font-semibold">Checklist complète ! Clôturer la PM et mettre à jour le registre.</p>
                </div>
              )}

              {progress === 100 && (
                <button className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <CheckSquare size={14} /> Valider et clôturer la PM
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ══════════════ VIEW: CALENDAR ══════════════ */}
      {activeView === 'calendar' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Calendar */}
          <div className="xl:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Juin 2025</h2>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                <button className="px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">Aujourd'hui</button>
                <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-sm font-semibold text-slate-500 py-1">{d}</div>
              ))}
            </div>

            {/* Calendar grid — June 2025 starts on Sunday (offset 6) */}
            <div className="grid grid-cols-7 gap-1">
              {/* Offset: June 1 = Sunday → index 6 */}
              {Array.from({ length: 6 }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const pmStatus = pmDates[day];
                const isToday = day === 28;
                return (
                  <div
                    key={day}
                    className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer hover:bg-slate-800/60 relative ${
                      isToday ? 'ring-2 ring-blue-500 bg-blue-950/30' : ''
                    }`}
                  >
                    <span className={isToday ? 'text-blue-400' : 'text-slate-400'}>{day}</span>
                    {pmStatus && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        pmStatus === 'late' ? 'bg-rose-500 animate-pulse' :
                        pmStatus === 'done' ? 'bg-emerald-500' :
                        pmStatus === 'inprogress' ? 'bg-blue-400' :
                        pmStatus === 'pending' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-800">
              {Object.entries(statusConfig).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <div className={`w-2 h-2 rounded-full ${
                    k === 'done' ? 'bg-emerald-500' : k === 'late' ? 'bg-rose-500' :
                    k === 'inprogress' ? 'bg-blue-400' : k === 'pending' ? 'bg-amber-400' : 'bg-slate-500'
                  }`} />
                  {v.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Analytics */}
          <div className="space-y-4">
            {/* Compliance trend */}
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <h3 className="text-sm font-semibold text-white mb-1">Taux de conformité PM</h3>
              <p className="text-sm text-slate-500 mb-4">Évolution sur 6 mois · Objectif 95%</p>
              <ResponsiveContainer width="100%" height={130}>
                <AreaChart data={complianceHistory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cgr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={[60, 100]} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }} formatter={v => [`${v}%`, 'Conformité']} />
                  <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} fill="url(#cgr)" dot={{ r: 3, fill: '#3b82f6' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* By frequency */}
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <h3 className="text-sm font-semibold text-white mb-1">PM par fréquence</h3>
              <p className="text-sm text-slate-500 mb-4">Réalisées vs planifiées</p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={byFreq} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }} />
                  <Bar dataKey="total" name="Planifiées" fill="#334155" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="done" name="Réalisées" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Upcoming list */}
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Bell size={13} className="text-amber-400" /> À venir — 7 prochains jours
              </h3>
              <div className="space-y-2.5">
                {pmPlans.filter(p => p.daysLeft >= 0 && p.daysLeft <= 10 && p.status !== 'done').sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-center gap-2.5">
                    <div className={`w-1 self-stretch rounded-full ${
                      p.daysLeft === 0 ? 'bg-amber-400' : p.daysLeft <= 3 ? 'bg-rose-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-200 truncate">{p.equipment}</p>
                      <p className="text-sm text-slate-500">{p.daysLeft === 0 ? "Aujourd'hui" : `Dans ${p.daysLeft} jour${p.daysLeft > 1 ? 's' : ''}`} · {p.technician}</p>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full border ${freqColors[p.frequency]}`}>{p.frequency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
