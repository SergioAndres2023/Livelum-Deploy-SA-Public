import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  Download,
  FileText,
  Trash2,
  AlertCircle,
  Loader2,
  Search
} from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { DocumentsService } from "@/services/documents";
import { Document, DocumentStats } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const statusMap = {
  BORRADOR: { label: "Borrador", color: "bg-gray-500/10 text-gray-700 border-gray-200" },
  DRAFT: { label: "Borrador", color: "bg-gray-500/10 text-gray-700 border-gray-200" },
  IN_REVIEW: { label: "En Revisión", color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  APPROVED: { label: "Aprobado", color: "bg-green-500/10 text-green-700 border-green-200" },
  VENCIDO: { label: "Vencido", color: "bg-red-500/10 text-red-700 border-red-200" },
  ARCHIVED: { label: "Archivado", color: "bg-red-500/10 text-red-700 border-red-200" }
};

export default function BibliotecaDocumentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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
    
    setDeletingId(id);
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
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadList = () => {
    try {
      // Crear datos para CSV
      const csvData = [
        ['Código', 'Nombre', 'Comentarios', 'Versión', 'Estado', 'Última Actualización'],
        ...filteredDocuments.map(doc => [
          doc.code,
          doc.title,
          doc.description || '',
          doc.version,
          statusMap[doc.status as keyof typeof statusMap]?.label || doc.status,
          new Date(doc.updatedAt).toLocaleString('es-ES')
        ])
      ];

      // Convertir a CSV
      const csvContent = csvData.map(row => 
        row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      // Crear y descargar archivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `documentos_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Éxito",
        description: `Listado descargado (${filteredDocuments.length} documentos)`
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Error al generar el archivo de descarga",
        variant: "destructive"
      });
    }
  };

  // Filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         doc.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Configuración de columnas para DataTable
  const columns: Column<Document>[] = [
    {
      key: 'updatedAt',
      label: 'Última actualización',
      render: (doc) => new Date(doc.updatedAt).toLocaleString('es-ES')
    },
    {
      key: 'code',
      label: 'Código'
    },
    {
      key: 'title',
      label: 'Nombre',
      render: (doc) => (
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
          title={`Ver ${doc.title}`}
        >
          <FileText className="w-4 h-4" />
          <span className="truncate">
            {truncateText(doc.title, 30)}
          </span>
        </button>
      )
    },
    {
      key: 'description',
      label: 'Comentarios',
      render: (doc) => (
        <div className="max-w-xs">
          <div className="truncate" title={doc.description || ''}>
            {doc.description || '-'}
          </div>
        </div>
      )
    },
    {
      key: 'version',
      label: 'Versión',
      render: (doc) => `v${doc.version}`
    },
    {
      key: 'status',
      label: 'Estado',
      render: (doc) => (
        <Badge 
          variant="outline" 
          className={
            doc.status === 'APPROVED' ? 'text-white bg-green-600 border-green-600' :
            doc.status === 'IN_REVIEW' ? 'text-white bg-orange-600 border-orange-600' :
            doc.status === 'VENCIDO' ? 'text-white bg-red-600 border-red-600' :
            doc.status === 'ARCHIVED' ? 'text-white bg-gray-600 border-gray-600' :
            'text-white bg-gray-500 border-gray-500'
          }
        >
          {statusMap[doc.status as keyof typeof statusMap]?.label || doc.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (doc) => (
        <div className="flex items-center gap-2">
          <button 
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
            onClick={() => handleEditDocument(doc)}
            title="Editar"
            disabled={deletingId === doc.id}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            className="text-gray-400 hover:text-red-600 p-1 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleDeleteDocument(doc.id)}
            title="Eliminar"
            disabled={deletingId === doc.id}
          >
            {deletingId === doc.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Biblioteca de documentos
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              listado
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Agregar documento"
              onClick={() => modalContext.open('document')}
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Descargar listado"
              onClick={handleDownloadList}
            >
              <Download className="w-5 h-5" />
            </button>
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
                <Button variant="outline" size="sm" onClick={loadDocuments}>
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            {/* Filtros */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Label htmlFor="search" className="text-sm font-medium">
                  Buscar
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Label htmlFor="status-filter" className="text-sm font-medium">
                  Estado
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="BORRADOR">Borrador</SelectItem>
                    <SelectItem value="IN_REVIEW">En Revisión</SelectItem>
                    <SelectItem value="APPROVED">Aprobado</SelectItem>
                    <SelectItem value="VENCIDO">Vencido</SelectItem>
                    <SelectItem value="ARCHIVED">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabla */}
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
    code: document.code,
    title: document.title,
    description: document.description || '',
    version: document.version,
    status: document.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData: Partial<Document> = {
      code: formData.code,
      title: formData.title,
      description: formData.description,
      version: formData.version,
      status: formData.status,
    };

    onSave(updatedData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label htmlFor="title">Nombre *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="version">Versión *</Label>
          <Input
            id="version"
            value={formData.version}
            onChange={(e) => handleChange('version', e.target.value)}
            required
            placeholder="1.0"
          />
        </div>
        <div>
          <Label htmlFor="status">Estado *</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BORRADOR">Borrador</SelectItem>
              <SelectItem value="IN_REVIEW">En Revisión</SelectItem>
              <SelectItem value="APPROVED">Aprobado</SelectItem>
              <SelectItem value="VENCIDO">Vencido</SelectItem>
              <SelectItem value="ARCHIVED">Archivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Comentarios</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="Agrega comentarios sobre el documento..."
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
