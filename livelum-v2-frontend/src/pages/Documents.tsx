import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Search, Filter, Eye, Edit, Trash2, Download, Clock, User, AlertCircle, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { useModal } from "@/contexts/ModalContext";
import { DocumentsService } from "@/services/documents";
import { Document, DocumentStats } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const statusMap = {
  DRAFT: { label: "Borrador", color: "bg-gray-500/10 text-gray-700 border-gray-200" },
  IN_REVIEW: { label: "En Revisión", color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  APPROVED: { label: "Aprobado", color: "bg-green-500/10 text-green-700 border-green-200" },
  ARCHIVED: { label: "Archivado", color: "bg-red-500/10 text-red-700 border-red-200" }
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const modalContext = useModal();
  const { toast } = useToast();

  // Cargar documentos y estadísticas
  useEffect(() => {
    loadDocuments();
    loadStats();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await DocumentsService.getDocuments({
        page: 1,
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      if (response.success && response.data) {
        setDocuments(response.data);
      } else {
        setError(response.message || 'Error al cargar documentos');
      }
    } catch (err) {
      const errorMsg = 'Error al conectar con el servidor';
      setError(errorMsg);
      console.error('Error loading documents:', err);
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
      const response = await DocumentsService.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleEditDocument = (document: Document) => {
    setEditingDocument(document);
    setIsEditDialogOpen(true);
  };

  const handleUpdateDocument = async (updatedData: Partial<Document>) => {
    if (!editingDocument) return;

    try {
      const response = await DocumentsService.updateDocument(editingDocument.id, updatedData);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Documento actualizado correctamente"
        });
        loadDocuments();
        loadStats();
        setIsEditDialogOpen(false);
        setEditingDocument(null);
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al actualizar documento",
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

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este documento?')) return;
    
    try {
      const response = await DocumentsService.deleteDocument(id);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Documento eliminado correctamente"
        });
        loadDocuments();
        loadStats();
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al eliminar documento",
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

  // Filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Configuración de columnas para DataTable
  const columns: Column<Document>[] = [
    {
      key: 'title',
      label: 'Documento',
      render: (doc) => (
        <div>
          <div className="font-medium">{doc.title}</div>
          <div className="text-sm text-muted-foreground">
            {doc.code} • v{doc.version}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (doc) => <Badge variant="outline">{doc.type}</Badge>
    },
    {
      key: 'status',
      label: 'Estado',
      render: (doc) => (
        <Badge 
          variant="outline" 
          className={statusMap[doc.status as keyof typeof statusMap]?.color}
        >
          {statusMap[doc.status as keyof typeof statusMap]?.label}
        </Badge>
      )
    },
    {
      key: 'author',
      label: 'Autor',
      render: (doc) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          {doc.author}
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Fecha',
      render: (doc) => new Date(doc.createdAt).toLocaleDateString('es-ES')
    },
    {
      key: 'expiryDate',
      label: 'Vencimiento',
      render: (doc) => doc.expiryDate ? (
        <span className={new Date(doc.expiryDate) < new Date() ? "text-red-600" : ""}>
          {new Date(doc.expiryDate).toLocaleDateString('es-ES')}
        </span>
      ) : '-'
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (doc) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleEditDocument(doc)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteDocument(doc.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Control y seguimiento de la documentación organizacional
          </p>
        </div>
        <Button className="gap-2" onClick={() => modalContext.open('document')}>
          <Plus className="w-4 h-4" />
          Nuevo Documento
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
              <Button variant="outline" size="sm" onClick={loadDocuments}>
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Documentos</p>
                <p className="text-2xl font-semibold">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.total || 0}
                </p>
              </div>
              <FileText className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Revisión</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.inReview || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aprobados</p>
                <p className="text-2xl font-semibold text-green-600">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.approved || 0}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Archivados</p>
                <p className="text-2xl font-semibold text-red-600">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (stats?.total || 0) - (stats?.approved || 0) - (stats?.inReview || 0)}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="DRAFT">Borrador</SelectItem>
                <SelectItem value="IN_REVIEW">En Revisión</SelectItem>
                <SelectItem value="APPROVED">Aprobado</SelectItem>
                <SelectItem value="ARCHIVED">Archivado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Política">Política</SelectItem>
                <SelectItem value="Formato">Formato</SelectItem>
                <SelectItem value="Procedimiento">Procedimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Lista de Documentos
          </CardTitle>
          <CardDescription>
            Gestiona todos los documentos de la organización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredDocuments}
            columns={columns}
            loading={loading}
            emptyMessage="No se encontraron documentos"
          />
        </CardContent>
      </Card>

      {/* Modal de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Documento</DialogTitle>
            <DialogDescription>
              Modifica los detalles del documento seleccionado. Los campos marcados con * son obligatorios.
            </DialogDescription>
          </DialogHeader>
          {editingDocument && (
            <EditDocumentForm 
              document={editingDocument}
              onSave={handleUpdateDocument}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingDocument(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente para editar documentos
interface EditDocumentFormProps {
  document: Document;
  onSave: (data: Partial<Document>) => void;
  onCancel: () => void;
}

function EditDocumentForm({ document, onSave, onCancel }: EditDocumentFormProps) {
  const [formData, setFormData] = useState({
    title: document.title,
    code: document.code,
    type: document.type,
    author: document.author,
    description: document.description || '',
    expiryDate: document.expiryDate ? document.expiryDate.split('T')[0] : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData: Partial<Document> = {
      title: formData.title,
      code: formData.code,
      type: formData.type,
      author: formData.author,
      description: formData.description,
    };

    // Solo agregar fecha de vencimiento si tiene valor
    if (formData.expiryDate) {
      updatedData.expiryDate = new Date(formData.expiryDate).toISOString();
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
          <Label htmlFor="code">Código *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo *</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MANUAL">Manual</SelectItem>
              <SelectItem value="POLITICA">Política</SelectItem>
              <SelectItem value="FORMATO">Formato</SelectItem>
              <SelectItem value="PROCEDIMIENTO">Procedimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="author">Autor *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="Describe el contenido del documento..."
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