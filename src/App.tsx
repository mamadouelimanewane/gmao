import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';

// Chaque page ne charge son propre code (et ses dépendances lourdes —
// recharts, jsPDF, html2canvas, qrcode…) qu'au moment où elle est
// effectivement visitée, au lieu de tout empaqueter dans un seul gros
// fichier téléchargé dès l'écran de connexion.
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Equipments = lazy(() => import('./pages/Equipments'));
const Tickets = lazy(() => import('./pages/Tickets'));
const Stocks = lazy(() => import('./pages/Stocks'));
const Achats = lazy(() => import('./pages/Achats'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Rapports = lazy(() => import('./pages/Rapports'));
const Fournisseurs = lazy(() => import('./pages/Fournisseurs'));
const Finances = lazy(() => import('./pages/Finances'));
const AICopilot = lazy(() => import('./pages/AICopilot'));
const RH = lazy(() => import('./pages/RH'));
const MaintenancePlanifiee = lazy(() => import('./pages/MaintenancePlanifiee'));
const MedPool = lazy(() => import('./pages/MedPool'));
const EcoMed = lazy(() => import('./pages/EcoMed'));
const HospitalMap = lazy(() => import('./pages/HospitalMap'));
const Parametres = lazy(() => import('./pages/Parametres'));
const Landing = lazy(() => import('./pages/Landing'));
const AppsHub = lazy(() => import('./pages/AppsHub'));
const Statistiques = lazy(() => import('./pages/Statistiques'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-app, #0f172a)' }}>
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Le portail en boîtes est la page d'accueil par défaut. Le tableau de bord
// classique reste disponible mais doit être activé explicitement dans
// Paramètres > Apparence (désactivé par défaut).
export function getHomePath(): string {
  return localStorage.getItem('gmao_home_view') === 'classic' ? '/dashboard' : '/apps';
}

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/accueil" element={<Landing />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={getHomePath()} replace /> : <Login />}
      />
      <Route path="/apps" element={<PrivateRoute><AppsHub /></PrivateRoute>} />
      <Route
        path="/"
        element={isAuthenticated ? <PrivateRoute><Layout /></PrivateRoute> : <Landing />}
      >
        <Route index element={<Navigate to={getHomePath()} replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="equipements" element={<Equipments />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="pm" element={<MaintenancePlanifiee />} />
        <Route path="medpool" element={<MedPool />} />
        <Route path="energie" element={<EcoMed />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="achats" element={<Achats />} />
        <Route path="fournisseurs" element={<Fournisseurs />} />
        <Route path="finances" element={<Finances />} />
        <Route path="rh" element={<RH />} />
        <Route path="ia" element={<AICopilot />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="rapports" element={<Rapports />} />
        <Route path="plan" element={<HospitalMap />} />
        <Route path="settings" element={<Parametres />} />
        <Route path="statistiques" element={<Statistiques />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
