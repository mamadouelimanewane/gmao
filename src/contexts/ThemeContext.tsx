import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      // Migration unique : le bouton de bascule affichait jusqu'ici le
      // libellé de la DESTINATION du clic (ex: "Clair" alors que le thème
      // actif était sombre), ce qui a bloqué de nombreux navigateurs sur un
      // thème sombre choisi par erreur. On les repasse une fois en clair.
      if (!localStorage.getItem('gmao_theme_migrated_v1')) {
        localStorage.setItem('gmao_theme_migrated_v1', '1');
        localStorage.setItem('gmao_theme', 'light');
        return 'light';
      }
      return (localStorage.getItem('gmao_theme') as Theme) || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    // data-theme attribute (used by CSS variables) + class for legacy overrides
    html.setAttribute('data-theme', theme);
    if (theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      body.style.backgroundColor = '#f0f4f8';
      body.style.color = '#020617';
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      body.style.backgroundColor = '#0f172a';
      body.style.color = '#f8fafc';
    }
    localStorage.setItem('gmao_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
