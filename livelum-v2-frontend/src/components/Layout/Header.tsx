import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  FileText, 
  RefreshCw,
  User,
  BarChart3,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useIndicators } from '@/contexts/IndicatorsContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
  const { user } = useAuth();
  const { indicators, updateIndicators } = useIndicators();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!user) return null;

  // Función para actualización manual
  const actualizarManual = async () => {
    setIsLoading(true);
    try {
      await updateIndicators();
      toast.success('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error en actualización manual:', error);
      toast.error('Error al actualizar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  // Efectos de hover
  const handleIconHover = (iconName: string) => {
    setActiveIcon(iconName);
  };

  const handleIconLeave = () => {
    setActiveIcon(null);
  };


  // Navegación
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Obtener inicial del usuario
  const getUserInitial = () => {
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Obtener nombre del usuario
  const getUserFullName = () => {
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'Usuario';
  };

  return (
    <TooltipProvider>
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
        
        {/* Inicial del usuario con fondo azul + nombre */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* Inicial con fondo circular azul */}
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {getUserInitial()}
            </div>
            
            {/* Nombre del usuario */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-slate-900">
                {getUserFullName()}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-600">
                En línea
              </span>
            </div>
          </div>
        </div>

        {/* Centro con iconos */}
        <div className="flex items-center space-x-8">
          
          {/* Grupo de iconos para todos los usuarios */}
          <div className="flex items-center space-x-4">
            {/* Reloj (actualizar) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={actualizarManual}
                  disabled={isLoading}
                  onMouseEnter={() => handleIconHover('clock')}
                  onMouseLeave={handleIconLeave}
                  className={`relative p-3 transition-all duration-300 hover:bg-slate-50 focus:bg-slate-50 active:bg-slate-50 ${
                    activeIcon === 'clock' ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <RefreshCw className={`h-5 w-5 transition-all duration-300 ${
                    activeIcon === 'clock' ? 'text-blue-600 blur-0' : activeIcon ? 'text-slate-600 blur-[1px]' : 'text-slate-600 blur-0'
                  } ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Actualizar datos</p>
              </TooltipContent>
            </Tooltip>

            {/* Documento */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/documentos')}
                  onMouseEnter={() => handleIconHover('document')}
                  onMouseLeave={handleIconLeave}
                  className={`relative p-3 transition-all duration-300 hover:bg-slate-50 focus:bg-slate-50 active:bg-slate-50 ${
                    activeIcon === 'document' ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className="relative">
                    <FileText className={`h-5 w-5 transition-all duration-300 ${
                      activeIcon === 'document' ? 'text-blue-600 blur-0' : activeIcon ? 'text-slate-600 blur-[1px]' : 'text-slate-600 blur-0'
                    }`} />
                    {/* Círculo azul indicador de documentos pendientes */}
                    {indicators.pendingDocuments > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Documentos</p>
              </TooltipContent>
            </Tooltip>

            {/* Campana (notificaciones) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/indicadores')}
                  onMouseEnter={() => handleIconHover('bell')}
                  onMouseLeave={handleIconLeave}
                  className={`relative p-3 transition-all duration-300 hover:bg-slate-50 focus:bg-slate-50 active:bg-slate-50 ${
                    activeIcon === 'bell' ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <Bell className={`h-5 w-5 transition-all duration-300 ${
                    activeIcon === 'bell' ? 'text-blue-600 blur-0' : activeIcon ? 'text-slate-600 blur-[1px]' : 'text-slate-600 blur-0'
                  }`} />
                  {/* Indicador de notificaciones */}
                  {indicators.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {indicators.notifications}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notificaciones</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Derecha con perfil y salir */}
        <div className="flex items-center space-x-4">
          {/* Perfil */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/perfil')}
            className="flex items-center space-x-2 text-slate-700 hover:text-slate-900"
          >
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </Button>

        </div>
              </div>
      </header>
    </TooltipProvider>
  );
};

export default Header;


