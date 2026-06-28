import { createContext, useContext, useState } from 'react';
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

// ── Comptes Hôpital Ndamatou Touba ─────────────────────
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'USR-001', name: 'Abdoulaye Diallo', email: 'a.diallo@ndamatou.sn',
    password: 'tech2026', role: 'technician', avatar: 'AD',
    dept: 'Maintenance Biomédicale', lang: 'fr',
  },
  {
    id: 'USR-002', name: 'Ibrahima Faye', email: 'i.faye@ndamatou.sn',
    password: 'ing2026', role: 'engineer', avatar: 'IF',
    dept: 'Ingénierie Biomédicale', lang: 'fr',
  },
  {
    id: 'USR-003', name: 'Dr. Mariama Diop', email: 'm.diop@ndamatou.sn',
    password: 'dir2026', role: 'director', avatar: 'MD',
    dept: 'Direction Générale', lang: 'fr',
  },
  {
    id: 'USR-004', name: 'Admin GMAO', email: 'admin@ndamatou.sn',
    password: 'ndamatou2026', role: 'admin', avatar: 'AG',
    dept: 'Informatique & Systèmes', lang: 'fr',
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
    await new Promise(r => setTimeout(r, 700));
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
