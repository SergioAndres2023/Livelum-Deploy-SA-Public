import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MapPin,
  Loader2,
  Search,
  Filter,
  GripVertical,
  Trash2
} from "lucide-react";
import { ProcessNamesService, ProcessTypesService } from "@/services/processes";
import { ProcessName, ProcessType } from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/contexts/ModalContext";
import UnifiedModal from "@/components/UnifiedModal";

export default function ProcessNames() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("order");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estados para la API
  const [processNames, setProcessNames] = useState<ProcessName[]>([]);
  const [processTypes, setProcessTypes] = useState<ProcessType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para modales
  const [editingProcessName, setEditingProcessName] = useState<ProcessName | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<ProcessName | null>(null);
  
  const { toast } = useToast();
  const modalContext = useModal();

  // Cargar datos al montar el componente
  useEffect(() => {
    loadProcessNames();
    loadProcessTypes();
  }, []);

  const loadProcessNames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ProcessNamesService.getProcessNames();
      
      if (response.success && response.data) {
        setProcessNames(response.data);
      } else {
        setError(response.message || 'Error al cargar nombres de proceso');
      }
    } catch (err) {
      const errorMsg = 'Error al conectar con el servidor';
      setError(errorMsg);
      console.error('Error loading process names:', err);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProcessTypes = async () => {
    try {
      const response = await ProcessTypesService.getProcessTypes();
      
      if (response.success && response.data) {
        setProcessTypes(response.data);
      }
    } catch (err) {
      console.error('Error loading process types:', err);
    }
  };

  // Función para filtrar y ordenar nombres de proceso
  const getFilteredAndSortedNames = () => {
    let filtered = processNames;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.order.toString().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof ProcessName];
      const bValue = b[sortBy as keyof ProcessName];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  };

  const filteredProcessNames = getFilteredAndSortedNames();

  // Función para manejar el ordenamiento
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredProcessNames.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const paginatedNames = filteredProcessNames.slice(startIndex, endIndex);

  // Obtener nombre del tipo de proceso
  const getProcessTypeName = (processTypeId: string) => {
    const processType = processTypes.find(pt => pt.id === processTypeId);
    return processType ? processType.name : 'Tipo no encontrado';
  };

  // Función para recargar datos después de crear
  const handleRefresh = () => {
    loadProcessNames();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Editar nombre de proceso
  const handleEditProcessName = (processName: ProcessName) => {
    setEditingProcessName(processName);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProcessName = async (formData: {
    name: string;
    processTypeId: string;
    order: number;
  }) => {
    if (!editingProcessName) return;

    try {
      const response = await ProcessNamesService.updateProcessName(editingProcessName.id, formData);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Nombre de proceso actualizado correctamente"
        });
        loadProcessNames();
        setIsEditDialogOpen(false);
        setEditingProcessName(null);
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al actualizar nombre de proceso",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error al conectar con el servidor",
        variant: "destructive"
      });
    }
  };

  // Eliminar nombre de proceso
  const handleDeleteProcessName = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este nombre de proceso?')) return;
    
    try {
      setDeletingId(id);
      const response = await ProcessNamesService.deleteProcessName(id);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Nombre de proceso eliminado correctamente"
        });
        loadProcessNames();
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al eliminar nombre de proceso",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error al conectar con el servidor",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Funciones de drag & drop para reordenamiento
  const handleDragStart = (e: React.DragEvent, item: ProcessName) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetItem: ProcessName) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      return;
    }

    try {
      // Crear nueva lista con el orden actualizado
      const newOrder = [...processNames];
      const draggedIndex = newOrder.findIndex(item => item.id === draggedItem.id);
      const targetIndex = newOrder.findIndex(item => item.id === targetItem.id);

      if (draggedIndex === -1 || targetIndex === -1) {
        setDraggedItem(null);
        return;
      }

      // Remover el elemento arrastrado
      const [draggedElement] = newOrder.splice(draggedIndex, 1);
      
      // Insertar en la nueva posición
      newOrder.splice(targetIndex, 0, draggedElement);

      // Actualizar los órdenes
      const reorderItems = newOrder.map((item, index) => ({
        id: item.id,
        order: index + 1
      }));

      // Llamar al API para reordenar
      const response = await ProcessNamesService.reorderProcessNames(reorderItems);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Nombres de proceso reordenados correctamente"
        });
        loadProcessNames();
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al reordenar nombres de proceso",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error al conectar con el servidor",
        variant: "destructive"
      });
    } finally {
      setDraggedItem(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-light text-gray-900">Nombres de Proceso</h1>
            <p className="text-sm text-gray-600 mt-1">Gestión de nombres de proceso por tipo</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => modalContext.open('process-name')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Nombre
            </Button>
          </div>
        </div>
        
        {/* Filtros y controles */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="search" className="text-sm font-medium">
                    Buscar:
                  </Label>
                  <Input
                    id="search"
                    placeholder="Buscar por orden o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="recordsPerPage" className="text-sm font-medium">
                    Registros por página:
                  </Label>
                  <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={loadData} className="border-red-300 text-red-600 hover:bg-red-50">
                Reintentar
              </Button>
            </div>
          </div>
        )}
      </div>

        {/* Tabla de nombres de proceso */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <GripVertical className="w-4 h-4" />
              <span>Arrastra las filas para reordenar los nombres de proceso</span>
            </div>
          </CardContent>
          <CardContent className="p-0 pt-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-8"></TableHead>
                  <TableHead className="w-16">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('order')}
                      className="h-8 px-2 lg:px-3"
                    >
                      Orden
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('name')}
                      className="h-8 px-2 lg:px-3"
                    >
                      Nombre
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('processTypeId')}
                      className="h-8 px-2 lg:px-3"
                    >
                      Tipo de Proceso
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('createdAt')}
                      className="h-8 px-2 lg:px-3"
                    >
                      Fecha de Creación
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-24">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                      <p className="text-sm text-gray-500 mt-2">Cargando nombres de proceso...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredProcessNames.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No se encontraron nombres de proceso</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedNames.map((processName) => (
                    <TableRow 
                      key={processName.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, processName)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, processName)}
                      onDragEnd={handleDragEnd}
                      className={`hover:bg-gray-50 cursor-move ${
                        draggedItem?.id === processName.id ? 'opacity-50' : ''
                      }`}
                    >
                      <TableCell className="w-8">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {processName.order}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {processName.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {getProcessTypeName(processName.processTypeId)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(processName.createdAt).toLocaleDateString('es-ES')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProcessName(processName)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteProcessName(processName.id)}
                            disabled={deletingId === processName.id}
                          >
                            {deletingId === processName.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      {/* Controles de paginación */}
      {filteredProcessNames.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredProcessNames.length)} de {filteredProcessNames.length} resultados
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Edición */}
      <EditProcessNameDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingProcessName(null);
        }}
        onSubmit={handleUpdateProcessName}
        processName={editingProcessName}
        processTypes={processTypes}
      />

      {/* UnifiedModal para crear nombres de proceso */}
      <UnifiedModal 
        type="process-name" 
        additionalData={{ processTypes }}
      />
    </div>
  );
}

// Componente para crear nombre de proceso
interface CreateProcessNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; processTypeId: string; order: number }) => void;
  processTypes: ProcessType[];
}

function CreateProcessNameDialog({ isOpen, onClose, onSubmit, processTypes }: CreateProcessNameDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    processTypeId: '',
    order: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.processTypeId) {
      onSubmit(formData);
      setFormData({ name: '', processTypeId: '', order: 1 });
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative z-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Crear Nombre de Proceso</h2>
        <p className="text-sm text-gray-600 mb-6">Completa la información para crear un nuevo nombre de proceso.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Ej: Auditoría Interna"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="processTypeId" className="block text-sm font-medium text-gray-700 mb-2">Tipo de Proceso *</Label>
            <Select value={formData.processTypeId} onValueChange={(value) => handleChange('processTypeId', value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {processTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">Orden *</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
              required
              min="1"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Crear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente para editar nombre de proceso
interface EditProcessNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; processTypeId: string; order: number }) => void;
  processName: ProcessName | null;
  processTypes: ProcessType[];
}

function EditProcessNameDialog({ isOpen, onClose, onSubmit, processName, processTypes }: EditProcessNameDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    processTypeId: '',
    order: 1
  });

  // Actualizar formData cuando cambie processName
  useEffect(() => {
    if (processName) {
      setFormData({
        name: processName.name,
        processTypeId: processName.processTypeId,
        order: processName.order
      });
    }
  }, [processName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.processTypeId) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative z-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Editar Nombre de Proceso</h2>
        <p className="text-sm text-gray-600 mb-6">Modifica la información del nombre de proceso seleccionado.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Ej: Auditoría Interna"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="processTypeId" className="block text-sm font-medium text-gray-700 mb-2">Tipo de Proceso *</Label>
            <Select value={formData.processTypeId} onValueChange={(value) => handleChange('processTypeId', value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {processTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">Orden *</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
              required
              min="1"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}