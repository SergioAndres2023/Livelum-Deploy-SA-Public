import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, Search, Eye, Edit, Trash2, Shield, Target, Clock, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/contexts/ModalContext";
import { RisksService } from "@/services/risks";
import { Risk, RiskStats } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const riskLevelMap = {
  BAJO: { label: "Bajo", color: "bg-green-500/10 text-green-700 border-green-200" },
  MEDIO: { label: "Medio", color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  ALTO: { label: "Alto", color: "bg-orange-500/10 text-orange-700 border-orange-200" },
  CRITICO: { label: "Crítico", color: "bg-red-500/10 text-red-700 border-red-200" }
};

const statusMap = {
  ACTIVE: { label: "Activo", color: "bg-red-500/10 text-red-700 border-red-200" },
  MONITORED: { label: "Monitoreado", color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  MITIGATED: { label: "Mitigado", color: "bg-blue-500/10 text-blue-700 border-blue-200" },
  CLOSED: { label: "Cerrado", color: "bg-gray-500/10 text-gray-700 border-gray-200" }
};

const probabilityMap = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta"
};

const impactMap = {
  BAJO: "Bajo",
  MEDIO: "Medio",
  ALTO: "Alto"
};

export default function Risks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskLevelFilter, setRiskLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [risks, setRisks] = useState<Risk[]>([]);
  const [stats, setStats] = useState<RiskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open } = useModal();
  const { toast } = useToast();

  useEffect(() => {
    loadRisks();
    loadStats();
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

  const loadStats = async () => {
    try {
      const response = await RisksService.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleDeleteRisk = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este riesgo?')) return;
    
    try {
      const response = await RisksService.deleteRisk(id);
      if (response.success) {
        toast({
          title: "Éxito",
          description: "Riesgo eliminado correctamente"
        });
        loadRisks();
        loadStats();
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al eliminar riesgo",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error al conectar con el servidor",
        variant: "destructive"
      });
    }
  };

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = riskLevelFilter === "all" || risk.riskLevel === riskLevelFilter;
    const matchesStatus = statusFilter === "all" || risk.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || risk.category === categoryFilter;
    return matchesSearch && matchesRiskLevel && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Riesgos</h1>
          <p className="text-muted-foreground mt-1">
            Identificación, evaluación y control de riesgos organizacionales
          </p>
        </div>
        <Button className="gap-2" onClick={() => open('risk')}>
          <Plus className="w-4 h-4" />
          Nuevo Riesgo
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={loadRisks}>
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Riesgos</p>
                <p className="text-2xl font-semibold">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.total || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Críticos</p>
                <p className="text-2xl font-semibold text-red-600">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.critical || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mitigados</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.mitigated || 0}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-semibold text-orange-600">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.active || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar riesgos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={riskLevelFilter} onValueChange={setRiskLevelFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Nivel de Riesgo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="BAJO">Bajo</SelectItem>
                <SelectItem value="MEDIO">Medio</SelectItem>
                <SelectItem value="ALTO">Alto</SelectItem>
                <SelectItem value="CRITICO">Crítico</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="ACTIVE">Activo</SelectItem>
                <SelectItem value="MONITORED">Monitoreado</SelectItem>
                <SelectItem value="MITIGATED">Mitigado</SelectItem>
                <SelectItem value="CLOSED">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Tecnológico">Tecnológico</SelectItem>
                <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                <SelectItem value="Regulatorio">Regulatorio</SelectItem>
                <SelectItem value="Operacional">Operacional</SelectItem>
                <SelectItem value="Financiero">Financiero</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Risks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Lista de Riesgos
          </CardTitle>
          <CardDescription>
            Gestiona todos los riesgos identificados en la organización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Riesgo</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Probabilidad</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground mt-2">Cargando riesgos...</p>
                  </TableCell>
                </TableRow>
              ) : filteredRisks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No se encontraron riesgos</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRisks.map((risk) => (
                  <TableRow key={risk.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{risk.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {risk.code}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{risk.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        risk.probability === 'ALTA' ? 'bg-red-100 text-red-700' :
                        risk.probability === 'MEDIA' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {probabilityMap[risk.probability as keyof typeof probabilityMap]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        risk.impact === 'ALTO' ? 'bg-red-100 text-red-700' :
                        risk.impact === 'MEDIO' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {impactMap[risk.impact as keyof typeof impactMap]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={riskLevelMap[risk.riskLevel as keyof typeof riskLevelMap]?.color}
                      >
                        {riskLevelMap[risk.riskLevel as keyof typeof riskLevelMap]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusMap[risk.status as keyof typeof statusMap]?.color}
                      >
                        {statusMap[risk.status as keyof typeof statusMap]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell>
                      {risk.dueDate ? (
                        <span className={new Date(risk.dueDate) < new Date() ? "text-red-600" : ""}>
                          {new Date(risk.dueDate).toLocaleDateString('es-ES')}
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteRisk(risk.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}