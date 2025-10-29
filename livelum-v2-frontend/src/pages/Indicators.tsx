import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Plus, Search, Eye, Edit, Trash2, TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/contexts/ModalContext";

// Mock data
const mockIndicators = [
  {
    id: 1,
    name: "Satisfacción del Cliente",
    code: "IND-001",
    category: "Calidad",
    type: "Porcentaje",
    currentValue: 85,
    targetValue: 90,
    unit: "%",
    trend: "up",
    status: "warning",
    owner: "María García",
    lastUpdate: "2024-01-20",
    frequency: "Mensual"
  },
  {
    id: 2,
    name: "Tiempo de Respuesta",
    code: "IND-002",
    category: "Operaciones",
    type: "Tiempo",
    currentValue: 2.5,
    targetValue: 2.0,
    unit: "horas",
    trend: "down",
    status: "critical",
    owner: "Carlos López",
    lastUpdate: "2024-01-19",
    frequency: "Diario"
  },
  {
    id: 3,
    name: "Eficiencia de Procesos",
    code: "IND-003",
    category: "Productividad",
    type: "Porcentaje",
    currentValue: 92,
    targetValue: 85,
    unit: "%",
    trend: "up",
    status: "good",
    owner: "Ana Martínez",
    lastUpdate: "2024-01-21",
    frequency: "Semanal"
  }
];

const statusMap = {
  good: { label: "Cumple", color: "bg-green-500/10 text-green-700 border-green-200" },
  warning: { label: "Atención", color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  critical: { label: "Crítico", color: "bg-red-500/10 text-red-700 border-red-200" }
};

export default function Indicators() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { open } = useModal('indicator');

  const getProgressValue = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Indicadores de Gestión</h1>
          <p className="text-muted-foreground mt-1">
            Seguimiento y control de indicadores clave de rendimiento
          </p>
        </div>
        <Button className="gap-2" onClick={open}>
          <Plus className="w-4 h-4" />
          Nuevo Indicador
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Indicadores</p>
                <p className="text-2xl font-semibold">32</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cumpliendo Meta</p>
                <p className="text-2xl font-semibold text-green-600">24</p>
              </div>
              <Target className="w-8 h-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Atención</p>
                <p className="text-2xl font-semibold text-yellow-600">6</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Críticos</p>
                <p className="text-2xl font-semibold text-red-600">2</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500/60" />
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
                placeholder="Buscar indicadores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="good">Cumple</SelectItem>
                <SelectItem value="warning">Atención</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
                <SelectItem value="Operaciones">Operaciones</SelectItem>
                <SelectItem value="Productividad">Productividad</SelectItem>
                <SelectItem value="Finanzas">Finanzas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Indicators Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Lista de Indicadores
          </CardTitle>
          <CardDescription>
            Gestiona todos los indicadores de la organización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicador</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Valor Actual</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Tendencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIndicators.map((indicator) => (
                <TableRow key={indicator.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{indicator.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {indicator.code} • {indicator.frequency}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{indicator.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {indicator.currentValue} {indicator.unit}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {indicator.targetValue} {indicator.unit}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{Math.round(getProgressValue(indicator.currentValue, indicator.targetValue))}%</span>
                      </div>
                      <Progress 
                        value={getProgressValue(indicator.currentValue, indicator.targetValue)} 
                        className="h-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTrendIcon(indicator.trend)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusMap[indicator.status as keyof typeof statusMap]?.color}
                    >
                      {statusMap[indicator.status as keyof typeof statusMap]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{indicator.owner}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}