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
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from "lucide-react";

// Tipo de datos para la tabla
type MinutaData = {
  id: string;
  fecha: string;
  titulo: string;
  participantes: string;
};

// Datos de ejemplo para minutas (7 registros)
const minutasData: MinutaData[] = [
  {
    id: '1',
    fecha: '15/12/2024',
    titulo: 'Reunión de Comité de Dirección - Diciembre 2024',
    participantes: 'Juan Pérez, María González, Carlos Rodríguez, Ana Martínez'
  },
  {
    id: '2',
    fecha: '12/12/2024',
    titulo: 'Revisión de Procesos de Calidad Q4',
    participantes: 'Laura Sánchez, Pedro Fernández, Carmen López'
  },
  {
    id: '3',
    fecha: '10/12/2024',
    titulo: 'Análisis de Riesgos Operacionales',
    participantes: 'Miguel Torres, Elena Ruiz, Roberto Díaz, Isabel Moreno'
  },
  {
    id: '4',
    fecha: '08/12/2024',
    titulo: 'Evaluación de Proveedores 2024',
    participantes: 'David Jiménez, Sofía Herrera, Andrés Castro'
  },
  {
    id: '5',
    fecha: '05/12/2024',
    titulo: 'Revisión de Objetivos Estratégicos',
    participantes: 'Patricia Vega, Fernando Ramos, Lucía Morales, Jorge Silva'
  },
  {
    id: '6',
    fecha: '03/12/2024',
    titulo: 'Auditoría Interna - Resultados',
    participantes: 'Rosa Aguilar, Manuel Delgado, Cristina Navarro'
  },
  {
    id: '7',
    fecha: '01/12/2024',
    titulo: 'Planificación de Recursos Humanos 2025',
    participantes: 'Alejandro Vargas, Beatriz Romero, Sergio Medina, Teresa Campos'
  }
];

export default function Minutas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("fecha");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar minutas
  const getFilteredAndSortedMinutas = () => {
    let filtered = minutasData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.participantes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fecha.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'fecha':
          // Convertir fecha DD/MM/YYYY a formato comparable
          const aDate = new Date(a.fecha.split('/').reverse().join('-')).getTime();
          const bDate = new Date(b.fecha.split('/').reverse().join('-')).getTime();
          aValue = aDate;
          bValue = bDate;
          break;
        case 'titulo':
          aValue = a.titulo.toLowerCase();
          bValue = b.titulo.toLowerCase();
          break;
        case 'participantes':
          aValue = a.participantes.toLowerCase();
          bValue = b.participantes.toLowerCase();
          break;
        default:
          aValue = a.fecha;
          bValue = b.fecha;
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

  const filteredMinutas = getFilteredAndSortedMinutas();

  // Configuración de columnas para DataTable
  const columns: Column<MinutaData>[] = [
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true
    },
    {
      key: 'titulo',
      label: 'Título',
      sortable: true
    },
    {
      key: 'participantes',
      label: 'Participantes',
      sortable: true
    }
  ];

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredMinutas.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentMinutas = filteredMinutas.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditMinuta = (minutaId: string) => {
    console.log('Edit minuta:', minutaId);
  };

  const handleNewMinuta = () => {
    console.log('Create new minuta');
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
              Minutas
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
                <Button onClick={handleNewMinuta} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo
                </Button>
                <Input
                  placeholder="Buscar minutas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentMinutas}
              columns={columns}
              emptyMessage="No se encontraron minutas"
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
