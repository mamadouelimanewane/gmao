import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, ScanLine, Search, PlusCircle } from 'lucide-react';
import { useDataStore } from '../contexts/DataStore';

export default function QRScannerModal({ onClose }: { onClose: () => void }) {
  const { equipments } = useDataStore();
  const navigate = useNavigate();
  const [scanState, setScanState] = useState<'scanning' | 'found' | 'not-found'>('scanning');
  const [scannedId, setScannedId] = useState<string | null>(null);

  useEffect(() => {
    // Simuler un scan réussi après 2.5 secondes
    const timer = setTimeout(() => {
      // Pick a random equipment to simulate finding one
      const randomEq = equipments[Math.floor(Math.random() * equipments.length)];
      setScannedId(randomEq.id);
      setScanState('found');
    }, 2500);

    return () => clearTimeout(timer);
  }, [equipments]);

  const eq = equipments.find(e => e.id === scannedId);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-md fixed top-0 w-full z-10">
        <h2 className="text-white font-bold flex items-center gap-2">
          <QrCode size={18} className="text-emerald-400" />
          Scan Rapide
        </h2>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 text-white">
          <X size={20} />
        </button>
      </div>

      {/* Scanner View */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Fake Camera Feed Background */}
        <div className="absolute inset-0 bg-slate-900 opacity-50" />

        {scanState === 'scanning' && (
          <div className="relative z-10 w-64 h-64 border-2 border-emerald-500/50 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            {/* Animated Laser */}
            <motion.div
              animate={{ y: [0, 250, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_#34d399]"
            />
            
            {/* Reticle markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl m-2" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl m-2" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl m-2" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl m-2" />
          </div>
        )}

        {/* Scan Result Overlay */}
        <AnimatePresence>
          {scanState === 'found' && eq && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 w-full p-6 bg-slate-900 rounded-t-3xl border-t border-slate-700 shadow-2xl"
            >
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <ScanLine size={32} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{eq.name}</h3>
                  <p className="text-slate-400 font-mono text-sm">{eq.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-slate-800 rounded-xl">
                  <p className="text-xs text-slate-500">Localisation</p>
                  <p className="text-sm text-slate-200 font-semibold truncate">{eq.location}</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl">
                  <p className="text-xs text-slate-500">Statut</p>
                  <p className={`text-sm font-semibold ${eq.status === 'En Panne' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {eq.status}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { onClose(); navigate('/equipements'); }}
                  className="flex-1 py-3 bg-slate-800 text-white font-semibold rounded-xl flex justify-center items-center gap-2"
                >
                  <Search size={18} />
                  Détails
                </button>
                <button
                  onClick={() => { onClose(); navigate('/tickets'); }}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl flex justify-center items-center gap-2 transition-colors"
                >
                  <PlusCircle size={18} />
                  Créer Ticket
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="absolute bottom-10 text-white/50 text-sm animate-pulse">
          {scanState === 'scanning' ? "Recherche de QR Code en cours..." : ""}
        </p>
      </div>
    </div>
  );
}
