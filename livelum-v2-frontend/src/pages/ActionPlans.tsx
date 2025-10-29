import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Edit,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RefreshCw,
  ArrowUpDown
} from "lucide-react";

// Datos de ejemplo para planes de acción
const planesAccionData = [
  {
    id: '1',
    fechaCreacion: '13-11-2022',
    origen: 'Hallazgo: Resumen de detalle',
    porcentajeAvance: 66.67,
    tipo: 'Hallazgo',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '12/03/2012' },
      { id: 2, estado: 'Realizada', fecha: '12/03/2012' },
      { id: 3, estado: 'Prevista', fecha: '03/04/2024' }
    ],
    controles: [
      { estado: 'Estimado', fecha: '12/03/2012' },
      { estado: 'Aún no realizado', fecha: '12/03/2012' },
      { estado: 'No cargado' }
    ]
  },
  {
    id: '2',
    fechaCreacion: '06-01-2023',
    origen: 'Hallazgo: Resumen de detalle',
    porcentajeAvance: 33.33,
    tipo: 'Hallazgo',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '23/12/2031' },
      { id: 2, estado: 'Prevista', fecha: '13/10/2025' },
      { id: 3, estado: 'Prevista', fecha: '12/03/2012' }
    ],
    controles: [
      { estado: 'No cargado' },
      { estado: 'Estimado', fecha: '21/03/2012' },
      { estado: 'No cargado' }
    ]
  },
  {
    id: '3',
    fechaCreacion: '31-03-2023',
    origen: 'Objetivo: Aumentar la cantidad de programas',
    porcentajeAvance: 0.00,
    tipo: 'Objetivo',
    acciones: [
      { id: 1, estado: 'Prevista', fecha: '30/04/2023' },
      { id: 2, estado: 'Prevista', fecha: '02/04/2024' }
    ],
    controles: [
      { estado: 'Estimado', fecha: '05/05/2023' },
      { estado: 'No cargado' }
    ]
  },
  {
    id: '4',
    fechaCreacion: '10-07-2023',
    origen: 'Riesgo: Ausencia de Personal',
    porcentajeAvance: 50.00,
    tipo: 'Riesgo',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '14/07/2023' },
      { id: 2, estado: 'Prevista', fecha: '28/03/2024' }
    ],
    controles: [
      { estado: 'Estimado', fecha: '02/08/2023' },
      { estado: 'No cargado' }
    ]
  },
  {
    id: '5',
    fechaCreacion: '04-10-2023',
    origen: 'Riesgo: Que aumente la rotación del personal clave',
    porcentajeAvance: 100.00,
    tipo: 'Riesgo',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '04/11/2023' }
    ],
    controles: [
      { estado: 'Satisfactorio', fecha: '04/11/2023' }
    ]
  },
  {
    id: '6',
    fechaCreacion: '05-12-2023',
    origen: 'Hallazgo: Revisión de documentos',
    porcentajeAvance: 50.00,
    tipo: 'Hallazgo',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '06/12/2023' },
      { id: 2, estado: 'Prevista', fecha: '04/01/2024' }
    ],
    controles: [
      { estado: 'Satisfactorio', fecha: '13/12/2023' },
      { estado: 'No cargado' }
    ]
  },
  {
    id: '7',
    fechaCreacion: '01-02-2024',
    origen: 'Rev. Dirección: 05/05/2023',
    porcentajeAvance: 100.00,
    tipo: 'Revisión',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '03/02/2024' }
    ],
    controles: [
      { estado: 'No cargado' }
    ]
  },
  {
    id: '8',
    fechaCreacion: '20-02-2024',
    origen: 'Riesgo: Corte de luz',
    porcentajeAvance: 100.00,
    tipo: 'Riesgo',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '02/03/2024' }
    ],
    controles: [
      { estado: 'Satisfactorio', fecha: '07/03/2024' }
    ]
  }
];

export default function PlanesAccion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("fechaCreacion");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estados para filtros
  const [filtros, setFiltros] = useState({
    desde: '2025-09-13',
    hasta: '2025-10-13',
    acciones: '',
    origen: '',
    controles: ''
  });

  // Función para filtrar planes de acción
  const getFilteredPlanes = () => {
    let filtered = planesAccionData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'fechaCreacion':
          // Convertir fechas DD-MM-YYYY a formato comparable
          const aDate = a.fechaCreacion.split('-').reverse().join('-');
          const bDate = b.fechaCreacion.split('-').reverse().join('-');
          aValue = new Date(aDate).getTime();
          bValue = new Date(bDate).getTime();
          break;
        case 'porcentajeAvance':
          aValue = a.porcentajeAvance;
          bValue = b.porcentajeAvance;
          break;
        case 'origen':
          aValue = a.origen.toLowerCase();
          bValue = b.origen.toLowerCase();
          break;
        default:
          aValue = a.fechaCreacion;
          bValue = b.fechaCreacion;
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

  const filteredPlanes = getFilteredPlanes();

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
    console.log('Edit plan:', planId);
  };

  const handleNewPlan = () => {
    console.log('Create new plan');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMostrarFiltros = () => {
    console.log('Aplicar filtros:', filtros);
  };

  const handleLimpiarFiltros = () => {
    setFiltros({
      desde: '',
      hasta: '',
      acciones: '',
      origen: '',
      controles: ''
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Realizada':
      case 'Satisfactorio':
        return 'text-green-600';
      case 'Prevista':
      case 'Estimado':
        return 'text-orange-600';
      case 'Aún no realizado':
        return 'text-blue-600';
      case 'No cargado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Planes de acción
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

        {/* Sección de Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="desde">Desde *</Label>
                <div className="relative">
                  <Input
                    id="desde"
                    type="date"
                    value={filtros.desde}
                    onChange={(e) => setFiltros({...filtros, desde: e.target.value})}
                    className="pr-10"
                  />
                  <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hasta">Hasta *</Label>
                <div className="relative">
                  <Input
                    id="hasta"
                    type="date"
                    value={filtros.hasta}
                    onChange={(e) => setFiltros({...filtros, hasta: e.target.value})}
                    className="pr-10"
                  />
                  <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="acciones">Acciones</Label>
                <Select value={filtros.acciones} onValueChange={(value) => setFiltros({...filtros, acciones: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realizadas">Realizadas</SelectItem>
                    <SelectItem value="previstas">Previstas</SelectItem>
                    <SelectItem value="todas">Todas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="origen">Origen</Label>
                <Select value={filtros.origen} onValueChange={(value) => setFiltros({...filtros, origen: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hallazgo">Hallazgo</SelectItem>
                    <SelectItem value="objetivo">Objetivo</SelectItem>
                    <SelectItem value="riesgo">Riesgo</SelectItem>
                    <SelectItem value="revision">Revisión</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="controles">Controles</Label>
                <Select value={filtros.controles} onValueChange={(value) => setFiltros({...filtros, controles: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactorio">Satisfactorio</SelectItem>
                    <SelectItem value="estimado">Estimado</SelectItem>
                    <SelectItem value="no-cargado">No cargado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-4">
              <Button onClick={handleMostrarFiltros} className="bg-green-600 hover:bg-green-700">
                Mostrar
              </Button>
              <Button onClick={handleLimpiarFiltros} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Planes de Acción */}
        <Card>
          <CardContent className="p-6">
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
                <Button onClick={handleNewPlan} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo
                </Button>
                <Input
                  placeholder="Buscar planes de acción..."
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
                      onClick={() => handleSort('fechaCreacion')}
                    >
                      <div className="flex items-center gap-2">
                        Fecha de creación
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('origen')}
                    >
                      <div className="flex items-center gap-2">
                        Origen
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('porcentajeAvance')}
                    >
                      <div className="flex items-center gap-2">
                        % Avance
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead>Detalle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPlanes.map((plan) => (
                    <React.Fragment key={plan.id}>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">
                          {plan.fechaCreacion}
                        </TableCell>
                        <TableCell>
                          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            {plan.origen}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {plan.porcentajeAvance.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-4">
                            {/* Sub-tabla de Acciones */}
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 mb-2">
                                <div className="col-span-1">#</div>
                                <div className="col-span-11">Acción</div>
                              </div>
                              {plan.acciones.map((accion) => (
                                <div key={accion.id} className="grid grid-cols-12 gap-2 text-xs mb-1">
                                  <div className="col-span-1 font-medium">{accion.id}</div>
                                  <div className={`col-span-11 ${getEstadoColor(accion.estado)}`}>
                                    {accion.estado}: {accion.fecha}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Sub-tabla de Controles */}
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 mb-2">
                                <div className="col-span-12">Control</div>
                              </div>
                              {plan.controles.map((control, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 text-xs mb-1">
                                  <div className={`col-span-12 ${getEstadoColor(control.estado)}`}>
                                    {control.estado}{control.fecha ? `: ${control.fecha}` : ''}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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
