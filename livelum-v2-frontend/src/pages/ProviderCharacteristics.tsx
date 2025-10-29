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
  Users
} from "lucide-react";

// Datos de ejemplo para características de proveedores
const caracteristicasProvData = [
  {
    id: '1',
    titulo: 'Atención',
    descripcion: 'Calidad del servicio de atención al cliente y comunicación'
  },
  {
    id: '2',
    titulo: 'Cumplimiento de entregas',
    descripcion: 'Puntualidad y exactitud en las entregas programadas'
  },
  {
    id: '3',
    titulo: 'Gestion de reclamos',
    descripcion: 'Eficiencia en el manejo y resolución de reclamos'
  },
  {
    id: '4',
    titulo: 'Precios',
    descripcion: 'Competitividad y transparencia en los precios ofrecidos'
  },
  {
    id: '5',
    titulo: 'Puntualidad',
    descripcion: 'Cumplimiento de horarios y plazos establecidos'
  },
  {
    id: '6',
    titulo: 'Respuesta ante emergencias',
    descripcion: 'Capacidad de respuesta rápida en situaciones críticas'
  },
  {
    id: '7',
    titulo: 'Tiempo de entrega',
    descripcion: 'Velocidad y eficiencia en los tiempos de entrega'
  },
  {
    id: '8',
    titulo: 'Tiempo de respuesta',
    descripcion: 'Rapidez en responder consultas y solicitudes'
  },
  {
    id: '9',
    titulo: 'Calidad del producto',
    descripcion: 'Estándares de calidad de los productos entregados'
  },
  {
    id: '10',
    titulo: 'Flexibilidad',
    descripcion: 'Adaptabilidad a cambios y requerimientos especiales'
  },
  {
    id: '11',
    titulo: 'Capacidad técnica',
    descripcion: 'Competencias técnicas y conocimientos especializados'
  },
  {
    id: '12',
    titulo: 'Innovación',
    descripcion: 'Capacidad de aportar mejoras y soluciones innovadoras'
  }
];

export default function CaracteristicasProv() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("titulo");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar características
  const getFilteredAndSortedCaracteristicas = () => {
    let filtered = caracteristicasProvData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string = '';
      let bValue: string = '';

      switch (sortBy) {
        case 'titulo':
          aValue = a.titulo.toLowerCase();
          bValue = b.titulo.toLowerCase();
          break;
        case 'descripcion':
          aValue = a.descripcion.toLowerCase();
          bValue = b.descripcion.toLowerCase();
          break;
        default:
          aValue = a.titulo.toLowerCase();
          bValue = b.titulo.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  };

  const filteredCaracteristicas = getFilteredAndSortedCaracteristicas();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredCaracteristicas.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentCaracteristicas = filteredCaracteristicas.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditCaracteristica = (caracteristicaId: string) => {
    // TODO: Implementar edición de característica
    console.log('Edit caracteristica:', caracteristicaId);
  };

  const handleNewCaracteristica = () => {
    // TODO: Implementar creación de nueva característica
    console.log('Create new caracteristica');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGestionProveedores = () => {
    // TODO: Implementar navegación a gestión de proveedores
    console.log('Ir a gestión de proveedores');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Características de Proveedores
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
            {/* Enlace a gestión de proveedores */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                onClick={handleGestionProveedores}
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
              >
                <Users className="w-4 h-4 mr-2" />
                Gestión de Proveedores
              </Button>
              
              <Button onClick={handleNewCaracteristica} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar características..."
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
                      onClick={() => handleSort('titulo')}
                    >
                      <div className="flex items-center gap-2">
                        Título
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('descripcion')}
                    >
                      <div className="flex items-center gap-2">
                        Descripción
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCaracteristicas.map((caracteristica) => (
                    <TableRow key={caracteristica.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {caracteristica.titulo}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {caracteristica.descripcion}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCaracteristica(caracteristica.id)}
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
