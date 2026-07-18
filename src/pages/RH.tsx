import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, CalendarDays, Award, Star,
  Clock, ChevronRight, TrendingUp, CheckCircle2, AlertCircle,
  BookOpen, Wrench, Zap, Phone, Mail, Shield, BarChart3,
  Plus, Filter, Download, RefreshCw, Coffee, Target,
  HeartPulse, Microscope, Radio, Cpu, Activity, Stethoscope, ArrowRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const staff = [
  {
    id: 'TEC-001', name: 'Abdoulaye Diallo', role: 'Ingénieur Biomédical', grade: 'Senior',
    avatar: 'AD', color: 'from-violet-500 to-indigo-600',
    dept: 'Maintenance Biomédicale', phone: '+221 77 123 45 67', email: 'a.diallo@hopital.sn',
    status: 'active', mttr: 2.1, resolved: 98, interventions: 142, satisfaction: 4.8,
    skills: ['IRM / MRI', 'Scanner CT', 'Radiologie', 'Calibration'],
    certifications: [
      { name: 'Siemens HealthCare Cert.', expiry: '2026-03-01', valid: true },
      { name: 'ISO 13485 Auditeur', expiry: '2025-11-15', valid: true },
      { name: 'NFPA 99', expiry: '2025-09-01', valid: false },
    ],
    schedule: ['L', 'M', 'X', 'J', 'V'],
    load: 87, onLeave: false,
    planning: [
      { day: 'Lun', task: 'IRM Siemens — Maintenance préventive', type: 'preventif', dept: 'Radiologie' },
      { day: 'Mar', task: 'Scanner GE — Remplacement filament', type: 'curatif', dept: 'Radiologie' },
      { day: 'Mer', task: 'Formation ISO 13485 interne', type: 'formation', dept: 'Toute équipe' },
      { day: 'Jeu', task: 'Étalonnage moniteurs Réanimation', type: 'calibration', dept: 'Réanimation' },
      { day: 'Ven', task: 'Rapport mensuel + audit RUL', type: 'admin', dept: 'Bureau' },
    ]
  },
  {
    id: 'TEC-002', name: 'Fatou Ndiaye', role: 'Technicienne Biomédicale', grade: 'Confirmée',
    avatar: 'FN', color: 'from-pink-500 to-rose-600',
    dept: 'Laboratoire & Biologie', phone: '+221 76 234 56 78', email: 'f.ndiaye@hopital.sn',
    status: 'active', mttr: 3.4, resolved: 91, interventions: 98, satisfaction: 4.5,
    skills: ['Automates Labo', 'Hématologie', 'Biochimie', 'ECBU'],
    certifications: [
      { name: 'Sysmex Certified Tech.', expiry: '2026-06-01', valid: true },
      { name: 'Beckman Coulter Cert.', expiry: '2025-08-20', valid: false },
    ],
    schedule: ['L', 'M', 'X', 'J'],
    load: 72, onLeave: false,
    planning: [
      { day: 'Lun', task: 'Automate Sysmex XN — Contrôle qualité', type: 'preventif', dept: 'Laboratoire' },
      { day: 'Mar', task: 'Centrifugeuse Beckman — Révision', type: 'curatif', dept: 'Biochimie' },
      { day: 'Mer', task: 'Repos compensateur', type: 'conge', dept: '—' },
      { day: 'Jeu', task: 'Calibration automate coagulation', type: 'calibration', dept: 'Hémostase' },
      { day: 'Ven', task: 'Formation nouveau réactif Roche', type: 'formation', dept: 'Labo' },
    ]
  },
  {
    id: 'TEC-003', name: 'Mamadou Sow', role: 'Technicien Biomédical', grade: 'Junior',
    avatar: 'MS', color: 'from-cyan-500 to-blue-600',
    dept: 'Réanimation & Urgences', phone: '+221 70 345 67 89', email: 'm.sow@hopital.sn',
    status: 'leave', mttr: 2.9, resolved: 95, interventions: 115, satisfaction: 4.6,
    skills: ['Respirateurs', 'Moniteurs cardio', 'Défibrillateurs', 'Pompes à perfusion'],
    certifications: [
      { name: 'Dräger Evita Cert.', expiry: '2026-01-10', valid: true },
      { name: 'Zoll AED Cert.', expiry: '2027-02-15', valid: true },
    ],
    schedule: ['M', 'X', 'J', 'V', 'S'],
    load: 0, onLeave: true,
    planning: [
      { day: 'Lun', task: 'Congé annuel', type: 'conge', dept: '—' },
      { day: 'Mar', task: 'Congé annuel', type: 'conge', dept: '—' },
      { day: 'Mer', task: 'Congé annuel', type: 'conge', dept: '—' },
      { day: 'Jeu', task: 'Retour prévu — Révision respirateurs', type: 'preventif', dept: 'Réanimation' },
      { day: 'Ven', task: 'Check défibrillateurs Urgences', type: 'preventif', dept: 'Urgences' },
    ]
  },
  {
    id: 'TEC-004', name: 'Khadija Ba', role: 'Technicienne Biomédicale', grade: 'Confirmée',
    avatar: 'KB', color: 'from-amber-500 to-orange-600',
    dept: 'Bloc Opératoire', phone: '+221 78 456 78 90', email: 'k.ba@hopital.sn',
    status: 'active', mttr: 4.2, resolved: 88, interventions: 76, satisfaction: 4.2,
    skills: ['Tables opératoires', 'Bistouris électriques', 'Aspiration chirurgicale', 'Stérilisation'],
    certifications: [
      { name: 'Valleylab FT10 Cert.', expiry: '2025-07-01', valid: false },
      { name: 'STERIS Autoclave Cert.', expiry: '2026-09-30', valid: true },
    ],
    schedule: ['L', 'M', 'J', 'V'],
    load: 65, onLeave: false,
    planning: [
      { day: 'Lun', task: 'Tables opératoires — Vérification hydraulique', type: 'preventif', dept: 'Bloc A' },
      { day: 'Mar', task: 'Bistouri électrique Valleylab — Réparation', type: 'curatif', dept: 'Bloc B' },
      { day: 'Mer', task: 'Journée libre (planning creux)', type: 'admin', dept: '—' },
      { day: 'Jeu', task: 'Autoclave STERIS — Contrôle cycles', type: 'preventif', dept: 'Stérilisation' },
      { day: 'Ven', task: 'Réunion équipe + debriefing semaine', type: 'admin', dept: 'Bureau' },
    ]
  },
  {
    id: 'TEC-005', name: 'Ibrahima Faye', role: 'Ingénieur Systèmes Médicaux', grade: 'Expert',
    avatar: 'IF', color: 'from-emerald-500 to-teal-600',
    dept: 'Systèmes d\'Information Médicaux', phone: '+221 77 567 89 01', email: 'i.faye@hopital.sn',
    status: 'active', mttr: 1.8, resolved: 99, interventions: 63, satisfaction: 4.9,
    skills: ['PACS / DICOM', 'HL7 / FHIR', 'Cybersécurité médicale', 'IoT Santé'],
    certifications: [
      { name: 'IEC 62304 Software', expiry: '2027-01-01', valid: true },
      { name: 'ISO 27001 SecMed', expiry: '2026-05-20', valid: true },
      { name: 'HL7 FHIR R4 Certified', expiry: '2026-12-01', valid: true },
    ],
    schedule: ['L', 'M', 'X', 'J', 'V'],
    load: 55, onLeave: false,
    planning: [
      { day: 'Lun', task: 'Mise à jour firmware IRM — Patch sécurité', type: 'preventif', dept: 'Systèmes' },
      { day: 'Mar', task: 'Audit PACS — Intégrité données DICOM', type: 'admin', dept: 'Radiologie' },
      { day: 'Mer', task: 'Déploiement capteurs IoT nouveaux lits', type: 'curatif', dept: 'Réanimation' },
      { day: 'Jeu', task: 'Formation cybersécurité équipe', type: 'formation', dept: 'Toute équipe' },
      { day: 'Ven', task: 'Veille technologique + documentation', type: 'admin', dept: 'Bureau' },
    ]
  },
];

const skillIcons: Record<string, React.ElementType> = {
  'IRM / MRI': Radio, 'Scanner CT': Cpu, 'Radiologie': Activity,
  'Automates Labo': Microscope, 'Respirateurs': HeartPulse,
  'Moniteurs cardio': Activity, 'PACS / DICOM': Stethoscope, default: Wrench
};

const taskColors: Record<string, string> = {
  preventif: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  curatif: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  calibration: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  formation: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  admin: 'bg-slate-600/40 text-slate-400 border-slate-600/40',
  conge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const taskLabels: Record<string, string> = {
  preventif: 'Préventif', curatif: 'Curatif', calibration: 'Étalonnage',
  formation: 'Formation', admin: 'Administratif', conge: 'Congé',
};

const performanceData = staff.filter(s => !s.onLeave).map(s => ({
  name: s.avatar, mttr: s.mttr, resolu: s.resolved, satis: +(s.satisfaction * 20).toFixed(0)
}));

const workloadData = staff.map(s => ({
  name: s.name.split(' ')[0], load: s.load, max: 100
}));

const radarData = [
  { subject: 'Réactivité', Diallo: 95, Ndiaye: 82, Ba: 75 },
  { subject: 'Technique', Diallo: 90, Ndiaye: 88, Ba: 70 },
  { subject: 'Documentation', Diallo: 85, Ndiaye: 78, Ba: 80 },
  { subject: 'Sécurité', Diallo: 92, Ndiaye: 85, Ba: 74 },
  { subject: 'Communication', Diallo: 80, Ndiaye: 90, Ba: 82 },
];

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

// ── Gantt View ──────────────────────────────────────────────────────────────

const ganttTaskColors: Record<string, { bg: string; text: string }> = {
  preventif:  { bg: '#064e3b', text: '#34d399' },
  curatif:    { bg: '#4c0519', text: '#f87171' },
  formation:  { bg: '#1e1b4b', text: '#a78bfa' },
  calibration:{ bg: '#1e3a5f', text: '#60a5fa' },
  admin:      { bg: '#1e293b', text: '#94a3b8' },
  conge:      { bg: '#451a03', text: '#fbbf24' },
};

function GanttView() {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const shortDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

  // Simulate hours per task type
  const hoursPerType: Record<string, number> = {
    preventif: 4, curatif: 6, calibration: 3, formation: 7, admin: 2, conge: 0,
  };

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl glass border border-slate-700/40 overflow-x-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">Vue Gantt — Semaine 26</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(taskLabels).map(([k, v]) => (
              <span key={k} className={`text-xs font-bold px-2 py-0.5 rounded-full border ${taskColors[k]}`}>{v}</span>
            ))}
          </div>
        </div>

        <div className="min-w-[640px]">
          {/* Day headers */}
          <div className="grid gap-0.5" style={{ gridTemplateColumns: '160px repeat(5, 1fr)' }}>
            <div className="py-2" />
            {days.map((d, i) => (
              <div key={d} className="text-center py-2">
                <p className="text-xs font-bold text-slate-300">{d}</p>
                <p className="text-sm text-slate-500">30 Juin – {i + 1} Juil.</p>
              </div>
            ))}
          </div>

          {/* Rows: one per technician */}
          {staff.map(s => {
            const dayHours = s.planning.map(p => hoursPerType[p.type] ?? 0);
            return (
              <div key={s.id} className="grid gap-0.5 mb-1" style={{ gridTemplateColumns: '160px repeat(5, 1fr)' }}>
                {/* Tech label */}
                <div className="flex items-center gap-2 pr-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {s.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 truncate">{s.name.split(' ')[0]}</p>
                    <p className="text-xs text-slate-500 truncate">{s.grade}</p>
                  </div>
                </div>

                {/* Gantt blocks */}
                {s.planning.map((p, di) => {
                  const hours = hoursPerType[p.type] ?? 0;
                  const colors = ganttTaskColors[p.type] ?? ganttTaskColors.admin;
                  const overload = hours > 8;
                  return (
                    <div
                      key={di}
                      className="rounded-lg p-2 min-h-[60px] flex flex-col justify-between border"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.text + '50',
                      }}
                      title={`${p.task} · ${p.dept}`}
                    >
                      <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: colors.text }}>
                        {p.task}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-60" style={{ color: colors.text }}>{p.dept}</span>
                        {hours > 0 && (
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${overload ? 'bg-rose-500/30 text-rose-300' : 'bg-black/20 text-slate-300'}`}>
                            {hours}h
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Daily total row */}
          <div className="grid gap-0.5 mt-3 pt-3 border-t border-slate-800" style={{ gridTemplateColumns: '160px repeat(5, 1fr)' }}>
            <div className="text-sm font-bold text-slate-500 flex items-center">Charge/jour</div>
            {shortDays.map((d, di) => {
              const totalH = staff.reduce((acc, s) => {
                const type = s.planning[di]?.type ?? 'admin';
                return acc + (hoursPerType[type] ?? 0);
              }, 0);
              const avg = (totalH / staff.length).toFixed(1);
              const high = Number(avg) > 6;
              return (
                <div key={d} className={`text-center py-1 rounded text-sm font-bold ${high ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
                  {avg}h moy.
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl glass border border-slate-700/40">
        <p className="text-xs text-slate-500">
          <span className="text-rose-400 font-semibold">Rouge</span> = charge journalière élevée (&gt;6h moy.) ·
          Cliquer sur une tâche pour plus de détails. Vue lecture seule — drag-drop disponible dans une version future.
        </p>
      </div>
    </div>
  );
}

export default function RH() {
  const [selected, setSelected] = useState(staff[0]);
  const [activeTab, setActiveTab] = useState<'planning' | 'perf' | 'certs'>('planning');
  const [view, setView] = useState<'grid' | 'planning' | 'gantt'>('grid');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* ── Header ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 -mx-1"
        style={isLight ? { background: 'linear-gradient(135deg, #f3f1fb 0%, #eef3fb 100%)' } : undefined}
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: isLight ? '#1e1b2e' : undefined }}>
            Ressources Humaines
            <span className="ml-2 text-xs font-medium bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 align-middle">Biomédical</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: isLight ? '#5b5876' : 'var(--text-muted)' }}>Gestion des ingénieurs et techniciens · Planning · Compétences · Performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${view === 'grid' ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-slate-700 text-slate-400 hover:text-white'}`}
          >Équipe</button>
          <button
            onClick={() => setView('planning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${view === 'planning' ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-slate-700 text-slate-400 hover:text-white'}`}
          >Planning semaine</button>
          <button
            onClick={() => setView('gantt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${view === 'gantt' ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-slate-700 text-slate-400 hover:text-white'}`}
          >📊 Gantt</button>
          <button className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">
            <Plus size={15} />
          </button>
          <button className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors">
            <Download size={15} />
          </button>
        </div>
      </div>

      {/* Lien vers les statistiques consolidées */}
      <Link
        to="/statistiques"
        className="flex items-center justify-between p-4 rounded-2xl glass border border-slate-700/40 hover:border-cyan-500/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Voir les indicateurs équipe</p>
            <p className="text-xs text-slate-500">Effectif, disponibilité, MTTR, certifications — page Statistiques</p>
          </div>
        </div>
        <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
      </Link>

      {/* ══════════════════════════════ VIEW: ÉQUIPE ══════════════════════════════ */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT: Staff List */}
          <div className="xl:col-span-1 space-y-3">
            <h2 className="text-sm font-semibold text-slate-300 mb-1">Membres de l'équipe ({staff.length})</h2>
            {staff.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  selected.id === s.id
                    ? 'border-cyan-500/50 bg-cyan-950/30'
                    : 'border-slate-700/40 glass hover:border-slate-600/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                      {s.onLeave && (
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">CONGÉ</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 truncate">{s.role} · {s.grade}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">{s.resolved}%</p>
                    <p className="text-sm text-slate-500">Résolution</p>
                  </div>
                </div>

                {/* Load bar */}
                {!s.onLeave && (
                  <div className="mt-2.5">
                    <div className="flex justify-between text-sm text-slate-500 mb-1">
                      <span>Charge de travail</span>
                      <span className={s.load > 80 ? 'text-rose-400 font-bold' : 'text-slate-400'}>{s.load}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${s.load > 80 ? 'bg-rose-500' : s.load > 65 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                        style={{ width: `${s.load}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* RIGHT: Staff Detail */}
          <div className="xl:col-span-2 space-y-4">
            {/* Profile header */}
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                      selected.onLeave
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>{selected.onLeave ? 'En congé' : 'Disponible'}</span>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{selected.grade}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{selected.role} — {selected.dept}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Phone size={11} />{selected.phone}</span>
                    <span className="flex items-center gap-1"><Mail size={11} />{selected.email}</span>
                    <span className="flex items-center gap-1"><Shield size={11} />{selected.id}</span>
                  </div>
                </div>
                {/* Star rating */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 justify-end">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={13} className={i <= Math.round(selected.satisfaction) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-white mt-0.5">{selected.satisfaction}/5</p>
                  <p className="text-sm text-slate-500">Satisfaction patient</p>
                </div>
              </div>

              {/* KPI Row */}
              <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800">
                {[
                  { label: 'MTTR', value: `${selected.mttr}h`, icon: Clock, color: 'text-blue-400' },
                  { label: 'Résolution', value: `${selected.resolved}%`, icon: CheckCircle2, color: 'text-emerald-400' },
                  { label: 'Interventions', value: selected.interventions, icon: Wrench, color: 'text-violet-400' },
                  { label: 'Charge', value: selected.onLeave ? '—' : `${selected.load}%`, icon: BarChart3, color: selected.load > 80 ? 'text-rose-400' : 'text-amber-400' },
                ].map(k => (
                  <div key={k.label} className="text-center p-2.5 rounded-xl bg-slate-900/40">
                    <k.icon size={14} className={`${k.color} mx-auto mb-1`} />
                    <p className={`text-base font-bold ${k.color}`}>{k.value}</p>
                    <p className="text-sm text-slate-500">{k.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 w-fit">
              {[
                { id: 'planning', label: '📅 Planning semaine' },
                { id: 'perf', label: '📊 Compétences' },
                { id: 'certs', label: '🏅 Certifications' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === t.id ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab: Planning */}
            {activeTab === 'planning' && (
              <div className="p-5 rounded-2xl glass border border-slate-700/40">
                <h3 className="text-sm font-semibold text-white mb-4">Planning de la semaine — {selected.name.split(' ')[0]}</h3>
                <div className="space-y-2.5">
                  {selected.planning.map((p, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${taskColors[p.type]}`}>
                      <div className="w-8 text-center">
                        <p className="text-sm font-bold text-slate-400">{p.day}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-200">{p.task}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{p.dept}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 uppercase tracking-wide border-current">
                        {taskLabels[p.type]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Compétences */}
            {activeTab === 'perf' && (
              <div className="p-5 rounded-2xl glass border border-slate-700/40 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Domaines de compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map(skill => {
                      const Icon = skillIcons[skill] ?? skillIcons.default;
                      return (
                        <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                          <Icon size={12} className="text-cyan-400" />
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Jours de travail</h3>
                  <div className="flex gap-2">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                      <div key={d} className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                        selected.schedule.includes(d)
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-600'
                      }`}>{d}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Analyse comparative des performances</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={9} />
                      <PolarRadiusAxis stroke="#334155" fontSize={8} domain={[0, 100]} />
                      <Radar name="Diallo" dataKey="Diallo" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                      <Radar name="Ndiaye" dataKey="Ndiaye" stroke="#ec4899" fill="#ec4899" fillOpacity={0.15} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Tab: Certifications */}
            {activeTab === 'certs' && (
              <div className="p-5 rounded-2xl glass border border-slate-700/40">
                <h3 className="text-sm font-semibold text-white mb-4">Certifications & habilitations</h3>
                <div className="space-y-3">
                  {selected.certifications.map((c, i) => (
                    <div key={i} className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                      c.valid ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'
                    }`}>
                      <div className={`p-2 rounded-lg ${c.valid ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                        <Award size={14} className={c.valid ? 'text-emerald-400' : 'text-rose-400'} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-200">{c.name}</p>
                        <p className="text-sm text-slate-500 mt-0.5">Expiration : {new Date(c.expiry).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded-full border ${
                        c.valid
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}>{c.valid ? '✓ Valide' : '⚠ Expirée'}</span>
                    </div>
                  ))}
                </div>
                {selected.certifications.some(c => !c.valid) && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                    <AlertCircle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-amber-300 leading-relaxed">
                      {selected.certifications.filter(c => !c.valid).length} certification(s) expirée(s). Planifiez un renouvellement urgent pour maintenir la conformité ISO 13485.
                    </p>
                  </div>
                )}
                <button className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-slate-700 text-xs text-slate-500 hover:text-white hover:border-slate-600 transition-all flex items-center justify-center gap-2">
                  <BookOpen size={13} /> Planifier une formation / renouvellement
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ VIEW: PLANNING GLOBAL ══════════════════════════════ */}
      {view === 'planning' && (
        <div className="space-y-4">
          {/* Weekly Planning Grid */}
          <div className="p-5 rounded-2xl glass border border-slate-700/40 overflow-x-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Planning équipe — Semaine 26 (30 juin – 4 juillet 2025)</h2>
              <div className="flex gap-2">
                {Object.entries(taskLabels).map(([k, v]) => (
                  <span key={k} className={`text-xs font-bold px-2 py-0.5 rounded-full border ${taskColors[k]}`}>{v}</span>
                ))}
              </div>
            </div>
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-4 text-slate-400 font-semibold w-36">Technicien</th>
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map(d => (
                    <th key={d} className="pb-3 px-2 text-slate-400 font-semibold text-center">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {staff.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                          {s.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{s.name.split(' ')[0]}</p>
                          <p className="text-sm text-slate-500">{s.grade}</p>
                        </div>
                      </div>
                    </td>
                    {s.planning.map((p, i) => (
                      <td key={i} className="py-2 px-2">
                        <div className={`p-2 rounded-lg border text-center ${taskColors[p.type]}`} style={{ minWidth: 100 }}>
                          <p className="text-sm font-semibold leading-snug line-clamp-2">{p.task}</p>
                          <p className="text-xs mt-1 opacity-70">{p.dept}</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance & Workload charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <h3 className="text-sm font-semibold text-white mb-1">Charge de travail actuelle</h3>
              <p className="text-sm text-slate-500 mb-4">Taux d'occupation par membre de l'équipe</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={workloadData} layout="vertical" barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                  <YAxis type="category" dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} width={50} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }}
                    formatter={(v) => [`${v}%`, 'Charge']}
                  />
                  <Bar dataKey="load" radius={[0, 6, 6, 0]}>
                    {workloadData.map((entry, i) => (
                      <rect key={i} fill={entry.load > 80 ? '#f43f5e' : entry.load > 65 ? '#f59e0b' : entry.load === 0 ? '#334155' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 rounded-2xl glass border border-slate-700/40">
              <h3 className="text-sm font-semibold text-white mb-1">KPIs Performance Comparée</h3>
              <p className="text-sm text-slate-500 mb-4">MTTR, taux de résolution et satisfaction client</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={performanceData} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }} />
                  <Bar dataKey="resolu" name="Résolution %" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="satis" name="Satisfaction (/100)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════ VIEW: GANTT ══════════════════════════════ */}
      {view === 'gantt' && <GanttView />}

    </div>
  );
}
