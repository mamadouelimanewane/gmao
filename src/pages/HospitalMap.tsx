import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../contexts/DataStore';
import type { Equipment } from '../contexts/DataStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Activity, Thermometer, Zap, AlertTriangle, Crosshair, Settings,
  Edit3, Save, Plus, Grid, Move, Maximize, MousePointer2, Trash2
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

const defaultRooms: Room[] = [
  { id: 'radiologie',   name: 'Radiologie',       x: 40,  y: 40,  width: 180, height: 140, locationKey: 'radiologie', type: 'critical' },
  { id: 'urgences',     name: 'Urgences',          x: 240, y: 40,  width: 160, height: 140, locationKey: 'urgences', type: 'critical' },
  { id: 'reanimation',  name: 'Réanimation',       x: 420, y: 40,  width: 180, height: 140, locationKey: 'réanimation', type: 'critical' },
  { id: 'bloc1',        name: 'Bloc Op. 1',         x: 40,  y: 200, width: 110, height: 120, locationKey: 'bloc opératoire 1', type: 'critical' },
  { id: 'bloc2',        name: 'Bloc Op. 2',         x: 165, y: 200, width: 110, height: 120, locationKey: 'bloc opératoire 2', type: 'critical' },
  { id: 'bloc3',        name: 'Bloc Op. 3',         x: 290, y: 200, width: 110, height: 120, locationKey: 'bloc opératoire 3', type: 'critical' },
  { id: 'maternite',    name: 'Maternité',          x: 420, y: 200, width: 180, height: 120, locationKey: 'maternité', type: 'normal' },
  { id: 'laboratoire',  name: 'Laboratoire',        x: 40,  y: 340, width: 200, height: 120, locationKey: 'laboratoire', type: 'normal' },
  { id: 'pharmacie',    name: 'Pharmacie',          x: 260, y: 340, width: 160, height: 120, locationKey: 'pharmacie', type: 'normal' },
  { id: 'direction',    name: 'Direction',          x: 440, y: 340, width: 160, height: 120, locationKey: 'direction', type: 'normal' },
  { id: 'sterilisation',name: 'Stérilisation',      x: 40,  y: 480, width: 180, height: 100,  locationKey: 'stérilisation', type: 'normal' },
  { id: 'consultation', name: 'Consultations',      x: 240, y: 480, width: 180, height: 100,  locationKey: 'consultation', type: 'normal' },
  { id: 'imagerie',     name: 'Imagerie Générale',  x: 440, y: 480, width: 160, height: 100,  locationKey: 'imagerie', type: 'normal' },
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
  ok:          { fill: 'rgba(6, 78, 59, 0.25)', stroke: '#34d399', label: 'Opérationnel' },
  panne:       { fill: 'rgba(225, 29, 72, 0.3)', stroke: '#f43f5e', label: 'Panne détectée' },
  maintenance: { fill: 'rgba(217, 119, 6, 0.3)', stroke: '#f59e0b', label: 'En maintenance' },
  empty:       { fill: 'rgba(30, 41, 59, 0.2)', stroke: '#475569', label: 'Aucun équipement' },
};

// ── TELEMETRY WIDGET ────────────────────────────────────────────────────────
function TelemetryWidget({ equipment }: { equipment: Equipment }) {
  const navigate = useNavigate();
  const [data, setData] = useState<{ time: string; temp: number; vibration: number }[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 15 }).map((_, i) => ({
      time: `-${15 - i}s`,
      temp: equipment.status === 'En Panne' ? 85 + Math.random() * 10 : 35 + Math.random() * 5,
      vibration: equipment.status === 'En Panne' ? 12 + Math.random() * 5 : 2 + Math.random() * 2,
    }));
    setData(initial);
    const interval = setInterval(() => {
      setData(prev => {
        const newTemp = equipment.status === 'En Panne' ? 85 + Math.random() * 10 : 35 + Math.random() * 5;
        const newVib = equipment.status === 'En Panne' ? 12 + Math.random() * 5 : 2 + Math.random() * 2;
        return [...prev.slice(1), { time: 'Maintenant', temp: newTemp, vibration: newVib }];
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
            <p className={`text-sm font-bold font-mono ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>{latest?.temp.toFixed(1)}°C</p>
          </div>
        </div>
        <div className="glass p-2.5 rounded-lg flex items-center gap-3">
          <div className={`p-1.5 rounded-md ${latest?.vibration > 10 ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
            <Zap size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase">Vibration</p>
            <p className="text-sm font-bold font-mono text-slate-200">{latest?.vibration.toFixed(1)} mm/s</p>
          </div>
        </div>
      </div>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }} itemStyle={{ color: '#e2e8f0' }} />
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
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('gmao_hospital_map');
    return saved ? JSON.parse(saved) : defaultRooms;
  });

  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Drag & Drop State
  const [dragState, setDragState] = useState<{ id: string; type: 'move' | 'resize'; startX: number; startY: number; initialRoom: Room } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const roomEqs = selectedRoom
    ? equipments.filter(eq => eq.location.toLowerCase().includes(selectedRoom.locationKey.toLowerCase()))
    : [];

  const handleSave = () => {
    localStorage.setItem('gmao_hospital_map', JSON.stringify(rooms));
    setMode('view');
    setSelectedRoom(null);
  };

  const getMouseCoords = (e: React.MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const onMouseDown = (e: React.MouseEvent, id: string, type: 'move' | 'resize') => {
    if (mode !== 'edit') return;
    e.stopPropagation();
    const coords = getMouseCoords(e);
    const room = rooms.find(r => r.id === id);
    if (room) {
      setDragState({ id, type, startX: coords.x, startY: coords.y, initialRoom: { ...room } });
      setSelectedRoom(room);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!dragState) return;
    const coords = getMouseCoords(e);
    const dx = Math.round((coords.x - dragState.startX) / 10) * 10; // Snap to 10px grid
    const dy = Math.round((coords.y - dragState.startY) / 10) * 10;

    setRooms(prev => prev.map(r => {
      if (r.id !== dragState.id) return r;
      if (dragState.type === 'move') {
        return { ...r, x: Math.max(0, dragState.initialRoom.x + dx), y: Math.max(0, dragState.initialRoom.y + dy) };
      } else {
        return { ...r, width: Math.max(40, dragState.initialRoom.width + dx), height: Math.max(40, dragState.initialRoom.height + dy) };
      }
    }));
  };

  const onMouseUp = () => {
    setDragState(null);
  };

  const addRoom = () => {
    const newRoom: Room = {
      id: `room_${Date.now()}`,
      name: 'Nouvelle Salle',
      x: 100, y: 100, width: 140, height: 100,
      locationKey: 'nouveau', type: 'normal'
    };
    setRooms([...rooms, newRoom]);
    setSelectedRoom(newRoom);
  };

  const deleteSelected = () => {
    if (!selectedRoom) return;
    setRooms(rooms.filter(r => r.id !== selectedRoom.id));
    setSelectedRoom(null);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 animate-fade-in-up" onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      {/* ── MAP CONTAINER ── */}
      <div className={`flex-1 flex flex-col glass border border-slate-700/40 rounded-2xl p-4 overflow-hidden relative transition-all duration-500 ${selectedRoom && mode === 'view' ? 'w-2/3' : 'w-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Crosshair className="text-emerald-400" />
              Jumeau Numérique 3D
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest flex items-center gap-2">
              <Grid size={12} /> Plan d'architecture & Télémétrie
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
            {mode === 'view' ? (
              <button onClick={() => setMode('edit')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors">
                <Edit3 size={16} /> Éditer le plan
              </button>
            ) : (
              <>
                <button onClick={addRoom} className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-sm font-semibold rounded-lg transition-colors">
                  <Plus size={16} /> Ajouter
                </button>
                {selectedRoom && (
                  <button onClick={deleteSelected} className="flex items-center gap-2 px-3 py-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-sm font-semibold rounded-lg transition-colors">
                    <Trash2 size={16} /> Supprimer
                  </button>
                )}
                <div className="w-px h-6 bg-slate-700 mx-1" />
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-500/20">
                  <Save size={16} /> Sauvegarder
                </button>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        {mode === 'view' && (
          <div className="absolute top-20 right-8 z-10 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl flex flex-col gap-2 shadow-2xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Légende Statuts</div>
            {Object.entries(statusColors).filter(([k]) => k !== 'empty').map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <div className={`w-3 h-3 rounded-[3px] border ${key === 'panne' ? 'animate-pulse' : ''}`} style={{ backgroundColor: cfg.fill, borderColor: cfg.stroke }} />
                {cfg.label}
              </div>
            ))}
          </div>
        )}

        {/* The SVG Map (Blueprint Style) */}
        <div className="flex-1 relative overflow-auto bg-[#040b16] rounded-xl border border-slate-800 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing">
          
          <svg
            ref={svgRef}
            viewBox="0 0 1000 800"
            className="w-full h-full min-w-[800px] min-h-[600px] absolute inset-0"
            style={{ filter: mode === 'view' ? 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.05))' : 'none' }}
            onClick={(e) => { if(e.target === svgRef.current) setSelectedRoom(null); }}
          >
            {/* Blueprint Grid */}
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
              </pattern>
              <pattern id="largeGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#334155" strokeWidth="1" opacity="0.6" />
              </pattern>
              {/* Hatch pattern for walls */}
              <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#0f172a" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#largeGrid)" />

            {/* Global Building Outline */}
            <rect x="20" y="20" width="960" height="760" rx="0" fill="none" stroke="#475569" strokeWidth="4" />
            <rect x="24" y="24" width="952" height="752" rx="0" fill="none" stroke="#1e293b" strokeWidth="1" />

            {/* Rooms */}
            {rooms.map(room => {
              const status = mode === 'view' ? getRoomStatus(room.locationKey, equipments) : 'ok';
              const cfg = mode === 'view' ? statusColors[status] : { fill: 'rgba(51, 65, 85, 0.3)', stroke: '#64748b', label: '' };
              const isHovered = hoveredRoom === room.id && mode === 'view';
              const isSelected = selectedRoom?.id === room.id;

              return (
                <g
                  key={room.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedRoom(room); }}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  style={{ cursor: mode === 'edit' ? 'grab' : 'crosshair' }}
                >
                  {/* Outer glow if selected */}
                  {isSelected && (
                    <rect x={room.x-4} y={room.y-4} width={room.width+8} height={room.height+8} fill="none" stroke={mode === 'edit' ? '#3b82f6' : '#34d399'} strokeWidth="2" filter="blur(4px)" />
                  )}
                  
                  {/* Thick blueprint wall base */}
                  <rect
                    x={room.x} y={room.y} width={room.width} height={room.height}
                    fill="url(#hatch)" stroke="#0f172a" strokeWidth="6"
                  />
                  
                  {/* Inner Room Area */}
                  <rect
                    x={room.x + 3} y={room.y + 3} width={room.width - 6} height={room.height - 6}
                    fill={cfg.fill}
                    stroke={isSelected ? (mode === 'edit' ? '#3b82f6' : '#34d399') : cfg.stroke}
                    strokeWidth={isSelected ? 3 : 2}
                    opacity={isHovered ? 1 : 0.9}
                    onMouseDown={(e) => onMouseDown(e, room.id, 'move')}
                    className="transition-colors duration-300"
                  />

                  {/* Warning pulse if panne (View Mode only) */}
                  {status === 'panne' && mode === 'view' && (
                    <rect
                      x={room.x+3} y={room.y+3} width={room.width-6} height={room.height-6}
                      fill="none" stroke="#f43f5e" strokeWidth="4"
                      className="origin-center animate-ping opacity-60 pointer-events-none"
                    />
                  )}

                  {/* Blueprint Doorway (Simulated gap in wall) */}
                  <rect x={room.x + room.width / 2 - 20} y={room.y} width={40} height={6} fill="#040b16" />
                  <path d={`M ${room.x + room.width / 2 - 20} ${room.y + 3} Q ${room.x + room.width / 2} ${room.y - 15} ${room.x + room.width / 2 + 20} ${room.y + 3}`} fill="none" stroke={cfg.stroke} strokeWidth="1" strokeDasharray="4 4" />

                  {/* Room text (Visible only in edit mode or slightly transparent) */}
                  {mode === 'edit' && (
                    <>
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 - 6}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="13"
                        fontWeight="bold"
                        letterSpacing="2"
                        fontFamily="monospace"
                        className="pointer-events-none drop-shadow-md"
                      >
                        {room.name.toUpperCase()}
                      </text>
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 + 12}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="10"
                        fontFamily="monospace"
                        className="pointer-events-none"
                      >
                        {`${room.width} x ${room.height} mm`}
                      </text>
                    </>
                  )}

                  {/* Equipment Dots (View Mode) */}
                  {mode === 'view' && equipments.filter(eq => eq.location.toLowerCase().includes(room.locationKey.toLowerCase())).map((eq, idx) => (
                    <circle
                      key={eq.id}
                      cx={room.x + 15 + (idx * 15 % (room.width - 30))}
                      cy={room.y + 20 + Math.floor(idx * 15 / (room.width - 30)) * 15}
                      r="4"
                      fill={eq.status === 'En Panne' ? '#f43f5e' : eq.status === 'En Maintenance' ? '#f59e0b' : '#34d399'}
                      stroke="#040b16"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Resize Handle (Edit Mode) */}
                  {mode === 'edit' && isSelected && (
                    <g
                      transform={`translate(${room.x + room.width - 10}, ${room.y + room.height - 10})`}
                      style={{ cursor: 'nwse-resize' }}
                      onMouseDown={(e) => onMouseDown(e, room.id, 'resize')}
                    >
                      <rect x="-6" y="-6" width="16" height="16" fill="#3b82f6" rx="4" />
                      <Maximize size={10} color="#fff" x="-3" y="-3" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── SIDE PANEL (INSPECTION IOT) ── */}
      <AnimatePresence>
        {selectedRoom && mode === 'view' && (
          <motion.div
            initial={{ opacity: 0, x: 50, width: 0 }}
            animate={{ opacity: 1, x: 0, width: '33.333333%' }}
            exit={{ opacity: 0, x: 50, width: 0, transition: { duration: 0.2 } }}
            className="min-w-[380px] glass-strong border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings size={18} className="text-emerald-400" />
                  Scanner : {selectedRoom.name}
                </h2>
                <p className="text-xs text-slate-400 mt-1">Liaison télémétrique en direct</p>
              </div>
              <button onClick={() => setSelectedRoom(null)} className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0f172a]/40">
              {roomEqs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-900/20 rounded-2xl border border-slate-800/50 border-dashed">
                  <AlertTriangle size={36} className="mx-auto mb-3 opacity-40 text-amber-500" />
                  <p className="font-semibold">Aucun signal détecté</p>
                  <p className="text-xs mt-1 opacity-75">Aucun équipement répertorié dans ce secteur.</p>
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

      {/* ── TOOLTIP (BULLE AU SURVOL) ── */}
      <AnimatePresence>
        {hoveredRoom && mode === 'view' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 15,
              top: mousePos.y + 15,
            }}
            className="z-50 pointer-events-none bg-slate-900/95 backdrop-blur border border-slate-700/80 p-3 rounded-xl shadow-2xl flex flex-col gap-1 min-w-[160px]"
          >
            <p className="text-white font-bold text-sm">
              {rooms.find(r => r.id === hoveredRoom)?.name}
            </p>
            <p className="text-xs text-slate-400">
              {equipments.filter(eq => eq.location.toLowerCase().includes(rooms.find(r => r.id === hoveredRoom)?.locationKey.toLowerCase() || '')).length} équipements détectés
            </p>
            {getRoomStatus(rooms.find(r => r.id === hoveredRoom)?.locationKey || '', equipments) === 'panne' && (
              <p className="text-xs font-bold text-rose-400 mt-1 flex items-center gap-1">
                <AlertTriangle size={12}/> Alerte critique
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
