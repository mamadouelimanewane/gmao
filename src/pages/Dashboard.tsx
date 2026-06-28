import {
  Activity, AlertTriangle, CheckCircle2, Clock, Wrench,
  TrendingUp, TrendingDown, ArrowRight
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip,
  XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const weeklyData = [
  { day: 'Lun', pannes: 4, resolus: 3, preventif: 2 },
  { day: 'Mar', pannes: 3, resolus: 4, preventif: 3 },
  { day: 'Mer', pannes: 2, resolus: 2, preventif: 5 },
  { day: 'Jeu', pannes: 6, resolus: 4, preventif: 1 },
  { day: 'Ven', pannes: 5, resolus: 6, preventif: 4 },
  { day: 'Sam', pannes: 1, resolus: 2, preventif: 0 },
  { day: 'Dim', pannes: 2, resolus: 3, preventif: 0 },
];

const pieData = [
  { name: 'Opérationnel', value: 68, color: '#10b981' },
  { name: 'En Maintenance', value: 18, color: '#f59e0b' },
  { name: 'En Panne', value: 14, color: '#f43f5e' },
];

const serviceData = [
  { dept: 'Radiologie', uptime: 92 },
  { dept: 'Urgences', uptime: 98 },
  { dept: 'Réanimation', uptime: 95 },
  { dept: 'Bloc Op.', uptime: 99 },
  { dept: 'Maternité', uptime: 87 },
];

const kpis = [
  { label: 'Uptime Global', value: '96.4%', delta: '+1.2%', up: true, icon: Activity, color: 'emerald' },
  { label: 'Tickets Ouverts', value: '12', delta: '-4', up: true, icon: AlertTriangle, color: 'rose' },
  { label: 'Interventions 24h', value: '28', delta: '+5', up: false, icon: Wrench, color: 'blue' },
  { label: 'MTTR Moyen', value: '4h 12m', delta: '-30m', up: true, icon: Clock, color: 'purple' },
];

const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-500/10',
  rose: 'text-rose-400 bg-rose-500/10',
  blue: 'text-blue-400 bg-blue-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
};

const alerts = [
  { id: 1, equipment: 'IRM Siemens Magnetom', location: 'Radiologie – Salle 2', time: 'Il y a 10 min', status: 'critical' },
  { id: 2, equipment: 'Scanner GE Optima CT660', location: 'Urgences', time: 'Il y a 45 min', status: 'warning' },
  { id: 3, equipment: 'Moniteur Philips IntelliVue', location: 'Réanimation – Lit 4', time: 'Il y a 2h', status: 'warning' },
  { id: 4, equipment: 'Respirateur Dräger Evita', location: 'Bloc Opératoire 2', time: 'Il y a 3h', status: 'info' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl text-xs">
        <p className="font-semibold text-slate-200 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-400 capitalize">{entry.name}:</span>
            <span className="font-medium text-slate-200">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-slate-400 mt-1">
            Vue temps réel · <span className="text-emerald-400">CHU Aristide Le Dantec, Dakar</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">Live · Mis à jour il y a 5s</span>
          </div>
          <button onClick={() => navigate('/rapports')} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 active:scale-95">
            <CheckCircle2 size={16} />
            Générer Rapport
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className={`p-5 rounded-2xl glass border border-slate-700/40 group hover:border-slate-600/60 transition-all duration-300 hover:-translate-y-0.5 stagger-${i + 1} animate-fade-in-up`}
          >
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
              {kpi.up
                ? <TrendingUp size={13} className="text-emerald-400" />
                : <TrendingDown size={13} className="text-rose-400" />
              }
              <span className={`text-xs font-semibold ${kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>{kpi.delta}</span>
              <span className="text-xs text-slate-600">vs semaine passée</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Area Chart */}
        <div className="xl:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">Activité de la semaine</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pannes, interventions résolues et maintenance préventive</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /><span className="text-slate-400">Pannes</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-slate-400">Résolus</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-slate-400">Préventif</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gPannes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gResolus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPreventif" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="pannes" stroke="#f43f5e" strokeWidth={2} fill="url(#gPannes)" dot={false} activeDot={{ r: 4, fill: '#f43f5e' }} />
              <Area type="monotone" dataKey="resolus" stroke="#10b981" strokeWidth={2} fill="url(#gResolus)" dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
              <Area type="monotone" dataKey="preventif" stroke="#3b82f6" strokeWidth={2} fill="url(#gPreventif)" dot={false} activeDot={{ r: 4, fill: '#3b82f6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie + Alerts */}
        <div className="flex flex-col gap-4">
          {/* Status Pie */}
          <div className="p-5 rounded-2xl glass border border-slate-700/40 flex-1">
            <h2 className="text-sm font-semibold text-white mb-4">État du parc (347 équipements)</h2>
            <div className="flex items-center gap-4">
              <PieChart width={110} height={110}>
                <Pie data={pieData} cx={50} cy={50} innerRadius={32} outerRadius={50} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="space-y-2 flex-1">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-200">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Uptime par service */}
          <div className="p-5 rounded-2xl glass border border-slate-700/40">
            <h2 className="text-sm font-semibold text-white mb-4">Uptime par service</h2>
            <div className="space-y-3">
              {serviceData.map((s) => (
                <div key={s.dept}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{s.dept}</span>
                    <span className={`font-semibold ${s.uptime >= 95 ? 'text-emerald-400' : s.uptime >= 90 ? 'text-amber-400' : 'text-rose-400'}`}>{s.uptime}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${s.uptime >= 95 ? 'bg-emerald-500' : s.uptime >= 90 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${s.uptime}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <h2 className="text-sm font-semibold text-white">Alertes actives</h2>
            </div>
            <Link to="/tickets" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">Voir tout <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/50 hover:border-slate-700/50 transition-all cursor-pointer group">
                <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${
                  alert.status === 'critical' ? 'bg-rose-500/15 text-rose-400' :
                  alert.status === 'warning' ? 'bg-amber-500/15 text-amber-400' :
                  'bg-blue-500/15 text-blue-400'
                }`}>
                  <AlertTriangle size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{alert.equipment}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.location} · {alert.time}</p>
                </div>
                <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors mt-1 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats bar chart */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40">
          <h2 className="text-sm font-semibold text-white mb-1">Tickets par département</h2>
          <p className="text-xs text-slate-500 mb-4">Répartition des interventions ce mois</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={serviceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="dept" fontSize={10} stroke="#475569" tickLine={false} axisLine={false} />
              <YAxis fontSize={10} stroke="#475569" tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="uptime" fill="#10b981" radius={[4, 4, 0, 0]}
                label={{ position: 'top', fontSize: 10, fill: '#64748b' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
