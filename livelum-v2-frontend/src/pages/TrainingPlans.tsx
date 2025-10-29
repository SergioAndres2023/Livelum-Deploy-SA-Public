import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { 
  Plus, 
  Edit, 
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download
} from "lucide-react";

// Datos de ejemplo para planes de capacitación
const planesCapacitacionData = [
  {
    id: '1',
    fechaPrevista: '04-10-2023',
    tema: 'ISO 9001',
    tipo: 'Interna',
    fechaRealizacion: '',
    estado: 'Aún no realizado'
  },
  {
    id: '2',
    fechaPrevista: '26-10-2023',
    tema: 'ISO 9001',
    tipo: 'Externa',
    fechaRealizacion: '26-10-2023',
    estado: 'Realizado - Satisfactorio'
  },
  {
    id: '3',
    fechaPrevista: '21-02-2024',
    tema: 'ISO 9001',
    tipo: 'Externa',
    fechaRealizacion: '29-02-2024',
    estado: 'Realizado - Satisfactorio'
  },
  {
    id: '4',
    fechaPrevista: '05-07-2024',
    tema: 'ISO 9001',
    tipo: 'Externa',
    fechaRealizacion: '12-06-2024',
    estado: 'Realizado - Satisfactorio'
  }
];

export default function PlanesCapacitacion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("fechaPrevista");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Definición de columnas para la tabla
  const columns: Column<any>[] = [
    {
      key: 'fechaPrevista',
      label: 'Fecha prevista',
      sortable: true,
      centered: true
    },
    {
      key: 'tema',
      label: 'Tema',
      sortable: true,
      className: 'max-w-md'
    },
    {
      key: 'tipo',
      label: 'Tipo',
      sortable: true,
      centered: true,
      render: (value) => (
        <StatusBadge 
          status={value} 
          variant={value === 'Interna' ? 'default' : 'outline'} 
        />
      )
    },
    {
      key: 'fechaRealizacion',
      label: 'Fecha realización',
      sortable: true,
      centered: true,
      render: (value) => value || '-'
    },
    {
      key: 'estado',
      label: 'Estado',
      sortable: true,
      centered: true,
      render: (value) => (
        <StatusBadge 
          status={value} 
          variant={value === 'Aún no realizado' ? 'destructive' : value === 'Realizado' ? 'default' : 'outline'} 
        />
      )
    },
    {
      key: 'acciones',
      label: 'Acciones',
      centered: true,
      render: () => (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Función para filtrar y ordenar planes
  const getFilteredAndSortedPlanes = () => {
    let filtered = planesCapacitacionData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(plan =>
        plan.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.estado.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'fechaPrevista':
          aValue = new Date(a.fechaPrevista.split('-').reverse().join('-')).getTime();
          bValue = new Date(b.fechaPrevista.split('-').reverse().join('-')).getTime();
          break;
        case 'tema':
          aValue = a.tema.toLowerCase();
          bValue = b.tema.toLowerCase();
          break;
        case 'tipo':
          aValue = a.tipo.toLowerCase();
          bValue = b.tipo.toLowerCase();
          break;
        case 'fechaRealizacion':
          if (a.fechaRealizacion && b.fechaRealizacion) {
            aValue = new Date(a.fechaRealizacion.split('-').reverse().join('-')).getTime();
            bValue = new Date(b.fechaRealizacion.split('-').reverse().join('-')).getTime();
          } else {
            aValue = a.fechaRealizacion ? 1 : 0;
            bValue = b.fechaRealizacion ? 1 : 0;
          }
          break;
        case 'estado':
          aValue = a.estado.toLowerCase();
          bValue = b.estado.toLowerCase();
          break;
        default:
          aValue = new Date(a.fechaPrevista.split('-').reverse().join('-')).getTime();
          bValue = new Date(b.fechaPrevista.split('-').reverse().join('-')).getTime();
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

  const filteredPlanes = getFilteredAndSortedPlanes();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredPlanes.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentPlanes = filteredPlanes.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditPlan = (planId: string) => {
    // TODO: Implementar edición de plan
    console.log('Edit plan:', planId);
  };

  const handleNewPlan = () => {
    // TODO: Implementar creación de nuevo plan
    console.log('Create new plan');
  };

  const handleDownloadList = () => {
    // TODO: Implementar descarga de listado
    console.log('Download list');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Aún no realizado':
        return <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">Aún no realizado</Badge>;
      case 'Realizado - Satisfactorio':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Realizado - Satisfactorio</Badge>;
      case 'Realizado - No satisfactorio':
        return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">Realizado - No satisfactorio</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Interna':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">Interna</Badge>;
      case 'Externa':
        return <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">Externa</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Planes de Capacitación
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
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Más opciones"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Controles superiores */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={handleDownloadList}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar listado
                </Button>
              </div>
              <Button onClick={handleNewPlan} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar planes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentPlanes}
              columns={columns}
              emptyMessage="No se encontraron planes de capacitación"
              onSort={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />

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
