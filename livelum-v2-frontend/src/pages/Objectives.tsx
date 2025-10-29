import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Search, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  Calendar as CalendarLucide
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";

const mockObjectives = [
  {
    id: "1",
    title: "Reducir tiempo de respuesta al cliente",
    description: "Mejorar el tiempo promedio de respuesta a consultas de clientes",
    targetValue: 24,
    currentValue: 18,
    unit: "horas",
    startDate: "2024-01-01",
    targetDate: "2024-12-31",
    status: "active",
    indicatorId: "ind-001",
    indicatorName: "Tiempo promedio de respuesta",
    responsibleUser: "María García",
    progress: 75,
    comments: [
      {
        id: "c1",
        text: "Implementamos nuevo sistema de tickets",
        actionRequired: true,
        actionDescription: "Capacitar equipo en nuevo sistema",
        actionDueDate: "2024-02-15",
        actionStatus: "in_progress",
        createdBy: "Juan Pérez",
        createdAt: "2024-01-15"
      }
    ]
  },
  {
    id: "2",
    title: "Aumentar satisfacción del cliente",
    description: "Incrementar el índice de satisfacción medido trimestralmente",
    targetValue: 90,
    currentValue: 85,
    unit: "%",
    startDate: "2024-01-01",
    targetDate: "2024-12-31",
    status: "active",
    indicatorId: "ind-002",
    indicatorName: "Índice de satisfacción",
    responsibleUser: "Carlos López",
    progress: 94,
    comments: []
  }
];

const statusMap = {
  active: { label: "Activo", className: "bg-success text-success-foreground" },
  completed: { label: "Completado", className: "bg-primary text-primary-foreground" },
  paused: { label: "Pausado", className: "bg-warning text-warning-foreground" },
  cancelled: { label: "Cancelado", className: "bg-destructive text-destructive-foreground" }
};

const actionStatusMap = {
  pending: { label: "Pendiente", className: "bg-warning text-warning-foreground" },
  in_progress: { label: "En Progreso", className: "bg-primary text-primary-foreground" },
  completed: { label: "Completada", className: "bg-success text-success-foreground" },
  cancelled: { label: "Cancelada", className: "bg-destructive text-destructive-foreground" }
};

export default function Objectives() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedObjective, setSelectedObjective] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [newAction, setNewAction] = useState("");
  const [actionDueDate, setActionDueDate] = useState<Date>();
  const { open } = useModal('objective');

  const filteredObjectives = mockObjectives.filter(objective => {
    const matchesSearch = objective.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         objective.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || objective.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProgressValue = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seguimiento de Objetivos</h1>
          <p className="text-muted-foreground">Gestiona objetivos con trazabilidad completa e indicadores vinculados</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80" onClick={open}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Objetivo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Objetivos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Objetivos definidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">8</div>
            <p className="text-xs text-muted-foreground">67% del total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground">25% del total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requieren Atención</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-xs text-muted-foreground">Con acciones pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar objetivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Objectives Table */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Objetivo</TableHead>
                <TableHead>Target/Actual</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Indicador</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredObjectives.map((objective) => (
                <TableRow key={objective.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{objective.title}</div>
                      <div className="text-sm text-muted-foreground">{objective.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{objective.currentValue} / {objective.targetValue} {objective.unit}</div>
                      <Progress value={getProgressValue(objective.currentValue, objective.targetValue)} className="w-16 h-2 mt-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={objective.progress} className="w-20" />
                      <span className="text-sm font-medium">{objective.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{objective.indicatorName}</div>
                      <div className="text-muted-foreground">{objective.indicatorId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusMap[objective.status as keyof typeof statusMap].className}>
                      {statusMap[objective.status as keyof typeof statusMap].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{objective.responsibleUser}</TableCell>
                  <TableCell>{format(new Date(objective.targetDate), "dd/MM/yyyy", { locale: es })}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedObjective(objective)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Trazabilidad del Objetivo: {objective.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Objective Details */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Detalles del Objetivo</h4>
                                <div className="space-y-2 text-sm">
                                  <div><span className="font-medium">Descripción:</span> {objective.description}</div>
                                  <div><span className="font-medium">Valor Actual:</span> {objective.currentValue} {objective.unit}</div>
                                  <div><span className="font-medium">Valor Meta:</span> {objective.targetValue} {objective.unit}</div>
                                  <div><span className="font-medium">Responsable:</span> {objective.responsibleUser}</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Indicador Vinculado</h4>
                                <div className="space-y-2 text-sm">
                                  <div><span className="font-medium">Nombre:</span> {objective.indicatorName}</div>
                                  <div><span className="font-medium">ID:</span> {objective.indicatorId}</div>
                                  <div><span className="font-medium">Progreso:</span> {objective.progress}%</div>
                                </div>
                              </div>
                            </div>

                            {/* Comments and Actions */}
                            <div>
                              <h4 className="font-semibold mb-4">Comentarios y Acciones</h4>
                              <div className="space-y-4">
                                {objective.comments.map((comment: any) => (
                                  <Card key={comment.id} className="p-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{comment.createdBy}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm", { locale: es })}
                                        </span>
                                      </div>
                                      <p className="text-sm">{comment.text}</p>
                                      {comment.actionRequired && (
                                        <div className="mt-3 p-3 border rounded-lg bg-muted/50">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Acción Requerida</span>
                                            <Badge className={actionStatusMap[comment.actionStatus as keyof typeof actionStatusMap].className}>
                                              {actionStatusMap[comment.actionStatus as keyof typeof actionStatusMap].label}
                                            </Badge>
                                          </div>
                                          <p className="text-sm">{comment.actionDescription}</p>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            Fecha límite: {format(new Date(comment.actionDueDate), "dd/MM/yyyy", { locale: es })}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </Card>
                                ))}

                                {/* Add New Comment */}
                                <Card className="p-4">
                                  <h5 className="font-medium mb-3">Agregar Comentario</h5>
                                  <div className="space-y-3">
                                    <Textarea
                                      placeholder="Escribir comentario..."
                                      value={newComment}
                                      onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    
                                    <div className="border-t pt-3">
                                      <label className="flex items-center space-x-2 mb-3">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm">Requiere acción</span>
                                      </label>
                                      
                                      <div className="space-y-2">
                                        <Textarea
                                          placeholder="Descripción de la acción..."
                                          value={newAction}
                                          onChange={(e) => setNewAction(e.target.value)}
                                        />
                                        
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button
                                              variant="outline"
                                              className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !actionDueDate && "text-muted-foreground"
                                              )}
                                            >
                                              <CalendarLucide className="mr-2 h-4 w-4" />
                                              {actionDueDate ? format(actionDueDate, "PPP", { locale: es }) : "Fecha límite acción"}
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0">
                                            <Calendar
                                              mode="single"
                                              selected={actionDueDate}
                                              onSelect={setActionDueDate}
                                              initialFocus
                                            />
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                    </div>
                                    
                                    <Button className="w-full">
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Agregar Comentario
                                    </Button>
                                  </div>
                                </Card>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
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