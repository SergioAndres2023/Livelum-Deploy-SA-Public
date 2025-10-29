import React, { useState } from 'react';

interface CompetenciaLevel {
  level: number;
  description: string;
  color: string;
}

interface Habilidad {
  id: string;
  nombre: string;
  conocimientoDeseable: string;
}

interface Persona {
  id: string;
  nombre: string;
  rol: string;
  competencias: Record<string, number>; // habilidadId -> nivel
}

interface PolivalenciasMatrixProps {
  personas: Persona[];
  habilidades: Habilidad[];
  loading?: boolean;
}

const NIVELES_COMPETENCIA: CompetenciaLevel[] = [
  { level: 4, description: "Genera/Instruye", color: "bg-emerald-50 text-emerald-700" },
  { level: 3, description: "Sin supervisión", color: "bg-blue-50 text-blue-700" },
  { level: 2, description: "Con supervisión", color: "bg-amber-50 text-amber-700" },
  { level: 1, description: "Capacitación", color: "bg-red-50 text-red-700" },
  { level: 0, description: "No aplica", color: "bg-gray-50 text-gray-400" }
];

const PolivalenciasMatrix: React.FC<PolivalenciasMatrixProps> = ({ personas, habilidades, loading = false }) => {
  const [filtroActivo, setFiltroActivo] = useState('Responsable de SG');

  const filtros = ['Responsable de SG', 'Dirección', 'Asistente administrativo', 'Consultores', 'Administracion'];

  // Datos hardcodeados para la pestaña "Dirección"
  const habilidadesDireccion = [
    {
      id: 'planificacion-estrategica',
      nombre: 'Planificación estratégica',
      conocimientoDeseable: 'Genera/Instruye'
    },
    {
      id: 'gestion-recursos',
      nombre: 'Gestión de Recursos',
      conocimientoDeseable: 'Genera/Instruye'
    },
    {
      id: 'establecimiento-objetivos',
      nombre: 'Establecimiento y gestión de objetivos',
      conocimientoDeseable: 'Genera/Instruye'
    },
    {
      id: 'manejo-equipos',
      nombre: 'Manejo de equipos de trabajo',
      conocimientoDeseable: 'Genera/Instruye'
    },
    {
      id: 'seguimiento-organizacion',
      nombre: 'Seguimiento de organizacion',
      conocimientoDeseable: 'Genera/Instruye'
    }
  ];

  const personasDireccion = [
    {
      id: 'dario-lopez',
      nombre: 'Dario Lopez',
      rol: 'Dirección',
      competencias: {
        'planificacion-estrategica': 0,
        'gestion-recursos': 0,
        'establecimiento-objetivos': 0,
        'manejo-equipos': 0,
        'seguimiento-organizacion': 0
      }
    },
    {
      id: 'raul-garcia-direccion',
      nombre: 'Raul Garcia',
      rol: 'Dirección',
      competencias: {
        'planificacion-estrategica': 4,
        'gestion-recursos': 4,
        'establecimiento-objetivos': 3,
        'manejo-equipos': 2,
        'seguimiento-organizacion': 0
      }
    },
    {
      id: 'christian-perez-direccion',
      nombre: 'CHRISTIAN Perez',
      rol: 'Dirección',
      competencias: {
        'planificacion-estrategica': 3,
        'gestion-recursos': 0,
        'establecimiento-objetivos': 4,
        'manejo-equipos': 0,
        'seguimiento-organizacion': 0
      }
    },
    {
      id: 'ernesto-rares',
      nombre: 'Ernesto Rares',
      rol: 'Dirección',
      competencias: {
        'planificacion-estrategica': 0,
        'gestion-recursos': 0,
        'establecimiento-objetivos': 0,
        'manejo-equipos': 0,
        'seguimiento-organizacion': 0
      }
    }
  ];

  // Datos hardcodeados para la pestaña "Asistente administrativo"
  const habilidadesAsistente = [
    {
      id: 'gestion-facturacion',
      nombre: 'Gestion de facturación',
      conocimientoDeseable: 'Sin supervisión'
    },
    {
      id: 'manejo-excel',
      nombre: 'Manejo de Excel',
      conocimientoDeseable: 'Sin supervisión'
    },
    {
      id: 'gestion-cobranzas',
      nombre: 'Gestion de cobranzas',
      conocimientoDeseable: 'Sin supervisión'
    }
  ];

  const personasAsistente = [
    {
      id: 'omar-perez',
      nombre: 'Omar Perez',
      rol: 'Asistente administrativo',
      competencias: {
        'gestion-facturacion': 3,
        'manejo-excel': 4,
        'gestion-cobranzas': 2
      }
    },
    {
      id: 'jose-mara',
      nombre: 'Jose Mara',
      rol: 'Asistente administrativo',
      competencias: {
        'gestion-facturacion': 4,
        'manejo-excel': 3,
        'gestion-cobranzas': 2
      }
    },
    {
      id: 'carmen-otero-asistente',
      nombre: 'Carmen OTERO',
      rol: 'Asistente administrativo',
      competencias: {
        'gestion-facturacion': 3,
        'manejo-excel': 3,
        'gestion-cobranzas': 1
      }
    },
    {
      id: 'pablo-elias',
      nombre: 'Pablo elias',
      rol: 'Asistente administrativo',
      competencias: {
        'gestion-facturacion': 3,
        'manejo-excel': 4,
        'gestion-cobranzas': 1
      }
    },
    {
      id: 'ernesto-rares-asistente',
      nombre: 'Ernesto Rares',
      rol: 'Asistente administrativo',
      competencias: {
        'gestion-facturacion': 0,
        'manejo-excel': 0,
        'gestion-cobranzas': 0
      }
    },
    {
      id: 'pepe-argento',
      nombre: 'pepe argento',
      rol: 'Asistente administrativo',
      competencias: {
        'gestion-facturacion': 0,
        'manejo-excel': 0,
        'gestion-cobranzas': 0
      }
    }
  ];

  // Datos hardcodeados para la pestaña "consultores"
  const habilidadesConsultores = [
    {
      id: 'coordinacion-auditorias-internas',
      nombre: 'Coordinacion y ejecucion de auditorias Internas',
      conocimientoDeseable: 'Sin supervisión'
    }
  ];

  const personasConsultores = [
    {
      id: 'pepe-argento-consultores',
      nombre: 'pepe argento',
      rol: 'consultores',
      competencias: {
        'coordinacion-auditorias-internas': 0
      }
    },
    {
      id: 'geronimo-perez-coto',
      nombre: 'Geronimo Pérez Coto',
      rol: 'consultores',
      competencias: {
        'coordinacion-auditorias-internas': 0
      }
    }
  ];

  // Datos hardcodeados para la pestaña "Administracion"
  const habilidadesAdministracion = [
    {
      id: 'gestion-cuentas-corrientes',
      nombre: 'Gestion de cuentas corrientes',
      conocimientoDeseable: 'Con supervisión'
    },
    {
      id: 'habilidad-placeholder-1',
      nombre: 'fdsfdsfdsf',
      conocimientoDeseable: 'Sin supervisión'
    },
    {
      id: 'habilidad-placeholder-2',
      nombre: 'dfsd',
      conocimientoDeseable: 'Con supervisión'
    }
  ];

  const personasAdministracion = [
    // Por ahora no hay personas específicas en la referencia, pero podemos agregar algunas genéricas
    {
      id: 'admin-generico-1',
      nombre: 'Administrador 1',
      rol: 'Administracion',
      competencias: {
        'gestion-cuentas-corrientes': 0,
        'habilidad-placeholder-1': 0,
        'habilidad-placeholder-2': 0
      }
    }
  ];

  const getCompetenciaColor = (nivel: number): string => {
    const competencia = NIVELES_COMPETENCIA.find(c => c.level === nivel);
    return competencia ? competencia.color : 'bg-gray-100 text-gray-500';
  };

  const getCompetenciaDescripcion = (nivel: number): string => {
    const competencia = NIVELES_COMPETENCIA.find(c => c.level === nivel);
    return competencia ? competencia.description : 'Sin datos';
  };

  const getCompetenciaLevel = (descripcion: string): number => {
    const competencia = NIVELES_COMPETENCIA.find(c => c.description === descripcion);
    return competencia ? competencia.level : 0;
  };

  // Función para obtener los datos según el filtro activo
  const getDataForFilter = () => {
    if (filtroActivo === 'Dirección') {
      return {
        personas: personasDireccion,
        habilidades: habilidadesDireccion
      };
    }
    if (filtroActivo === 'Asistente administrativo') {
      return {
        personas: personasAsistente,
        habilidades: habilidadesAsistente
      };
    }
    if (filtroActivo === 'Consultores') {
      return {
        personas: personasConsultores,
        habilidades: habilidadesConsultores
      };
    }
    if (filtroActivo === 'Administracion') {
      return {
        personas: personasAdministracion,
        habilidades: habilidadesAdministracion
      };
    }
    // Para otros filtros, usar los datos que vienen como props
    return {
      personas,
      habilidades
    };
  };

  const { personas: personasActuales, habilidades: habilidadesActuales } = getDataForFilter();

  return (
    <div className="space-y-6">
      {/* Filtros/Pestañas y Leyenda */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFiltroActivo(filtro)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filtroActivo === filtro
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>
        
            {/* Leyenda compacta */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="font-medium">Leyenda:</span>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs ${NIVELES_COMPETENCIA[0].color}`}>4</span>
                <span>{NIVELES_COMPETENCIA[0].description}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs ${NIVELES_COMPETENCIA[1].color}`}>3</span>
                <span>{NIVELES_COMPETENCIA[1].description}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs ${NIVELES_COMPETENCIA[2].color}`}>2</span>
                <span>{NIVELES_COMPETENCIA[2].description}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs ${NIVELES_COMPETENCIA[3].color}`}>1</span>
                <span>{NIVELES_COMPETENCIA[3].description}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs ${NIVELES_COMPETENCIA[4].color}`}>0</span>
                <span>{NIVELES_COMPETENCIA[4].description}</span>
              </div>
            </div>
      </div>

      {/* Tabla de matriz */}
      <div className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {/* Encabezados de habilidades */}
              <tr className="border-t border-t-gray-300 border-b border-gray-200">
                <th className="px-8 py-6 text-left font-medium text-gray-900 text-sm border-l border-l-gray-300">
                  Habilidades
                </th>
                {habilidadesActuales.map((habilidad, index) => (
                  <th key={habilidad.id} className={`px-6 py-6 text-center font-medium text-gray-900 min-w-[200px] ${index === habilidadesActuales.length - 1 ? 'border-r border-r-gray-300' : ''}`}>
                    <div className="text-xs font-medium leading-tight">{habilidad.nombre}</div>
                  </th>
                ))}
              </tr>
              
              {/* Fila de conocimiento deseable */}
              <tr className="border-b border-gray-300">
                <td className="px-8 py-6 text-sm text-gray-600 font-medium border-l border-l-gray-300">
                  Conocimiento deseable
                </td>
                {habilidadesActuales.map((habilidad, index) => {
                  const nivel = getCompetenciaLevel(habilidad.conocimientoDeseable);
                  return (
                    <td key={`conocimiento-${habilidad.id}`} className={`px-6 py-6 text-center ${index === habilidadesActuales.length - 1 ? 'border-r border-r-gray-300' : ''}`}>
                      <span className={`px-3 py-1 rounded-full font-medium text-xs ${getCompetenciaColor(nivel)}`}>
                        {nivel > 0 ? `${nivel} - ${habilidad.conocimientoDeseable}` : '-'}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {/* Separador visual */}
              <tr className="h-4 bg-gray-100">
                <td colSpan={habilidadesActuales.length + 1} className="h-4"></td>
              </tr>

              {/* Datos del personal */}
              {personasActuales.map((persona) => (
                <tr key={persona.id} className="border-t border-gray-50 hover:bg-gray-25 transition-all duration-200">
                  <td className="px-8 py-6 font-medium text-gray-900 text-xs">
                    {persona.nombre} ({persona.rol})
                  </td>
                  {habilidadesActuales.map((habilidad) => {
                    const nivel = persona.competencias[habilidad.id] || 0;
                    return (
                      <td key={`${persona.id}-${habilidad.id}`} className="px-6 py-6 text-center">
                        <span className={`px-3 py-1 rounded-full font-medium text-xs ${getCompetenciaColor(nivel)}`}>
                          {nivel > 0 ? `${nivel} - ${getCompetenciaDescripcion(nivel)}` : '-'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PolivalenciasMatrix;
