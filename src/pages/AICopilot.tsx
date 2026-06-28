import { useState, useRef, useEffect } from 'react';
import {
  Bot, Send, Sparkles, Brain, AlertTriangle, CalendarClock,
  FileText, ChevronRight, Lightbulb, TrendingDown, RefreshCw,
  CheckCircle2, Clock, Zap, ShieldCheck, BarChart3, Loader2,
  MessageSquare, Star, ThumbsUp, ThumbsDown, Copy, Target,
  Mic, MicOff, Square
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts';

// ——————————————————————————————————————————————
// MOCK DATA
// ——————————————————————————————————————————————

const anomalyData = [
  { sensor: 'Température', value: 94, normal: 37, threshold: 42, severity: 'critical', explanation: 'Hausse de +57°C sur 2h. Défaillance suspectée du système de refroidissement principal. Probabilité: 94%.' },
  { sensor: 'Vibration Axiale', value: 78, normal: 1.2, threshold: 3.5, severity: 'warning', explanation: 'Vibrations 3x au-dessus de la baseline. Possible déséquilibre du rotor ou jeu de palier.' },
  { sensor: 'Courant Moteur', value: 62, normal: 12.5, threshold: 15, severity: 'warning', explanation: 'Pic de courant anormal. Indicateur de surcharge mécanique ou de court-circuit partiel.' },
  { sensor: 'Pression Huile', value: 45, normal: 2.1, threshold: 1.8, severity: 'info', explanation: 'Légère chute de pression. Vérification du niveau de lubrifiant recommandée.' },
];

const schedulingData = [
  { tech: 'Diallo A.', current: 8, optimized: 5, saved: '3h', score: 95 },
  { tech: 'Ndiaye F.', current: 6, optimized: 4, saved: '2h', score: 88 },
  { tech: 'Sow M.', current: 9, optimized: 6, saved: '3h', score: 91 },
  { tech: 'Ba K.', current: 7, optimized: 5, saved: '2h', score: 83 },
];

const failureScores = [
  { name: 'IRM Siemens Magnetom', score: 87, risk: 'Critique', color: '#f43f5e', days: 8 },
  { name: 'Scanner GE Optima', score: 73, risk: 'Élevé', color: '#f59e0b', days: 18 },
  { name: 'Respirateur Dräger', score: 41, risk: 'Modéré', color: '#3b82f6', days: 45 },
  { name: 'Automate Sysmex XN', score: 92, risk: 'Critique', color: '#f43f5e', days: 3 },
  { name: 'Défibrillateur Zoll', score: 18, risk: 'Faible', color: '#10b981', days: 120 },
  { name: 'Moniteur Mindray', score: 31, risk: 'Faible', color: '#10b981', days: 95 },
];

const radialData = [
  { name: 'Précision Modèle', value: 94, fill: '#10b981' },
  { name: 'Rappel (Recall)', value: 89, fill: '#3b82f6' },
  { name: 'F1-Score', value: 91, fill: '#8b5cf6' },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  ts: string;
  liked?: boolean | null;
}

const PREBUILT_QA: Record<string, string> = {
  default: "Je suis votre assistant GMAO intelligent. Posez-moi une question sur vos équipements, pannes, stocks ou plannings.",
  "quel équipement": "📊 **Analyse IA — Équipement le plus critique**\n\nL'**Automate Sysmex XN-1000** (Laboratoire Biologie) a un score de risque de **92/100** avec une panne prédite dans **3 jours**. Une intervention préventive est recommandée immédiatement. Voulez-je que je génère un bon de travail ?",
  "scanner": "🔍 **Diagnostic — Scanner GE Optima CT660**\n\nUsure du filament tube RX détectée (73/100 de risque). Durée de vie résiduelle estimée : **18 jours**. Coût de remplacement tube : ~3 500 000 FCFA. Je recommande de planifier l'intervention dans les 10 jours pour éviter une panne en production.",
  "stock": "📦 **Alerte Stock — Analyse IA**\n\nJe détecte **4 pièces détachées** en rupture imminente :\n- Filtre HEPA (Stérilisation) : 2 unités restantes\n- Joints toriques Ø12 : 0 unités (**rupture totale**)\n- Lampe UV désinfection : 1 unité\n- Huile compresseur ISO 46 : 1 bidon\n\nSuggestion : Commande urgente chez Biomédical Sénégal (fournisseur privilégié).",
  "planning": "📅 **Optimisation Planning — Semaine prochaine**\n\nL'IA a réduit les déplacements des techniciens de **32%** en regroupant les interventions par département :\n- Lundi : Bloc Opératoire (4 interventions regroupées)\n- Mardi : Radiologie + Laboratoire\n- Mercredi : Réanimation (priorité critique)\n- Jeudi/Vendredi : Maintenances préventives programmées\n\nTemps total économisé : **10 heures** cette semaine.",
  "rapport": "📝 **Rapport Automatique — Juin 2025**\n\nVoici un résumé IA du mois :\n✅ MTTR moyen : **3.2 heures** (-18% vs mai)\n✅ Disponibilité équipements : **97.4%** (+1.2%)\n⚠️ Budget maintenance : 87% consommé (alerte)\n🔴 2 équipements en zone critique (remplacement recommandé)\n\nSouhaitez-vous que je génère le rapport PDF complet ?",
  "mttr": "⏱️ **MTTR — Mean Time To Repair**\n\nMTTR global actuel : **3.2h** sur 30 derniers jours.\nObjectif KPI : < 4h ✅\n\nMeilleure performance : Diallo A. (MTTR: 2.1h)\nDépartement le plus lent : Radiologie (MTTR: 5.8h) — manque de pièces détachées en cause.",
  "budget": "💰 **Analyse Budgétaire IA**\n\n**Budget annuel alloué** : 45 000 000 FCFA\n**Consommé** : 39 150 000 FCFA (87%)\n**Restant** : 5 850 000 FCFA\n\n⚠️ Alerte : À ce rythme, le budget sera épuisé en **septembre**. Recommandation : Réallouer 8M FCFA depuis le budget acquisitions Q4 pour couvrir les maintenances critiques.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(PREBUILT_QA)) {
    if (key !== 'default' && lower.includes(key)) return PREBUILT_QA[key];
  }
  if (lower.includes('irm') || lower.includes('mri')) return "🧲 **IRM Siemens Magnetom Skyra**\n\nScore de risque actuel : **87/100** (Critique). Dégradation bobine gradient détectée par le modèle LSTM. RUL estimé : 8 jours. Intervention prioritaire recommandée. Technicien suggéré : Sow M. (compétence IRM certifiée SIEMENS).";
  if (lower.includes('techni') || lower.includes('tech')) return "👷 **Performance Techniciens — Ce mois**\n\n1. Diallo A. — MTTR 2.1h, 98% taux de résolution ⭐\n2. Sow M. — MTTR 2.9h, 95% taux de résolution\n3. Ndiaye F. — MTTR 3.4h, 91% taux de résolution\n4. Ba K. — MTTR 4.2h, 88% taux de résolution\n\nRecommandation : Former Ba K. sur les équipements de radiologie.";
  return "🤖 J'ai analysé votre question. Basé sur les données de votre parc biomédical, voici ce que je recommande :\n\n- Vérifiez l'état des équipements en zone critique (score > 75)\n- Planifiez une revue hebdomadaire des stocks de pièces\n- Activez les alertes automatiques pour les seuils critiques\n\nVoulez-vous que je génère un rapport détaillé sur un aspect spécifique ?";
}

// ——————————————————————————————————————————————
// COMPONENTS
// ——————————————————————————————————————————————

function AISectionCard({ title, subtitle, icon: Icon, gradient, children }: {
  title: string; subtitle: string; icon: React.ElementType; gradient: string; children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl glass border border-slate-700/40">
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ——————————————————————————————————————————————
// MAIN PAGE
// ——————————————————————————————————————————————

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: PREBUILT_QA.default, ts: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'anomaly' | 'scheduling' | 'failure'>('failure');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const speechSupported = !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input, ts: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const reply = getAIResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), liked: null }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => { setIsGenerating(false); setReportGenerated(true); }, 2500);
  };

  const quickQuestions = [
    'Quel équipement est le plus critique ?',
    'Analyse du budget maintenance',
    'Planning optimisé semaine prochaine',
    'Alerte stock pièces détachées',
    'MTTR actuel des techniciens',
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">IA Copilot</span>
            <span className="text-xs font-medium bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">BETA</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Intelligence Artificielle avancée pour la maintenance biomédicale · 5 modules actifs</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Modèles IA en ligne
        </div>
      </div>

      {/* Model Performance Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/60 to-slate-900/60 border border-violet-700/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/20"><Brain size={20} className="text-violet-300" /></div>
          <div>
            <p className="text-sm font-semibold text-white">Modèle actif : GMAO-BioMed-LSTM v2.3</p>
            <p className="text-xs text-slate-400">Entraîné sur 24 mois · 4 200 interventions · Dernière mise à jour : 28/06/2025</p>
          </div>
        </div>
        <div className="flex gap-6">
          {radialData.map(d => (
            <div key={d.name} className="text-center">
              <p className="text-lg font-bold" style={{ color: d.fill }}>{d.value}%</p>
              <p className="text-[10px] text-slate-500">{d.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Chatbot + Tabs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* MODULE 1 : Conversational AI Assistant */}
        <AISectionCard
          title="Assistant IA Conversationnel"
          subtitle="Posez des questions en langage naturel sur votre parc biomédical"
          icon={MessageSquare}
          gradient="from-violet-600 to-indigo-600"
        >
          {/* Chat Window */}
          <div className="h-72 overflow-y-auto space-y-3 pr-1 mb-3 scrollbar-none">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Bot size={12} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-sm'
                    : 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-slate-700/50'
                }`}>
                  {msg.content}
                  <p className="text-[10px] text-slate-500 mt-1">{msg.ts}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Bot size={12} className="text-white" />
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-1.5">
                  {[0, 0.2, 0.4].map((d, j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="flex gap-2 flex-wrap mb-3">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-violet-900/60 border border-slate-700 hover:border-violet-500/50 text-slate-400 hover:text-violet-300 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ex : Quel équipement risque de tomber en panne cette semaine ?"
                className={`w-full bg-slate-900/60 border rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-colors ${isListening ? 'border-rose-500/60 focus:border-rose-500' : 'border-slate-700/60 focus:border-violet-500/60'}`}
              />
              {isListening && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-rose-400 font-semibold animate-pulse">● Écoute...</span>
              )}
            </div>
            {/* Mic button */}
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!speechSupported}
              title={!speechSupported ? 'Non supporté par ce navigateur' : isListening ? 'Arrêter' : 'Dicter'}
              className={`p-2.5 rounded-xl transition-all ${
                !speechSupported
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                  : isListening
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {isListening ? <Square size={14} /> : <Mic size={14} />}
            </button>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-gradient-to-br from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white rounded-xl transition-all disabled:opacity-40 active:scale-95"
            >
              <Send size={14} />
            </button>
          </div>
        </AISectionCard>

        {/* MODULE 2 : Explainable Anomaly Detection (XAI) */}
        <AISectionCard
          title="Détection d'Anomalies Explicable (XAI)"
          subtitle="L'IA explique chaque anomalie détectée avec sa cause probable"
          icon={AlertTriangle}
          gradient="from-rose-600 to-orange-600"
        >
          <div className="space-y-3">
            {anomalyData.map((a) => (
              <div key={a.sensor} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      a.severity === 'critical' ? 'bg-rose-500 animate-pulse' :
                      a.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                    }`} />
                    <span className="text-xs font-semibold text-slate-200">{a.sensor}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    a.severity === 'critical' ? 'bg-rose-500/20 text-rose-400' :
                    a.severity === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {a.severity === 'critical' ? 'CRITIQUE' : a.severity === 'warning' ? 'ALERTE' : 'INFO'}
                  </span>
                </div>
                {/* Score bar */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${
                      a.severity === 'critical' ? 'bg-rose-500' :
                      a.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                    }`} style={{ width: `${a.value}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{a.value}%</span>
                </div>
                {/* XAI Explanation */}
                <div className="flex items-start gap-1.5">
                  <Lightbulb size={11} className="text-violet-400 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-slate-400 leading-relaxed">{a.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </AISectionCard>
      </div>

      {/* Tabbed Analysis Section */}
      <div className="p-5 rounded-2xl glass border border-slate-700/40">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600">
              <BarChart3 size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Modules d'Intelligence Avancée</h2>
              <p className="text-xs text-slate-500 mt-0.5">Scoring de panne · Optimisation Planning · Analyse de risque</p>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'failure', label: 'Scoring Panne' },
              { id: 'scheduling', label: 'Planning IA' },
              { id: 'anomaly', label: 'SHAP / XAI' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* MODULE 3 : Failure Risk Scoring */}
        {activeTab === 'failure' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 mb-4">Score de risque de panne calculé par le modèle Random Forest + gradient boosting — 0 (sain) → 100 (panne imminente)</p>
            {failureScores.map(eq => (
              <div key={eq.name} className="flex items-center gap-4 group">
                <div className="w-44 shrink-0">
                  <p className="text-xs text-slate-300 truncate group-hover:text-white transition-colors">{eq.name}</p>
                  <p className="text-[10px] text-slate-500">Panne estimée : {eq.days} jours</p>
                </div>
                <div className="flex-1 h-5 bg-slate-900 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${eq.score}%`, backgroundColor: eq.color, opacity: 0.85 }}
                  />
                  <div className="absolute inset-0 flex items-center">
                    <span className="text-[10px] font-bold text-white ml-3 drop-shadow">{eq.score}/100</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold w-16 text-right shrink-0`} style={{ color: eq.color }}>
                  {eq.risk}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* MODULE 4 : Smart Scheduling Optimization */}
        {activeTab === 'scheduling' && (
          <div>
            <p className="text-xs text-slate-500 mb-4">Algorithme d'optimisation (Simulated Annealing + Contraintes de compétences) — Réduction du nombre de déplacements inter-services</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={schedulingData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="tech" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: 11 }}
                    formatter={(v, n) => [`${v} interventions`, n === 'current' ? 'Planning actuel' : 'Planning optimisé IA']}
                  />
                  <Bar dataKey="current" name="current" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.4} />
                  <Bar dataKey="optimized" name="optimized" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {schedulingData.map(t => (
                  <div key={t.tech} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-200">{t.tech}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">−{t.saved}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="text-blue-400">{t.current} tâches actuelles</span>
                      <ChevronRight size={10} />
                      <span className="text-emerald-400">{t.optimized} tâches optimisées</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${t.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 5 : SHAP Feature Importance (XAI) */}
        {activeTab === 'anomaly' && (
          <div>
            <p className="text-xs text-slate-500 mb-4">Valeurs SHAP — Contribution de chaque variable à la prédiction de panne de l'IRM Siemens Magnetom (score: 87/100)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  { feature: 'Température bobine', shap: 0.38, label: '+0.38', color: '#f43f5e' },
                  { feature: 'Heures de fonctionnement', shap: 0.24, label: '+0.24', color: '#f59e0b' },
                  { feature: 'Vibration RMS', shap: 0.18, label: '+0.18', color: '#f59e0b' },
                  { feature: 'Nombre de redémarrages', shap: 0.11, label: '+0.11', color: '#3b82f6' },
                  { feature: 'Dernier entretien (jours)', shap: 0.07, label: '+0.07', color: '#3b82f6' },
                  { feature: 'Tension alimentation', shap: -0.05, label: '−0.05', color: '#10b981' },
                  { feature: 'Humidité salle', shap: -0.08, label: '−0.08', color: '#10b981' },
                ].map(f => (
                  <div key={f.feature} className="flex items-center gap-3">
                    <p className="w-44 text-[11px] text-slate-300 shrink-0">{f.feature}</p>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-4 bg-slate-900 rounded overflow-hidden flex items-center">
                        <div
                          className="h-full rounded opacity-80"
                          style={{ width: `${Math.abs(f.shap) * 200}%`, backgroundColor: f.color, marginLeft: f.shap < 0 ? 'auto' : 0 }}
                        />
                      </div>
                      <span className="text-[10px] font-bold w-10 text-right" style={{ color: f.color }}>{f.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={14} className="text-violet-400" />
                    <h4 className="text-xs font-semibold text-white">Interprétation IA</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    La prédiction de panne est principalement due à la <strong className="text-rose-400">surchauffe de la bobine gradient</strong> (38% de contribution) et aux <strong className="text-amber-400">heures d'utilisation élevées</strong> (24%). Ces deux facteurs combinés expliquent 62% du score de risque total. L'humidité de salle et la tension alimentation ont une influence légèrement protectrice.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <h4 className="text-xs font-semibold text-white">Actions recommandées</h4>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-400">
                    {[
                      'Vérification immédiate du système de refroidissement bobine',
                      'Planifier remplacement bobine dans 8 jours max',
                      'Réduire les plages d\'utilisation à 60% pendant l\'investigation',
                      'Commander pièce de rechange (réf: SIEM-GRAD-4422)',
                    ].map((a, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 size={10} className="text-emerald-400 mt-0.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODULE 5 : Auto NLP Report Generator */}
      <AISectionCard
        title="Générateur de Rapports NLP Automatique"
        subtitle="L'IA génère des rapports de maintenance en langue naturelle à partir de vos données"
        icon={FileText}
        gradient="from-emerald-600 to-teal-600"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Rapport Mensuel', desc: 'Synthèse MTTR, disponibilité, coûts, alertes', icon: BarChart3, color: 'text-blue-400 bg-blue-500/10' },
            { label: 'Rapport Directional', desc: 'Résumé exécutif pour la direction (non technique)', icon: Star, color: 'text-amber-400 bg-amber-500/10' },
            { label: 'Audit de Conformité', desc: 'Rapport ISO 13485 / JCI pour inspecteur externe', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10' },
          ].map(r => (
            <div key={r.label} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
              <div className={`p-2 rounded-lg ${r.color}`}><r.icon size={14} /></div>
              <div>
                <p className="text-xs font-semibold text-white">{r.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {!reportGenerated ? (
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? <><Loader2 size={15} className="animate-spin" /> Génération en cours…</> : <><Sparkles size={15} /> Générer le rapport IA du mois de Juin 2025</>}
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">Rapport généré — Juin 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"><Copy size={10} /> Copier</button>
                <button className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"><RefreshCw size={10} /> Regénérer</button>
              </div>
            </div>
            <div className="text-[11px] text-slate-300 leading-relaxed space-y-2 border-t border-slate-800 pt-3">
              <p><strong className="text-white">Résumé Exécutif — Maintenance Biomédicale · Hôpital Principal · Juin 2025</strong></p>
              <p>Ce mois de juin a été marqué par une disponibilité globale du parc biomédical de <strong className="text-emerald-400">97,4%</strong>, en hausse de 1,2 point par rapport à mai. Le temps moyen de réparation (MTTR) s'est établi à <strong className="text-blue-400">3,2 heures</strong>, soit une amélioration de 18% grâce à l'optimisation du planning par l'IA.</p>
              <p><strong className="text-amber-400">⚠️ Points d'attention :</strong> Deux équipements sont en zone critique — l'Automate Sysmex XN-1000 (score 92/100, panne dans 3 jours) et l'IRM Siemens Magnetom (score 87/100, panne dans 8 jours). Des interventions préventives ont été planifiées.</p>
              <p><strong className="text-rose-400">Budget :</strong> 87% du budget annuel consommé. Risque de dépassement identifié en septembre si aucune mesure n'est prise. Recommandation : réallocation de 8 MFCFA depuis le budget acquisitions Q4.</p>
              <p>Le modèle prédictif IA a évité <strong className="text-emerald-400">3 pannes critiques</strong> ce mois, générant une économie estimée à <strong className="text-emerald-400">4 200 000 FCFA</strong> en coûts de réparation d'urgence évités.</p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[10px] text-slate-500">Ce rapport est-il utile ?</span>
              <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-400 transition-colors"><ThumbsUp size={11} /> Oui</button>
              <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-400 transition-colors"><ThumbsDown size={11} /> Non</button>
            </div>
          </div>
        )}
      </AISectionCard>

    </div>
  );
}
