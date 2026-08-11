import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../contexts/DataStore';
import type { Equipment } from '../contexts/DataStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Activity, Thermometer, Zap, AlertTriangle, Crosshair, Settings
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  locationKey: string;
  type: 'critical' | 'normal';
}

const rooms: Room[] = [
  { id: 'radiologie',   name: 'Radiologie',       x: 20,  y: 20,  width: 180, height: 140, locationKey: 'radiologie', type: 'critical' },
  { id: 'urgences',     name: 'Urgences',          x: 220, y: 20,  width: 160, height: 140, locationKey: 'urgences', type: 'critical' },
  { id: 'reanimation',  name: 'Réanimation',       x: 400, y: 20,  width: 180, height: 140, locationKey: 'réanimation', type: 'critical' },
  { id: 'bloc1',        name: 'Bloc Op. 1',         x: 20,  y: 180, width: 110, height: 120, locationKey: 'bloc opératoire 1', type: 'critical' },
  { id: 'bloc2',        name: 'Bloc Op. 2',         x: 145, y: 180, width: 110, height: 120, locationKey: 'bloc opératoire 2', type: 'critical' },
  { id: 'bloc3',        name: 'Bloc Op. 3',         x: 270, y: 180, width: 110, height: 120, locationKey: 'bloc opératoire 3', type: 'critical' },
  { id: 'maternite',    name: 'Maternité',          x: 400, y: 180, width: 180, height: 120, locationKey: 'maternité', type: 'normal' },
  { id: 'laboratoire',  name: 'Laboratoire',        x: 20,  y: 320, width: 200, height: 100, locationKey: 'laboratoire', type: 'normal' },
  { id: 'pharmacie',    name: 'Pharmacie',          x: 240, y: 320, width: 160, height: 100, locationKey: 'pharmacie', type: 'normal' },
  { id: 'direction',    name: 'Direction',          x: 420, y: 320, width: 160, height: 100, locationKey: 'direction', type: 'normal' },
  { id: 'sterilisation',name: 'Stérilisation',      x: 20,  y: 440, width: 180, height: 80,  locationKey: 'stérilisation', type: 'normal' },
  { id: 'consultation', name: 'Consultations',      x: 220, y: 440, width: 180, height: 80,  locationKey: 'consultation', type: 'normal' },
  { id: 'imagerie',     name: 'Imagerie Générale',  x: 420, y: 440, width: 160, height: 80,  locationKey: 'imagerie', type: 'normal' },
];

function getRoomStatus(roomKey: string, equipments: Equipment[]) {
  const roomEqs = equipments.filter(eq =>
    eq.location.toLowerCase().includes(roomKey.toLowerCase())
  );
  if (roomEqs.length === 0) return 'empty';
  if (roomEqs.some(eq => eq.status === 'En Panne')) return 'panne';
  if (roomEqs.some(eq => eq.status === 'En Maintenance')) return 'maintenance';
  return 'ok';
}

const statusColors: Record<string, { fill: string; stroke: string; label: string }> = {
  ok:          { fill: 'rgba(6, 78, 59, 0.3)', stroke: '#34d399', label: 'Opérationnel' },
  panne:       { fill: 'rgba(76, 5, 25, 0.4)', stroke: '#f43f5e', label: 'Panne détectée' },
  maintenance: { fill: 'rgba(69, 26, 3, 0.4)', stroke: '#f59e0b', label: 'En maintenance' },
  empty:       { fill: 'rgba(30, 41, 59, 0.3)', stroke: '#334155', label: 'Aucun équipement' },
};

// ── TELEMETRY WIDGET ────────────────────────────────────────────────────────
function TelemetryWidget({ equipment }: { equipment: Equipment }) {
  const navigate = useNavigate();
  const [data, setData] = useState<{ time: string; temp: number; vibration: number }[]>([]);

  useEffect(() => {
    // Generate initial dummy data
    const initial = Array.from({ length: 15 }).map((_, i) => ({
      time: `-${15 - i}s`,
      temp: equipment.status === 'En Panne' ? 85 + Math.random() * 10 : 35 + Math.random() * 5,
      vibration: equipment.status === 'En Panne' ? 12 + Math.random() * 5 : 2 + Math.random() * 2,
    }));
    setData(initial);

    // Live update
    const interval = setInterval(() => {
      setData(prev => {
        const newTemp = equipment.status === 'En Panne' ? 85 + Math.random() * 10 : 35 + Math.random() * 5;
        const newVib = equipment.status === 'En Panne' ? 12 + Math.random() * 5 : 2 + Math.random() * 2;
        const newData = [...prev.slice(1), { time: 'Maintenant', temp: newTemp, vibration: newVib }];
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [equipment.status]);

  const latest = data[data.length - 1];
  const isCritical = latest?.temp > 80;

  return (
    <div className={`p-4 rounded-xl border ${isCritical ? 'border-rose-500/50 bg-rose-500/10' : 'border-slate-700/50 bg-slate-800/40'} transition-all`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
            <Activity size={14} className={isCritical ? 'text-rose-400' : 'text-emerald-400'} />
            {equipment.name}
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{equipment.id}</p>
        </div>
        <button
          onClick={() => navigate(`/tickets`)}
          className="px-3 py-1.5 bg-slate-900 rounded-lg text-emerald-400 text-xs font-semibold hover:bg-slate-950 transition-colors border border-slate-700/50"
        >
          Créer Ticket
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass p-2.5 rounded-lg flex items-center gap-3">
          <div className={`p-1.5 rounded-md ${isCritical ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            <Thermometer size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase">Température</p>
            <p className={`text-sm font-bold font-mono ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
              {latest?.temp.toFixed(1)}°C
            </p>
          </div>
        </div>
        <div className="glass p-2.5 rounded-lg flex items-center gap-3">
          <div className={`p-1.5 rounded-md ${latest?.vibration > 10 ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
            <Zap size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase">Vibration</p>
            <p className="text-sm font-bold font-mono text-slate-200">
              {latest?.vibration.toFixed(1)} mm/s
            </p>
          </div>
        </div>
      </div>

      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Line type="monotone" dataKey="temp" stroke={isCritical ? '#f43f5e' : '#34d399'} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function HospitalMap() {
  const { equipments } = useDataStore();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const roomEqs = selectedRoom
    ? equipments.filter(eq => eq.location.toLowerCase().includes(selectedRoom.locationKey.toLowerCase()))
    : [];

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 animate-fade-in-up">
      {/* ── MAP CONTAINER ── */}
      <div className={`flex-1 flex flex-col glass border border-slate-700/40 rounded-2xl p-4 overflow-hidden relative transition-all duration-500 ${selectedRoom ? 'w-2/3' : 'w-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Crosshair className="text-emerald-400" />
              Jumeau Numérique
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Radar de surveillance en temps réel
            </p>
          </div>
          <div className="flex items-center gap-3">
            {Object.entries(statusColors).filter(([k]) => k !== 'empty').map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className={`w-2.5 h-2.5 rounded-full ${key === 'panne' ? 'animate-pulse' : ''}`} style={{ backgroundColor: cfg.stroke }} />
                {cfg.label}
              </div>
            ))}
          </div>
        </div>

        {/* The SVG Map */}
        <div className="flex-1 relative overflow-auto bg-[#070d1a] rounded-xl border border-slate-800/80 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
          {/* Radar sweeping effect (CSS simulated) */}
          <style>
            {`
              @keyframes spin-radar { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}
          </style>
          <div className="absolute inset-[-50%] pointer-events-none opacity-20 origin-center"
               style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(52, 211, 153, 0.4) 100%)', animation: 'spin-radar 4s linear infinite' }} />
               
          <svg
            viewBox="0 0 600 540"
            className="w-full h-full min-w-[600px] absolute inset-0"
            style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.1))' }}
          >
            {/* Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Hospital outline */}
            <rect x="10" y="10" width="580" height="520" rx="8" fill="none" stroke="#334155" strokeWidth="2" />

            {/* Rooms */}
            {rooms.map(room => {
              const status = getRoomStatus(room.locationKey, equipments);
              const cfg = statusColors[status];
              const isHovered = hoveredRoom === room.id;
              const isSelected = selectedRoom?.id === room.id;

              return (
                <g
                  key={room.id}
                  style={{ cursor: 'crosshair' }}
                  onClick={() => setSelectedRoom(room)}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                >
                  {/* Outer glow if selected */}
                  {isSelected && (
                    <rect x={room.x-2} y={room.y-2} width={room.width+4} height={room.height+4} rx="6" fill="none" stroke="#34d399" strokeWidth="2" filter="blur(4px)" />
                  )}
                  
                  {/* Room rect */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    rx="4"
                    fill={cfg.fill}
                    stroke={cfg.stroke}
                    strokeWidth={isHovered || isSelected ? 2 : 1}
                    opacity={isHovered ? 1 : 0.8}
                    style={{ transition: 'all 0.2s' }}
                  />

                  {/* Warning pulse if panne */}
                  {status === 'panne' && (
                    <rect
                      x={room.x} y={room.y} width={room.width} height={room.height} rx="4"
                      fill="none" stroke="#f43f5e" strokeWidth="3"
                      className="origin-center animate-ping opacity-75"
                    />
                  )}

                  {/* Room text */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 - 4}
                    textAnchor="middle"
                    fill={cfg.stroke}
                    fontSize="11"
                    fontWeight="bold"
                    letterSpacing="1"
                    fontFamily="monospace"
                  >
                    {room.name.toUpperCase()}
                  </text>
                  
                  {/* Equipments count */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 + 10}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {equipments.filter(eq => eq.location.toLowerCase().includes(room.locationKey.toLowerCase())).length} ÉQ
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── SIDE PANEL (INSPECTION IOT) ── */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0, x: 50, width: 0 }}
            animate={{ opacity: 1, x: 0, width: '33.333333%' }}
            exit={{ opacity: 0, x: 50, width: 0, transition: { duration: 0.2 } }}
            className="min-w-[350px] glass-strong border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/40">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings size={18} className="text-emerald-400" />
                  Inspection : {selectedRoom.name}
                </h2>
                <p className="text-xs text-slate-400 mt-1">Télémétrie et statuts en temps réel</p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {roomEqs.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <AlertTriangle size={32} className="mx-auto mb-3 opacity-50" />
                  <p>Aucun équipement enregistré dans cette zone.</p>
                </div>
              ) : (
                roomEqs.map(eq => (
                  <TelemetryWidget key={eq.id} equipment={eq} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
