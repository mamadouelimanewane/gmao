import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Equipments from './pages/Equipments';
import Tickets from './pages/Tickets';
import Stocks from './pages/Stocks';
import Achats from './pages/Achats';
import Analytics from './pages/Analytics';
import Rapports from './pages/Rapports';
import Fournisseurs from './pages/Fournisseurs';
import Finances from './pages/Finances';
import AICopilot from './pages/AICopilot';
import RH from './pages/RH';
import MaintenancePlanifiee from './pages/MaintenancePlanifiee';
import MedPool from './pages/MedPool';
import EcoMed from './pages/EcoMed';
import HospitalMap from './pages/HospitalMap';
import Parametres from './pages/Parametres';
import Landing from './pages/Landing';
import AppsHub from './pages/AppsHub';
import Statistiques from './pages/Statistiques';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Vue d'accueil choisie par l'utilisateur (Paramètres > Apparence) :
// 'classic' = tableau de bord habituel, 'apps' = portail en boîtes.
// Réversible à tout moment — ne modifie aucune page existante.
export function getHomePath(): string {
  return localStorage.getItem('gmao_home_view') === 'apps' ? '/apps' : '/dashboard';
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
