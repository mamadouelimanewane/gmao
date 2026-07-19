import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'fr' | 'wo' | 'en';

// ── Translations ────────────────────────────────────────────────────────────

const translations = {
  fr: {
    // Nav
    dashboard:     'Portail',
    equipements:   'Équipements',
    interventions: 'Interventions',
    reparation:    'Workflow Réparation',
    pm:            'PM Planifiées',
    medpool:       'MedPool (Réseau)',
    energie:       'Énergie & ESG',
    stocks:        'Stocks & Achats',
    achats:        'Workflow Achat',
    fournisseurs:  'Fournisseurs',
    finances:      'Coûts & TCO',
    rh:            'Ressources Humaines',
    ia_copilot:    'IA Copilot',
    analytics:     'Analytics IoT',
    statistiques:  'Statistiques',
    rapports:      'Rapports',
    settings:      'Paramètres',
    // Common
    search:        'Rechercher…',
    logout:        'Déconnexion',
    online:        'En ligne',
    offline:       'Hors ligne',
    welcome:       'Bienvenue',
    // Dashboard
    total_equip:   'Équipements totaux',
    operational:   'Opérationnels',
    in_maintenance:'En maintenance',
    critical:      'Alertes critiques',
    open_tickets:  'Tickets ouverts',
    mttr:          'MTTR moyen',
    availability:  'Disponibilité',
    compliance:    'Conformité PM',
    // Notifications
    notif_title:   'Notifications',
    notif_empty:   'Aucune nouvelle notification',
    mark_read:     'Tout marquer lu',
  },
  en: {
    dashboard:     'Portal',
    equipements:   'Equipment',
    interventions: 'Work Orders',
    reparation:    'Repair Workflow',
    pm:            'Planned PM',
    medpool:       'MedPool (Network)',
    energie:       'Energy & ESG',
    stocks:        'Inventory',
    achats:        'Purchase Workflow',
    fournisseurs:  'Suppliers',
    finances:      'Costs & TCO',
    rh:            'Human Resources',
    ia_copilot:    'AI Copilot',
    analytics:     'IoT Analytics',
    statistiques:  'Statistics',
    rapports:      'Reports',
    settings:      'Settings',
    search:        'Search…',
    logout:        'Logout',
    online:        'Online',
    offline:       'Offline',
    welcome:       'Welcome',
    total_equip:   'Total Equipment',
    operational:   'Operational',
    in_maintenance:'In Maintenance',
    critical:      'Critical Alerts',
    open_tickets:  'Open Tickets',
    mttr:          'Average MTTR',
    availability:  'Availability',
    compliance:    'PM Compliance',
    notif_title:   'Notifications',
    notif_empty:   'No new notifications',
    mark_read:     'Mark all read',
  },
  wo: {
    dashboard:     'Buntu bi',
    equipements:   'Mbëkëm yi',
    interventions: 'Liggéey yi',
    reparation:    'Liggéey Defar',
    pm:            'Jëfandikool PM',
    medpool:       'MedPool (Lëkkalekaay)',
    energie:       'Doolé & ESG',
    stocks:        'Njël ak jënd',
    achats:        'Liggéey Jënd',
    fournisseurs:  'Jaay-jëf yi',
    finances:      'Xaalis & TCO',
    rh:            'Àddina Nit',
    ia_copilot:    'IA Copilot',
    analytics:     'Xam-xam IoT',
    statistiques:  'Ëmb-limu',
    rapports:      'Rapport yi',
    settings:      'Suqali',
    search:        'Saay…',
    logout:        'Dem',
    online:        'Connecté',
    offline:       'Déconnecté',
    welcome:       'Dalal ak jàmm',
    total_equip:   'Mbëkëm yépp',
    operational:   'Dafa dëkk',
    in_maintenance:'Ci jëfandikool',
    critical:      'Kàttan yu dëgëër',
    open_tickets:  'Carte yu ubbi',
    mttr:          'MTTR bu pëlëc',
    availability:  'Amoon',
    compliance:    'Jiitu PM',
    notif_title:   'Xiibaari',
    notif_empty:   'Amul xiibaari bu bees',
    mark_read:     'Bind lépp',
  },
} as const;

export type TranslationKey = keyof typeof translations['fr'];

// ── Context ──────────────────────────────────────────────────────────────────

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('gmao_lang') as Lang) || 'fr';
  });

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('gmao_lang', l);
  };

  const t = (key: TranslationKey): string => {
    return (translations[lang] as Record<string, string>)[key] ?? (translations['fr'] as Record<string, string>)[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}

export const langMeta: Record<Lang, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'Français' },
  en: { flag: '🇬🇧', label: 'English'  },
  wo: { flag: '🇸🇳', label: 'Wolof'    },
};
