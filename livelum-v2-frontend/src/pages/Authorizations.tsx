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
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MapPin
} from "lucide-react";

// Datos de ejemplo para autorizaciones (5 registros)
const autorizacionesData = [
  {
    id: '1',
    ultimaActualizacion: '15/12/2024 14:30:25',
    nombreProceso: 'Gestión de Compras y Adquisiciones',
    version: 'v.2.1'
  },
  {
    id: '2',
    ultimaActualizacion: '14/12/2024 09:15:42',
    nombreProceso: 'Control de Calidad y Evaluación',
    version: 'v.1.5'
  },
  {
    id: '3',
    ultimaActualizacion: '13/12/2024 16:45:18',
    nombreProceso: 'Gestión de Recursos Humanos',
    version: 'v.3.0'
  },
  {
    id: '4',
    ultimaActualizacion: '12/12/2024 11:20:33',
    nombreProceso: 'Administración Financiera',
    version: 'v.1.8'
  },
  {
    id: '5',
    ultimaActualizacion: '11/12/2024 08:55:07',
    nombreProceso: 'Gestión de Riesgos Operacionales',
    version: 'v.2.3'
  }
];

export default function Autorizaciones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("ultimaActualizacion");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar autorizaciones
  const getFilteredAndSortedAutorizaciones = () => {
    let filtered = autorizacionesData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombreProceso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ultimaActualizacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'ultimaActualizacion':
          // Convertir fecha a timestamp para comparación
          const aDate = new Date(a.ultimaActualizacion.split(' ')[0].split('/').reverse().join('-')).getTime();
          const bDate = new Date(b.ultimaActualizacion.split(' ')[0].split('/').reverse().join('-')).getTime();
          aValue = aDate;
          bValue = bDate;
          break;
        case 'nombreProceso':
          aValue = a.nombreProceso.toLowerCase();
          bValue = b.nombreProceso.toLowerCase();
          break;
        case 'version':
          aValue = a.version.toLowerCase();
          bValue = b.version.toLowerCase();
          break;
        default:
          aValue = a.ultimaActualizacion;
          bValue = b.ultimaActualizacion;
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

  const filteredAutorizaciones = getFilteredAndSortedAutorizaciones();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredAutorizaciones.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentAutorizaciones = filteredAutorizaciones.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditAutorizacion = (autorizacionId: string) => {
    console.log('Edit autorizacion:', autorizacionId);
  };

  const handleNewAutorizacion = () => {
    console.log('Create new autorizacion');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleIrAlMapa = () => {
    console.log('Ir al mapa de procesos');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Autorizaciones
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              listado de pendientes
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
            {/* Enlace al mapa de procesos */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium text-gray-700">
                Ficha de Procesos
              </div>
              
              <Button 
                onClick={handleIrAlMapa}
                className="bg-green-600 hover:bg-green-700"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Ir al mapa de procesos
              </Button>
            </div>

            {/* Controles de tabla */}
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
                  placeholder="Buscar autorizaciones..."
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
                      onClick={() => handleSort('ultimaActualizacion')}
                    >
                      <div className="flex items-center gap-2">
                        Última actualización
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('nombreProceso')}
                    >
                      <div className="flex items-center gap-2">
                        Nombre del Proceso
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('version')}
                    >
                      <div className="flex items-center gap-2">
                        Versión
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAutorizaciones.length > 0 ? (
                    currentAutorizaciones.map((autorizacion) => (
                      <TableRow key={autorizacion.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">
                          {autorizacion.ultimaActualizacion}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {autorizacion.nombreProceso}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {autorizacion.version}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        No se encontraron registros
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                {currentAutorizaciones.length > 0 ? (
                  `Página ${currentPage} de ${totalPages}`
                ) : (
                  "Sin resultados"
                )}
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
