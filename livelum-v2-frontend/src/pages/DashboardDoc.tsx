import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
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
} from "lucide-react";
import { useState } from "react";

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

export default function DashboardDoc() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Sistema de gestión documental - Vista general
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Documento
          </Button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Indicadores</p>
                    <p className="text-2xl font-bold text-primary">32</p>
                    <p className="text-xs text-muted-foreground">Indicadores activos</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success font-medium">+4</span>
                  <span className="text-muted-foreground ml-1">vs mes anterior</span>
                </div>
              </Card>

              <Card className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Cumpliendo Meta</p>
                    <p className="text-2xl font-bold text-success">24</p>
                    <p className="text-xs text-muted-foreground">75% del total</p>
                  </div>
                  <div className="p-3 rounded-full bg-success/10">
                    <Target className="h-5 w-5 text-success" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success font-medium">+3</span>
                  <span className="text-muted-foreground ml-1">este mes</span>
                </div>
              </Card>

              <Card className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">En Atención</p>
                    <p className="text-2xl font-bold text-warning">6</p>
                    <p className="text-xs text-muted-foreground">Requieren seguimiento</p>
                  </div>
                  <div className="p-3 rounded-full bg-warning/10">
                    <AlertCircle className="h-5 w-5 text-warning" />
                  </div>
                </div>
              </Card>

              <Card className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Críticos</p>
                    <p className="text-2xl font-bold text-destructive">2</p>
                    <p className="text-xs text-muted-foreground">Acción inmediata</p>
                  </div>
                  <div className="p-3 rounded-full bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Row */}
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
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="lg:col-span-4 space-y-6">
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

            {/* Progress Cards */}
            <div className="space-y-4">
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

      </div>
    </div>
  );
}