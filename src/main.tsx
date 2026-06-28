import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DataStoreProvider } from './contexts/DataStore.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'

// Register Service Worker for PWA / offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[PWA] SW registered:', reg.scope))
      .catch(err => console.warn('[PWA] SW registration failed:', err));
  });
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
