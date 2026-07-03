import { useState } from 'react';
import {
  FileText, ShieldCheck, Download, Calendar,
  Lock, Award, CheckCircle2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useDataStore } from '../contexts/DataStore';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: 'Succès' | 'Échec';
}

const auditLogs: AuditLog[] = [
  { id: 'AUD-901', timestamp: '28 Juin 2026, 14:32', user: 'Jean Diallo (Resp.)', action: 'Modification équipement', details: 'Changement statut IRM Siemens -> En Panne', status: 'Succès' },
  { id: 'AUD-902', timestamp: '28 Juin 2026, 11:15', user: 'Fatou Sow (Tech)', action: 'Création Ticket', details: 'TKT-1043 généré pour dysfonctionnement alimentation', status: 'Succès' },
  { id: 'AUD-903', timestamp: '27 Juin 2026, 16:45', user: 'Amadou Ndiaye (Tech)', action: 'Clôture Ticket', details: 'Fermeture TKT-1040 (Maintenance trimestrielle)', status: 'Succès' },
  { id: 'AUD-904', timestamp: '26 Juin 2026, 09:12', user: 'Système', action: 'Génération Alerte RUL', details: 'Prédiction usure filament tube RX à 12 jours', status: 'Succès' },
  { id: 'AUD-905', timestamp: '25 Juin 2026, 18:22', user: 'Jean Diallo (Resp.)', action: 'Accès base de données', details: 'Tentative de connexion depuis IP externe refusée', status: 'Échec' },
];

export default function Rapports() {
  const [logs] = useState<AuditLog[]>(auditLogs);
  const { tickets } = useDataStore();

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');

    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(52, 211, 153);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Hôpital Ndamatou Touba', 15, 15);
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Rapport GMAO Mensuel', 15, 23);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(`Généré le ${dateStr}`, 150, 23);

    // KPIs section
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Indicateurs Clés de Performance', 15, 48);

    const openTickets = tickets.filter(t => t.status !== 'Résolu').length;
    const resolvedTickets = tickets.filter(t => t.status === 'Résolu').length;

    autoTable(doc, {
      startY: 52,
      head: [['KPI', 'Valeur', 'Objectif', 'Statut']],
      body: [
        ['Uptime moyen équipements', '96.4%', '> 95%', 'Conforme ✓'],
        ['Tickets ouverts', String(openTickets), '< 5', openTickets < 5 ? 'Conforme ✓' : 'Action requise'],
        ['Tickets résolus', String(resolvedTickets), '—', '—'],
        ['MTTR (Mean Time To Repair)', '3.2h', '< 4h', 'Conforme ✓'],
        ['Taux conformité PM', '76%', '> 95%', 'Action requise ⚠'],
      ],
      headStyles: { fillColor: [30, 41, 59], textColor: [148, 163, 184], fontSize: 9, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: [51, 65, 85] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    // Tickets table
    const finalY1 = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Registre des Tickets d\'Intervention', 15, finalY1);

    autoTable(doc, {
      startY: finalY1 + 4,
      head: [['ID', 'Titre', 'Équipement', 'Statut', 'Priorité', 'Date']],
      body: tickets.slice(0, 10).map(t => [
        t.id,
        t.title.substring(0, 35) + (t.title.length > 35 ? '…' : ''),
        t.equipment.substring(0, 25),
        t.status,
        t.priority,
        t.date,
      ]),
      headStyles: { fillColor: [30, 41, 59], textColor: [148, 163, 184], fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 50 }, 2: { cellWidth: 40 } },
    });

    // Compliance table
    const finalY2 = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Conformité Réglementaire', 15, finalY2);

    autoTable(doc, {
      startY: finalY2 + 4,
      head: [['Standard', 'Score', 'Statut']],
      body: [
        ['ISO 13485 (Dispositifs Médicaux)', '95%', 'Conforme'],
        ['Joint Commission International (JCI)', '88%', 'Conforme'],
        ['Loi Sénégalaise Protection Données', '100%', 'Excellence'],
        ['NFPA 99 (Hôpitaux & Énergies)', '75%', 'Action requise'],
      ],
      headStyles: { fillColor: [30, 41, 59], textColor: [148, 163, 184], fontSize: 9, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: [51, 65, 85] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 285, 210, 12, 'F');
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Généré le ${dateStr} par GMAO Health v3.0 · Hôpital Ndamatou Touba`, 15, 292);
      doc.text(`Page ${i}/${pageCount}`, 190, 292, { align: 'right' });
    }

    doc.save(`rapport-gmao-${YYYY}-${MM}.pdf`);
  };

  const complianceStandards = [
    { name: 'ISO 13485 (Dispositifs Médicaux)', progress: 95, status: 'Conforme', color: 'emerald' },
    { name: 'Joint Commission International (JCI)', progress: 88, status: 'Conforme', color: 'emerald' },
    { name: 'Loi Sénégalaise Protection Données', progress: 100, status: 'Excellence', color: 'emerald' },
    { name: 'NFPA 99 (Hôpitaux & Énergies)', progress: 75, status: 'Action requise', color: 'amber' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Rapports & Audit de Conformité</h1>
          <p className="text-sm text-slate-400 mt-1">
            Garantissez la traçabilité à 100% de toutes les interventions pour les certifications hospitalières.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 text-sm font-semibold rounded-xl transition-colors">
            <Calendar size={16} />
            Trimestre Q2 2026
          </button>
        </div>
      </div>

      {/* Compliance cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Compliance */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-base font-semibold text-white">Score de conformité global</h2>
              <Award className="text-emerald-400" size={24} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Moyenne des standards internationaux requis</p>
          </div>
          <div className="py-6 text-center">
            <p className="text-5xl font-black text-white tracking-tight">89.5%</p>
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center justify-center gap-1">
              <CheckCircle2 size={12} />
              +2.3% ce mois-ci
            </p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '89.5%' }} />
          </div>
        </div>

        {/* Audit Compliance list */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
          <h2 className="text-base font-semibold text-white mb-4">Standards & Certifications suivis</h2>
          <div className="space-y-4">
            {complianceStandards.map((std) => (
              <div key={std.name}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300">{std.name}</span>
                  <span className={std.progress >= 85 ? 'text-emerald-400' : 'text-amber-400'}>
                    {std.progress}% ({std.status})
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${std.progress >= 90 ? 'bg-emerald-500' : std.progress >= 80 ? 'bg-emerald-400' : 'bg-amber-500'}`}
                    style={{ width: `${std.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export center & audit logs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Export center */}
        <div className="p-5 rounded-2xl glass border border-slate-700/40 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-white mb-1">Centre d'exports</h2>
            <p className="text-xs text-slate-500 mb-4">Téléchargez les rapports périodiques et données d'audit.</p>
            
            <div className="space-y-2">
              <button
                onClick={generatePDF}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all text-xs font-semibold text-emerald-300"
              >
                <span className="flex items-center gap-2"><FileText size={14} className="text-emerald-400" />Télécharger Rapport PDF</span>
                <Download size={14} className="text-emerald-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs font-medium text-slate-200">
                <span className="flex items-center gap-2"><Award size={14} className="text-blue-400" />Registre de sécurité JCI</span>
                <Download size={14} className="text-slate-500" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs font-medium text-slate-200">
                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-purple-400" />Historique d'audit (Logs)</span>
                <Download size={14} className="text-slate-500" />
              </button>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-2.5">
            <Lock size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-slate-500 leading-normal">
              Les rapports générés intègrent des signatures électroniques certifiées et des hachages d'intégrité immuables pour conformité d'audit légal.
            </p>
          </div>
        </div>

        {/* Audit logs viewer */}
        <div className="xl:col-span-2 p-5 rounded-2xl glass border border-slate-700/40">
          <h2 className="text-base font-semibold text-white mb-4">Audit Logs (Chiffrement W3C)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] uppercase text-slate-500 tracking-wider border-b border-slate-800 bg-slate-900/30">
                <tr>
                  <th className="px-4 py-3 font-semibold">Horodatage</th>
                  <th className="px-4 py-3 font-semibold">Utilisateur</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                  <th className="px-4 py-3 font-semibold">Détails</th>
                  <th className="px-4 py-3 font-semibold text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-500">{log.timestamp}</td>
                    <td className="px-4 py-3 font-medium text-slate-200">{log.user}</td>
                    <td className="px-4 py-3 text-slate-400 font-semibold">{log.action}</td>
                    <td className="px-4 py-3 text-slate-500">{log.details}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        log.status === 'Succès' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
