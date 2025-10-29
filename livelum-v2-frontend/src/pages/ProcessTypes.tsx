import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Trash2,
  Loader2,
  AlertCircle,
  GripVertical
} from "lucide-react";
import { ProcessTypesService } from "@/services/processes";
import { ProcessType } from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/contexts/ModalContext";
import UnifiedModal from "@/components/UnifiedModal";

export default function TiposProcesos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("order");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estados para la API
  const [processTypes, setProcessTypes] = useState<ProcessType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para modales
  const [editingType, setEditingType] = useState<ProcessType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<ProcessType | null>(null);
  
  const { toast } = useToast();
  const modalContext = useModal();

  // Cargar tipos de proceso desde la API
  const loadProcessTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ProcessTypesService.getProcessTypes();
      
      if (response.success && response.data) {
        setProcessTypes(response.data);
      } else {
        setError(response.message || 'Error al cargar tipos de proceso');
      }
    } catch (err) {
      const errorMsg = 'Error al conectar con el servidor';
      setError(errorMsg);
      console.error('Error loading process types:', err);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadProcessTypes();
  }, []);

  // Función para filtrar y ordenar tipos de procesos
  const getFilteredAndSortedTipos = () => {
    let filtered = processTypes;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.order.toString().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof ProcessType];
      const bValue = b[sortBy as keyof ProcessType];
      
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

  const filteredTipos = getFilteredAndSortedTipos();
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredTipos.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentTipos = filteredTipos.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditTipo = (tipo: ProcessType) => {
    setEditingType(tipo);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTipo = async (updatedData: Partial<ProcessType>) => {
    if (!editingType) return;

    try {
      const response = await ProcessTypesService.updateProcessType(editingType.id, updatedData);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Tipo de proceso actualizado correctamente"
        });
        loadProcessTypes();
        setIsEditDialogOpen(false);
        setEditingType(null);
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al actualizar tipo de proceso",
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

  const handleNewTipo = () => {
    modalContext.open('process-type');
  };

  const handleDeleteTipo = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este tipo de proceso?')) return;
    
    setDeletingId(id);
    try {
      const response = await ProcessTypesService.deleteProcessType(id);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Tipo de proceso eliminado correctamente"
        });
        loadProcessTypes();
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al eliminar tipo de proceso",
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleIrAlMapa = () => {
    // TODO: Implementar navegación al mapa de procesos
    console.log('Ir al mapa de procesos');
  };

  // Funciones para drag & drop
  const handleDragStart = (e: React.DragEvent, item: ProcessType) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetItem: ProcessType) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      return;
    }

    try {
      // Crear nueva lista con el orden actualizado
      const newOrder = [...processTypes];
      const draggedIndex = newOrder.findIndex(item => item.id === draggedItem.id);
      const targetIndex = newOrder.findIndex(item => item.id === targetItem.id);

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
      const response = await ProcessTypesService.reorderProcessTypes(reorderItems);
      
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Tipos de proceso reordenados correctamente"
        });
        loadProcessTypes(); // Recargar para obtener el orden actualizado
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al reordenar tipos de proceso",
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Tipos de Procesos
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Gestión de tipos de procesos del sistema
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Agregar tipo de proceso"
              onClick={handleNewTipo}
            >
              <Plus className="w-5 h-5" />
            </button>
            <Button
              onClick={handleIrAlMapa}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Ir al Mapa
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
                <Button variant="outline" size="sm" onClick={loadProcessTypes}>
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Tabla */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <GripVertical className="w-4 h-4" />
              <span>Arrastra las filas para reordenar los tipos de proceso</span>
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
                  <TableHead>Enlaces</TableHead>
                  <TableHead>Fecha Creación</TableHead>
                  <TableHead className="w-24">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                      <p className="text-sm text-muted-foreground mt-2">Cargando tipos de proceso...</p>
                    </TableCell>
                  </TableRow>
                ) : currentTipos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No se encontraron tipos de proceso</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentTipos.map((tipo) => (
                    <TableRow 
                      key={tipo.id} 
                      className={`hover:bg-gray-50 cursor-move transition-colors ${
                        draggedItem?.id === tipo.id ? 'opacity-50' : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, tipo)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, tipo)}
                      onDragEnd={handleDragEnd}
                    >
                      <TableCell className="w-8">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {tipo.order}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {tipo.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {tipo.links.length} enlaces
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(tipo.createdAt).toLocaleDateString('es-ES')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTipo(tipo)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTipo(tipo.id)}
                            disabled={deletingId === tipo.id}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            {deletingId === tipo.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
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

        {/* Paginación */}
        {!loading && totalPages > 1 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredTipos.length)} de {filteredTipos.length} registros
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modal Unificado */}
        <UnifiedModal 
          type="process-type" 
          additionalData={{ processTypes }}
        />

        {/* Modal de Edición */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Tipo de Proceso</DialogTitle>
              <DialogDescription>
                Modifica los detalles del tipo de proceso seleccionado. Los campos marcados con * son obligatorios.
              </DialogDescription>
            </DialogHeader>
            {editingType && (
              <EditProcessTypeForm 
                processType={editingType}
                onSave={handleUpdateTipo}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setEditingType(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Componente para editar tipos de proceso
interface EditProcessTypeFormProps {
  processType: ProcessType;
  onSave: (data: Partial<ProcessType>) => void;
  onCancel: () => void;
}

function EditProcessTypeForm({ processType, onSave, onCancel }: EditProcessTypeFormProps) {
  const [formData, setFormData] = useState({
    name: processType.name,
    order: processType.order,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que el nombre no esté vacío
    if (!formData.name || formData.name.trim() === '') {
      alert('El nombre es obligatorio');
      return;
    }
    
    const updatedData: Partial<ProcessType> = {
      name: formData.name.trim(),
      order: formData.order,
    };

    onSave(updatedData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="Ej: PROCESOS ESTRATÉGICOS"
          />
        </div>
        <div>
          <Label htmlFor="order">Orden *</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
            required
            min="1"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}