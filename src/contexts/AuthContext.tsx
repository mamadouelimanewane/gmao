import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// ── Types ──────────────────────────────────────────────
export type UserRole = 'technician' | 'engineer' | 'director' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  dept: string;
  lang: 'fr' | 'wo' | 'en';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// ── Mock Users DB ──────────────────────────────────────
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'USR-001', name: 'Abdoulaye Diallo', email: 'a.diallo@hopital.sn',
    password: 'tech123', role: 'technician', avatar: 'AD',
    dept: 'Maintenance Biomédicale', lang: 'fr',
  },
  {
    id: 'USR-002', name: 'Ibrahima Faye', email: 'i.faye@hopital.sn',
    password: 'ing123', role: 'engineer', avatar: 'IF',
    dept: 'Ingénierie Biomédicale', lang: 'fr',
  },
  {
    id: 'USR-003', name: 'Dr. Mariama Diop', email: 'm.diop@hopital.sn',
    password: 'dir123', role: 'director', avatar: 'MD',
    dept: 'Direction Générale', lang: 'fr',
  },
  {
    id: 'USR-004', name: 'Admin GMAO', email: 'admin@hopital.sn',
    password: 'admin123', role: 'admin', avatar: 'AG',
    dept: 'Informatique', lang: 'fr',
  },
];

// ── Context ────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('gmao_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800)); // simulate API call
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('gmao_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gmao_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export const roleLabels: Record<UserRole, string> = {
  technician: 'Technicien Biomédical',
  engineer:   'Ingénieur Biomédical',
  director:   'Directeur',
  admin:      'Administrateur',
};

export const roleColors: Record<UserRole, string> = {
  technician: 'from-cyan-500 to-blue-600',
  engineer:   'from-violet-500 to-indigo-600',
  director:   'from-emerald-500 to-teal-600',
  admin:      'from-rose-500 to-orange-500',
};
