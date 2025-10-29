import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, StatusBadge, ValueBadge, Column } from "@/components/ui/DataTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Loader2
} from "lucide-react";
import { RisksService } from "@/services/risks";
import { Risk } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

// Función para calcular el valor de riesgo (probabilidad * impacto)
const calculateRiskValue = (probability: string, impact: string): number => {
  const probValues = { 'BAJA': 1, 'MEDIA': 2, 'ALTA': 3 };
  const impactValues = { 'BAJO': 1, 'MEDIO': 2, 'ALTO': 3 };
  
  const probValue = probValues[probability as keyof typeof probValues] || 1;
  const impactValue = impactValues[impact as keyof typeof impactValues] || 1;
  
  return probValue * impactValue;
};

// Función para determinar la valoración basada en el valor
const getRiskAssessment = (value: number): string => {
  if (value >= 6) return 'CONSIDERABLE';
  if (value >= 4) return 'MEDIO';
  if (value >= 2) return 'ACEPTABLE';
  return 'BAJO';
};

// Tipo para los datos de la tabla
type TableData = {
  id: string;
  descripcion: string;
  partesInteresadas: string;
  tipo: string;
  origen: string;
  probabilidad: number;
  impacto: number;
  valor: number;
  valoracion: string;
  procesosAsociados: string;
  acciones_buttons?: any; // Columna de acciones (opcional)
};

export default function RiesgosOportunidades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState<string>("valor");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Cargar datos de la API
  useEffect(() => {
    loadRisks();
  }, []);

  const loadRisks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await RisksService.getRisks({
        page: 1,
        limit: 100,
        sortBy: 'riskLevel',
        sortOrder: 'desc'
      });

      if (response.success && response.data) {
        setRisks(response.data);
      } else {
        setError(response.message || 'Error al cargar riesgos');
      }
    } catch (err) {
      const errorMsg = 'Error al conectar con el servidor';
      setError(errorMsg);
      console.error('Error loading risks:', err);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para mapear el status a tipo de riesgo/oportunidad
  const mapStatusToType = (status: string): string => {
    switch (status) {
      case 'ACTIVE': return 'Riesgo';
      case 'MONITORED': return 'Riesgo';
      case 'MITIGATED': return 'Oportunidad';
      default: return 'Riesgo';
    }
  };

  // Función para mapear la categoría a interno/externo
  const mapCategoryToOrigin = (category: string): string => {
    const internalCategories = ['OPERACIONAL', 'TECNOLOGICO', 'RECURSOS_HUMANOS', 'SEGURIDAD'];
    return internalCategories.includes(category) ? 'Interno' : 'Externo';
  };

  // Definición de columnas para la tabla
  const columns: Column<TableData>[] = [
    {
      key: 'descripcion',
      label: 'Descripción / Suceso',
      sortable: true,
      className: 'max-w-xs'
    },
    {
      key: 'partesInteresadas',
      label: 'Partes interesadas',
      sortable: true,
      className: 'max-w-xs'
    },
    {
      key: 'tipo',
      label: 'Riesgo / Oportunidad',
      sortable: true,
      centered: true,
      render: (item) => <StatusBadge status={item.tipo} />
    },
    {
      key: 'origen',
      label: 'Interno / Externo',
      sortable: true,
      centered: true,
      render: (item) => <StatusBadge status={item.origen} variant="outline" />
    },
    {
      key: 'probabilidad',
      label: 'Probabilidad',
      sortable: true,
      centered: true
    },
    {
      key: 'impacto',
      label: 'Impacto',
      sortable: true,
      centered: true
    },
    {
      key: 'valor',
      label: 'Valor',
      sortable: true,
      centered: true,
      render: (item) => <ValueBadge value={item.valor} type="value" />
    },
    {
      key: 'valoracion',
      label: 'Valoración',
      sortable: true,
      centered: true,
      render: (item) => <ValueBadge value={item.valor} type="assessment" />
    },
    {
      key: 'procesosAsociados',
      label: 'Procesos asociados',
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
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Función para filtrar y ordenar riesgos y oportunidades
  const getFilteredAndSortedRiesgosOportunidades = () => {
    let filtered = risks.map(risk => ({
      id: risk.id,
      descripcion: risk.title,
      partesInteresadas: risk.owner,
      tipo: mapStatusToType(risk.status),
      origen: mapCategoryToOrigin(risk.category),
      probabilidad: risk.probability === 'BAJA' ? 1 : risk.probability === 'MEDIA' ? 2 : 3,
      impacto: risk.impact === 'BAJO' ? 1 : risk.impact === 'MEDIO' ? 2 : 3,
      valor: calculateRiskValue(risk.probability, risk.impact),
      valoracion: getRiskAssessment(calculateRiskValue(risk.probability, risk.impact)),
      procesosAsociados: risk.category
    }));

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.partesInteresadas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.valoracion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.procesosAsociados.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'descripcion':
          aValue = a.descripcion.toLowerCase();
          bValue = b.descripcion.toLowerCase();
          break;
        case 'partesInteresadas':
          aValue = a.partesInteresadas.toLowerCase();
          bValue = b.partesInteresadas.toLowerCase();
          break;
        case 'tipo':
          aValue = a.tipo.toLowerCase();
          bValue = b.tipo.toLowerCase();
          break;
        case 'origen':
          aValue = a.origen.toLowerCase();
          bValue = b.origen.toLowerCase();
          break;
        case 'probabilidad':
          aValue = a.probabilidad;
          bValue = b.probabilidad;
          break;
        case 'impacto':
          aValue = a.impacto;
          bValue = b.impacto;
          break;
        case 'valor':
          aValue = a.valor;
          bValue = b.valor;
          break;
        case 'valoracion':
          const valoracionOrder = { 'CONSIDERABLE': 4, 'MEDIO': 3, 'ACEPTABLE': 2, 'BAJO': 1 };
          aValue = valoracionOrder[a.valoracion as keyof typeof valoracionOrder] || 0;
          bValue = valoracionOrder[b.valoracion as keyof typeof valoracionOrder] || 0;
          break;
        default:
          aValue = a.valor;
          bValue = b.valor;
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

  const filteredRiesgosOportunidades = getFilteredAndSortedRiesgosOportunidades();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredRiesgosOportunidades.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentRiesgosOportunidades = filteredRiesgosOportunidades.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditRiesgoOportunidad = (riesgoId: string) => {
    // TODO: Implementar edición de riesgo/oportunidad
    console.log('Edit riesgo/oportunidad:', riesgoId);
  };

  const handleNewRiesgoOportunidad = () => {
    // TODO: Implementar creación de nuevo riesgo/oportunidad
    console.log('Create new riesgo/oportunidad');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Riesgo':
        return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">Riesgo</Badge>;
      case 'Oportunidad':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Oportunidad</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getOrigenBadge = (origen: string) => {
    switch (origen) {
      case 'Interno':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">Interno</Badge>;
      case 'Externo':
        return <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">Externo</Badge>;
      default:
        return <Badge variant="outline">{origen}</Badge>;
    }
  };

  const getValorBadge = (valor: number) => {
    if (valor >= 15) {
      return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">{valor}</Badge>;
    } else if (valor >= 6) {
      return <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">{valor}</Badge>;
    } else {
      return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">{valor}</Badge>;
    }
  };

  const getValoracionBadge = (valoracion: string) => {
    switch (valoracion) {
      case 'CONSIDERABLE':
        return <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">CONSIDERABLE</Badge>;
      case 'MEDIO':
        return <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">MEDIO</Badge>;
      case 'ACEPTABLE':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">ACEPTABLE</Badge>;
      case 'BAJO':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">BAJO</Badge>;
      default:
        return <Badge variant="outline">{valoracion}</Badge>;
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Riesgos / Oportunidades
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
              title="Ver"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Controles superiores */}
            <div className="flex items-center justify-end mb-6">
              <Button onClick={handleNewRiesgoOportunidad} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar riesgos/oportunidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-red-600">⚠</div>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={loadRisks}>
                    Reintentar
                  </Button>
                </div>
              </div>
            )}

            {/* Tabla */}
            <DataTable
              data={currentRiesgosOportunidades}
              columns={columns}
              loading={loading}
              emptyMessage="No se encontraron riesgos"
              onSort={handleSort}
              sortBy={sortBy as any}
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
