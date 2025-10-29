import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

// Datos de ejemplo para objetivos
const objetivosData = [
  {
    id: '1',
    numero: 1,
    objetivo: 'Aumentar la cantidad de programas',
    meta: 'certificar texto',
    desde: '',
    hasta: '',
    responsables: '123 123',
    indicadores: '',
    objetivoCumplido: 'NO'
  },
  {
    id: '2',
    numero: 2,
    objetivo: 'Mejorar la tasa de conversión de proyectos presentados respecto del total',
    meta: '50%',
    desde: '',
    hasta: '',
    responsables: 'Raul Garcia',
    indicadores: 'Presupuestos ejecutados, Tasa de conversión de presupuestos',
    objetivoCumplido: 'NO'
  },
  {
    id: '3',
    numero: 3,
    objetivo: 'Optimizar los procesos de gestión de calidad',
    meta: 'Reducir tiempo de procesamiento en 25%',
    desde: '01-01-2024',
    hasta: '31-12-2024',
    responsables: 'María López, Juan Pérez',
    indicadores: 'Tiempo promedio de procesamiento, Número de no conformidades',
    objetivoCumplido: 'EN_PROCESO'
  },
  {
    id: '4',
    numero: 4,
    objetivo: 'Ampliar la cartera de servicios profesionales',
    meta: '3 nuevos servicios',
    desde: '01-03-2024',
    hasta: '30-11-2024',
    responsables: 'Ana Martínez',
    indicadores: 'Número de servicios nuevos, Ingresos por servicios nuevos',
    objetivoCumplido: 'SI'
  },
  {
    id: '5',
    numero: 5,
    objetivo: 'Implementar sistema de gestión digital',
    meta: '100% digitalización de procesos',
    desde: '01-06-2024',
    hasta: '31-12-2024',
    responsables: 'Carlos Rodríguez, Equipo IT',
    indicadores: 'Porcentaje de procesos digitalizados, Tiempo de respuesta',
    objetivoCumplido: 'EN_PROCESO'
  },
  {
    id: '6',
    numero: 6,
    objetivo: 'Mejorar la satisfacción del cliente',
    meta: '90% de satisfacción',
    desde: '01-01-2024',
    hasta: '31-12-2024',
    responsables: 'Laura González',
    indicadores: 'Encuestas de satisfacción, Número de quejas, Tiempo de resolución',
    objetivoCumplido: 'NO'
  },
  {
    id: '7',
    numero: 7,
    objetivo: 'Reducir costos operativos',
    meta: '15% de reducción',
    desde: '01-04-2024',
    hasta: '31-03-2025',
    responsables: 'Miguel Torres',
    indicadores: 'Costos mensuales, Eficiencia operativa, ROI',
    objetivoCumplido: 'EN_PROCESO'
  },
  {
    id: '8',
    numero: 8,
    objetivo: 'Capacitar al personal en nuevas tecnologías',
    meta: '80% del personal capacitado',
    desde: '01-02-2024',
    hasta: '30-09-2024',
    responsables: 'Recursos Humanos',
    indicadores: 'Horas de capacitación, Evaluaciones de competencias',
    objetivoCumplido: 'SI'
  }
];

export default function Objetivos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("numero");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar objetivos
  const getFilteredAndSortedObjetivos = () => {
    let filtered = objetivosData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.objetivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.responsables.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.indicadores.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.objetivoCumplido.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'numero':
          aValue = a.numero;
          bValue = b.numero;
          break;
        case 'objetivo':
          aValue = a.objetivo.toLowerCase();
          bValue = b.objetivo.toLowerCase();
          break;
        case 'meta':
          aValue = a.meta.toLowerCase();
          bValue = b.meta.toLowerCase();
          break;
        case 'desde':
          aValue = a.desde ? new Date(a.desde.split('-').reverse().join('-')).getTime() : 0;
          bValue = b.desde ? new Date(b.desde.split('-').reverse().join('-')).getTime() : 0;
          break;
        case 'hasta':
          aValue = a.hasta ? new Date(a.hasta.split('-').reverse().join('-')).getTime() : 0;
          bValue = b.hasta ? new Date(b.hasta.split('-').reverse().join('-')).getTime() : 0;
          break;
        case 'responsables':
          aValue = a.responsables.toLowerCase();
          bValue = b.responsables.toLowerCase();
          break;
        case 'indicadores':
          aValue = a.indicadores.toLowerCase();
          bValue = b.indicadores.toLowerCase();
          break;
        case 'objetivoCumplido':
          const cumplidoOrder = { 'SI': 3, 'EN_PROCESO': 2, 'NO': 1 };
          aValue = cumplidoOrder[a.objetivoCumplido as keyof typeof cumplidoOrder] || 0;
          bValue = cumplidoOrder[b.objetivoCumplido as keyof typeof cumplidoOrder] || 0;
          break;
        default:
          aValue = a.numero;
          bValue = b.numero;
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

  const filteredObjetivos = getFilteredAndSortedObjetivos();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredObjetivos.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentObjetivos = filteredObjetivos.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditObjetivo = (objetivoId: string) => {
    // TODO: Implementar edición de objetivo
    console.log('Edit objetivo:', objetivoId);
  };

  const handleNewObjetivo = () => {
    // TODO: Implementar creación de nuevo objetivo
    console.log('Create new objetivo');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCumplidoBadge = (cumplido: string) => {
    switch (cumplido) {
      case 'SI':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">SÍ</Badge>;
      case 'EN_PROCESO':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">EN PROCESO</Badge>;
      case 'NO':
        return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">NO</Badge>;
      default:
        return <Badge variant="outline">{cumplido}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [day, month, year] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Objetivos
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
              <Button onClick={handleNewObjetivo} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar objetivos..."
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
                      onClick={() => handleSort('numero')}
                    >
                      <div className="flex items-center gap-2">
                        #
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('objetivo')}
                    >
                      <div className="flex items-center gap-2">
                        Objetivo
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('meta')}
                    >
                      <div className="flex items-center gap-2">
                        Meta
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('desde')}
                    >
                      <div className="flex items-center gap-2">
                        Desde
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('hasta')}
                    >
                      <div className="flex items-center gap-2">
                        Hasta
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('responsables')}
                    >
                      <div className="flex items-center gap-2">
                        Responsables
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('indicadores')}
                    >
                      <div className="flex items-center gap-2">
                        Indicadores
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('objetivoCumplido')}
                    >
                      <div className="flex items-center gap-2">
                        Objetivo cumplido
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentObjetivos.map((objetivo) => (
                    <TableRow key={objetivo.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {objetivo.numero}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 max-w-xs">
                        <div className="truncate" title={objetivo.objetivo}>
                          {objetivo.objetivo}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <div className="truncate" title={objetivo.meta}>
                          {objetivo.meta}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(objetivo.desde) || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(objetivo.hasta) || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <div className="truncate" title={objetivo.responsables}>
                          {objetivo.responsables}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <div className="truncate" title={objetivo.indicadores}>
                          {objetivo.indicadores || '-'}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getCumplidoBadge(objetivo.objetivoCumplido)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditObjetivo(objetivo.id)}
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
