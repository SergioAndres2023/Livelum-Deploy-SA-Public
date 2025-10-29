import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users,
  Building2,
  Landmark,
  Target,
  FolderOpen,
  ClipboardList,
  RotateCcw,
  CheckSquare,
  Shield,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Search,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useIndicators } from '@/contexts/IndicatorsContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const { indicators } = useIndicators();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [collapsingItems, setCollapsingItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      // Intentar cerrar sesión con Supabase
      await signOut();
    } catch (error) {
      // Si falla, solo registrar el error y continuar
      console.log('Error al cerrar sesión:', error);
    } finally {
      // Limpiar localStorage
      localStorage.clear();
      // Navegar usando React Router (sin recarga de página)
      navigate('/login', { replace: true });
    }
  };

  // Función para obtener los paths padre de una ruta
  const getParentPaths = (currentPath: string): string[] => {
    const paths: string[] = [];
    const segments = currentPath.split('/').filter(Boolean);
    
    for (let i = 1; i < segments.length; i++) {
      const parentPath = '/' + segments.slice(0, i).join('/');
      paths.push(parentPath);
    }
    
    return paths;
  };

  // Auto-expandir menús basado en la ruta actual
  useEffect(() => {
    const currentPath = location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    
    // Si hay items colapsando, esperar a que terminen las transiciones
    if (collapsingItems.length > 0) {
      const timer = setTimeout(() => {
        // Después de la transición, aplicar la lógica normal
        if (segments.length === 1) {
          setExpandedItems([currentPath]);
        } else {
          setExpandedItems([]);
        }
        setCollapsingItems([]); // Limpiar items colapsando
      }, 350); // Esperar un poco más que la transición CSS
      return () => clearTimeout(timer);
    } else {
      // Si estás en una ruta principal (sin submenús), expandir solo esa ruta
      if (segments.length === 1) {
        // Estás en una ruta principal como /personal, /procesos, etc.
        setExpandedItems([currentPath]);
      } else {
        // Estás en un submenú, no expandir nada (colapsar todo)
        setExpandedItems([]);
      }
    }
  }, [location.pathname]);

  // Función para obtener todos los paths del mismo nivel
  const getSameLevelPaths = (targetPath: string, items: any[], currentLevel: number = 0): string[] => {
    const paths: string[] = [];
    
    items.forEach(item => {
      if (currentLevel === 0) {
        // Solo agregamos paths del nivel 0 (menús principales)
        paths.push(item.path);
      }
    });
    
    return paths;
  };

  // Función para filtrar elementos del menú basado en la búsqueda
  const filterMenuItems = (items: any[], searchTerm: string): any[] => {
    if (!searchTerm.trim()) return items;
    
    const filtered: any[] = [];
    
    for (const item of items) {
      const itemMatches = item.label.toLowerCase().includes(searchTerm.toLowerCase());
      let hasMatchingSubmenu = false;
      let filteredSubmenu: any[] = [];
      
      if (item.submenu) {
        filteredSubmenu = filterMenuItems(item.submenu, searchTerm);
        hasMatchingSubmenu = filteredSubmenu.length > 0;
      }
      
      if (itemMatches || hasMatchingSubmenu) {
        filtered.push({
          ...item,
          submenu: hasMatchingSubmenu ? filteredSubmenu : item.submenu
        });
      }
    }
    
    return filtered;
  };

  // Efecto para expandir automáticamente los menús cuando hay búsqueda activa
  useEffect(() => {
    if (searchTerm.trim()) {
      // Cuando hay búsqueda, expandir todos los menús que tienen resultados
      const itemsToExpand: string[] = [];
      
      const findItemsToExpand = (items: any[]) => {
        for (const item of items) {
          if (item.submenu) {
            const filteredSubmenu = filterMenuItems(item.submenu, searchTerm);
            if (filteredSubmenu.length > 0) {
              itemsToExpand.push(item.path);
              findItemsToExpand(item.submenu);
            }
          }
        }
      };
      
      findItemsToExpand(menuItems);
      setExpandedItems(itemsToExpand);
    } else {
      // Cuando se limpia la búsqueda, restaurar el estado normal
      const currentPath = location.pathname;
      const parentPaths = getParentPaths(currentPath);
      setExpandedItems(parentPaths);
    }
  }, [searchTerm]);

  const toggleExpanded = (itemPath: string, level: number = 0, hasSubmenu: boolean = false) => {
    // Si el item ya está expandido, lo contraemos con transición
    if (expandedItems.includes(itemPath)) {
      // Marcar como "collapsing" para mantener visible durante la transición
      setCollapsingItems(prev => [...prev, itemPath]);
      // Después de la transición, remover del estado
      setTimeout(() => {
        setExpandedItems(prev => prev.filter(path => path !== itemPath));
        setCollapsingItems(prev => prev.filter(path => path !== itemPath));
      }, 300); // Duración de la transición CSS
      return;
    }
    
    // Si el item no está expandido
    if (level === 0) {
      const level0Paths = getSameLevelPaths(itemPath, menuItems);
      const itemsToCollapse = expandedItems.filter(path => level0Paths.includes(path));
      
      if (hasSubmenu) {
        // Para menús principales CON submenú: cerrar otros del nivel 0 y expandir este
        if (itemsToCollapse.length > 0) {
          // Marcar items como "collapsing"
          setCollapsingItems(itemsToCollapse);
          // Esperar la transición antes de cambiar el estado
          setTimeout(() => {
            const filteredPaths = expandedItems.filter(path => !level0Paths.includes(path));
            setExpandedItems([...filteredPaths, itemPath]);
            setCollapsingItems([]);
          }, 300);
        } else {
          // No hay items que colapsar, expandir inmediatamente
          setExpandedItems(prev => [...prev, itemPath]);
        }
      } else {
        // Para menús principales SIN submenú: cerrar todos los menús expandidos con transición
        if (itemsToCollapse.length > 0) {
          setCollapsingItems(itemsToCollapse);
          setTimeout(() => {
            setExpandedItems(prev => prev.filter(path => !level0Paths.includes(path)));
            setCollapsingItems([]);
          }, 300);
        }
      }
    } else {
      // Para submenús: solo expandir este, mantener otros
      setExpandedItems(prev => [...prev, itemPath]);
    }
  };

  // Función para verificar si un elemento está activo (incluyendo sus submenús)
  const isItemActive = (item: any, currentPath: string): boolean => {
    // Si el elemento actual coincide con la ruta
    if (item.path === currentPath) return true;
    
    // Si tiene submenús, verificar si alguno está activo
    if (item.submenu) {
      return item.submenu.some((subItem: any) => {
        if (subItem.path === currentPath) return true;
        if (subItem.submenu) {
          return subItem.submenu.some((subSubItem: any) => subSubItem.path === currentPath);
        }
        return false;
      });
    }
    
    return false;
  };

  const renderMenuItem = (item: any, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.path);
    const isCollapsing = collapsingItems.includes(item.path);
    const shouldShowSubmenu = isExpanded || isCollapsing;
    const isActive = isItemActive(item, location.pathname);
    const marginLeft = level * 16; // 16px por nivel

    if (item.hasSubmenu) {
      return (
        <div key={item.path}>
          <button
            onClick={() => toggleExpanded(item.path, level, item.hasSubmenu)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative",
              "hover:text-blue-400",
              isActive ? "text-blue-400" : "text-slate-300",
              collapsed && "justify-center"
            )}
            style={{ marginLeft: collapsed ? 0 : marginLeft }}
          >
            <div className={cn(
              "relative",
              item.indicador && item.indicador > 0
                ? "p-1.5 bg-white rounded-full"
                : ""
            )}>
              {level === 0 ? (
                <item.icon 
                  size={20} 
                  className={cn(
                    item.indicador && item.indicador > 0
                      ? "text-blue-600"
                      : "text-current"
                  )}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-500" />
              )}
            </div>
            {!collapsed && (
              <span className="text-sm font-medium flex-1 flex items-center justify-between">
                {item.label}
                {item.indicador && (
                  <span className="ml-2 w-5 h-5 text-xs rounded-full flex items-center justify-center font-medium bg-blue-600 text-white">
                    {item.indicador > 99 ? '99+' : item.indicador}
                  </span>
                )}
                {isExpanded ? (
                  <ChevronDown size={14} className="transition-all duration-300 ease-in-out transform rotate-0" />
                ) : (
                  <ChevronLeft size={14} className="transition-all duration-300 ease-in-out transform rotate-0" />
                )}
              </span>
            )}
          </button>
          
          {/* Submenu */}
          {!collapsed && item.submenu && shouldShowSubmenu && (
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                "transform-gpu",
                isExpanded && !isCollapsing
                  ? "max-h-screen opacity-100 translate-y-0" 
                  : "max-h-0 opacity-0 -translate-y-2"
              )}
            >
              <ul className="mt-2 space-y-1 pb-1">
                {item.submenu.map((subItem: any) => (
                  <li key={subItem.path}>
                    {renderMenuItem(subItem, level + 1)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    } else {
      // Verificar si es el botón de logout
      if (item.path === '/logout') {
        return (
          <button
            key={item.path}
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative",
              "hover:text-blue-400 text-slate-300",
              collapsed && "justify-center"
            )}
            style={{ marginLeft: collapsed ? 0 : marginLeft }}
          >
            <div className={cn(
              "relative",
              item.indicador && item.indicador > 0
                ? "p-1.5 bg-white rounded-full"
                : ""
            )}>
              {level === 0 ? (
                <item.icon 
                  size={20} 
                  className={cn(
                    item.indicador && item.indicador > 0
                      ? "text-blue-600"
                      : "text-current"
                  )}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-500" />
              )}
            </div>
            {!collapsed && (
              <span className="text-sm font-medium flex-1 flex items-center justify-between">
                {item.label}
                {item.indicador && (
                  <span className={cn(
                    "ml-2 w-5 h-5 text-xs rounded-full flex items-center justify-center font-medium",
                    "bg-blue-600 text-white"
                  )}>
                    {item.indicador > 99 ? '99+' : item.indicador}
                  </span>
                )}
              </span>
            )}
          </button>
        );
      }
      
      // Para todos los demás items
      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => {
            // Si es nivel 0 sin submenús, colapsar todos los menús expandidos
            if (level === 0) {
              toggleExpanded(item.path, level, false);
            }
          }}
          className={() =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative",
              "hover:text-blue-400",
              isActive ? "text-blue-400" : "text-slate-300",
              collapsed && "justify-center"
            )
          }
          style={{ marginLeft: collapsed ? 0 : marginLeft }}
        >
          <div className={cn(
            "relative",
            item.indicador && item.indicador > 0
              ? "p-1.5 bg-white rounded-full"
              : ""
          )}>
            {level === 0 ? (
              <item.icon 
                size={20} 
                className={cn(
                  item.indicador && item.indicador > 0
                    ? "text-blue-600"
                    : "text-current"
                )}
              />
            ) : (
              <div className="w-2 h-2 rounded-full bg-slate-500" />
            )}
          </div>
          {!collapsed && (
            <span className="text-sm font-medium flex-1 flex items-center justify-between">
              {item.label}
              {item.indicador && (
                <span className={cn(
                  "ml-2 w-5 h-5 text-xs rounded-full flex items-center justify-center font-medium",
                  "bg-blue-600 text-white"
                )}>
                  {item.indicador > 99 ? '99+' : item.indicador}
                </span>
              )}
            </span>
          )}
        </NavLink>
      );
    }
  };

  // Menú adaptado para gestión ISO
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: Users, 
      label: 'Personal', 
      path: '/personal',
      indicador: null,
      hasSubmenu: true,
      submenu: [
        { label: 'Matriz de Polivalencias', path: '/personal/matriz-polivalencias' },
        { label: 'Listado', path: '/personal/listado' },
        { label: 'Nuevo', path: '/personal/nuevo' },
        { label: 'Perfiles de Puestos', path: '/personal/perfiles-puestos' },
        { label: 'Planes de Capacitación', path: '/personal/planes-capacitacion' },
        { label: 'Organigrama', path: '/personal/organigrama' },
        { 
          label: 'Configuración', 
          path: '/personal/configuracion',
          hasSubmenu: true,
          submenu: [
            { label: 'Habilidades', path: '/personal/configuracion/habilidades' }
          ]
        }
      ]
    },
    { 
      icon: Building2, 
      label: 'Alcance', 
      path: '/alcance',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: Landmark, 
      label: 'Política', 
      path: '/politica',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: Target, 
      label: 'Gestión Estratégica', 
      path: '/gestion-estrategica',
      indicador: null,
      hasSubmenu: true,
      submenu: [
        { label: 'Análisis de contexto', path: '/gestion-estrategica/analisis-contexto' },
        { label: 'Partes interesadas', path: '/gestion-estrategica/partes-interesadas' },
        { label: 'Riesgos / Oportunidades', path: '/gestion-estrategica/riesgos-oportunidades' },
        { label: 'Objetivos', path: '/gestion-estrategica/objetivos' },
        { label: 'Revisión por la Dirección', path: '/gestion-estrategica/revision-direccion' }
      ]
    },
    { 
      icon: FolderOpen, 
      label: 'Procesos', 
      path: '/procesos',
      indicador: null,
      hasSubmenu: true,
      submenu: [
        { label: 'Mapa', path: '/procesos/mapa' },
        { label: 'Fichas', path: '/procesos/fichas' },
        { label: 'Indicadores', path: '/procesos/indicadores' },
        { label: 'Biblioteca de documentos', path: '/procesos/biblioteca-documentos' },
        { label: 'Proveedores', path: '/procesos/proveedores' },
        { label: 'Equipos y Sistemas', path: '/procesos/equipos-sistemas' },
        { 
          label: 'Configuración', 
          path: '/procesos/configuracion',
          hasSubmenu: true,
          submenu: [
            { label: 'Ficha de Procesos', path: '/procesos/configuracion/ficha-procesos' },
            { label: 'Nombres de Procesos', path: '/procesos/configuracion/nombres-procesos' },
            { label: 'Tipos de Procesos', path: '/procesos/configuracion/tipos-procesos' },
            { label: 'Características de Prov.', path: '/procesos/configuracion/caracteristicas-prov' }
          ]
        }
      ]
    },
    { 
      icon: ClipboardList, 
      label: 'Auditorías', 
      path: '/auditorias',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: RotateCcw, 
      label: 'Hallazgos', 
      path: '/hallazgos',
      indicador: null,
      hasSubmenu: true,
      submenu: [
        { label: 'Listado', path: '/hallazgos/listado' },
        { label: 'Nuevo', path: '/hallazgos/nuevo' }
      ]
    },
    { 
      icon: CheckSquare, 
      label: 'Planes de acción', 
      path: '/planes-accion',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: Shield, 
      label: 'Autorizaciones', 
      path: '/autorizaciones',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: FileText, 
      label: 'Minutas', 
      path: '/minutas',
      indicador: null,
      hasSubmenu: false
    },
    { 
      icon: Settings, 
      label: 'Configuración', 
      path: '/configuracion',
      indicador: null,
      hasSubmenu: true,
      submenu: [
        { label: 'Mi perfil', path: '/configuracion/mi-perfil' },
        { 
          label: 'Empresas', 
          path: '/configuracion/empresas',
          hasSubmenu: true,
          submenu: [
            { label: 'Listado', path: '/configuracion/empresas/listado' },
            { label: 'Nuevo', path: '/configuracion/empresas/nuevo' }
          ]
        },
        { 
          label: 'Usuarios', 
          path: '/configuracion/usuarios',
          hasSubmenu: true,
          submenu: [
            { label: 'Listado', path: '/configuracion/usuarios/listado' },
            { label: 'Nuevo', path: '/configuracion/usuarios/nuevo' },
            { label: 'Perfiles', path: '/configuracion/usuarios/perfiles' }
          ]
        },
        { 
          label: 'Sistema', 
          path: '/configuracion/sistema',
          hasSubmenu: true,
          submenu: [
            { label: 'Onboardings', path: '/configuracion/sistema/onboardings' }
          ]
        }
      ]
    },
    { 
      icon: LogOut, 
      label: 'Salir', 
      path: '/logout',
      indicador: null,
      hasSubmenu: false
    }
  ];

  return (
    <div className={cn(
      "bg-slate-900 text-white transition-all duration-300 flex flex-col h-full",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-900">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-blue-400">LiveLum</h1>
            <p className="text-xs text-slate-400">Sistema de Gestión ISO</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Search Bar */}
      {!collapsed && (
        <div className="px-4 pt-2 pb-4 bg-slate-900">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Busca aquí..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-0"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4 bg-slate-900 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul className="space-y-2">
          {filterMenuItems(menuItems, searchTerm).map((item) => (
            <li key={item.path}>
              {renderMenuItem(item)}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-slate-800",
          collapsed && "justify-center"
        )}>
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Users size={16} />
            </div>
            {indicators.notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {indicators.notifications > 99 ? '99+' : indicators.notifications}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-xs font-medium">{user.email?.split('@')[0] || 'Usuario'}</p>
              <p className="text-xs text-slate-400">En línea</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


