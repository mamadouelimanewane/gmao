import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';

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
  loading: boolean;
}

async function loadProfile(userId: string, email: string): Promise<User | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error || !data) return null;
  return {
    id: data.id, name: data.name, email,
    role: data.role, avatar: data.avatar, dept: data.dept, lang: data.lang,
  };
}

// ── Context ────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await loadProfile(session.user.id, session.user.email!);
        setUser(profile);
      }
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) setUser(null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return false;
    const profile = await loadProfile(data.user.id, data.user.email!);
    if (!profile) { await supabase.auth.signOut(); return false; }
    setUser(profile);
    return true;
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
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
