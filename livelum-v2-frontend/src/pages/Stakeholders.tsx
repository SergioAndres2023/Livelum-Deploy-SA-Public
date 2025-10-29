import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

// Tipo de datos para la tabla
type ParteInteresadaData = {
  id: string;
  numero: number;
  nombre: string;
  tipo: string;
  requisitos: string;
  metodoEvaluacion: string;
};

// Datos de ejemplo para partes interesadas
const partesInteresadasData: ParteInteresadaData[] = [
  {
    id: '49',
    numero: 49,
    nombre: 'Dirección',
    tipo: 'Interna',
    requisitos: 'Aumentar la rentabilidad, crecimiento, cumplimiento de objetivos, posicionamiento de la empresa en el mercado (local y externo) y profesionalización de mandos medios',
    metodoEvaluacion: 'Indicadores de rentabilidad, evaluaciones de desempeño, reuniones periódicas Dirección/Mandos Medios.'
  },
  {
    id: '50',
    numero: 50,
    nombre: 'Personal de la Organización',
    tipo: 'Interna',
    requisitos: 'Remuneración acorde al mercado, ambiente y condiciones de trabajo favorables, reconocimiento y posibilidades de promoción y crecimiento.',
    metodoEvaluacion: 'Benchmarking de otras empresas similares, índice de rotación, horas facturables por mes, brindar capacitaciones.'
  },
  {
    id: '51',
    numero: 51,
    nombre: 'Cámaras',
    tipo: 'Externa',
    requisitos: 'Cumplimientos de acuerdos comerciales y de servicio',
    metodoEvaluacion: 'Seguimiento de actividades'
  },
  {
    id: '52',
    numero: 52,
    nombre: 'PROFESIONALES (consultores)',
    tipo: 'Interna',
    requisitos: 'Financiación y formulación para los proyectos de sus clientes, y ampliar su cartera de servicios',
    metodoEvaluacion: 'Evaluación de proveedores'
  },
  {
    id: '70',
    numero: 70,
    nombre: 'convenios',
    tipo: 'Interna',
    requisitos: 'Según contratos individuales gremio/individual, cumplimiento de los mismos',
    metodoEvaluacion: 'contratos/facturaciones/entrevistas empleados'
  },
  {
    id: '192',
    numero: 192,
    nombre: 'Proveedores',
    tipo: 'Externa',
    requisitos: 'Cumplimiento de especificaciones técnicas, entregas a tiempo y calidad de productos/servicios',
    metodoEvaluacion: 'Evaluación de proveedores, auditorías de calidad, seguimiento de entregas'
  },
  {
    id: '203',
    numero: 203,
    nombre: 'Dirección',
    tipo: 'Interna',
    requisitos: '1- Aumento de la productividad 2- Obtener ganancias',
    metodoEvaluacion: '1- Indicador de productividad 2- Balance'
  }
];

export default function PartesInteresadas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("numero");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar partes interesadas
  const getFilteredAndSortedPartesInteresadas = () => {
    let filtered = partesInteresadasData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requisitos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.metodoEvaluacion.toLowerCase().includes(searchTerm.toLowerCase())
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
        case 'nombre':
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
          break;
        case 'tipo':
          aValue = a.tipo.toLowerCase();
          bValue = b.tipo.toLowerCase();
          break;
        case 'requisitos':
          aValue = a.requisitos.toLowerCase();
          bValue = b.requisitos.toLowerCase();
          break;
        case 'metodoEvaluacion':
          aValue = a.metodoEvaluacion.toLowerCase();
          bValue = b.metodoEvaluacion.toLowerCase();
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

  const filteredPartesInteresadas = getFilteredAndSortedPartesInteresadas();

  // Configuración de columnas para DataTable
  const columns: Column<ParteInteresadaData>[] = [
    {
      key: 'numero',
      label: '#',
      sortable: true
    },
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true
    },
    {
      key: 'tipo',
      label: 'Interna / Externa',
      sortable: true,
      render: (parte) => getTipoBadge(parte.tipo)
    },
    {
      key: 'requisitos',
      label: 'Requisitos',
      sortable: true,
      render: (parte) => (
        <div className="max-w-xs">
          <div className="truncate" title={parte.requisitos}>
            {parte.requisitos}
          </div>
        </div>
      )
    },
    {
      key: 'metodoEvaluacion',
      label: 'Método de evaluación',
      sortable: true,
      render: (parte) => (
        <div className="max-w-xs">
          <div className="truncate" title={parte.metodoEvaluacion}>
            {parte.metodoEvaluacion}
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (parte) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditParteInteresada(parte.id)}
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
  const totalPages = Math.ceil(filteredPartesInteresadas.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentPartesInteresadas = filteredPartesInteresadas.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditParteInteresada = (parteId: string) => {
    // TODO: Implementar edición de parte interesada
    console.log('Edit parte interesada:', parteId);
  };

  const handleNewParteInteresada = () => {
    // TODO: Implementar creación de nueva parte interesada
    console.log('Create new parte interesada');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Interna':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">Interna</Badge>;
      case 'Externa':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Externa</Badge>;
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
              Partes interesadas
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
              <Button onClick={handleNewParteInteresada} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar partes interesadas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentPartesInteresadas}
              columns={columns}
              emptyMessage="No se encontraron partes interesadas"
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
