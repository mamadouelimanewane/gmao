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

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={<PrivateRoute><Layout /></PrivateRoute>}
      >
        <Route index element={<Dashboard />} />
        <Route path="equipements" element={<Equipments />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="pm" element={<MaintenancePlanifiee />} />
        <Route path="medpool" element={<MedPool />} />
        <Route path="energie" element={<EcoMed />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="fournisseurs" element={<Fournisseurs />} />
        <Route path="finances" element={<Finances />} />
        <Route path="rh" element={<RH />} />
        <Route path="ia" element={<AICopilot />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="rapports" element={<Rapports />} />
        <Route path="plan" element={<HospitalMap />} />
        <Route path="settings" element={<Parametres />} />
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
