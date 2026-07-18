import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, Wrench, Clock, TrendingUp, TrendingDown, ArrowRight,
  ArrowUpRight, ShieldAlert, CheckCircle2, Zap, Leaf, Lightbulb, Wallet,
  Users, UserCheck, Award, Target, CalendarCheck,
} from 'lucide-react';

const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-500/10',
  rose: 'text-rose-400 bg-rose-500/10',
  blue: 'text-blue-400 bg-blue-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
};

// ── Maintenance & Interventions (ex-Dashboard) ─────────────────────────────
const maintenanceKpis = [
  { label: 'Uptime Global', value: '96.4%', delta: '+1.2%', up: true, icon: Activity, color: 'emerald' },
  { label: 'Tickets Ouverts', value: '12', delta: '-4', up: true, icon: AlertTriangle, color: 'rose' },
  { label: 'Interventions 24h', value: '28', delta: '+5', up: false, icon: Wrench, color: 'blue' },
  { label: 'MTTR Moyen', value: '4h 12m', delta: '-30m', up: true, icon: Clock, color: 'purple' },
];

// ── PM Planifiées ───────────────────────────────────────────────────────────
const pmKpis = [
  { label: 'Taux de conformité', value: '76%', sub: 'Objectif : 95% ⚠️', icon: Target, color: 'from-amber-500 to-orange-500', light: 'text-amber-300' },
  { label: 'PM en retard', value: '2', sub: 'IRM Siemens · Moniteur Mindray', icon: AlertTriangle, color: 'from-rose-500 to-red-600', light: 'text-rose-300' },
  { label: 'PM cette semaine', value: '5', sub: '3 critiques · 2 élevées', icon: CalendarCheck, color: 'from-blue-500 to-cyan-600', light: 'text-blue-300' },
  { label: 'Durée moyenne PM', value: '2.1h', sub: 'vs 2.4h objectif ✅', icon: Clock, color: 'from-emerald-500 to-teal-600', light: 'text-emerald-300' },
];

// ── Ressources Humaines ─────────────────────────────────────────────────────
const rhKpis = [
  { label: 'Effectif total', value: '5', sub: '3 techniciens · 2 ingénieurs', icon: Users, color: 'from-violet-500 to-indigo-600', light: 'text-violet-300' },
  { label: 'Disponibilité équipe', value: '80%', sub: '1 technicien en congé', icon: UserCheck, color: 'from-emerald-500 to-teal-600', light: 'text-emerald-300' },
  { label: 'MTTR moyen', value: '2.9h', sub: 'Objectif < 4h ✅', icon: Clock, color: 'from-blue-500 to-cyan-600', light: 'text-blue-300' },
  { label: 'Certifications expirées', value: '3', sub: 'Renouvellement urgent', icon: Award, color: 'from-rose-500 to-orange-500', light: 'text-rose-300' },
];

// ── Énergie & ESG (ex-EcoMed) ────────────────────────────────────────────────
const ecoKpis = [
  { label: 'Consommation du Jour', value: '4.2', unit: 'MWh', sub: '-5.2% vs semaine passée', icon: Zap, valueColor: 'text-white', subColor: 'text-emerald-400' },
  { label: 'Empreinte Carbone', value: '12.5', unit: 'TCO₂e / mois', sub: 'Objectif ISO 14001 : en bonne voie', icon: Leaf, valueColor: 'text-white', subColor: 'text-slate-400' },
  { label: 'Gaspillage Détecté (Est.)', value: '145k', unit: 'FCFA / semaine', sub: "Action requise sur l'éclairage des bureaux", icon: AlertTriangle, valueColor: 'text-rose-400', subColor: 'text-rose-400', danger: true },
  { label: 'Score Smart Lighting', value: '68', unit: '/ 100', sub: null, icon: Lightbulb, valueColor: 'text-emerald-400', subColor: '' },
];

const financeKpis = [
  { label: 'Budget Annuel Alloué', value: '112 000 000 FCFA', sub: 'Exécution Q2 : 78%', color: 'text-white' },
  { label: 'Coûts Curatif & Pièces', value: '5 235 000 FCFA', sub: '+12% vs trimestre dernier', color: 'text-rose-400' },
  { label: 'Coûts Préventif & Étalons', value: '235 000 FCFA', sub: '-4% (optimisation des cycles)', color: 'text-emerald-400' },
  { label: 'Alertes Remplacement (RRI)', value: '2 Équipements', sub: 'Coût maintenance > 50% valeur', color: 'text-amber-400' },
];

function SectionHeader({ title, hint, href }: { title: string; hint: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
      </div>
      <Link to={href} className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold flex-shrink-0">
        Voir la page <ArrowRight size={12} />
      </Link>
    </div>
  );
}

export default function Statistiques() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Statistiques</h1>
        <p className="text-sm text-slate-400 mt-1">
          Vue consolidée de tous les indicateurs clés — regroupés ici pour alléger les autres pages.
        </p>
      </div>

      {/* Maintenance & Interventions */}
      <section>
        <SectionHeader title="Maintenance & Interventions" hint="Indicateurs du tableau de bord" href="/dashboard" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {maintenanceKpis.map((kpi) => (
            <div key={kpi.label} className="p-5 rounded-2xl glass border border-slate-700/40">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white mt-1.5 tracking-tight">{kpi.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${colorMap[kpi.color]}`}>
                  <kpi.icon size={20} className={colorMap[kpi.color].split(' ')[0]} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                {kpi.up ? <TrendingUp size={13} className="text-emerald-400" /> : <TrendingDown size={13} className="text-rose-400" />}
                <span className={`text-xs font-semibold ${kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>{kpi.delta}</span>
                <span className="text-xs text-slate-600">vs semaine passée</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stocks */}
      <section>
        <SectionHeader title="Stocks & Approvisionnement" hint="Indicateurs de la page Stocks" href="/stocks" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass border border-slate-700/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Valeur du stock</p>
                <p className="text-2xl font-bold text-white mt-1.5">4 825 000 FCFA</p>
              </div>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><ArrowUpRight size={18} /></div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Mise à jour : aujourd'hui à 12:00</p>
          </div>
          <div className="p-5 rounded-2xl glass border border-slate-700/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Articles en alerte</p>
                <p className="text-2xl font-bold text-rose-400 mt-1.5">2 Articles</p>
              </div>
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl"><ShieldAlert size={18} /></div>
            </div>
            <p className="text-xs text-rose-500/70 mt-3 flex items-center gap-1"><AlertTriangle size={12} /> Sous le seuil minimal de sécurité</p>
          </div>
          <div className="p-5 rounded-2xl glass border border-slate-700/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Taux de rotation</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1.5">85%</p>
              </div>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><CheckCircle2 size={18} /></div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Rotation saine des consommables</p>
          </div>
        </div>
      </section>

      {/* PM Planifiées */}
      <section>
        <SectionHeader title="PM Planifiées" hint="Conformité et charge de maintenance préventive" href="/pm" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pmKpis.map(k => (
            <div key={k.label} className="p-4 rounded-2xl glass border border-slate-700/40">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${k.color} w-fit mb-3`}>
                <k.icon size={16} className="text-white" />
              </div>
              <p className={`text-2xl font-bold ${k.light}`}>{k.value}</p>
              <p className="text-xs font-semibold text-white mt-0.5">{k.label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finances */}
      <section>
        <SectionHeader title="Coûts & TCO" hint="Budget et coûts de maintenance" href="/finances" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {financeKpis.map(k => (
            <div key={k.label} className="p-5 rounded-2xl glass border border-slate-700/40">
              <p className="text-xs font-semibold text-slate-500 uppercase">{k.label}</p>
              <p className={`text-2xl font-bold ${k.color} mt-1.5`}>{k.value}</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                <Wallet size={12} />
                <span>{k.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ressources Humaines */}
      <section>
        <SectionHeader title="Ressources Humaines" hint="Effectif, disponibilité et performance équipe" href="/rh" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {rhKpis.map(k => (
            <div key={k.label} className="p-4 rounded-2xl glass border border-slate-700/40">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${k.color} bg-opacity-20 w-fit mb-3`}>
                <k.icon size={16} className="text-white" />
              </div>
              <p className={`text-2xl font-bold ${k.light}`}>{k.value}</p>
              <p className="text-xs font-semibold text-white mt-0.5">{k.label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Énergie & ESG */}
      <section>
        <SectionHeader title="Énergie & ESG" hint="Consommation, empreinte carbone et éclairage" href="/energie" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecoKpis.map(k => (
            <div key={k.label} className={`glass border p-4 rounded-2xl relative overflow-hidden ${k.danger ? 'border-rose-500/30 bg-rose-500/5' : 'border-slate-700/40'}`}>
              <div className={`absolute top-0 right-0 p-4 opacity-10 ${k.danger ? 'text-rose-500' : ''}`}><k.icon size={48} /></div>
              <p className="text-xs font-medium text-slate-400 mb-1">{k.label}</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl font-bold ${k.valueColor}`}>{k.value}</p>
                <span className={`text-sm ${k.danger ? 'text-rose-400/70' : 'text-slate-400'}`}>{k.unit}</span>
              </div>
              {k.sub && <p className={`text-[10px] font-medium mt-2 ${k.subColor}`}>{k.sub}</p>}
              {k.label === 'Score Smart Lighting' && (
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[68%] h-full bg-emerald-500 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Conformité */}
      <section>
        <SectionHeader title="Conformité & Rapports" hint="Score de conformité aux standards internationaux" href="/rapports" />
        <div className="p-5 rounded-2xl glass border border-slate-700/40 max-w-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-white">Score de conformité global</h3>
            <Award className="text-emerald-400" size={22} />
          </div>
          <div className="py-5 text-center">
            <p className="text-4xl font-black text-white tracking-tight">89.5%</p>
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center justify-center gap-1">
              <CheckCircle2 size={12} /> +2.3% ce mois-ci
            </p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '89.5%' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
