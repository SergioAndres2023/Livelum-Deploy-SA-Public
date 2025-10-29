import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/contexts/ModalContext";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FileText,
  Users,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Calendar as CalendarIcon,
  Activity,
  Target,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { toast } from "sonner";

const chartData = [
  { name: "Ene", documents: 65, processes: 45 },
  { name: "Feb", documents: 78, processes: 52 },
  { name: "Mar", documents: 90, processes: 58 },
  { name: "Abr", documents: 81, processes: 65 },
  { name: "May", documents: 95, processes: 70 },
  { name: "Jun", documents: 110, processes: 78 },
];

const pieData = [
  { name: "Aprobados", value: 65, color: "hsl(var(--primary))" },
  { name: "Pendientes", value: 25, color: "hsl(var(--warning))" },
  { name: "Rechazados", value: 10, color: "hsl(var(--destructive))" },
];

const barData = [
  { name: "Lun", value: 12 },
  { name: "Mar", value: 19 },
  { name: "Mié", value: 8 },
  { name: "Jue", value: 15 },
  { name: "Vie", value: 22 },
];

interface Task {
  id: string;
  expectedDate: string;
  task: string;
  detail: string;
}

interface Notification {
  id: string;
  date: string;
  title: string;
  message: string;
}

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasksRecordsPerPage, setTasksRecordsPerPage] = useState("5");
  const [notificationsRecordsPerPage, setNotificationsRecordsPerPage] = useState("5");
  const [tasksSearchTerm, setTasksSearchTerm] = useState("");
  const [notificationsSearchTerm, setNotificationsSearchTerm] = useState("");

  // Datos de ejemplo (vacíos como en el ejemplo)
  const tasks: Task[] = [];
  const notifications: Notification[] = [];

  // Hook para obtener datos del dashboard desde MongoDB
  const { 
    documentStats, 
    auditStats, 
    riskStats, 
    loading, 
    error, 
    refetch 
  } = useDashboard();

  // Modales
  const modalContext = useModal();

  // Función para recargar datos
  const handleRefresh = async () => {
    toast.loading("Actualizando datos...");
    try {
      await refetch();
      toast.success("Datos actualizados correctamente");
    } catch (err) {
      toast.error("Error al actualizar los datos");
    }
  };
  
  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Dashboard
            </h1>
            {error && (
              <p className="text-sm text-red-600 mt-1">
                {error} - <button onClick={handleRefresh} className="underline">Reintentar</button>
              </p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Documento
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Crear Nuevo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => modalContext.open('document')}>
                <FileText className="w-4 h-4 mr-2" />
                Documento
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => modalContext.open('process')}>
                <Activity className="w-4 h-4 mr-2" />
                Proceso
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => modalContext.open('audit')}>
                <Target className="w-4 h-4 mr-2" />
                Auditoría
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => modalContext.open('risk')}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Riesgo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Row - Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Documentos */}
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Documentos</p>
                <p className="text-2xl font-bold text-primary">
                  {loading ? '...' : documentStats?.total || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {documentStats?.approved || 0} aprobados
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
            {documentStats && (
              <div className="flex items-center mt-2 text-xs">
                <TrendingUp className="h-3 w-3 text-success mr-1" />
                <span className="text-success font-medium">
                  {documentStats.inReview || 0}
                </span>
                <span className="text-muted-foreground ml-1">en revisión</span>
              </div>
            )}
          </Card>

          {/* Auditorías */}
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Auditorías Programadas</p>
                <p className="text-2xl font-bold text-success">
                  {loading ? '...' : auditStats?.planned || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {auditStats?.total || 0} total
                </p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <Target className="h-5 w-5 text-success" />
              </div>
            </div>
            {auditStats && (
              <div className="flex items-center mt-2 text-xs">
                <Clock className="h-3 w-3 text-warning mr-1" />
                <span className="text-warning font-medium">
                  {auditStats.overdue || 0}
                </span>
                <span className="text-muted-foreground ml-1">vencidas</span>
              </div>
            )}
          </Card>

          {/* Riesgos */}
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Riesgos Activos</p>
                <p className="text-2xl font-bold text-warning">
                  {loading ? '...' : riskStats?.active || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {riskStats?.total || 0} total
                </p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
            </div>
            {riskStats && (
              <div className="flex items-center mt-2 text-xs">
                <AlertTriangle className="h-3 w-3 text-destructive mr-1" />
                <span className="text-destructive font-medium">
                  {riskStats.critical || 0}
                </span>
                <span className="text-muted-foreground ml-1">críticos</span>
              </div>
            )}
          </Card>

          {/* Resumen General */}
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Estado General</p>
                <p className="text-2xl font-bold text-primary">
                  {loading ? '...' : 
                    (documentStats?.approved || 0) + (auditStats?.completed || 0)
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  completados
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-xs">
              <CheckCircle className="h-3 w-3 text-success mr-1" />
              <span className="text-success font-medium">Sistema</span>
              <span className="text-muted-foreground ml-1">operativo</span>
            </div>
          </Card>
        </div>

        {/* Second Row - Three Equal Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Mis Tareas Card */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-900">Mis Tareas</CardTitle>
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal text-xs"
                    >
                      Ver todas las tareas
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Registros por página</span>
                      <Select value={tasksRecordsPerPage} onValueChange={setTasksRecordsPerPage}>
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Buscar"
                        value={tasksSearchTerm}
                        onChange={(e) => setTasksSearchTerm(e.target.value)}
                        className="pl-10 w-48 h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                              Fecha esperada
                              <ArrowUpDown className="h-3 w-3 text-gray-400" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarea
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Detalle
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500">
                            No se encontraron registros
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Sin resultados</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled className="h-8">
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm" disabled className="h-8">
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notificaciones Card */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-900">Notificaciones</CardTitle>
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal text-xs"
                    >
                      Ver todas las notificaciones
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Registros por página</span>
                      <Select value={notificationsRecordsPerPage} onValueChange={setNotificationsRecordsPerPage}>
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Buscar"
                        value={notificationsSearchTerm}
                        onChange={(e) => setNotificationsSearchTerm(e.target.value)}
                        className="pl-10 w-48 h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Título
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mensaje
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500">
                            No se encontraron registros
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Sin resultados</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled className="h-8">
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm" disabled className="h-8">
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Widget */}
              <Card className="chart-card">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
                    January
                  </h3>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0 p-0"
                />
              </Card>

            </div>

        {/* Third Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card className="chart-card">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Dolor sit amet</h3>
              <p className="text-sm text-muted-foreground">Tendencia mensual</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="documents" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                <Line type="monotone" dataKey="processes" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-2))" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart */}
          <Card className="chart-card">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Adipiscing</h3>
              <p className="text-sm text-muted-foreground">Actividad semanal</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-3))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Fourth Row - Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="chart-card">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Commodo</h3>
              <p className="text-lg font-semibold text-foreground">Dolor augue</p>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={chartData.slice(0, 4)}>
                <Area type="monotone" dataKey="documents" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" strokeWidth={2} />
                <Area type="monotone" dataKey="processes" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4)/0.2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="chart-card">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Delectus auctor</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <Progress value={85} className="w-full mt-2" />
                </div>
                <div className="relative w-16 h-16 ml-4">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      stroke="hsl(var(--muted))"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      stroke="hsl(var(--chart-5))"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="87.96"
                      strokeDashoffset="26.39"
                      className="progress-ring"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-chart-5">70%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="chart-card">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Consectetur</h3>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;