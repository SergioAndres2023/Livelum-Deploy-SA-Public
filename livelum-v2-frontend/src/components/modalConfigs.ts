import { ModalType } from '@/contexts/ModalContext';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: string[] | { value: string; label: string }[];
  defaultValue?: any;
  rows?: number;
  step?: string;
}

export interface SectionConfig {
  title: string;
  fields: string[];
}

export interface ModalConfig {
  title: string;
  subtitle: string;
  entityName: string;
  fields: FieldConfig[];
  sections: SectionConfig[];
}

export const modalConfigs: Record<ModalType, ModalConfig> = {
  document: {
    title: 'Nuevo Documento',
    subtitle: 'Completa la información del documento',
    entityName: 'Documento',
    fields: [
      { name: 'title', label: 'Título del documento', type: 'text', required: true, placeholder: 'Ej: Manual de Procedimientos Administrativos' },
      { name: 'code', label: 'Código', type: 'text', required: false, placeholder: 'DOC-001 (opcional, se genera automáticamente)' },
      { name: 'type', label: 'Tipo', type: 'select', required: true, options: ['MANUAL', 'PROCEDIMIENTO', 'POLITICA', 'FORMATO'], defaultValue: 'MANUAL' },
      { name: 'description', label: 'Descripción del documento', type: 'textarea', placeholder: 'Describe brevemente el contenido y propósito del documento...', rows: 4 },
    ],
    sections: [
      { title: 'Información básica', fields: ['title', 'code', 'type', 'description'] },
    ],
  },
  
  process: {
    title: 'Nuevo Proceso',
    subtitle: 'Completa la información del proceso',
    entityName: 'Proceso',
    fields: [
      { name: 'name', label: 'Nombre del Proceso', type: 'text', required: true, placeholder: 'Ej: Gestión de Personal' },
      { name: 'code', label: 'Código', type: 'text', required: true, placeholder: 'Ej: GP-001' },
      { name: 'category', label: 'Categoría', type: 'select', required: true, placeholder: 'Seleccionar Categoría', options: ['Recursos Humanos', 'Operaciones', 'Calidad', 'Finanzas', 'Comercial'] },
      { name: 'status', label: 'Estado', type: 'select', required: true, options: ['Activo', 'En Revisión', 'Inactivo'], defaultValue: 'Activo' },
      { name: 'owner', label: 'Propietario', type: 'text', required: true, placeholder: 'Email del propietario' },
      { name: 'description', label: 'Descripción del Proceso', type: 'textarea', placeholder: 'Describe el proceso detalladamente...', rows: 3 },
      { name: 'objectives', label: 'Objetivos', type: 'textarea', placeholder: 'Objetivos del proceso...', rows: 3 },
      { name: 'risks', label: 'Riesgos Identificados', type: 'textarea', placeholder: 'Lista de riesgos identificados...', rows: 3 },
      { name: 'controls', label: 'Controles Implementados', type: 'textarea', placeholder: 'Controles para mitigar riesgos...', rows: 3 },
      { name: 'frequency', label: 'Frecuencia de Revisión', type: 'select', options: ['Mensual', 'Trimestral', 'Semestral', 'Anual'], defaultValue: 'Mensual' },
      { name: 'responsible', label: 'Responsable', type: 'text', placeholder: 'Nombre del responsable' },
    ],
    sections: [
      { title: 'Información Básica', fields: ['name', 'code', 'category', 'status', 'owner'] },
      { title: 'Descripción', fields: ['description', 'objectives'] },
      { title: 'Gestión de Riesgos', fields: ['risks', 'controls'] },
      { title: 'Configuración', fields: ['frequency', 'responsible'] },
    ],
  },
  
  indicator: {
    title: 'Nuevo Indicador',
    subtitle: 'Completa la información del indicador',
    entityName: 'Indicador',
    fields: [
      { name: 'name', label: 'Nombre del Indicador', type: 'text', required: true, placeholder: 'Ej: Satisfacción del Cliente' },
      { name: 'code', label: 'Código', type: 'text', required: true, placeholder: 'Ej: IND-001' },
      { name: 'category', label: 'Categoría', type: 'select', required: true, placeholder: 'Seleccionar Categoría', options: ['Calidad', 'Operaciones', 'Productividad', 'Finanzas', 'Recursos Humanos'] },
      { name: 'type', label: 'Tipo', type: 'select', required: true, placeholder: 'Seleccionar Tipo', options: ['Porcentaje', 'Tiempo', 'Cantidad', 'Monetario', 'Ratio'] },
      { name: 'unit', label: 'Unidad de Medida', type: 'text', required: true, placeholder: 'Ej: %, horas, unidades, €' },
      { name: 'currentValue', label: 'Valor Actual', type: 'number', placeholder: '0' },
      { name: 'targetValue', label: 'Meta', type: 'number', required: true, placeholder: '100' },
      { name: 'frequency', label: 'Frecuencia de Medición', type: 'select', required: true, options: ['Diario', 'Semanal', 'Mensual', 'Trimestral', 'Anual'], defaultValue: 'Mensual' },
      { name: 'owner', label: 'Propietario', type: 'text', required: true, placeholder: 'Email del propietario' },
      { name: 'responsible', label: 'Responsable', type: 'text', placeholder: 'Nombre del responsable' },
      { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Describe el indicador detalladamente...', rows: 3 },
      { name: 'formula', label: 'Fórmula de Cálculo', type: 'textarea', placeholder: 'Ej: (Clientes satisfechos / Total clientes) * 100', rows: 3 },
      { name: 'dataSource', label: 'Fuente de Datos', type: 'text', placeholder: 'Sistema, encuesta, base de datos...' },
    ],
    sections: [
      { title: 'Información Básica', fields: ['name', 'code', 'category', 'type'] },
      { title: 'Valores y Metas', fields: ['unit', 'currentValue', 'targetValue'] },
      { title: 'Configuración', fields: ['frequency', 'owner', 'responsible'] },
      { title: 'Descripción', fields: ['description', 'formula', 'dataSource'] },
    ],
  },
  
  risk: {
    title: 'Nuevo Riesgo',
    subtitle: 'Completa la información del riesgo',
    entityName: 'Riesgo',
    fields: [
      { name: 'title', label: 'Título del Riesgo', type: 'text', required: true, placeholder: 'Ej: Falla en Sistema de Información' },
      { name: 'code', label: 'Código', type: 'text', required: true, placeholder: 'Ej: R-001' },
      { name: 'category', label: 'Categoría', type: 'select', required: true, placeholder: 'Seleccionar Categoría', options: ['Tecnológico', 'Recursos Humanos', 'Regulatorio', 'Operacional', 'Financiero', 'Ambiental'] },
      { name: 'status', label: 'Estado', type: 'select', required: true, options: ['Activo', 'Monitoreado', 'Mitigado', 'Cerrado'], defaultValue: 'Activo' },
      { name: 'probability', label: 'Probabilidad', type: 'select', required: true, placeholder: 'Seleccionar Probabilidad', options: ['Baja', 'Media', 'Alta'] },
      { name: 'impact', label: 'Impacto', type: 'select', required: true, placeholder: 'Seleccionar Impacto', options: ['Bajo', 'Medio', 'Alto'] },
      { name: 'priority', label: 'Prioridad', type: 'select', options: ['Baja', 'Media', 'Alta', 'Crítica'], defaultValue: 'Media' },
      { name: 'description', label: 'Descripción', type: 'textarea', required: true, placeholder: 'Describe el riesgo detalladamente...', rows: 3 },
      { name: 'mitigation', label: 'Medidas de Mitigación', type: 'textarea', placeholder: 'Describe las medidas para reducir el riesgo...', rows: 3 },
      { name: 'contingency', label: 'Plan de Contingencia', type: 'textarea', placeholder: 'Describe el plan de acción si el riesgo se materializa...', rows: 3 },
      { name: 'owner', label: 'Propietario', type: 'text', required: true, placeholder: 'Email del propietario' },
      { name: 'responsible', label: 'Responsable', type: 'text', placeholder: 'Nombre del responsable' },
      { name: 'dueDate', label: 'Fecha Límite', type: 'date' },
    ],
    sections: [
      { title: 'Información Básica', fields: ['title', 'code', 'category', 'status'] },
      { title: 'Evaluación', fields: ['probability', 'impact', 'priority'] },
      { title: 'Gestión del Riesgo', fields: ['description', 'mitigation', 'contingency'] },
      { title: 'Responsables', fields: ['owner', 'responsible', 'dueDate'] },
    ],
  },
  
  objective: {
    title: 'Nuevo Objetivo',
    subtitle: 'Completa la información del objetivo',
    entityName: 'Objetivo',
    fields: [
      { name: 'title', label: 'Título del Objetivo', type: 'text', required: true, placeholder: 'Ej: Reducir tiempo de respuesta al cliente' },
      { name: 'description', label: 'Descripción', type: 'textarea', required: true, placeholder: 'Describe el objetivo detalladamente...', rows: 3 },
      { name: 'targetValue', label: 'Valor Meta', type: 'number', required: true, placeholder: '100' },
      { name: 'currentValue', label: 'Valor Actual', type: 'number', placeholder: '0' },
      { name: 'unit', label: 'Unidad', type: 'text', required: true, placeholder: 'Ej: %, horas, €' },
      { name: 'startDate', label: 'Fecha de Inicio', type: 'date', required: true },
      { name: 'targetDate', label: 'Fecha Objetivo', type: 'date', required: true },
      { name: 'status', label: 'Estado', type: 'select', options: ['Activo', 'En Progreso', 'Completado', 'Cancelado'], defaultValue: 'Activo' },
      { name: 'responsibleUser', label: 'Responsable', type: 'text', placeholder: 'Nombre del responsable' },
      { name: 'indicatorName', label: 'Indicador Relacionado', type: 'text', placeholder: 'Nombre del indicador' },
      { name: 'priority', label: 'Prioridad', type: 'select', options: ['Baja', 'Media', 'Alta'], defaultValue: 'Media' },
    ],
    sections: [
      { title: 'Información Básica', fields: ['title', 'description'] },
      { title: 'Metas y Valores', fields: ['targetValue', 'currentValue', 'unit'] },
      { title: 'Fechas', fields: ['startDate', 'targetDate'] },
      { title: 'Configuración', fields: ['status', 'responsibleUser', 'indicatorName', 'priority'] },
    ],
  },
  
  audit: {
    title: 'Nueva Auditoría',
    subtitle: 'Completa la información de la auditoría',
    entityName: 'Auditoría',
    fields: [
      { name: 'title', label: 'Título de la Auditoría', type: 'text', required: true, placeholder: 'Ej: Auditoría Interna SGC Q1-2024' },
      { name: 'auditType', label: 'Tipo', type: 'select', required: true, placeholder: 'Seleccionar Tipo', options: ['Interna', 'Externa'] },
      { name: 'auditorName', label: 'Auditor', type: 'text', required: true, placeholder: 'Nombre del auditor' },
      { name: 'plannedDate', label: 'Fecha Planificada', type: 'date', required: true },
      { name: 'scope', label: 'Alcance', type: 'textarea', required: true, placeholder: 'Define el alcance de la auditoría...', rows: 3 },
      { name: 'status', label: 'Estado', type: 'select', options: ['Planificada', 'En Progreso', 'Completada', 'Cancelada'], defaultValue: 'Planificada' },
      { name: 'objectives', label: 'Objetivos', type: 'textarea', placeholder: 'Objetivos de la auditoría...', rows: 3 },
      { name: 'criteria', label: 'Criterios', type: 'textarea', placeholder: 'Criterios de auditoría...', rows: 3 },
      { name: 'team', label: 'Equipo Auditor', type: 'text', placeholder: 'Miembros del equipo separados por comas' },
      { name: 'duration', label: 'Duración (días)', type: 'number', placeholder: '5' },
      { name: 'location', label: 'Ubicación', type: 'text', placeholder: 'Lugar donde se realizará' },
    ],
    sections: [
      { title: 'Información Básica', fields: ['title', 'auditType', 'auditorName', 'plannedDate', 'status'] },
      { title: 'Alcance y Objetivos', fields: ['scope', 'objectives', 'criteria'] },
      { title: 'Configuración', fields: ['team', 'duration', 'location'] },
    ],
  },
  
  maintenance: {
    title: 'Programar Mantenimiento',
    subtitle: 'Completa la información del mantenimiento',
    entityName: 'Mantenimiento',
    fields: [
      { name: 'equipmentName', label: 'Nombre del Equipo', type: 'text', required: true, placeholder: 'Ej: Compresor Principal A' },
      { name: 'equipmentCode', label: 'Código del Equipo', type: 'text', placeholder: 'Ej: CMP-001' },
      { name: 'category', label: 'Categoría', type: 'select', placeholder: 'Seleccionar Categoría', options: ['Maquinaria', 'Equipos de Medición', 'Equipos de Cómputo', 'Vehículos', 'Herramientas', 'Otro'] },
      { name: 'recordType', label: 'Tipo de Mantenimiento', type: 'select', required: true, options: ['Mantenimiento', 'Calibración', 'Reparación', 'Inspección'], defaultValue: 'Mantenimiento' },
      { name: 'scheduledDate', label: 'Fecha Programada', type: 'date', required: true },
      { name: 'technicianName', label: 'Técnico Responsable', type: 'text', placeholder: 'Nombre del técnico' },
      { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Describe el mantenimiento a realizar...', rows: 3 },
      { name: 'cost', label: 'Costo Estimado', type: 'number', placeholder: '0', step: '0.01' },
      { name: 'status', label: 'Estado', type: 'select', options: ['Programado', 'En Progreso', 'Completado', 'Cancelado'], defaultValue: 'Programado' },
      { name: 'notes', label: 'Notas Adicionales', type: 'textarea', placeholder: 'Notas o comentarios...', rows: 3 },
      { name: 'location', label: 'Ubicación', type: 'text', placeholder: 'Ubicación del equipo' },
      { name: 'priority', label: 'Prioridad', type: 'select', options: ['Baja', 'Media', 'Alta'], defaultValue: 'Media' },
    ],
    sections: [
      { title: 'Información del Equipo', fields: ['equipmentName', 'equipmentCode', 'category', 'location'] },
      { title: 'Detalles del Mantenimiento', fields: ['recordType', 'scheduledDate', 'technicianName', 'priority'] },
      { title: 'Descripción y Costos', fields: ['description', 'cost', 'status', 'notes'] },
    ],
  },
  
  finances: {
    title: 'Transacción Financiera',
    subtitle: 'Registra una nueva transacción financiera',
    entityName: 'transacción',
    sections: [
      { title: 'Información Básica', fields: ['concept', 'clientProvider', 'category'] },
      { title: 'Detalles Financieros', fields: ['type', 'amount', 'currency', 'description'] },
      { title: 'Fechas y Estado', fields: ['transactionDate', 'status', 'dueDate', 'reference'] },
    ],
    fields: [
      { name: 'concept', label: 'Concepto', type: 'text', required: true, placeholder: 'Ej: Consultoría ISO 9001' },
      { name: 'clientProvider', label: 'Cliente/Proveedor', type: 'text', required: true, placeholder: 'Nombre del cliente o proveedor' },
      {
        name: 'category', label: 'Categoría', type: 'select', required: true, defaultValue: '',
        options: [
          { value: '', label: 'Seleccionar Categoría' },
          { value: 'Ingresos', label: 'Ingresos' },
          { value: 'Gastos Operativos', label: 'Gastos Operativos' },
          { value: 'Capacitación', label: 'Capacitación' },
          { value: 'Servicios', label: 'Servicios' },
          { value: 'Equipos', label: 'Equipos' },
          { value: 'Marketing', label: 'Marketing' },
        ]
      },
      {
        name: 'type', label: 'Tipo', type: 'select', required: true, defaultValue: '',
        options: [
          { value: '', label: 'Seleccionar Tipo' },
          { value: 'income', label: 'Ingreso' },
          { value: 'expense', label: 'Gasto' },
        ]
      },
      { name: 'amount', label: 'Importe', type: 'number', required: true, placeholder: '0.00' },
      { name: 'currency', label: 'Moneda', type: 'select', defaultValue: 'EUR',
        options: [
          { value: 'EUR', label: 'EUR (€)' },
          { value: 'USD', label: 'USD ($)' },
          { value: 'GBP', label: 'GBP (£)' },
        ]
      },
      { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Descripción detallada de la transacción...' },
      { name: 'transactionDate', label: 'Fecha de Transacción', type: 'date', required: true },
      {
        name: 'status', label: 'Estado', type: 'select', required: true, defaultValue: 'pending',
        options: [
          { value: 'pending', label: 'Pendiente' },
          { value: 'paid', label: 'Pagado' },
          { value: 'in_progress', label: 'En Proceso' },
          { value: 'overdue', label: 'Vencido' },
        ]
      },
      { name: 'dueDate', label: 'Fecha de Vencimiento', type: 'date' },
      { name: 'reference', label: 'Referencia/Número', type: 'text', placeholder: 'Número de factura, referencia...' },
    ],
  },
  
  onboarding: {
    title: 'Onboarding - Crear nuevo paso',
    subtitle: 'Crear un nuevo paso en el proceso de onboarding',
    entityName: 'paso de onboarding',
    sections: [
      {
        title: 'Información del Paso',
        fields: ['title', 'content', 'position']
      }
    ],
    fields: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
        placeholder: 'Título del paso'
      },
      {
        name: 'content',
        label: 'Contenido',
        type: 'textarea',
        required: false,
        placeholder: 'Descripción del contenido del paso',
        rows: 4
      },
      {
        name: 'position',
        label: 'Elija la posición en que desea que aparezca',
        type: 'select',
        required: true,
        defaultValue: 'start',
        options: [
          { value: 'start', label: 'Al inicio' },
          { value: 'middle', label: 'En el medio' },
          { value: 'end', label: 'Al final' }
        ]
      }
    ]
  },
  'onboarding-edit': {
    title: 'Onboarding - Edición masiva',
    subtitle: 'Editar múltiples pasos del proceso de onboarding',
    entityName: 'pasos de onboarding',
    sections: [
      {
        title: 'Pasos del Onboarding',
        fields: ['steps']
      }
    ],
    fields: [
      {
        name: 'steps',
        label: 'Steps',
        type: 'textarea',
        required: true,
        placeholder: 'Ingresa los pasos del onboarding...',
        rows: 8
      }
    ]
  },
      'personal-list': {
        title: 'Personal listado',
        subtitle: 'Gestión y visualización del personal de la organización',
        entityName: 'personal',
        sections: [
          {
            title: 'Control de Registros',
            fields: ['recordsPerPage', 'search', 'filter']
          },
          {
            title: 'Lista de Personal',
            fields: ['userTable']
          }
        ],
        fields: [
          {
            name: 'recordsPerPage',
            label: 'Registros por página',
            type: 'select',
            required: false,
            defaultValue: '50',
            options: [
              { value: '25', label: '25' },
              { value: '50', label: '50' },
              { value: '100', label: '100' }
            ]
          },
          {
            name: 'search',
            label: 'Buscar',
            type: 'text',
            required: false,
            placeholder: 'Buscar por nombre, apellido, email o documento...'
          },
          {
            name: 'filter',
            label: 'Filtrar por Estado',
            type: 'select',
            required: false,
            defaultValue: 'all',
            options: [
              { value: 'all', label: 'Todos' },
              { value: 'active', label: 'Activos' },
              { value: 'inactive', label: 'Inactivos' }
            ]
          },
          {
            name: 'userTable',
            label: 'Tabla de Usuarios',
            type: 'text',
            required: false,
            placeholder: 'Tabla de usuarios se mostrará aquí'
          }
        ]
      },
      
      'process-type': {
        title: 'Nuevo Tipo de Proceso',
        subtitle: 'Completa la información del tipo de proceso',
        entityName: 'Tipo de Proceso',
        fields: [
          { name: 'name', label: 'Nombre del Tipo', type: 'text', required: true, placeholder: 'Ej: PROCESOS ESTRATÉGICOS' },
          { name: 'order', label: 'Orden', type: 'number', required: true, placeholder: '1', defaultValue: 1 },
        ],
        sections: [
          { title: 'Información básica', fields: ['name', 'order'] },
        ],
      },
      
      'process-name': {
        title: 'Nuevo Nombre de Proceso',
        subtitle: 'Completa la información del nombre de proceso',
        entityName: 'Nombre de Proceso',
        fields: [
          { name: 'name', label: 'Nombre del Proceso', type: 'text', required: true, placeholder: 'Ej: Auditoría Interna' },
          { name: 'processTypeId', label: 'Tipo de Proceso', type: 'select', required: true, placeholder: 'Selecciona un tipo', options: [] },
          { name: 'order', label: 'Orden', type: 'number', required: true, placeholder: '1', defaultValue: 1 },
        ],
        sections: [
          { title: 'Información básica', fields: ['name', 'processTypeId', 'order'] },
        ],
      }
};

