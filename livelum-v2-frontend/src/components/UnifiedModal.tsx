import React, { useState, useEffect } from 'react';
import { useModal, ModalType } from '@/contexts/ModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIndicators } from '@/contexts/IndicatorsContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { modalConfigs, ModalConfig } from './modalConfigs';
import { AuditsService } from '@/services/audits';
import { DocumentsService } from '@/services/documents';
import { RisksService } from '@/services/risks';
import { ProcessTypesService, ProcessNamesService } from '@/services/processes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTable, StatusBadge, Column } from '@/components/ui/DataTable';
import { MoreHorizontal, Edit, Pencil, Trash2 } from 'lucide-react';

interface UnifiedModalProps {
  type: ModalType;
  additionalData?: any;
}

// Datos hardcodeados de usuarios
const usersData = [
  {
    id: '1',
    username: '123',
    name: '123',
    lastName: '123',
    email: '123@9net.com.ar',
    document: '',
    active: false,
    positions: '',
    avatar: null
  },
  {
    id: '2',
    username: 'jose67',
    name: 'Agustina',
    lastName: 'Court',
    email: 'christiancocchi@gmail.com',
    document: '',
    active: true,
    positions: '',
    avatar: null
  },
  {
    id: '3',
    username: 'agustina11',
    name: 'AGUSTINA',
    lastName: 'TORRES',
    email: '',
    document: '',
    active: false,
    positions: '',
    avatar: null
  },
  {
    id: '4',
    username: 'camila57',
    name: 'CAMILA',
    lastName: 'TORRES',
    email: '',
    document: '',
    active: false,
    positions: '',
    avatar: null
  },
  {
    id: '5',
    username: 'carmen47',
    name: 'Carmen',
    lastName: 'OTERO',
    email: 'carmen1766@yahoo.com.ar',
    document: '',
    active: true,
    positions: 'Asistente administrativo',
    avatar: null
  },
  {
    id: '6',
    username: 'christia',
    name: 'CHRISTIAN',
    lastName: 'Perez',
    email: 'christiancocchi@gmail.com',
    document: '',
    active: true,
    positions: 'Responsable de SG, Dirección',
    avatar: null
  }
];

const UnifiedModal: React.FC<UnifiedModalProps> = ({ type, additionalData }) => {
  // TODOS los hooks deben estar ANTES de cualquier return condicional
  const modalContext = useModal();
  const isOpen = typeof modalContext.isOpen === 'function' ? modalContext.isOpen(type) : modalContext.isOpen;
  const close = () => modalContext.close(type);
  const { user } = useAuth();
  const { updateIndicators, updateCriticalIndicators } = useIndicators();
  
  const config: ModalConfig = { ...modalConfigs[type] };
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Actualizar opciones dinámicamente para process-name
  if (type === 'process-name' && additionalData?.processTypes) {
    const processTypeField = config.fields.find(f => f.name === 'processTypeId');
    if (processTypeField) {
      processTypeField.options = additionalData.processTypes.map((pt: any) => ({
        value: pt.id,
        label: pt.name
      }));
    }
  }

  // Calcular el siguiente orden disponible para process-type
  if (type === 'process-type' && additionalData?.processTypes) {
    const existingOrders = additionalData.processTypes.map((pt: any) => pt.order).sort((a: number, b: number) => a - b);
    const nextOrder = existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
    
    // Actualizar el valor por defecto del campo order
    const orderField = config.fields.find(f => f.name === 'order');
    if (orderField) {
      orderField.defaultValue = nextOrder;
    }
  }
  
  // Estados específicos para el modal de personal
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [recordsPerPage, setRecordsPerPage] = useState('50');

  // Inicializar formData cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, any> = {};
      config.fields.forEach(field => {
        initialData[field.name] = field.defaultValue ?? '';
      });
      setFormData(initialData);
      setError('');
    }
  }, [isOpen, config.fields]);
  
  // Solo renderizar cuando el modal esté abierto
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error(`No tienes permisos para crear ${config.entityName.toLowerCase()}`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let response;
      
      // Llamar al servicio correspondiente según el tipo
      switch (type) {
        case 'audit':
          // Convertir la fecha a formato ISO 8601 con hora
          const plannedDateTime = formData.plannedDate 
            ? new Date(formData.plannedDate).toISOString() 
            : new Date().toISOString();
          
          const auditData = {
            title: formData.title,
            auditType: (formData.auditType === 'Interna' ? 'INTERNAL' : 'EXTERNAL') as 'INTERNAL' | 'EXTERNAL',
            plannedDate: plannedDateTime,
            auditorName: formData.auditorName,
            scope: formData.scope
          };
          
          response = await AuditsService.createAudit(auditData);
          break;
          
        case 'document':
          response = await DocumentsService.createDocument({
            title: formData.title,
            code: formData.code || `DOC-${Date.now()}`,
            type: formData.type,
            description: formData.description || '',
            author: user?.user_metadata?.full_name || user?.email || 'Usuario'
          });
          break;
          
        case 'risk':
          response = await RisksService.createRisk({
            title: formData.title,
            code: formData.code || `RISK-${Date.now()}`,
            category: formData.category || 'OPERATIONAL',
            probability: formData.probability || 'MEDIUM',
            impact: formData.impact || 'MEDIUM',
            owner: formData.owner || user?.user_metadata?.full_name || user?.email || 'Usuario',
            dueDate: formData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            description: formData.description || '',
            mitigation: formData.mitigation || 'Pendiente de definir'
          });
          break;
          
        case 'process-type':
          // Validar que el nombre tenga al menos 3 caracteres
          if (!formData.name || formData.name.trim().length < 3) {
            throw new Error('El nombre del tipo de proceso debe tener al menos 3 caracteres');
          }
          
          response = await ProcessTypesService.createProcessType({
            name: formData.name.trim(),
            order: formData.order || 1,
            links: []
          });
          break;
          
        case 'process-name':
          // Validar que el nombre tenga al menos 3 caracteres
          if (!formData.name || formData.name.trim().length < 3) {
            throw new Error('El nombre del proceso debe tener al menos 3 caracteres');
          }
          
          response = await ProcessNamesService.createProcessName({
            name: formData.name.trim(),
            processTypeId: formData.processTypeId,
            order: formData.order || 1
          });
          break;
          
        default:
          throw new Error(`Tipo de modal no soportado: ${type}`);
      }
      
      if (response.success) {
        toast.success(`${config.entityName} creado exitosamente`);
        close();
        
        // Actualizar indicadores según el tipo
        if (['risk', 'indicator'].includes(type)) {
          updateCriticalIndicators();
        } else {
          updateIndicators();
        }
        
        // Recargar página si es necesario
        if (['process-name', 'process-type'].includes(type)) {
          window.location.reload();
        }
      } else {
        throw new Error(response.message || `Error al crear el ${config.entityName.toLowerCase()}`);
      }
    } catch (err: any) {
      console.error(`Error creating ${type}:`, err);
      const errorMessage = err.message || `Error al crear el ${config.entityName.toLowerCase()}`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError('');
    close();
  };

  const handleChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Función para filtrar usuarios
  const getFilteredUsers = () => {
    let filtered = usersData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => 
        filterStatus === 'active' ? user.active : !user.active
      );
    }

    return filtered;
  };

  // Definición de columnas para la tabla de usuarios
  const userColumns: Column<any>[] = [
    {
      key: 'avatar',
      label: 'Foto',
      centered: true,
      render: (_, user) => (
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar || undefined} />
          <AvatarFallback className="text-xs">
            {user.name.charAt(0)}{user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )
    },
    {
      key: 'username',
      label: 'Usuario',
      sortable: true
    },
    {
      key: 'name',
      label: 'Nombre',
      sortable: true
    },
    {
      key: 'lastName',
      label: 'Apellido',
      sortable: true
    },
    {
      key: 'document',
      label: 'Documento',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'active',
      label: 'Personal activo',
      centered: true,
      render: (value) => (
        <StatusBadge status={value ? 'SI' : 'NO'} variant={value ? 'default' : 'secondary'} />
      )
    },
    {
      key: 'positions',
      label: 'Puestos',
      render: (value) => value || '-'
    },
    {
      key: 'actions',
      label: 'Acciones',
      centered: true,
      render: () => (
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200">
            <Pencil size={16} />
          </button>
          <button className="text-gray-400 hover:text-red-600 p-1 rounded-full transition-all duration-200">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  // Función para renderizar la tabla de usuarios
  const renderUserTable = () => {
    if (type !== 'personal-list') return null;

    const filteredUsers = getFilteredUsers();

    return (
      <div className="space-y-4">
        {/* Controles superiores */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Registros por página:</span>
            <select 
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
              Matriz de Polivalencias
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
              Nuevo
            </button>
          </div>
        </div>

        {/* Campo de búsqueda */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Buscar:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, apellido, email..."
            className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
          />
        </div>

        {/* Tabla de usuarios */}
        <DataTable
          data={filteredUsers}
          columns={userColumns}
          emptyMessage="No se encontraron usuarios con los criterios de búsqueda"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 transition-opacity duration-300 opacity-100 pointer-events-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Panel deslizante */}
      <div className={`fixed right-0 top-0 bg-white shadow-2xl border-l border-gray-200 animate-in slide-in-from-right duration-300 h-full overflow-y-auto ${
        type === 'personal-list' ? 'w-[90vw] max-w-6xl' : 'w-96'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">{config.title}</h2>
              <p className="text-slate-600 text-sm mt-1">{config.subtitle}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          {type === 'personal-list' ? (
            // Contenido especial para el modal de personal
            <div className="space-y-6">
              {renderUserTable()}
            </div>
          ) : (
            // Formulario normal para otros modales
            <form className="space-y-6" onSubmit={handleSubmit}>
              {config.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-700 border-b border-slate-200 pb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.fields.map((fieldName) => {
                      const field = config.fields.find(f => f.name === fieldName);
                      if (!field) return null;

                      return (
                        <div key={field.name} className="flex flex-col gap-2">
                          <label className="text-xs font-medium text-slate-500">
                            {field.label} {field.required && '*'}
                          </label>
                          
                          {field.type === 'text' && (
                            <input
                              className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              required={field.required}
                              placeholder={field.placeholder}
                            />
                          )}
                          
                          {field.type === 'textarea' && (
                            <textarea
                              className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              required={field.required}
                              placeholder={field.placeholder}
                              rows={field.rows || 4}
                            />
                          )}
                          
                          {field.type === 'select' && (
                            <select
                              className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              required={field.required}
                            >
                              {field.placeholder && <option value="">{field.placeholder}</option>}
                              {field.options?.map((option, index) => {
                                const value = typeof option === 'string' ? option : option.value;
                                const label = typeof option === 'string' ? option : option.label;
                                return (
                                  <option key={index} value={value}>
                                    {label}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                          
                          {field.type === 'number' && (
                            <input
                              type="number"
                              className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              required={field.required}
                              placeholder={field.placeholder}
                              step={field.step}
                            />
                          )}
                          
                          {field.type === 'date' && (
                            <input
                              type="date"
                              className="border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              required={field.required}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Botones */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 pt-6 mt-8">
                <div className="flex gap-3 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="border-gray-300 text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? `Creando ${config.entityName.toLowerCase()}...` : `Crear ${config.entityName.toLowerCase()}`}
                  </Button>
                </div>
                {error && <div className="text-red-500 text-sm text-center mt-3">{error}</div>}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedModal;

