import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar as CalendarLucide,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";
import { AuditsService } from "@/services/audits";
import { Audit, AuditStats } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const statusMap = {
  PLANNED: { label: "Planificada", className: "bg-primary text-primary-foreground" },
  IN_PROGRESS: { label: "En Progreso", className: "bg-warning text-warning-foreground" },
  COMPLETED: { label: "Completada", className: "bg-success text-success-foreground" },
  CANCELLED: { label: "Cancelada", className: "bg-destructive text-destructive-foreground" }
};

const auditTypeMap = {
  INTERNAL: { label: "Interna", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  EXTERNAL: { label: "Externa", className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" }
};

// Función auxiliar para formatear fechas de manera segura
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "No definida";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Fecha inválida:', dateString);
      return "Fecha inválida";
    }
    return format(date, "dd/MM/yyyy", { locale: es });
  } catch (error) {
    console.warn('Error al formatear fecha:', error);
    return "Error de fecha";
  }
};

export default function Audits() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAuditDate, setNewAuditDate] = useState<Date>();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAudit, setEditingAudit] = useState<Audit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const modalContext = useModal();
  const { toast } = useToast();

  useEffect(() => {
    loadAudits();
    loadStats();
  }, []);

  const loadAudits = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuditsService.getAudits({
        page: 1,
        limit: 100,
        sortBy: 'plannedDate',
        sortOrder: 'desc'
      });

      if (response.success && response.data) {
        setAudits(response.data);
      } else {
        const errorMsg = response.message || 'Error al cargar auditorías';
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = 'Error al conectar con el servidor';
      setError(errorMsg);
      console.error('Error loading audits:', err);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await AuditsService.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleEditAudit = (audit: Audit) => {
    setEditingAudit(audit);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAudit = async (updatedData: Partial<Audit>) => {
    if (!editingAudit) return;

    try {
      const response = await AuditsService.updateAudit(editingAudit.id, updatedData);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Auditoría actualizada correctamente"
        });
        loadAudits();
        loadStats();
        setIsEditDialogOpen(false);
        setEditingAudit(null);
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al actualizar auditoría",
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

  const handleDeleteAudit = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta auditoría?')) return;
    
    try {
      const response = await AuditsService.deleteAudit(id);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Auditoría eliminada correctamente"
        });
        loadAudits();
        loadStats();
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al eliminar auditoría",
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

  const filteredAudits = audits.filter(audit => {
    // Filtrar registros con datos inválidos
    if (!audit.title || !audit.auditorName || !audit.scope) {
      console.warn('Registro de auditoría con datos incompletos:', audit);
      return false;
    }
    
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.scope.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || audit.status === statusFilter;
    const matchesType = typeFilter === "all" || audit.auditType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Configuración de columnas para DataTable
  const columns: Column<Audit>[] = [
    {
      key: 'title',
      label: 'Auditoría',
      render: (audit) => (
        <div>
          <div className="font-medium">{audit.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {audit.scope}
          </div>
        </div>
      )
    },
    {
      key: 'auditType',
      label: 'Tipo',
      render: (audit) => {
        // Validar que auditType existe y no es undefined
        if (!audit.auditType) {
          console.warn('Tipo de auditoría no definido para auditoría:', audit.id);
          return (
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
              No definido
            </Badge>
          );
        }
        
        const auditType = audit.auditType as keyof typeof auditTypeMap;
        const typeInfo = auditTypeMap[auditType];
        
        if (!typeInfo) {
          console.warn('Tipo de auditoría no reconocido:', audit.auditType);
          return (
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
              {audit.auditType}
            </Badge>
          );
        }
        
        return (
          <Badge className={typeInfo.className}>
            {typeInfo.label}
          </Badge>
        );
      }
    },
    {
      key: 'auditorName',
      label: 'Auditor',
      sortable: true
    },
    {
      key: 'plannedDate',
      label: 'Fecha Planificada',
      sortable: true,
      render: (audit) => formatDate(audit.plannedDate)
    },
    {
      key: 'actualDate',
      label: 'Fecha Real',
      render: (audit) => audit.actualDate ? formatDate(audit.actualDate) : "-"
    },
    {
      key: 'status',
      label: 'Estado',
      render: (audit) => {
        const status = audit.status as keyof typeof statusMap;
        const statusInfo = statusMap[status];
        
        if (!statusInfo) {
          console.warn('Estado de auditoría no reconocido:', audit.status);
          return (
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
              {audit.status || 'Desconocido'}
            </Badge>
          );
        }
        
        return (
          <Badge className={statusInfo.className}>
            {statusInfo.label}
          </Badge>
        );
      }
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (audit) => (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Detalles de la Auditoría: {audit.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Información General</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Tipo:</span> {auditTypeMap[audit.auditType as keyof typeof auditTypeMap]?.label || audit.auditType || 'Desconocido'}</div>
                      <div><span className="font-medium">Auditor:</span> {audit.auditorName}</div>
                      <div><span className="font-medium">Fecha Planificada:</span> {formatDate(audit.plannedDate)}</div>
                      {audit.actualDate && (
                        <div><span className="font-medium">Fecha Real:</span> {formatDate(audit.actualDate)}</div>
                      )}
                      <div><span className="font-medium">Estado:</span> 
                        <Badge className={`ml-2 ${statusMap[audit.status as keyof typeof statusMap]?.className || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}`}>
                          {statusMap[audit.status as keyof typeof statusMap]?.label || audit.status || 'Desconocido'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Alcance</h4>
                    <p className="text-sm">{audit.scope}</p>
                  </div>
                </div>

                {audit.findings && (
                  <div>
                    <h4 className="font-semibold mb-3">Hallazgos</h4>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm">{audit.findings}</p>
                    </div>
                  </div>
                )}

                {audit.recommendations && (
                  <div>
                    <h4 className="font-semibold mb-3">Recomendaciones</h4>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm">{audit.recommendations}</p>
                    </div>
                  </div>
                )}

                {audit.status === 'COMPLETED' && (
                  <div className="flex justify-end">
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Informe
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleEditAudit(audit)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDeleteAudit(audit.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Programa de Auditorías</h1>
          <p className="text-muted-foreground">Gestión unificada de auditorías internas y externas</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80" onClick={() => modalContext.open('audit')}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Auditoría
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={loadAudits}>
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auditorías</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">En el programa actual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.completed || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.total ? `${Math.round((stats.completed / stats.total) * 100)}%` : '0%'} del programa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.inProgress || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.total ? `${Math.round((stats.inProgress / stats.total) * 100)}%` : '0%'} del programa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planificadas</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.planned || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.total ? `${Math.round((stats.planned / stats.total) * 100)}%` : '0%'} del programa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar auditorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="PLANNED">Planificada</SelectItem>
                <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
                <SelectItem value="COMPLETED">Completada</SelectItem>
                <SelectItem value="CANCELLED">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="INTERNAL">Interna</SelectItem>
                <SelectItem value="EXTERNAL">Externa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audits Table */}
      <Card>
        <CardHeader>
          <CardTitle>Programa de Auditorías</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredAudits}
            columns={columns}
            loading={loading}
            emptyMessage="No se encontraron auditorías"
          />
        </CardContent>
      </Card>

      {/* Modal de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Auditoría</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la auditoría seleccionada. Los campos marcados con * son obligatorios.
            </DialogDescription>
          </DialogHeader>
          {editingAudit && (
            <EditAuditForm 
              audit={editingAudit}
              onSave={handleUpdateAudit}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingAudit(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente para editar auditorías
interface EditAuditFormProps {
  audit: Audit;
  onSave: (data: Partial<Audit>) => void;
  onCancel: () => void;
}

function EditAuditForm({ audit, onSave, onCancel }: EditAuditFormProps) {
  const [formData, setFormData] = useState({
    title: audit.title,
    auditType: audit.auditType,
    plannedDate: audit.plannedDate.split('T')[0], // Solo la fecha sin hora
    auditorName: audit.auditorName,
    scope: audit.scope,
    status: audit.status,
    actualDate: audit.actualDate ? audit.actualDate.split('T')[0] : '',
    findings: audit.findings || '',
    recommendations: audit.recommendations || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData: Partial<Audit> = {
      title: formData.title,
      auditType: formData.auditType,
      plannedDate: new Date(formData.plannedDate).toISOString(),
      auditorName: formData.auditorName,
      scope: formData.scope,
    };

    // Solo agregar campos opcionales si tienen valor
    if (formData.actualDate) {
      updatedData.actualDate = new Date(formData.actualDate).toISOString();
    }
    if (formData.findings) {
      updatedData.findings = formData.findings;
    }
    if (formData.recommendations) {
      updatedData.recommendations = formData.recommendations;
    }

    onSave(updatedData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="auditType">Tipo *</Label>
          <Select value={formData.auditType} onValueChange={(value) => handleChange('auditType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INTERNAL">Interna</SelectItem>
              <SelectItem value="EXTERNAL">Externa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="plannedDate">Fecha Planificada *</Label>
          <Input
            id="plannedDate"
            type="date"
            value={formData.plannedDate}
            onChange={(e) => handleChange('plannedDate', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="actualDate">Fecha Real</Label>
          <Input
            id="actualDate"
            type="date"
            value={formData.actualDate}
            onChange={(e) => handleChange('actualDate', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="auditorName">Auditor *</Label>
          <Input
            id="auditorName"
            value={formData.auditorName}
            onChange={(e) => handleChange('auditorName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Estado</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PLANNED">Planificada</SelectItem>
              <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
              <SelectItem value="COMPLETED">Completada</SelectItem>
              <SelectItem value="CANCELLED">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="scope">Alcance *</Label>
        <Textarea
          id="scope"
          value={formData.scope}
          onChange={(e) => handleChange('scope', e.target.value)}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="findings">Hallazgos</Label>
        <Textarea
          id="findings"
          value={formData.findings}
          onChange={(e) => handleChange('findings', e.target.value)}
          rows={3}
          placeholder="Describe los hallazgos de la auditoría..."
        />
      </div>

      <div>
        <Label htmlFor="recommendations">Recomendaciones</Label>
        <Textarea
          id="recommendations"
          value={formData.recommendations}
          onChange={(e) => handleChange('recommendations', e.target.value)}
          rows={3}
          placeholder="Describe las recomendaciones..."
        />
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