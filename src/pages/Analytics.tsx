import { useState } from 'react';
import { Cpu, Zap, ArrowRight, Settings2 } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const sensorTelemetry = [
  { time: '12:00', temp: 37.2, vib: 1.2, power: 220 },
  { time: '12:10', temp: 37.5, vib: 1.4, power: 221 },
  { time: '12:20', temp: 38.1, vib: 1.8, power: 219 },
  { time: '12:30', temp: 39.4, vib: 2.5, power: 218 }, // slight anomaly
  { time: '12:40', temp: 41.2, vib: 3.8, power: 220 }, // warning temp/vib
  { time: '12:50', temp: 40.5, vib: 3.2, power: 222 },
  { time: '13:00', temp: 38.9, vib: 2.1, power: 220 },
];

const healthIndex = [
  { subject: 'Stabilité Thermique', A: 95, B: 85, fullMark: 100 },
  { subject: 'Vibration Mécanique', A: 90, B: 78, fullMark: 100 },
  { subject: 'Régulation Tension', A: 99, B: 90, fullMark: 100 },
  { subject: 'Cycles d\'utilisation', A: 85, B: 95, fullMark: 100 },
  { subject: 'Qualité Signal/Résolution', A: 92, B: 70, fullMark: 100 },
];

const predictiveList = [
  { id: 'PRD-901', equipment: 'IRM Siemens Magnetom Skyra', metric: 'Dégradation bobine gradient', rul: '45 jours', confidence: 92, status: 'warning' },
  { id: 'PRD-902', equipment: 'Scanner GE Optima CT660', metric: 'Usure filament tube RX', rul: '12 jours', confidence: 97, status: 'critical' },
  { id: 'PRD-903', equipment: 'Respirateur Dräger Evita', metric: 'Diminution débit d\'oxygène', rul: '180 jours', confidence: 88, status: 'normal' },
  { id: 'PRD-904', equipment: 'Automate Sysmex XN', metric: 'Instabilité pompe aspiration', rul: '3 jours', confidence: 95, status: 'critical' },
];

export default function Analytics() {
  const [telemetry, setTelemetry] = useState(sensorTelemetry);
  const [isSimulating, setIsSimulating] = useState(false);
  const { push } = useNotifications();

  // IoT configurable thresholds
  const [tempMax, setTempMax] = useState<number>(() => {
    try { return Number(localStorage.getItem('iot_temp_max')) || 45; } catch { return 45; }
  });
  const [vibMax, setVibMax] = useState<number>(() => {
    try { return Number(localStorage.getItem('iot_vib_max')) || 4; } catch { return 4; }
  });
  const [voltMin, setVoltMin] = useState<number>(() => {
    try { return Number(localStorage.getItem('iot_volt_min')) || 210; } catch { return 210; }
  });

  const saveThreshold = (key: string, val: number) => {
    try { localStorage.setItem(key, String(val)); } catch {}
  };

  const simulateAnomaly = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newPoint = { time: '13:10', temp: 46.8, vib: 5.4, power: 205 };
      setTelemetry(prev => [...prev.slice(1), newPoint]);
      setIsSimulating(false);
      const anomalies: string[] = [];
      if (newPoint.temp > tempMax) anomalies.push(`Température: ${newPoint.temp}°C > seuil ${tempMax}°C`);
      if (newPoint.vib > vibMax) anomalies.push(`Vibration: ${newPoint.vib} mm/s > seuil ${vibMax} mm/s`);
      if (newPoint.power < voltMin) anomalies.push(`Tension: ${newPoint.power}V < seuil ${voltMin}V`);
      if (anomalies.length > 0) {
        push({
          type: 'error',
          title: 'Anomalie IoT détectée',
          message: anomalies.join(' | '),
          persistent: true,
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Analytics Prédictifs & IoT</h1>
          <p className="text-sm text-slate-400 mt-1">
            Modèles de Machine Learning pour la prédiction de panne (RUL) et surveillance IoT en continu.
          </p>
        </div>
        <button
          onClick={simulateAnomaly}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-rose-950/40 hover:shadow-rose-950/60 active:scale-95 disabled:opacity-50"
        >
          <Zap size={16} />
          {isSimulating ? 'Simulation...' : 'Simuler Anomalie IoT'}
        </button>
      </div>

      {/* IoT Threshold Configuration */}
      <div className="p-5 rounded-2xl glass border border-slate-700/40">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 size={16} className="text-emerald-400" />
          <h2 className="text-base font-semibold text-white">Configuration des seuils IoT</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Temperature */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Température max (°C)</span>
              <span className="text-amber-400 font-bold">{tempMax}°C</span>
            </div>
            <input
              type="range"
              min={40}
              max={60}
              value={tempMax}
              onChange={e => { setTempMax(Number(e.target.value)); saveThreshold('iot_temp_max', Number(e.target.value)); }}
              className="w-full accent-amber-500 h-1.5 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>40°C</span>
              <span>60°C</span>
            </div>
          </div>
          {/* Vibration */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Vibration max (mm/s)</span>
              <span className="text-rose-400 font-bold">{vibMax} mm/s</span>
            </div>
            <input
              type="range"
              min={2}
              max={8}
              step={0.5}
              value={vibMax}
              onChange={e => { setVibMax(Number(e.target.value)); saveThreshold('iot_vib_max', Number(e.target.value)); }}
              className="w-full accent-rose-500 h-1.5 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>2 mm/s</span>
              <span>8 mm/s</span>
            </div>
          </div>
          {/* Voltage */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Tension min (V)</span>
              <span className="text-blue-400 font-bold">{voltMin}V</span>
            </div>
            <input
              type="range"
              min={190}
              max={220}
              value={voltMin}
              onChange={e => { setVoltMin(Number(e.target.value)); saveThreshold('iot_volt_min', Number(e.target.value)); }}
              className="w-full accent-blue-500 h-1.5 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>190V</span>
              <span>220V</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-4">
          Seuils actifs · Le bouton "Simuler Anomalie" teste les valeurs contre ces seuils et déclenche des notifications si dépassés.
        </p>
      </div>

      {/* RUL Predictions List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Remaining Useful Life (RUL) – Prédictions IA</h2>
              <p className="text-xs text-slate-500 mt-0.5">Durée de vie utile estimée avant défaillance critique</p>
            </div>
            <span className="text-xs bg-slate-800 text-emerald-400 font-medium px-2.5 py-1 rounded-lg">
              Modèles LSTM actifs
            </span>
          </div>

          <div className="space-y-4">
            {predictiveList.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    item.status === 'critical' ? 'bg-rose-500/10 text-rose-400' :
                    item.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.equipment}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.metric}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">RUL Prédit</p>
                    <p className={`text-sm font-bold mt-0.5 ${
                      item.status === 'critical' ? 'text-rose-400' :
                      item.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>{item.rul}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Fiabilité IA</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.confidence}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">{item.confidence}%</span>
                    </div>
                  </div>

                  <button className="p-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-slate-400 transition-colors ml-2">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Radar Chart */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Indice de santé des équipements</h2>
            <p className="text-xs text-slate-500 mt-0.5">Diagnostic comparatif global</p>
          </div>
          <div className="h-[200px] flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthIndex}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={9} />
                <PolarRadiusAxis stroke="#334155" fontSize={8} />
                <Radar name="IRM Siemens" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Radar name="Scanner GE" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-slate-400">IRM Siemens</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-slate-400">Scanner GE</span></div>
          </div>
        </div>
      </div>

      {/* IoT Live Sensors Telemetry */}
      <div className="p-5 rounded-2xl glass border border-slate-700/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-semibold text-white">Télémétrie Capteurs IoT en Direct</h2>
            <p className="text-xs text-slate-500 mt-0.5">Graphique d'évolution des paramètres physiques du compresseur</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-rose-500" /><span className="text-slate-400">Température (°C)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-amber-500" /><span className="text-slate-400">Vibrations (mm/s)</span></div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={telemetry} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
            <Line type="monotone" dataKey="temp" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="vib" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
