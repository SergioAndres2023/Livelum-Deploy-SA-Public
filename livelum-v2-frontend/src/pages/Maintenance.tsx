import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Search, 
  Settings, 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Calendar as CalendarLucide,
  TrendingUp
} from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";

const mockEquipment = [
  {
    id: "1",
    name: "Compresor Principal A",
    code: "CMP-001",
    description: "Compresor de aire principal para línea de producción A",
    location: "Planta - Sector 1",
    category: "production",
    purchaseDate: "2022-01-15",
    warrantyExpiration: "2025-01-15",
    lastMaintenanceDate: "2024-01-10",
    nextMaintenanceDate: "2024-04-10",
    maintenanceFrequencyDays: 90,
    lastCalibrationDate: "2024-02-01",
    nextCalibrationDate: "2024-08-01",
    calibrationFrequencyDays: 180,
    status: "active",
    responsibleUser: "Carlos Méndez"
  },
  {
    id: "2",
    name: "Medidor de Presión Digital",
    code: "MPD-045",
    description: "Medidor digital de presión para control de calidad",
    location: "Laboratorio - Mesa 3",
    category: "measurement",
    purchaseDate: "2021-06-10",
    warrantyExpiration: "2024-06-10",
    lastMaintenanceDate: "2024-01-05",
    nextMaintenanceDate: "2024-07-05",
    maintenanceFrequencyDays: 180,
    lastCalibrationDate: "2024-01-20",
    nextCalibrationDate: "2024-04-20",
    calibrationFrequencyDays: 90,
    status: "active",
    responsibleUser: "Ana Rodríguez"
  },
  {
    id: "3",
    name: "UPS Sistema Central",
    code: "UPS-001",
    description: "Sistema de alimentación ininterrumpida",
    location: "Sala de Servidores",
    category: "support",
    purchaseDate: "2020-03-20",
    warrantyExpiration: "2023-03-20",
    lastMaintenanceDate: "2024-02-15",
    nextMaintenanceDate: "2024-03-15",
    maintenanceFrequencyDays: 30,
    lastCalibrationDate: null,
    nextCalibrationDate: null,
    calibrationFrequencyDays: null,
    status: "maintenance",
    responsibleUser: "Miguel Torres"
  }
];

const mockMaintenanceRecords = [
  {
    id: "1",
    equipmentId: "1",
    equipmentName: "Compresor Principal A",
    recordType: "maintenance",
    scheduledDate: "2024-04-10",
    completedDate: null,
    technicianName: "José García",
    description: "Mantenimiento preventivo trimestral",
    cost: 350.00,
    status: "scheduled",
    notes: ""
  },
  {
    id: "2",
    equipmentId: "2",
    equipmentName: "Medidor de Presión Digital",
    recordType: "calibration",
    scheduledDate: "2024-04-20",
    completedDate: null,
    technicianName: "Laboratorio Certificado",
    description: "Calibración semestral",
    cost: 180.00,
    status: "scheduled",
    notes: ""
  }
];

const statusMap = {
  active: { label: "Activo", className: "bg-success text-success-foreground" },
  maintenance: { label: "Mantenimiento", className: "bg-warning text-warning-foreground" },
  out_of_order: { label: "Fuera de Servicio", className: "bg-destructive text-destructive-foreground" },
  retired: { label: "Retirado", className: "bg-muted text-muted-foreground" }
};

const categoryMap = {
  production: { label: "Producción", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  measurement: { label: "Medición", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  support: { label: "Soporte", className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" }
};

const recordStatusMap = {
  scheduled: { label: "Programado", className: "bg-primary text-primary-foreground" },
  in_progress: { label: "En Progreso", className: "bg-warning text-warning-foreground" },
  completed: { label: "Completado", className: "bg-success text-success-foreground" },
  cancelled: { label: "Cancelado", className: "bg-destructive text-destructive-foreground" }
};

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("equipment");
  const { open } = useModal('maintenance');

  const getDaysUntilMaintenance = (nextDate: string | null) => {
    if (!nextDate) return null;
    return differenceInDays(new Date(nextDate), new Date());
  };

  const getDaysUntilCalibration = (nextDate: string | null) => {
    if (!nextDate) return null;
    return differenceInDays(new Date(nextDate), new Date());
  };

  const getOverdueEquipment = () => {
    return mockEquipment.filter(equipment => {
      const maintenanceDays = getDaysUntilMaintenance(equipment.nextMaintenanceDate);
      const calibrationDays = getDaysUntilCalibration(equipment.nextCalibrationDate);
      return (maintenanceDays !== null && maintenanceDays < 0) || 
             (calibrationDays !== null && calibrationDays < 0);
    });
  };

  const getUpcomingMaintenance = () => {
    return mockEquipment.filter(equipment => {
      const maintenanceDays = getDaysUntilMaintenance(equipment.nextMaintenanceDate);
      const calibrationDays = getDaysUntilCalibration(equipment.nextCalibrationDate);
      return (maintenanceDays !== null && maintenanceDays >= 0 && maintenanceDays <= 30) || 
             (calibrationDays !== null && calibrationDays >= 0 && calibrationDays <= 30);
    });
  };

  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || equipment.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || equipment.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mantenimiento y Calibraciones</h1>
          <p className="text-muted-foreground">Gestión centralizada de equipos con vista de vencimientos</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Equipo
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80" onClick={open}>
            <Plus className="w-4 h-4 mr-2" />
            Programar Mantenimiento
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipos</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{getOverdueEquipment().length}</div>
            <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos 30 días</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{getUpcomingMaintenance().length}</div>
            <p className="text-xs text-muted-foreground">Por vencer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Al Día</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {mockEquipment.length - getOverdueEquipment().length - getUpcomingMaintenance().length}
            </div>
            <p className="text-xs text-muted-foreground">Sin vencimientos próximos</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Cards for Overdue and Upcoming */}
      {getOverdueEquipment().length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Equipos con Vencimientos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getOverdueEquipment().map(equipment => {
                const maintenanceDays = getDaysUntilMaintenance(equipment.nextMaintenanceDate);
                const calibrationDays = getDaysUntilCalibration(equipment.nextCalibrationDate);
                return (
                  <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{equipment.name} ({equipment.code})</div>
                      <div className="text-sm text-muted-foreground">
                        {maintenanceDays !== null && maintenanceDays < 0 && (
                          <span className="text-destructive">
                            Mantenimiento vencido hace {Math.abs(maintenanceDays)} días
                          </span>
                        )}
                        {calibrationDays !== null && calibrationDays < 0 && (
                          <span className="text-destructive ml-4">
                            Calibración vencida hace {Math.abs(calibrationDays)} días
                          </span>
                        )}
                      </div>
                    </div>
                    <Button size="sm">Programar</Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {getUpcomingMaintenance().length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center text-warning">
              <Clock className="w-5 h-5 mr-2" />
              Próximos Vencimientos (30 días)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getUpcomingMaintenance().map(equipment => {
                const maintenanceDays = getDaysUntilMaintenance(equipment.nextMaintenanceDate);
                const calibrationDays = getDaysUntilCalibration(equipment.nextCalibrationDate);
                return (
                  <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{equipment.name} ({equipment.code})</div>
                      <div className="text-sm text-muted-foreground">
                        {maintenanceDays !== null && maintenanceDays >= 0 && maintenanceDays <= 30 && (
                          <span className="text-warning">
                            Mantenimiento en {maintenanceDays} días
                          </span>
                        )}
                        {calibrationDays !== null && calibrationDays >= 0 && calibrationDays <= 30 && (
                          <span className="text-warning ml-4">
                            Calibración en {calibrationDays} días
                          </span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Programar</Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b">
        <Button
          variant={selectedTab === "equipment" ? "default" : "ghost"}
          onClick={() => setSelectedTab("equipment")}
        >
          Equipos
        </Button>
        <Button
          variant={selectedTab === "maintenance" ? "default" : "ghost"}
          onClick={() => setSelectedTab("maintenance")}
        >
          Mantenimientos Programados
        </Button>
      </div>

      {selectedTab === "equipment" && (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar equipos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="production">Producción</SelectItem>
                    <SelectItem value="measurement">Medición</SelectItem>
                    <SelectItem value="support">Soporte</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                    <SelectItem value="out_of_order">Fuera de Servicio</SelectItem>
                    <SelectItem value="retired">Retirado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventario de Equipos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Próximo Mantenimiento</TableHead>
                    <TableHead>Próxima Calibración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map((equipment) => {
                    const maintenanceDays = getDaysUntilMaintenance(equipment.nextMaintenanceDate);
                    const calibrationDays = getDaysUntilCalibration(equipment.nextCalibrationDate);
                    
                    return (
                      <TableRow key={equipment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{equipment.name}</div>
                            <div className="text-sm text-muted-foreground">{equipment.code}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={categoryMap[equipment.category as keyof typeof categoryMap].className}>
                            {categoryMap[equipment.category as keyof typeof categoryMap].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{equipment.location}</TableCell>
                        <TableCell>
                          {equipment.nextMaintenanceDate ? (
                            <div className={cn(
                              "text-sm",
                              maintenanceDays !== null && maintenanceDays < 0 && "text-destructive font-medium",
                              maintenanceDays !== null && maintenanceDays >= 0 && maintenanceDays <= 7 && "text-warning font-medium"
                            )}>
                              {format(new Date(equipment.nextMaintenanceDate), "dd/MM/yyyy", { locale: es })}
                              <div className="text-xs">
                                {maintenanceDays !== null && (
                                  maintenanceDays < 0 
                                    ? `Vencido hace ${Math.abs(maintenanceDays)} días`
                                    : `En ${maintenanceDays} días`
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {equipment.nextCalibrationDate ? (
                            <div className={cn(
                              "text-sm",
                              calibrationDays !== null && calibrationDays < 0 && "text-destructive font-medium",
                              calibrationDays !== null && calibrationDays >= 0 && calibrationDays <= 7 && "text-warning font-medium"
                            )}>
                              {format(new Date(equipment.nextCalibrationDate), "dd/MM/yyyy", { locale: es })}
                              <div className="text-xs">
                                {calibrationDays !== null && (
                                  calibrationDays < 0 
                                    ? `Vencida hace ${Math.abs(calibrationDays)} días`
                                    : `En ${calibrationDays} días`
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No aplica</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusMap[equipment.status as keyof typeof statusMap].className}>
                            {statusMap[equipment.status as keyof typeof statusMap].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{equipment.responsibleUser}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {selectedTab === "maintenance" && (
        <Card>
          <CardHeader>
            <CardTitle>Mantenimientos y Calibraciones Programados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fecha Programada</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMaintenanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.equipmentName}</div>
                        <div className="text-sm text-muted-foreground">{record.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.recordType === 'maintenance' ? 'default' : 'secondary'}>
                        {record.recordType === 'maintenance' ? 'Mantenimiento' : 'Calibración'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(record.scheduledDate), "dd/MM/yyyy", { locale: es })}
                    </TableCell>
                    <TableCell>{record.technicianName}</TableCell>
                    <TableCell>€{record.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={recordStatusMap[record.status as keyof typeof recordStatusMap].className}>
                        {recordStatusMap[record.status as keyof typeof recordStatusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
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
      )}
    </div>
  );
}