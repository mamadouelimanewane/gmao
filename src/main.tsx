import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DataStoreProvider } from './contexts/DataStore.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'

// Service Worker : uniquement en production (le cache-first casse le hot-reload en dev).
// En dev, on désenregistre activement tout SW/cache resté d'une session précédente.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('[PWA] SW registered:', reg.scope))
        .catch(err => console.warn('[PWA] SW registration failed:', err));
    });
  } else {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister());
    });
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <DataStoreProvider>
        <App />
      </DataStoreProvider>
    </ThemeProvider>
  </StrictMode>,
)
