import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Datos de ejemplo para perfiles de puestos
const puestosData = [
  {
    id: '1',
    organigrama: 1,
    nombre: 'Dirección',
    usuarioSuperior: 'Raul Garcia',
    puestoSuperior: '',
    descripcion: 'Gestión estratégica de la organización'
  },
  {
    id: '2',
    organigrama: 1,
    nombre: 'Administracion',
    usuarioSuperior: 'Dario Lopez',
    puestoSuperior: '',
    descripcion: 'Tiene a su cargo la administración del SG de Empresa'
  },
  {
    id: '3',
    organigrama: 2,
    nombre: 'consultores',
    usuarioSuperior: 'pepe argento',
    puestoSuperior: '',
    descripcion: ''
  },
  {
    id: '4',
    organigrama: 3,
    nombre: 'Responsable de SG',
    usuarioSuperior: 'CHRISTIAN Perez',
    puestoSuperior: '',
    descripcion: 'Tiene a su cargo la administración del SG de una empresa en particular'
  },
  {
    id: '5',
    organigrama: 3,
    nombre: 'Asistente administrativo',
    usuarioSuperior: 'Ernesto Rares',
    puestoSuperior: '',
    descripcion: 'Analista de Facturación y Cobranzas'
  }
];

export default function PerfilesPuestos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("organigrama");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar puestos
  const getFilteredAndSortedPuestos = () => {
    let filtered = puestosData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(puesto =>
        puesto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puesto.usuarioSuperior.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puesto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'organigrama':
          aValue = a.organigrama;
          bValue = b.organigrama;
          break;
        case 'nombre':
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
          break;
        case 'usuarioSuperior':
          aValue = a.usuarioSuperior.toLowerCase();
          bValue = b.usuarioSuperior.toLowerCase();
          break;
        case 'descripcion':
          aValue = a.descripcion.toLowerCase();
          bValue = b.descripcion.toLowerCase();
          break;
        default:
          aValue = a.organigrama;
          bValue = b.organigrama;
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

  const filteredPuestos = getFilteredAndSortedPuestos();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredPuestos.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentPuestos = filteredPuestos.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditPuesto = (puestoId: string) => {
    // TODO: Implementar edición de puesto
    console.log('Edit puesto:', puestoId);
  };

  const handleNewPuesto = () => {
    // TODO: Implementar creación de nuevo puesto
    console.log('Create new puesto');
  };

  const handleGoToListado = () => {
    navigate('/personal/listado');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Perfiles de Puestos
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleGoToListado}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Ir al listado de Personal
                </button>
              </div>
              <Button onClick={handleNewPuesto} className="bg-green-600 hover:bg-green-700">
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
              
              <div className="flex items-center gap-2">
                <Label htmlFor="search" className="text-sm font-medium">
                  Buscar
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar puestos..."
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
                      onClick={() => handleSort('organigrama')}
                    >
                      <div className="flex items-center gap-2">
                        Organigrama
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('nombre')}
                    >
                      <div className="flex items-center gap-2">
                        Nombre del puesto
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('usuarioSuperior')}
                    >
                      <div className="flex items-center gap-2">
                        Usuario Superior
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead>Puesto Superior</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('descripcion')}
                    >
                      <div className="flex items-center gap-2">
                        Descripción breve
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPuestos.map((puesto) => (
                    <TableRow key={puesto.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {puesto.organigrama}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {puesto.nombre}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {puesto.usuarioSuperior}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {puesto.puestoSuperior || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <div className="truncate" title={puesto.descripcion}>
                          {puesto.descripcion || '-'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPuesto(puesto.id)}
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
