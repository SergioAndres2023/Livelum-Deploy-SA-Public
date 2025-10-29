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
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Settings
} from "lucide-react";

// Datos de ejemplo para onboardings
const onboardingsData = [
  {
    id: 1,
    pagina: "habilidad > ABM de Habilidades"
  },
  {
    id: 2,
    pagina: "procesostipo > ABM de Tipo de Procesos"
  },
  {
    id: 3,
    pagina: "procesoscaracterizacion > ABM de Caracterización de Procesos"
  },
  {
    id: 4,
    pagina: "procesosmapa > Mapa de Procesos"
  },
  {
    id: 5,
    pagina: "partesinteresadas_listado > Listado de Partes Interesadas"
  },
  {
    id: 6,
    pagina: "foda_listado > Listado de FODA"
  },
  {
    id: 7,
    pagina: "perfil_empleado > ABM de Perfil de Puesto"
  },
  {
    id: 8,
    pagina: "empleado > Alta y Modificación de Empleado"
  },
  {
    id: 9,
    pagina: "procesofichaconfig > Configuración de ficha de proceso"
  },
  {
    id: 10,
    pagina: "procesosficha > ABM de Ficha de Proceso"
  },
  {
    id: 11,
    pagina: "hallazgo > ABM de Hallazgo"
  },
  {
    id: 12,
    pagina: "procesosauditoria > ABM de Auditoría de Procesos"
  },
  {
    id: 13,
    pagina: "riesgosoportunidades_listado > Listado de Riesgos y Oportunidades"
  },
  {
    id: 14,
    pagina: "objetivos_listado > Listado de Objetivos"
  },
  {
    id: 15,
    pagina: "revisiondireccion_listado > Listado de Revisión de Dirección"
  },
  {
    id: 16,
    pagina: "indicadores_listado > Listado de Indicadores"
  },
  {
    id: 17,
    pagina: "bibliotecadocumentos_listado > Listado de Biblioteca de Documentos"
  },
  {
    id: 18,
    pagina: "proveedores_listado > Listado de Proveedores"
  },
  {
    id: 19,
    pagina: "equipossistemas_listado > Listado de Equipos y Sistemas"
  },
  {
    id: 20,
    pagina: "planesaccion_listado > Listado de Planes de Acción"
  }
];

export default function OnboardingsListado() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar onboardings
  const getFilteredAndSortedOnboardings = () => {
    let filtered = onboardingsData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.pagina.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'pagina':
          aValue = a.pagina.toLowerCase();
          bValue = b.pagina.toLowerCase();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const aStr = String(aValue);
        const bStr = String(bValue);
        return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      }
    });

    return filtered;
  };

  const filteredOnboardings = getFilteredAndSortedOnboardings();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredOnboardings.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentOnboardings = filteredOnboardings.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditOnboarding = (onboardingId: number) => {
    console.log('Edit onboarding:', onboardingId);
  };

  const handleNewOnboarding = () => {
    console.log('Create new onboarding');
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
              Onboardings listado
            </h1>
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
            {/* Botón Nuevo */}
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <Button onClick={handleNewOnboarding} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo
              </Button>
            </div>

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
                <Label htmlFor="search" className="text-sm font-medium">
                  Buscar
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar onboardings..."
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
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center gap-2">
                        #
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('pagina')}
                    >
                      <div className="flex items-center gap-2">
                        Página
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOnboardings.map((onboarding) => (
                    <TableRow key={onboarding.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {onboarding.id}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {onboarding.pagina}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditOnboarding(onboarding.id)}
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
