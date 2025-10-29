import React from 'react';
import PolivalenciasMatrix from '../components/PolivalenciasMatrix';
import { useProcesses } from '@/hooks/useProcesses';
import { useModal } from '@/contexts/ModalContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Pencil, Users } from 'lucide-react';

// Datos de ejemplo basados en la imagen
const habilidadesEjemplo = [
  {
    id: 'auditorias-internas',
    nombre: 'Auditorias Internas',
    conocimientoDeseable: 'Genera/Instruye'
  },
  {
    id: 'gestion-documental',
    nombre: 'Gestión Documental',
    conocimientoDeseable: 'Genera/Instruye'
  },
  {
    id: 'hallazgos-mejora',
    nombre: 'Hallazgos y Mejoras',
    conocimientoDeseable: 'Sin supervisión'
  },
  {
    id: 'test-habilidad',
    nombre: 'Habilidad Test',
    conocimientoDeseable: 'Sin supervisión'
  },
  {
    id: 'auditoria-proveedores',
    nombre: 'Auditoria Proveedores',
    conocimientoDeseable: 'Genera/Instruye'
  },
  {
    id: 'comunicacion',
    nombre: 'Comunicación',
    conocimientoDeseable: 'Capacitación'
  }
];

const personasEjemplo = [
  {
    id: 'raul-garcia',
    nombre: 'Raul Garcia',
    rol: 'Responsable de SG',
    competencias: {
      'auditorias-internas': 4,
      'gestion-documental': 3,
      'hallazgos-mejora': 4,
      'test-habilidad': 2,
      'auditoria-proveedores': 3,
      'comunicacion': 4
    }
  },
  {
    id: 'manuel-gomez',
    nombre: 'Manuel Gomez',
    rol: 'Responsable de SG',
    competencias: {
      'auditorias-internas': 3,
      'gestion-documental': 4,
      'hallazgos-mejora': 3,
      'test-habilidad': 1,
      'auditoria-proveedores': 2,
      'comunicacion': 3
    }
  },
  {
    id: 'christian-perez',
    nombre: 'CHRISTIAN Perez',
    rol: 'Responsable de SG',
    competencias: {
      'auditorias-internas': 2,
      'gestion-documental': 3,
      'hallazgos-mejora': 4,
      'test-habilidad': 0,
      'auditoria-proveedores': 4,
      'comunicacion': 2
    }
  },
  {
    id: 'jose-mani',
    nombre: 'Jose Mani',
    rol: 'Responsable de SG',
    competencias: {
      'auditorias-internas': 4,
      'gestion-documental': 2,
      'hallazgos-mejora': 1,
      'test-habilidad': 3,
      'auditoria-proveedores': 2,
      'comunicacion': 4
    }
  },
  {
    id: 'pepe-argento',
    nombre: 'pepe argento',
    rol: 'Responsable de SG',
    competencias: {
      'auditorias-internas': 1,
      'gestion-documental': 4,
      'hallazgos-mejora': 3,
      'test-habilidad': 2,
      'auditoria-proveedores': 3,
      'comunicacion': 2
    }
  }
];

const MatrizPolivalencias: React.FC = () => {
  // Hook para obtener datos de procesos desde MongoDB
  const { 
    processTypes, 
    processNames, 
    loading, 
    error, 
    refetch 
  } = useProcesses();

  // Modales
  const { open: openOnboarding } = useModal('onboarding');
  const { open: openOnboardingEdit } = useModal('onboarding-edit');
  const modalContext = useModal();

  // Función para recargar datos
  const handleRefresh = async () => {
    toast.loading("Actualizando datos...");
    try {
      await refetch();
      toast.success("Datos actualizados correctamente");
    } catch (err) {
      toast.error("Error al actualizar los datos");
    }
  };

  // Transformar datos de procesos a habilidades para la matriz
  const habilidadesFromAPI = processNames.map(process => ({
    id: process.id,
    nombre: process.name,
    conocimientoDeseable: 'Genera conocimiento' // Valor por defecto
  }));

  // Usar datos de la API si están disponibles, sino usar datos de ejemplo
  const habilidades = habilidadesFromAPI.length > 0 ? habilidadesFromAPI : habilidadesEjemplo;

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Matriz de Polivalencias
            </h1>
            {error && (
              <p className="text-sm text-red-600 mt-1">
                {error} - <button onClick={handleRefresh} className="underline">Reintentar</button>
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={openOnboarding}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Crear nuevo paso en el Onboarding"
            >
              <Plus size={20} />
            </button>
            <button 
              onClick={openOnboardingEdit}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Edición masiva del Onboarding"
            >
              <Pencil size={20} />
            </button>
            <button 
              onClick={() => modalContext.open('personal-list')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
            >
              <Users size={16} />
              Listado de Personal
            </button>
          </div>
        </div>
        
        {processTypes.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Tipos de Proceso Disponibles:
            </h3>
            <div className="flex flex-wrap gap-2">
              {processTypes.map(type => (
                <span 
                  key={type.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <PolivalenciasMatrix 
        personas={personasEjemplo}
        habilidades={habilidades}
        loading={loading}
      />
    </div>
  );
};

export default MatrizPolivalencias;
