import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Settings, Plus, Search, Eye, Edit, Trash2, Users, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/contexts/ModalContext";

// Mock data
const mockProcesses = [
  {
    id: 1,
    name: "Gestión de Personal",
    code: "GP-001",
    category: "Recursos Humanos",
    status: "active",
    owner: "María García",
    progress: 85,
    lastReview: "2024-01-15",
    nextReview: "2024-04-15",
    risk: "low"
  },
  {
    id: 2,
    name: "Compras y Adquisiciones",
    code: "CA-001",
    category: "Operaciones",
    status: "review",
    owner: "Carlos López",
    progress: 65,
    lastReview: "2024-01-10",
    nextReview: "2024-03-10",
    risk: "medium"
  },
  {
    id: 3,
    name: "Control de Calidad",
    code: "CC-001",
    category: "Calidad",
    status: "inactive",
    owner: "Ana Martínez",
    progress: 40,
    lastReview: "2023-12-20",
    nextReview: "2024-02-20",
    risk: "high"
  }
];

const statusMap = {
  active: { label: "Activo", color: "bg-green-500/10 text-green-700 border-green-200" },
  review: { label: "En Revisión", color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  inactive: { label: "Inactivo", color: "bg-gray-500/10 text-gray-700 border-gray-200" }
};

const riskMap = {
  low: { label: "Bajo", color: "text-green-600" },
  medium: { label: "Medio", color: "text-yellow-600" },
  high: { label: "Alto", color: "text-red-600" }
};

export default function Processes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { open } = useModal('process');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Procesos</h1>
          <p className="text-muted-foreground mt-1">
            Control y optimización de procesos organizacionales
          </p>
        </div>
        <Button className="gap-2" onClick={open}>
          <Plus className="w-4 h-4" />
          Nuevo Proceso
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Procesos</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
              <Settings className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-semibold text-green-600">18</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Revisión</p>
                <p className="text-2xl font-semibold text-yellow-600">4</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alto Riesgo</p>
                <p className="text-2xl font-semibold text-red-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500/60" />
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
                placeholder="Buscar procesos..."
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
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="review">En Revisión</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                <SelectItem value="Operaciones">Operaciones</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
                <SelectItem value="Finanzas">Finanzas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Processes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Lista de Procesos
          </CardTitle>
          <CardDescription>
            Gestiona todos los procesos de la organización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proceso</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Riesgo</TableHead>
                <TableHead>Próxima Revisión</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{process.name}</div>
                      <div className="text-sm text-muted-foreground">{process.code}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{process.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusMap[process.status as keyof typeof statusMap]?.color}
                    >
                      {statusMap[process.status as keyof typeof statusMap]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {process.owner}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{process.progress}%</span>
                      </div>
                      <Progress value={process.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={riskMap[process.risk as keyof typeof riskMap]?.color}>
                      {riskMap[process.risk as keyof typeof riskMap]?.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={process.nextReview < "2024-03-01" ? "text-red-600" : ""}>
                      {process.nextReview}
                    </span>
                  </TableCell>
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