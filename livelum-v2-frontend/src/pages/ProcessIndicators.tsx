import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

// Tipo de datos para la tabla
type IndicadorData = {
  id: string;
  nombre: string;
  descripcion: string;
  formulaCalculo: string;
  frecuenciaMedicion: string;
};

// Datos de ejemplo para indicadores
const indicadoresData: IndicadorData[] = [
  {
    id: '1',
    nombre: 'Cantidad de piezas fabricadas',
    descripcion: 'Cantidad de piezas fabricadas',
    formulaCalculo: 'Cantidad de piezas/Tiempo',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '2',
    nombre: 'Eficacia de las propuestas comerciales',
    descripcion: 'Cantidad de propuestas aprobadas en función de la cantidad de propuestas comerciales emitidas',
    formulaCalculo: 'Propuestas aprobadas/ Propuestas emitidas',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '3',
    nombre: 'Presupuestos ejecutados',
    descripcion: 'Cantidad de presupuestos ejecutados',
    formulaCalculo: 'Listado de presupuestos',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '4',
    nombre: 'Tasa de conversión de presupuestos',
    descripcion: 'Porcentaje de presupuestos que se convierten en proyectos ejecutados',
    formulaCalculo: 'Presupuestos aprobados / Presupuesto emitidos',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '5',
    nombre: 'Tiempo promedio de respuesta',
    descripcion: 'Tiempo promedio desde la recepción de una solicitud hasta su respuesta',
    formulaCalculo: 'Suma de tiempos de respuesta / Número de solicitudes',
    frecuenciaMedicion: 'Semanal'
  },
  {
    id: '6',
    nombre: 'Satisfacción del cliente',
    descripcion: 'Nivel de satisfacción promedio de los clientes con los servicios prestados',
    formulaCalculo: 'Suma de puntuaciones / Número de encuestas',
    frecuenciaMedicion: 'Trimestral'
  },
  {
    id: '7',
    nombre: 'Eficiencia de procesos',
    descripcion: 'Porcentaje de procesos completados sin errores o retrasos',
    formulaCalculo: 'Procesos exitosos / Total de procesos',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '8',
    nombre: 'Costos por proyecto',
    descripcion: 'Costo promedio por proyecto ejecutado',
    formulaCalculo: 'Total de costos / Número de proyectos',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '9',
    nombre: 'Tiempo de entrega',
    descripcion: 'Tiempo promedio desde el inicio hasta la entrega de un proyecto',
    formulaCalculo: 'Suma de tiempos de entrega / Número de proyectos',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '10',
    nombre: 'Capacidad de producción',
    descripcion: 'Cantidad máxima de productos que se pueden fabricar en un período determinado',
    formulaCalculo: 'Recursos disponibles × Tiempo / Tiempo unitario',
    frecuenciaMedicion: 'Mensual'
  },
  {
    id: '11',
    nombre: 'Rotación de personal',
    descripcion: 'Porcentaje de empleados que dejan la empresa en un período determinado',
    formulaCalculo: 'Empleados que salen / Promedio de empleados',
    frecuenciaMedicion: 'Trimestral'
  },
  {
    id: '12',
    nombre: 'Calidad de productos',
    descripcion: 'Porcentaje de productos que cumplen con los estándares de calidad',
    formulaCalculo: 'Productos conformes / Total de productos',
    frecuenciaMedicion: 'Mensual'
  }
];

export default function Indicadores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar indicadores
  const getFilteredAndSortedIndicadores = () => {
    let filtered = indicadoresData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formulaCalculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.frecuenciaMedicion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'nombre':
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
          break;
        case 'descripcion':
          aValue = a.descripcion.toLowerCase();
          bValue = b.descripcion.toLowerCase();
          break;
        case 'formulaCalculo':
          aValue = a.formulaCalculo.toLowerCase();
          bValue = b.formulaCalculo.toLowerCase();
          break;
        case 'frecuenciaMedicion':
          const frecuenciaOrder = { 'Diaria': 1, 'Semanal': 2, 'Mensual': 3, 'Trimestral': 4, 'Anual': 5 };
          aValue = frecuenciaOrder[a.frecuenciaMedicion as keyof typeof frecuenciaOrder] || 0;
          bValue = frecuenciaOrder[b.frecuenciaMedicion as keyof typeof frecuenciaOrder] || 0;
          break;
        default:
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
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

  const filteredIndicadores = getFilteredAndSortedIndicadores();

  // Configuración de columnas para DataTable
  const columns: Column<IndicadorData>[] = [
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true,
      render: (indicador) => (
        <div className="max-w-xs">
          <div className="truncate" title={indicador.nombre}>
            {indicador.nombre}
          </div>
        </div>
      )
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      sortable: true,
      render: (indicador) => (
        <div className="max-w-xs">
          <div className="truncate" title={indicador.descripcion}>
            {indicador.descripcion}
          </div>
        </div>
      )
    },
    {
      key: 'formulaCalculo',
      label: 'Fórmula de cálculo',
      sortable: true,
      render: (indicador) => (
        <div className="max-w-xs">
          <div className="truncate" title={indicador.formulaCalculo}>
            {indicador.formulaCalculo}
          </div>
        </div>
      )
    },
    {
      key: 'frecuenciaMedicion',
      label: 'Frecuencia de medición',
      sortable: true
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (indicador) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditIndicador(indicador.id)}
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
      )
    }
  ];

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredIndicadores.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentIndicadores = filteredIndicadores.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditIndicador = (indicadorId: string) => {
    // TODO: Implementar edición de indicador
    console.log('Edit indicador:', indicadorId);
  };

  const handleNewIndicador = () => {
    // TODO: Implementar creación de nuevo indicador
    console.log('Create new indicador');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              Indicadores
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
              <Button onClick={handleNewIndicador} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar indicadores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentIndicadores}
              columns={columns}
              emptyMessage="No se encontraron indicadores"
              onSort={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
