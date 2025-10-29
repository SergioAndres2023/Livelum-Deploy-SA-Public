import React, { useState } from "react";
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
  FileText
} from "lucide-react";

// Datos de ejemplo para revisiones por la dirección
const revisionDireccionData = [
  {
    id: '1',
    fechaRevision: '05-05-2023',
    participantes: ['123 123', 'Dario Lopez', 'Gerardo Perez'],
    documento: '92454825_concepto-solidaridad-vista-previa.pdf'
  },
  {
    id: '2',
    fechaRevision: '15-06-2023',
    participantes: ['María González', 'Carlos Rodríguez', 'Ana Martínez'],
    documento: 'revision-direccion-q2-2023.pdf'
  },
  {
    id: '3',
    fechaRevision: '20-09-2023',
    participantes: ['Luis Fernández', 'Laura Jiménez', 'Miguel Torres'],
    documento: 'acta-revision-septiembre-2023.pdf'
  },
  {
    id: '4',
    fechaRevision: '10-12-2023',
    participantes: ['Raúl García', 'Carmen López', 'David Sánchez'],
    documento: 'revision-anual-direccion-2023.pdf'
  },
  {
    id: '5',
    fechaRevision: '25-01-2024',
    participantes: ['Patricia Ruiz', 'Fernando Martín', 'Isabel Moreno'],
    documento: 'revision-enero-2024-direccion.pdf'
  },
  {
    id: '6',
    fechaRevision: '18-03-2024',
    participantes: ['Roberto Silva', 'Elena Vega', 'Antonio Díaz'],
    documento: 'acta-revision-marzo-2024.pdf'
  },
  {
    id: '7',
    fechaRevision: '08-05-2024',
    participantes: ['Sandra Castro', 'Javier Morales', 'Beatriz Romero'],
    documento: 'revision-direccion-mayo-2024.pdf'
  },
  {
    id: '8',
    fechaRevision: '22-07-2024',
    participantes: ['Francisco Herrera', 'Mónica Delgado', 'Álvaro Ramos'],
    documento: 'revision-julio-2024-direccion.pdf'
  }
];

export default function RevisionDireccion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("fechaRevision");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar revisiones
  const getFilteredAndSortedRevisiones = () => {
    let filtered = revisionDireccionData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.fechaRevision.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.participantes.some(participante => 
          participante.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        item.documento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'fechaRevision':
          aValue = new Date(a.fechaRevision.split('-').reverse().join('-')).getTime();
          bValue = new Date(b.fechaRevision.split('-').reverse().join('-')).getTime();
          break;
        case 'participantes':
          aValue = a.participantes.join(', ').toLowerCase();
          bValue = b.participantes.join(', ').toLowerCase();
          break;
        case 'documento':
          aValue = a.documento.toLowerCase();
          bValue = b.documento.toLowerCase();
          break;
        default:
          aValue = new Date(a.fechaRevision.split('-').reverse().join('-')).getTime();
          bValue = new Date(b.fechaRevision.split('-').reverse().join('-')).getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortOrder === 'asc') {
          return (aValue as number) - (bValue as number);
        } else {
          return (bValue as number) - (aValue as number);
        }
      }
    });

    return filtered;
  };

  const filteredRevisiones = getFilteredAndSortedRevisiones();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredRevisiones.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentRevisiones = filteredRevisiones.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditRevision = (revisionId: string) => {
    // TODO: Implementar edición de revisión
    console.log('Edit revision:', revisionId);
  };

  const handleNewRevision = () => {
    // TODO: Implementar creación de nueva revisión
    console.log('Create new revision');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownloadDocument = (documento: string) => {
    // TODO: Implementar descarga de documento
    console.log('Download document:', documento);
  };

  const formatDate = (dateStr: string) => {
    try {
      const [day, month, year] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Revisiones por la Dirección
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              listado
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Agregar"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Editar"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Controles superiores */}
            <div className="flex items-center justify-end mb-6">
              <Button onClick={handleNewRevision} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo
              </Button>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Label htmlFor="records-per-page" className="text-sm font-medium">
                  Registros por página
                </Label>
                <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <Label htmlFor="search" className="text-sm font-medium">
                  Buscar
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar revisiones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('fechaRevision')}
                    >
                      <div className="flex items-center gap-2">
                        Fecha de revisión
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('participantes')}
                    >
                      <div className="flex items-center gap-2">
                        Participantes
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('documento')}
                    >
                      <div className="flex items-center gap-2">
                        Documento
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRevisiones.map((revision) => (
                    <TableRow key={revision.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {formatDate(revision.fechaRevision)}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <div className="space-y-1">
                          {revision.participantes.map((participante, index) => (
                            <div key={index} className="text-sm">
                              {participante}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <button
                          onClick={() => handleDownloadDocument(revision.documento)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                          title={`Descargar ${revision.documento}`}
                        >
                          <FileText className="w-4 h-4" />
                          <span className="truncate" title={revision.documento}>
                            {truncateText(revision.documento, 35)}
                          </span>
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRevision(revision.id)}
                            className="text-gray-600 border-gray-300 hover:bg-gray-50"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                
                {/* Números de página */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 p-0 ${
                        page === currentPage 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
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
                  className="flex items-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
