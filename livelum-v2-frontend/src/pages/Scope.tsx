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
type AlcanceData = {
  id: string;
  fecha: string;
  descripcion: string;
};

// Datos de ejemplo para alcance
const alcanceData: AlcanceData[] = [
  {
    id: '1',
    fecha: '08 de Mayo de 2024',
    descripcion: 'Servicios de muestreo, inspecciones de calidad y cantidad. Servicios de auditorías de primera y segunda parte.'
  },
  {
    id: '2',
    fecha: '15 de Marzo de 2024',
    descripcion: 'Servicios de consultoría en sistemas de gestión de calidad ISO 9001:2015'
  },
  {
    id: '3',
    fecha: '22 de Enero de 2024',
    descripcion: 'Servicios de capacitación y formación en normativas de calidad'
  },
  {
    id: '4',
    fecha: '10 de Diciembre de 2023',
    descripcion: 'Servicios de auditorías internas y externas de procesos organizacionales'
  }
];

export default function Alcance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("fecha");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar alcance
  const getFilteredAndSortedAlcance = () => {
    let filtered = alcanceData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'fecha':
          aValue = new Date(a.fecha.split(' ').slice(-3).join(' ')).getTime();
          bValue = new Date(b.fecha.split(' ').slice(-3).join(' ')).getTime();
          break;
        case 'descripcion':
          aValue = a.descripcion.toLowerCase();
          bValue = b.descripcion.toLowerCase();
          break;
        default:
          aValue = new Date(a.fecha.split(' ').slice(-3).join(' ')).getTime();
          bValue = new Date(b.fecha.split(' ').slice(-3).join(' ')).getTime();
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

  const filteredAlcance = getFilteredAndSortedAlcance();

  // Configuración de columnas para DataTable
  const columns: Column<AlcanceData>[] = [
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      sortable: true,
      render: (alcance) => (
        <div className="max-w-2xl">
          <div className="truncate" title={alcance.descripcion}>
            {alcance.descripcion}
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (alcance) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditAlcance(alcance.id)}
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
  const totalPages = Math.ceil(filteredAlcance.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentAlcance = filteredAlcance.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditAlcance = (alcanceId: string) => {
    // TODO: Implementar edición de alcance
    console.log('Edit alcance:', alcanceId);
  };

  const handleNewAlcance = () => {
    // TODO: Implementar creación de nuevo alcance
    console.log('Create new alcance');
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
              Alcance
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              de la empresa
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
              <Button onClick={handleNewAlcance} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar alcance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentAlcance}
              columns={columns}
              emptyMessage="No se encontraron registros de alcance"
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
