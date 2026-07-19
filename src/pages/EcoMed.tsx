import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Leaf, Activity, AlertTriangle, TrendingDown,
  Lightbulb, ThermometerSun, BatteryCharging, X, Download, ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, ReferenceLine } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const energyData = [
  { time: '00:00', cons: 120, baseline: 110, peak: false },
  { time: '04:00', cons: 115, baseline: 110, peak: false },
  { time: '08:00', cons: 380, baseline: 350, peak: true },
  { time: '12:00', cons: 450, baseline: 420, peak: true },
  { time: '16:00', cons: 410, baseline: 400, peak: true },
  { time: '20:00', cons: 260, baseline: 250, peak: false },
  { time: '23:59', cons: 140, baseline: 120, peak: false },
];

const lightingData = [
  { zone: 'Couloirs', status: 'Optimisé', saving: 45, type: 'Détecteurs Présence' },
  { zone: 'Bureaux', status: 'À optimiser', saving: 12, type: 'Manuel (Gaspillage)' },
  { zone: 'Blocs Op.', status: 'Critique', saving: 0, type: 'Toujours ON (Sécurité)' },
  { zone: 'Parkings', status: 'Optimisé', saving: 60, type: 'Solaire + LED' },
];

const algos = [
  {
    id: 'peak-shaving',
    title: 'Effacement de Crête (Peak Shaving)',
    desc: 'Lissage de la consommation pendant les heures de pointe tarifaire Senelec (18h-23h).',
    status: 'Actif',
    impact: '-18% sur facture de pointe',
    icon: TrendingDown,
    color: 'emerald'
  },
  {
    id: 'waste-detect',
    title: 'Détection IA de Gaspillage',
    desc: 'Identification des équipements et lumières laissés allumés hors heures de service.',
    status: 'Alerte',
    impact: '3 anomalies détectées ce mois',
    icon: AlertTriangle,
    color: 'rose'
  },
  {
    id: 'roi-replace',
    title: 'Moteur de ROI Remplacement',
    desc: 'Calcul de rentabilité pour remplacer les anciens équipements énergivores.',
    status: 'Recommandation',
    impact: 'Scanner GE (2012) : ROI en 18 mois',
    icon: BatteryCharging,
    color: 'blue'
  },
  {
    id: 'smart-light',
    title: 'Éclairage Intelligent (Smart Lighting)',
    desc: 'Gestion centralisée LED & HVAC couplée à l\'occupation réelle des pièces.',
    status: 'Partiel',
    impact: 'Couloirs optimisés (45% éco)',
    icon: Lightbulb,
    color: 'amber'
  }
];

// ── Modal wrapper ──────────────────────────────────────────────────────────

function Modal({ title, icon: Icon, iconColor, onClose, children }: {
  title: string; icon: React.ElementType; iconColor: string;
  onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-strong rounded-2xl p-6 shadow-2xl border border-slate-700/50 z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Icon size={20} className={iconColor} />
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Bilan Carbone Modal ────────────────────────────────────────────────────

const zonesCarbone = [
  { zone: 'Radiologie', co2: 3.8 },
  { zone: 'Bloc Op.', co2: 2.9 },
  { zone: 'Réanimation', co2: 2.3 },
  { zone: 'Urgences', co2: 1.8 },
  { zone: 'Laboratoire', co2: 1.1 },
  { zone: 'Autres', co2: 0.6 },
];

function BilanModal({ onClose }: { onClose: () => void }) {
  const total = zonesCarbone.reduce((a, z) => a + z.co2, 0);
  const objectif = 10;
  const economise = 2.3;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Bilan Carbone — Hôpital Ndamatou Touba', 14, 20);
    doc.setFontSize(10);
    doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 14, 28);
    doc.text(`CO₂ total : ${total.toFixed(1)} TCO₂e/mois`, 14, 35);
    doc.text(`Objectif ISO 14001 : ${objectif} TCO₂e/mois`, 14, 42);
    doc.text(`Économisé ce mois : ${economise} TCO₂e`, 14, 49);
    autoTable(doc, {
      startY: 58,
      head: [['Zone', 'Émissions (TCO₂e/mois)', '% du total']],
      body: zonesCarbone.map(z => [z.zone, z.co2.toFixed(1), `${((z.co2 / total) * 100).toFixed(0)}%`]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 185, 129] },
    });
    doc.save('bilan_carbone.pdf');
  };

  return (
    <Modal title="Bilan Carbone" icon={Leaf} iconColor="text-emerald-400" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40 text-center">
            <p className="text-[10px] text-slate-500 mb-1">CO₂ ce mois</p>
            <p className="text-lg font-bold text-white">{total.toFixed(1)} T</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40 text-center">
            <p className="text-[10px] text-slate-500 mb-1">Économisé</p>
            <p className="text-lg font-bold text-emerald-400">{economise} T</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40 text-center">
            <p className="text-[10px] text-slate-500 mb-1">Objectif</p>
            <p className="text-lg font-bold text-blue-400">{objectif} T</p>
          </div>
        </div>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zonesCarbone} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="zone" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: 11 }} formatter={(v) => [`${v} T`, 'CO₂']} />
              <Bar dataKey="co2" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
          {total > objectif ? `⚠ Dépassement de l'objectif de ${(total - objectif).toFixed(1)} TCO₂e.` : `✓ Dans l'objectif ISO 14001. Écart : ${(objectif - total).toFixed(1)} T de marge.`}
        </div>

        <button onClick={generatePDF} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
          <Download size={15} /> Télécharger PDF
        </button>
      </div>
    </Modal>
  );
}

// ── Détecteurs Modal ───────────────────────────────────────────────────────

const ZONES_DETECT_KEY = 'gmao_eco_detectors';
const defaultDetectors = [
  { zone: 'Couloirs', enabled: true, sensibilite: 7 },
  { zone: 'Bureaux', enabled: false, sensibilite: 5 },
  { zone: 'Blocs Op.', enabled: true, sensibilite: 9 },
  { zone: 'Parkings', enabled: true, sensibilite: 6 },
  { zone: 'Salles d\'attente', enabled: false, sensibilite: 4 },
];

function DetecteursModal({ onClose }: { onClose: () => void }) {
  const [detectors, setDetectors] = useState<typeof defaultDetectors>(() => {
    try { return JSON.parse(localStorage.getItem(ZONES_DETECT_KEY) || JSON.stringify(defaultDetectors)); }
    catch { return defaultDetectors; }
  });

  const save = (d: typeof detectors) => {
    setDetectors(d);
    localStorage.setItem(ZONES_DETECT_KEY, JSON.stringify(d));
  };

  return (
    <Modal title="Détecteurs de présence" icon={Lightbulb} iconColor="text-amber-400" onClose={onClose}>
      <div className="space-y-3">
        {detectors.map((d, i) => (
          <div key={d.zone} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">{d.zone}</span>
              <button
                onClick={() => {
                  const next = [...detectors];
                  next[i] = { ...d, enabled: !d.enabled };
                  save(next);
                }}
                className={`relative inline-flex h-5 w-10 shrink-0 rounded-full transition-colors ${d.enabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform mt-0.5 ${d.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Sensibilité</span>
                <span>{d.sensibilite}/10</span>
              </div>
              <input
                type="range" min="1" max="10" value={d.sensibilite}
                onChange={e => { const next = [...detectors]; next[i] = { ...d, sensibilite: Number(e.target.value) }; save(next); }}
                className="w-full accent-amber-400"
                disabled={!d.enabled}
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full mt-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95">
        Enregistrer la configuration
      </button>
    </Modal>
  );
}

// ── Extinction Auto Modal ──────────────────────────────────────────────────

const SCHEDULE_KEY = 'gmao_eco_schedule';
const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const defaultSchedule = jours.map(j => ({ jour: j, debut: '22:00', fin: '06:00', zones: ['Couloirs'] }));

function ExtinctionModal({ onClose }: { onClose: () => void }) {
  const [schedule, setSchedule] = useState<typeof defaultSchedule>(() => {
    try { return JSON.parse(localStorage.getItem(SCHEDULE_KEY) || JSON.stringify(defaultSchedule)); }
    catch { return defaultSchedule; }
  });

  const zonesOptions = ['Couloirs', 'Bureaux', 'Blocs Op.', 'Parkings', 'Salles d\'attente'];

  const save = (s: typeof schedule) => {
    setSchedule(s);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s));
  };

  const toggleZone = (dayIdx: number, zone: string) => {
    const next = [...schedule];
    const d = { ...next[dayIdx] };
    d.zones = d.zones.includes(zone) ? d.zones.filter(z => z !== zone) : [...d.zones, zone];
    next[dayIdx] = d;
    save(next);
  };

  return (
    <Modal title="Planifier Extinction Auto" icon={Zap} iconColor="text-rose-400" onClose={onClose}>
      <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
        {schedule.map((s, i) => (
          <div key={s.jour} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <p className="text-xs font-bold text-slate-200 mb-2">{s.jour}</p>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Heure extinction</label>
                <input type="time" value={s.debut} onChange={e => { const n = [...schedule]; n[i] = { ...s, debut: e.target.value }; save(n); }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Heure rallumage</label>
                <input type="time" value={s.fin} onChange={e => { const n = [...schedule]; n[i] = { ...s, fin: e.target.value }; save(n); }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {zonesOptions.map(z => (
                <button key={z} type="button" onClick={() => toggleZone(i, z)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all border ${s.zones.includes(z) ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-slate-900/40 text-slate-500 border-slate-700'}`}>
                  {z}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full mt-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95">
        Enregistrer le planning
      </button>
    </Modal>
  );
}

// ── Simulation Financière Modal ────────────────────────────────────────────

const roiData = [
  { annee: 'Année 1', invest: -4500000, econo: 2800000, cumul: -1700000 },
  { annee: 'Année 2', invest: 0, econo: 3200000, cumul: 1500000 },
  { annee: 'Année 3', invest: 0, econo: 3600000, cumul: 5100000 },
];

function SimuFinanciereModal({ onClose }: { onClose: () => void }) {
  const investInit = 4500000;
  const ecoAnnuelle = 3200000;
  const roi = ((ecoAnnuelle * 3 - investInit) / investInit * 100).toFixed(0);
  const payback = (investInit / ecoAnnuelle).toFixed(1);

  return (
    <Modal title="Simulation Financière ROI" icon={BatteryCharging} iconColor="text-blue-400" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Investissement initial', val: `${investInit.toLocaleString('fr-FR')} FCFA`, col: 'text-rose-400' },
            { label: 'Économies annuelles', val: `${ecoAnnuelle.toLocaleString('fr-FR')} FCFA`, col: 'text-emerald-400' },
            { label: 'ROI sur 3 ans', val: `${roi}%`, col: 'text-violet-400' },
            { label: 'Payback period', val: `${payback} an(s)`, col: 'text-amber-400' },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/40">
              <p className="text-[10px] text-slate-500 mb-1">{item.label}</p>
              <p className={`text-base font-bold ${item.col}`}>{item.val}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] uppercase text-slate-500 bg-slate-900/40 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">Période</th>
                <th className="px-4 py-3">Investissement</th>
                <th className="px-4 py-3">Économies</th>
                <th className="px-4 py-3">Cumul net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {roiData.map(r => (
                <tr key={r.annee} className="hover:bg-slate-800/20">
                  <td className="px-4 py-2.5 font-medium">{r.annee}</td>
                  <td className="px-4 py-2.5 text-rose-400">{r.invest < 0 ? `−${Math.abs(r.invest).toLocaleString('fr-FR')}` : '—'} FCFA</td>
                  <td className="px-4 py-2.5 text-emerald-400">+{r.econo.toLocaleString('fr-FR')} FCFA</td>
                  <td className={`px-4 py-2.5 font-bold ${r.cumul < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {r.cumul < 0 ? `−${Math.abs(r.cumul).toLocaleString('fr-FR')}` : `+${r.cumul.toLocaleString('fr-FR')}`} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
          Remplacement de l'Autoclave STERIS 2012 par un modèle 2024. Basé sur une réduction de 35% de consommation énergétique.
        </div>
      </div>
    </Modal>
  );
}

export default function EcoMed() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBilan, setShowBilan] = useState(false);
  const [showDetecteurs, setShowDetecteurs] = useState(false);
  const [showExtinction, setShowExtinction] = useState(false);
  const [showSimuFinance, setShowSimuFinance] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {showBilan && <BilanModal onClose={() => setShowBilan(false)} />}
      {showDetecteurs && <DetecteursModal onClose={() => setShowDetecteurs(false)} />}
      {showExtinction && <ExtinctionModal onClose={() => setShowExtinction(false)} />}
      {showSimuFinance && <SimuFinanciereModal onClose={() => setShowSimuFinance(false)} />}

      {/* Header — poste de contrôle : navy + liseré rouge */}
      <div className="uc-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 -mx-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="uc-title text-2xl font-bold tracking-tight">EcoMed</h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ÉNERGIE & ESG
            </span>
          </div>
          <p className="uc-subtitle text-sm mt-1">
            Optimisation énergétique, éclairage intelligent et bilan carbone hospitalier.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBilan(true)}
            className="uc-btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95"
          >
            <Leaf size={16} />
            Générer Bilan Carbone
          </button>
        </div>
      </div>

      {/* Lien vers les statistiques consolidées */}
      <Link
        to="/statistiques"
        className="flex items-center justify-between p-4 rounded-2xl glass border border-slate-700/40 hover:border-emerald-500/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Leaf size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Voir les indicateurs énergie & carbone</p>
            <p className="text-xs text-slate-500">Consommation, empreinte carbone, score éclairage — page Statistiques</p>
          </div>
        </div>
        <ArrowRight size={16} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart (Peak Shaving) */}
        <div className="lg:col-span-2 glass border border-slate-700/40 rounded-2xl p-5">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Activity size={18} className="text-emerald-400" />
            Profil de Charge & Peak Shaving (kW)
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <ReferenceLine y={400} label={{ position: 'top', value: 'Seuil Critique Senelec', fill: '#f43f5e', fontSize: 10 }} stroke="#f43f5e" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="cons" name="Consommation Nette" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCons)" />
                <Area type="monotone" dataKey="baseline" name="Ligne de Base (Sans Optimisation)" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorBase)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Algorithms Status */}
        <div className="glass border border-slate-700/40 rounded-2xl p-5 flex flex-col">
          <h2 className="text-base font-bold text-white mb-4">Moteurs Algorithmiques</h2>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {algos.map(algo => {
              const Icon = algo.icon;
              return (
                <div key={algo.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={`text-${algo.color}-400`} />
                      <h3 className="text-sm font-bold text-slate-200">{algo.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-${algo.color}-500/20 text-${algo.color}-400 border border-${algo.color}-500/30`}>
                      {algo.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 leading-relaxed">{algo.desc}</p>
                  <p className="text-sm font-medium text-slate-300 bg-slate-950/50 p-1.5 rounded-lg border border-slate-800 text-center">
                    {algo.impact}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lighting & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Smart Lighting Status */}
        <div className="glass border border-slate-700/40 rounded-2xl p-5">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" />
            Audit d'Éclairage (Smart Lighting)
          </h2>
          <div className="space-y-3">
            {lightingData.map((zone, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{zone.zone}</h4>
                  <p className="text-sm text-slate-500">{zone.type}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-1 ${
                    zone.status === 'Optimisé' ? 'bg-emerald-500/20 text-emerald-400' :
                    zone.status === 'À optimiser' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {zone.status}
                  </span>
                  <p className="text-sm text-slate-400">Éco: {zone.saving}%</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowDetecteurs(true)} className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors border border-slate-700">
            Configurer les détecteurs de présence
          </button>
        </div>

        {/* Recommendations Feed */}
        <div className="glass border border-slate-700/40 rounded-2xl p-5">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Zap size={18} className="text-blue-400" />
            Recommandations IA & ROI
          </h2>
          <div className="space-y-4">
            
            <div className="flex gap-3 relative pl-4 border-l-2 border-rose-500/50">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-rose-500 flex items-center justify-center">
                <AlertTriangle size={8} className="text-rose-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-400 mb-0.5">Alerte Gaspillage (Scanner GE)</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  L'équipement est resté en mode 'Veille Profonde' (consommation 8kW) pendant 14 heures hors des plages de consultation.
                </p>
                <button onClick={() => setShowExtinction(true)} className="mt-2 text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-2 py-1 rounded transition-colors border border-rose-500/20">
                  Planifier Extinction Auto
                </button>
              </div>
            </div>

            <div className="flex gap-3 relative pl-4 border-l-2 border-blue-500/50">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                <BatteryCharging size={8} className="text-blue-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-400 mb-0.5">ROI Remplacement (Autoclave STERIS)</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Modèle actuel (2012) consomme 35% de plus que la moyenne. Le remplacement par un modèle 2024 sera amorti en énergie en 18 mois.
                </p>
                <button onClick={() => setShowSimuFinance(true)} className="mt-2 text-xs font-bold bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-2 py-1 rounded transition-colors border border-blue-500/20">
                  Voir Simulation Financière
                </button>
              </div>
            </div>

            <div className="flex gap-3 relative pl-4 border-l-2 border-amber-500/50">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center">
                <ThermometerSun size={8} className="text-amber-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-400 mb-0.5">Optimisation HVAC & Éclairage</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Lier les capteurs de présence de l'aile B aux climatiseurs permettrait d'effacer 4.5 kW de crête journalière.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
