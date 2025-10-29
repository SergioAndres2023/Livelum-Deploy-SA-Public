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
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  BookOpen
} from "lucide-react";

// Datos de ejemplo para análisis de contexto
const analisisContextoData = [
  {
    id: '1',
    tipo: 'Amenaza',
    cuestion: 'Plazos administrativos extensos para la validación de los programas de financiación',
    justificacion: 'Pérdida de valor del dinero',
    fechaVigencia: '01-01-2026',
    impacto: 'Alto'
  },
  {
    id: '2',
    tipo: 'Amenaza',
    cuestion: 'Tipo Cambio',
    justificacion: 'Variaciones en el tipo de cambio afectan la rentabilidad de proyectos',
    fechaVigencia: '06-06-2024',
    impacto: 'Alto'
  },
  {
    id: '3',
    tipo: 'Amenaza',
    cuestion: 'Riesgo de producto no conforme',
    justificacion: 'Posibles desviaciones en los procesos de calidad',
    fechaVigencia: '07-08-2024',
    impacto: 'Alto'
  },
  {
    id: '4',
    tipo: 'Debilidad',
    cuestion: 'Falta de recursos con experiencia (Formuladores)',
    justificacion: 'No contamos con un sólido proceso de selección de profesionales',
    fechaVigencia: '01-01-2026',
    impacto: 'Alto'
  },
  {
    id: '5',
    tipo: 'Debilidad',
    cuestion: 'Falta de plan de formación interna',
    justificacion: 'No contamos con un plan formal de capacitación en función de las necesidades',
    fechaVigencia: '01-01-2026',
    impacto: 'Medio'
  },
  {
    id: '6',
    tipo: 'Fortaleza',
    cuestion: 'Capacitación del personal',
    justificacion: 'El personal se encuentra altamente calificado en tareas operativas',
    fechaVigencia: '01-01-2026',
    impacto: 'Alto'
  },
  {
    id: '7',
    tipo: 'Fortaleza',
    cuestion: 'Vínculo Estratégico con cámaras y profesionales',
    justificacion: 'Hemos firmado convenios diversos con diversas cámaras empresariales',
    fechaVigencia: '01-01-2026',
    impacto: 'Alto'
  },
  {
    id: '8',
    tipo: 'Fortaleza',
    cuestion: 'Cambio de software de gestión',
    justificacion: 'Se llevan a cabo todas las gestiones en la nube y se dejó de imprimir y consumir papel',
    fechaVigencia: '31-01-2025',
    impacto: 'Alto'
  },
  {
    id: '9',
    tipo: 'Oportunidad',
    cuestion: 'Políticas estratégicas sectoriales - Refuerzo de líneas de financiación',
    justificacion: 'Existen varias líneas de financiación disponibles',
    fechaVigencia: '01-01-2026',
    impacto: 'Alto'
  }
];

export default function AnalisisContexto() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("tipo");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Definición de columnas para la tabla
  const columns: Column<any>[] = [
    {
      key: 'tipo',
      label: 'Tipo',
      sortable: true,
      render: (value) => (
        <StatusBadge 
          status={value} 
          variant={value === 'Amenaza' ? 'destructive' : 'secondary'} 
        />
      )
    },
    {
      key: 'cuestion',
      label: 'Cuestión',
      sortable: true,
      className: 'max-w-md'
    },
    {
      key: 'justificacion',
      label: 'Justificación',
      sortable: true,
      className: 'max-w-md'
    },
    {
      key: 'fechaVigencia',
      label: 'Fecha vigencia',
      sortable: true,
      centered: true
    },
    {
      key: 'impacto',
      label: 'Impacto',
      sortable: true,
      centered: true,
      render: (value) => (
        <StatusBadge 
          status={value} 
          variant={value === 'Alto' ? 'destructive' : value === 'Medio' ? 'outline' : 'secondary'} 
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

  // Función para filtrar y ordenar análisis
  const getFilteredAndSortedAnalisis = () => {
    let filtered = analisisContextoData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cuestion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.justificacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'tipo':
          aValue = a.tipo.toLowerCase();
          bValue = b.tipo.toLowerCase();
          break;
        case 'cuestion':
          aValue = a.cuestion.toLowerCase();
          bValue = b.cuestion.toLowerCase();
          break;
        case 'justificacion':
          aValue = a.justificacion.toLowerCase();
          bValue = b.justificacion.toLowerCase();
          break;
        case 'fechaVigencia':
          aValue = new Date(a.fechaVigencia.split('-').reverse().join('-')).getTime();
          bValue = new Date(b.fechaVigencia.split('-').reverse().join('-')).getTime();
          break;
        case 'impacto':
          const impactoOrder = { 'Alto': 3, 'Medio': 2, 'Bajo': 1 };
          aValue = impactoOrder[a.impacto as keyof typeof impactoOrder] || 0;
          bValue = impactoOrder[b.impacto as keyof typeof impactoOrder] || 0;
          break;
        default:
          aValue = a.tipo.toLowerCase();
          bValue = b.tipo.toLowerCase();
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

  const filteredAnalisis = getFilteredAndSortedAnalisis();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredAnalisis.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentAnalisis = filteredAnalisis.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditAnalisis = (analisisId: string) => {
    // TODO: Implementar edición de análisis
    console.log('Edit análisis:', analisisId);
  };

  const handleNewAnalisis = () => {
    // TODO: Implementar creación de nuevo análisis
    console.log('Create new análisis');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Fortaleza':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Fortaleza</Badge>;
      case 'Debilidad':
        return <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">Debilidad</Badge>;
      case 'Oportunidad':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">Oportunidad</Badge>;
      case 'Amenaza':
        return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">Amenaza</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getImpactoBadge = (impacto: string) => {
    switch (impacto) {
      case 'Alto':
        return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">Alto</Badge>;
      case 'Medio':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">Medio</Badge>;
      case 'Bajo':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Bajo</Badge>;
      default:
        return <Badge variant="outline">{impacto}</Badge>;
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Análisis de contexto
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
              title="Documentación"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Controles superiores */}
            <div className="flex items-center justify-end mb-6">
              <Button onClick={handleNewAnalisis} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar análisis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Tabla */}
            <DataTable
              data={currentAnalisis}
              columns={columns}
              emptyMessage="No se encontraron análisis de contexto"
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
