import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { 
  Plus, 
  Edit,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Calendar,
  RefreshCw
} from "lucide-react";

// Datos de ejemplo para hallazgos
const hallazgosData = [
  {
    id: '1',
    deteccion: '13-12-2011',
    resumen: 'Resumen de detalle',
    proceso: 'Comunicación institucional',
    version: 'v.1',
    modificadoHace: '1 año',
    emision: '13/11/2022',
    origen: 'Reclamo de cliente',
    tipo: 'Oportunidad de mejora',
    accionesContencion: 1,
    analisisCausas: '12/03/2012',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '12/03/2012' },
      { id: 2, estado: 'Realizada', fecha: '12/03/2012' },
      { id: 3, estado: 'Prevista', fecha: '03/04/2024' }
    ],
    controles: [
      { estimado: '12/03/2012' },
      { estado: 'Aún no realizado', fecha: '12/03/2012' },
      { estado: 'No cargado' }
    ]
  },
  {
    id: '2',
    deteccion: '12-03-2012',
    resumen: 'bla bla',
    proceso: 'Dirección estratégica',
    version: 'v.1',
    modificadoHace: '1 año',
    emision: '13/11/2022',
    origen: 'Reclamo de cliente',
    tipo: 'Oportunidad de mejora',
    accionesContencion: 1,
    analisisCausas: '12/03/2012',
    acciones: [
      { id: 1, estado: 'Realizada', fecha: '12/03/2012' },
      { id: 2, estado: 'Realizada', fecha: '12/03/2012' },
      { id: 3, estado: 'Prevista', fecha: '03/04/2024' }
    ],
    controles: [
      { estimado: '12/03/2012' },
      { estado: 'Aún no realizado', fecha: '12/03/2012' },
      { estado: 'No cargado' }
    ]
  }
];

export default function HallazgosListado() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estados para filtros
  const [filtros, setFiltros] = useState({
    deteccionDesde: '',
    deteccionHasta: '',
    origen: '',
    tipo: '',
    accionesContencion: '',
    analisisCausas: '',
    acciones: '',
    controles: ''
  });

  // Definición de columnas para la tabla
  const columns: Column<any>[] = [
    {
      key: 'id',
      label: '#',
      centered: true,
      className: 'w-16'
    },
    {
      key: 'deteccion',
      label: 'Detección',
      sortable: true,
      centered: true
    },
    {
      key: 'resumen',
      label: 'Resumen',
      sortable: true,
      className: 'max-w-md'
    },
    {
      key: 'acciones',
      label: 'Acciones',
      sortable: true,
      className: 'max-w-xs'
    },
    {
      key: 'control',
      label: 'Control',
      sortable: true,
      className: 'max-w-xs'
    },
    {
      key: 'acciones_buttons',
      label: 'Acciones',
      centered: true,
      render: () => (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Función para filtrar hallazgos
  const getFilteredHallazgos = () => {
    let filtered = hallazgosData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.resumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.proceso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredHallazgos = getFilteredHallazgos();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredHallazgos.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentHallazgos = filteredHallazgos.slice(startIndex, endIndex);

  const handleNewHallazgo = () => {
    console.log('Create new hallazgo');
  };

  const handleEditHallazgo = (hallazgoId: string) => {
    console.log('Edit hallazgo:', hallazgoId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMostrarFiltros = () => {
    console.log('Mostrar filtros');
  };

  const handleLimpiarFiltros = () => {
    setFiltros({
      deteccionDesde: '',
      deteccionHasta: '',
      origen: '',
      tipo: '',
      accionesContencion: '',
      analisisCausas: '',
      acciones: '',
      controles: ''
    });
  };

  const handleDescargarReporte = () => {
    console.log('Descargar reporte');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Hallazgos
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
              title="Filtros"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="deteccion-desde">Detección desde</Label>
                <Input
                  id="deteccion-desde"
                  type="date"
                  value={filtros.deteccionDesde}
                  onChange={(e) => setFiltros({...filtros, deteccionDesde: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="deteccion-hasta">Detección hasta</Label>
                <Input
                  id="deteccion-hasta"
                  type="date"
                  value={filtros.deteccionHasta}
                  onChange={(e) => setFiltros({...filtros, deteccionHasta: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="origen">Origen</Label>
                <Select value={filtros.origen} onValueChange={(value) => setFiltros({...filtros, origen: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar origen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reclamo">Reclamo de cliente</SelectItem>
                    <SelectItem value="auditoria">Auditoría</SelectItem>
                    <SelectItem value="inspeccion">Inspección</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={filtros.tipo} onValueChange={(value) => setFiltros({...filtros, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oportunidad">Oportunidad de mejora</SelectItem>
                    <SelectItem value="no-conformidad">No conformidad</SelectItem>
                    <SelectItem value="observacion">Observación</SelectItem>
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
              <Button onClick={handleDescargarReporte} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Descargar reporte
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Hallazgos */}
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
                <Button onClick={handleNewHallazgo} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo
                </Button>
                <Input
                  placeholder="Buscar hallazgos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentHallazgos}
              columns={columns}
              emptyMessage="No se encontraron hallazgos"
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
