import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { IndicatorsProvider } from "@/contexts/IndicatorsContext";
import UnifiedModal from "@/components/UnifiedModal";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import MainLayout from "@/components/Layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Documents from "@/pages/Documents";
import Processes from "@/pages/Processes";
import Indicators from "@/pages/Indicators";
import Risks from "@/pages/Risks";
import Objectives from "@/pages/Objectives";
import Audits from "@/pages/Audits";
import Maintenance from "@/pages/Maintenance";
import Finances from "@/pages/Finances";
import SkillsMatrix from "@/pages/SkillsMatrix";
import PersonalList from "@/pages/PersonalList";
import PersonalNew from "@/pages/PersonalNew";
import JobProfiles from "@/pages/JobProfiles";
import TrainingPlans from "@/pages/TrainingPlans";
import Skills from "@/pages/Skills";
import Scope from "@/pages/Scope";
import Policy from "@/pages/Policy";
import ContextAnalysis from "@/pages/ContextAnalysis";
import Stakeholders from "@/pages/Stakeholders";
import RisksOpportunities from "@/pages/RisksOpportunities";
import StrategicObjectives from "@/pages/StrategicObjectives";
import ManagementReview from "@/pages/ManagementReview";
import ProcessSheets from "@/pages/ProcessSheets";
import ProcessIndicators from "@/pages/ProcessIndicators";
import DocumentLibrary from "@/pages/DocumentLibrary";
import Suppliers from "@/pages/Suppliers";
import EquipmentSystems from "@/pages/EquipmentSystems";
import ProcessSheet from "@/pages/ProcessSheet";
import ProcessNames from "@/pages/ProcessNames";
import ProcessTypes from "@/pages/ProcessTypes";
import ProviderCharacteristics from "@/pages/ProviderCharacteristics";
import FindingsList from "@/pages/FindingsList";
import NewFinding from "@/pages/NewFinding";
import ActionPlans from "@/pages/ActionPlans";
import Authorizations from "@/pages/Authorizations";
import Minutes from "@/pages/Minutes";
import MyProfile from "@/pages/MyProfile";
import CompaniesList from "@/pages/CompaniesList";
import NewCompany from "@/pages/NewCompany";
import UsersList from "@/pages/UsersList";
import NewUser from "@/pages/NewUser";
import UserProfiles from "@/pages/UserProfiles";
import OnboardingsList from "@/pages/OnboardingsList";
import ProcessMap from "@/pages/ProcessMap";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!user ? <RegisterForm /> : <Navigate to="/" replace />} />
      <Route path="/change-password" element={user ? <ChangePasswordForm /> : <Navigate to="/login" replace />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/documentos" element={
        <ProtectedRoute>
          <MainLayout>
            <Documents />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos" element={
        <ProtectedRoute>
          <MainLayout>
            <Processes />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/fichas" element={
        <ProtectedRoute>
          <MainLayout>
            <ProcessSheets />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/indicadores" element={
        <ProtectedRoute>
          <MainLayout>
            <ProcessIndicators />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/biblioteca-documentos" element={
        <ProtectedRoute>
          <MainLayout>
            <DocumentLibrary />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/proveedores" element={
        <ProtectedRoute>
          <MainLayout>
            <Suppliers />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/equipos-sistemas" element={
        <ProtectedRoute>
          <MainLayout>
            <EquipmentSystems />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/mapa" element={
        <ProtectedRoute>
          <MainLayout>
            <ProcessMap />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/configuracion" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Configuración de Procesos - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/configuracion/ficha-procesos" element={
        <ProtectedRoute>
          <MainLayout>
            <ProcessSheet />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/configuracion/nombres-procesos" element={
        <ProtectedRoute>
          <MainLayout>
            <ProcessNames />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/configuracion/tipos-procesos" element={
        <ProtectedRoute>
          <MainLayout>
            <ProcessTypes />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procesos/configuracion/caracteristicas-prov" element={
        <ProtectedRoute>
          <MainLayout>
            <ProviderCharacteristics />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/indicadores" element={
        <ProtectedRoute>
          <MainLayout>
            <Indicators />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/riesgos" element={
        <ProtectedRoute>
          <MainLayout>
            <Risks />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/objetivos" element={
        <ProtectedRoute>
          <MainLayout>
            <Objectives />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/auditorias" element={
        <ProtectedRoute>
          <MainLayout>
            <Audits />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/mantenimiento" element={
        <ProtectedRoute>
          <MainLayout>
            <Maintenance />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Gestión de Personal - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/matriz-polivalencias" element={
        <ProtectedRoute>
          <MainLayout>
            <SkillsMatrix />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/listado" element={
        <ProtectedRoute>
          <MainLayout>
            <PersonalList />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/nuevo" element={
        <ProtectedRoute>
          <MainLayout>
            <PersonalNew />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/perfiles-puestos" element={
        <ProtectedRoute>
          <MainLayout>
            <JobProfiles />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/planes-capacitacion" element={
        <ProtectedRoute>
          <MainLayout>
            <TrainingPlans />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/organigrama" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Organigrama - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/configuracion" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Configuración de Personal - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/personal/configuracion/habilidades" element={
        <ProtectedRoute>
          <MainLayout>
            <Skills />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/finanzas" element={
        <ProtectedRoute>
          <MainLayout>
            <Finances />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/alcance" element={
        <ProtectedRoute>
          <MainLayout>
            <Scope />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/politica" element={
        <ProtectedRoute>
          <MainLayout>
            <Policy />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gestion-estrategica" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Gestión Estratégica - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gestion-estrategica/analisis-contexto" element={
        <ProtectedRoute>
          <MainLayout>
            <ContextAnalysis />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gestion-estrategica/partes-interesadas" element={
        <ProtectedRoute>
          <MainLayout>
            <Stakeholders />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gestion-estrategica/riesgos-oportunidades" element={
        <ProtectedRoute>
          <MainLayout>
            <RisksOpportunities />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gestion-estrategica/objetivos" element={
        <ProtectedRoute>
          <MainLayout>
            <StrategicObjectives />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gestion-estrategica/revision-direccion" element={
        <ProtectedRoute>
          <MainLayout>
            <ManagementReview />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/hallazgos" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Hallazgos - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/hallazgos/listado" element={
        <ProtectedRoute>
          <MainLayout>
            <FindingsList />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/hallazgos/nuevo" element={
        <ProtectedRoute>
          <MainLayout>
            <NewFinding />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/planes-accion" element={
        <ProtectedRoute>
          <MainLayout>
            <ActionPlans />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/autorizaciones" element={
        <ProtectedRoute>
          <MainLayout>
            <Authorizations />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/minutas" element={
        <ProtectedRoute>
          <MainLayout>
            <Minutes />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Configuración - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/mi-perfil" element={
        <ProtectedRoute>
          <MainLayout>
            <MyProfile />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/empresas" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Empresas - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/empresas/listado" element={
        <ProtectedRoute>
          <MainLayout>
            <CompaniesList />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/empresas/nuevo" element={
        <ProtectedRoute>
          <MainLayout>
            <NewCompany />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/usuarios" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Usuarios - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/usuarios/listado" element={
        <ProtectedRoute>
          <MainLayout>
            <UsersList />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/usuarios/nuevo" element={
        <ProtectedRoute>
          <MainLayout>
            <NewUser />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/usuarios/perfiles" element={
        <ProtectedRoute>
          <MainLayout>
            <UserProfiles />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/sistema" element={
        <ProtectedRoute>
          <MainLayout>
            <div className="text-center py-16 text-muted-foreground">Sistema - Próximamente</div>
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracion/sistema/onboardings" element={
        <ProtectedRoute>
          <MainLayout>
            <OnboardingsList />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AuthProvider>
          <IndicatorsProvider>
            <ModalProvider>
              <AppRoutes />
              {/* Modales globales */}
              <UnifiedModal type="document" />
              <UnifiedModal type="process" />
              <UnifiedModal type="indicator" />
              <UnifiedModal type="risk" />
              <UnifiedModal type="objective" />
              <UnifiedModal type="audit" />
              <UnifiedModal type="maintenance" />
              <UnifiedModal type="finances" />
              <UnifiedModal type="onboarding" />
              <UnifiedModal type="onboarding-edit" />
              <UnifiedModal type="personal-list" />
            </ModalProvider>
          </IndicatorsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
