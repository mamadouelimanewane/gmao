import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../contexts/DataStore';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  locationKey: string; // matches equipment location keywords
}

const rooms: Room[] = [
  { id: 'radiologie',   name: 'Radiologie',       x: 20,  y: 20,  width: 180, height: 120, locationKey: 'radiologie' },
  { id: 'urgences',     name: 'Urgences',          x: 220, y: 20,  width: 160, height: 120, locationKey: 'urgences' },
  { id: 'reanimation',  name: 'Réanimation',       x: 400, y: 20,  width: 180, height: 120, locationKey: 'réanimation' },
  { id: 'bloc1',        name: 'Bloc Op. 1',         x: 20,  y: 170, width: 110, height: 100, locationKey: 'bloc opératoire 1' },
  { id: 'bloc2',        name: 'Bloc Op. 2',         x: 145, y: 170, width: 110, height: 100, locationKey: 'bloc opératoire 2' },
  { id: 'bloc3',        name: 'Bloc Op. 3',         x: 270, y: 170, width: 110, height: 100, locationKey: 'bloc opératoire 3' },
  { id: 'maternite',    name: 'Maternité',          x: 400, y: 170, width: 180, height: 100, locationKey: 'maternité' },
  { id: 'laboratoire',  name: 'Laboratoire',        x: 20,  y: 300, width: 200, height: 100, locationKey: 'laboratoire' },
  { id: 'pharmacie',    name: 'Pharmacie',          x: 240, y: 300, width: 160, height: 100, locationKey: 'pharmacie' },
  { id: 'direction',    name: 'Direction',          x: 420, y: 300, width: 160, height: 100, locationKey: 'direction' },
  { id: 'sterilisation',name: 'Stérilisation',      x: 20,  y: 430, width: 180, height: 80,  locationKey: 'stérilisation' },
  { id: 'consultation', name: 'Consultations',      x: 220, y: 430, width: 180, height: 80,  locationKey: 'consultation' },
  { id: 'imagerie',     name: 'Imagerie Générale',  x: 420, y: 430, width: 160, height: 80,  locationKey: 'imagerie' },
];

function getRoomStatus(roomKey: string, equipments: ReturnType<typeof useDataStore>['equipments']) {
  const roomEqs = equipments.filter(eq =>
    eq.location.toLowerCase().includes(roomKey.toLowerCase())
  );
  if (roomEqs.length === 0) return 'empty';
  if (roomEqs.some(eq => eq.status === 'En Panne')) return 'panne';
  if (roomEqs.some(eq => eq.status === 'En Maintenance')) return 'maintenance';
  return 'ok';
}

const statusColors: Record<string, { fill: string; stroke: string; label: string }> = {
  ok:          { fill: '#064e3b', stroke: '#34d399', label: 'Opérationnel' },
  panne:       { fill: '#4c0519', stroke: '#f43f5e', label: 'Panne détectée' },
  maintenance: { fill: '#451a03', stroke: '#f59e0b', label: 'En maintenance' },
  empty:       { fill: '#1e293b', stroke: '#334155', label: 'Aucun équipement' },
};

export default function HospitalMap() {
  const { equipments } = useDataStore();
  const navigate = useNavigate();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const hoveredRoomData = rooms.find(r => r.id === hoveredRoom);
  const hoveredEqs = hoveredRoomData
    ? equipments.filter(eq => eq.location.toLowerCase().includes(hoveredRoomData.locationKey.toLowerCase()))
    : [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Plan Hôpital Interactif</h1>
          <p className="text-sm text-slate-400 mt-1">
            Vue cartographique du CHU · Statut en temps réel des équipements par salle
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4">
          {Object.entries(statusColors).filter(([k]) => k !== 'empty').map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cfg.stroke, opacity: 0.8 }} />
              {cfg.label}
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative glass border border-slate-700/40 rounded-2xl p-4 overflow-auto">
        <svg
          viewBox="0 0 600 540"
          className="w-full max-w-4xl mx-auto"
          style={{ minWidth: 500 }}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="600" height="540" fill="url(#grid)" />

          {/* Hospital outline */}
          <rect x="10" y="10" width="580" height="520" rx="8" fill="none" stroke="#334155" strokeWidth="1.5" />

          {/* Rooms */}
          {rooms.map(room => {
            const status = getRoomStatus(room.locationKey, equipments);
            const cfg = statusColors[status];
            const isHovered = hoveredRoom === room.id;

            return (
              <g
                key={room.id}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/equipements?location=${encodeURIComponent(room.locationKey)}`)}
                onMouseEnter={e => {
                  setHoveredRoom(room.id);
                  const svgRect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect();
                  const containerRect = (e.currentTarget.closest('.relative') as HTMLElement).getBoundingClientRect();
                  setTooltipPos({
                    x: room.x + room.width / 2,
                    y: room.y,
                  });
                }}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  rx="6"
                  fill={cfg.fill}
                  stroke={cfg.stroke}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  opacity={isHovered ? 1 : 0.85}
                  style={{ transition: 'all 0.15s' }}
                />
                {/* Room name */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 - 6}
                  textAnchor="middle"
                  fill={cfg.stroke}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {room.name}
                </text>
                {/* Equipment count */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 10}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  {(() => {
                    const count = equipments.filter(eq =>
                      eq.location.toLowerCase().includes(room.locationKey.toLowerCase())
                    ).length;
                    return count > 0 ? `${count} équipement${count > 1 ? 's' : ''}` : 'Aucun équipement';
                  })()}
                </text>
                {/* Status dot */}
                {status !== 'empty' && (
                  <circle
                    cx={room.x + room.width - 12}
                    cy={room.y + 12}
                    r="5"
                    fill={cfg.stroke}
                    opacity={status === 'panne' ? 0.9 : 0.7}
                  />
                )}
              </g>
            );
          })}

          {/* Tooltip rendered inside SVG as foreignObject */}
          {hoveredRoom && hoveredRoomData && (
            <foreignObject
              x={Math.min(tooltipPos.x - 80, 440)}
              y={Math.max(tooltipPos.y - 130, 5)}
              width="180"
              height="120"
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  padding: '10px',
                  fontSize: '11px',
                  color: '#e2e8f0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 6, color: '#34d399' }}>
                  {hoveredRoomData.name}
                </p>
                {hoveredEqs.length === 0 ? (
                  <p style={{ color: '#64748b' }}>Aucun équipement</p>
                ) : (
                  hoveredEqs.slice(0, 4).map(eq => (
                    <p key={eq.id} style={{ marginBottom: 2, color: eq.status === 'En Panne' ? '#f87171' : eq.status === 'En Maintenance' ? '#fbbf24' : '#6ee7b7' }}>
                      • {eq.name.split(' ').slice(0, 3).join(' ')}
                    </p>
                  ))
                )}
                {hoveredEqs.length > 4 && (
                  <p style={{ color: '#64748b', marginTop: 4 }}>+{hoveredEqs.length - 4} autres</p>
                )}
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      {/* Equipment list for selected section */}
      <div className="glass border border-slate-700/40 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Tous les équipements par salle</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rooms.filter(r => equipments.some(eq => eq.location.toLowerCase().includes(r.locationKey.toLowerCase()))).map(room => {
            const status = getRoomStatus(room.locationKey, equipments);
            const cfg = statusColors[status];
            const roomEqs = equipments.filter(eq => eq.location.toLowerCase().includes(room.locationKey.toLowerCase()));
            return (
              <div
                key={room.id}
                className="p-3 rounded-xl border cursor-pointer hover:bg-slate-800/30 transition-all"
                style={{ borderColor: cfg.stroke + '40' }}
                onClick={() => navigate('/equipements')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.stroke }} />
                  <p className="text-xs font-semibold text-slate-200">{room.name}</p>
                  <span className="ml-auto text-[10px] text-slate-500">{roomEqs.length} éq.</span>
                </div>
                {roomEqs.slice(0, 2).map(eq => (
                  <p key={eq.id} className="text-[10px] text-slate-500 truncate">{eq.name}</p>
                ))}
                {roomEqs.length > 2 && <p className="text-[10px] text-slate-600">+{roomEqs.length - 2} autres</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
