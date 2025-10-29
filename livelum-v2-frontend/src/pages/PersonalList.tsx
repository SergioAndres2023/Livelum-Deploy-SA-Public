import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Pencil,
  Trash2, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  ArrowUpDown,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable, StatusBadge, Column } from "@/components/ui/DataTable";
import { useModal } from "@/contexts/ModalContext";
import { useNavigate } from "react-router-dom";

// Tipo de datos para la tabla
type UserData = {
  id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  document: string;
  active: boolean;
  positions: string;
  avatar: string | null;
};

// Datos hardcodeados de usuarios (mismos que en el modal)
const usersData: UserData[] = [
  {
    id: '1',
    username: '123',
    name: '123',
    lastName: '123',
    email: '123@9net.com.ar',
    document: '',
    active: false,
    positions: '',
    avatar: null
  },
  {
    id: '2',
    username: 'jose67',
    name: 'Agustina',
    lastName: 'Court',
    email: 'christiancocchi@gmail.com',
    document: '',
    active: true,
    positions: '',
    avatar: null
  },
  {
    id: '3',
    username: 'agustina11',
    name: 'AGUSTINA',
    lastName: 'TORRES',
    email: '',
    document: '',
    active: false,
    positions: '',
    avatar: null
  },
  {
    id: '4',
    username: 'camila57',
    name: 'CAMILA',
    lastName: 'TORRES',
    email: '',
    document: '',
    active: false,
    positions: '',
    avatar: null
  },
  {
    id: '5',
    username: 'carmen47',
    name: 'Carmen',
    lastName: 'OTERO',
    email: 'carmen1766@yahoo.com.ar',
    document: '',
    active: true,
    positions: 'Asistente administrativo',
    avatar: null
  },
  {
    id: '6',
    username: 'christia',
    name: 'CHRISTIAN',
    lastName: 'Perez',
    email: 'christiancocchi@gmail.com',
    document: '',
    active: true,
    positions: 'Responsable de SG, Dirección',
    avatar: null
  }
];

export default function PersonalList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const { open } = useModal('personal-list');
  const navigate = useNavigate();

  // Función para filtrar y ordenar usuarios
  const getFilteredAndSortedUsers = () => {
    let filtered = usersData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.document && user.document.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        statusFilter === 'active' ? user.active : !user.active
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue = '';
      let bValue = '';

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'lastName':
          aValue = a.lastName.toLowerCase();
          bValue = b.lastName.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'username':
          aValue = a.username.toLowerCase();
          bValue = b.username.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  };

  const filteredUsers = getFilteredAndSortedUsers();

  // Configuración de columnas para DataTable
  const columns: Column<UserData>[] = [
    {
      key: 'avatar',
      label: 'Foto',
      render: (user) => (
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar || undefined} />
          <AvatarFallback className="text-xs">
            {user.name.charAt(0)}{user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )
    },
    {
      key: 'username',
      label: 'Usuario',
      sortable: true
    },
    {
      key: 'name',
      label: 'Nombre',
      sortable: true
    },
    {
      key: 'lastName',
      label: 'Apellido',
      sortable: true
    },
    {
      key: 'document',
      label: 'Documento',
      render: (user) => user.document || '-'
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (user) => user.email || '-'
    },
    {
      key: 'active',
      label: 'Personal Activo',
      render: (user) => (
        <StatusBadge status={user.active ? 'active' : 'inactive'}>
          {user.active ? 'SI' : 'NO'}
        </StatusBadge>
      )
    },
    {
      key: 'positions',
      label: 'Puestos',
      render: (user) => user.positions || '-'
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (user) => (
        <div className="flex items-center justify-end gap-2">
          <button 
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
            onClick={() => handleEditUser(user.id)}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            className="text-gray-400 hover:text-red-600 p-1 rounded-full transition-all duration-200"
            onClick={() => handleDeleteUser(user.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Estadísticas
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(u => u.active).length;
  const inactiveUsers = totalUsers - activeUsers;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditUser = (userId: string) => {
    // TODO: Implementar edición de usuario
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Implementar eliminación de usuario
    console.log('Delete user:', userId);
  };

  const handleNewUser = () => {
    // TODO: Implementar creación de nuevo usuario
    console.log('Create new user');
  };

  const handleMatrixPolivalencias = () => {
    navigate('/personal/matriz-polivalencias');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Listado de Personal
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Gestión y visualización del personal de la organización
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleMatrixPolivalencias}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
            >
              <Users className="w-4 h-4" />
              Matriz de Polivalencias
            </button>
            <button 
              onClick={handleNewUser}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Nuevo Personal"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Personal</p>
                <p className="text-2xl font-bold text-primary">{totalUsers}</p>
                <p className="text-xs text-muted-foreground">
                  {activeUsers} activos
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Personal Activo</p>
                <p className="text-2xl font-bold text-success">{activeUsers}</p>
                <p className="text-xs text-muted-foreground">
                  {((activeUsers / totalUsers) * 100).toFixed(1)}% del total
                </p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Personal Inactivo</p>
                <p className="text-2xl font-bold text-warning">{inactiveUsers}</p>
                <p className="text-xs text-muted-foreground">
                  {((inactiveUsers / totalUsers) * 100).toFixed(1)}% del total
                </p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Con Puesto Asignado</p>
                <p className="text-2xl font-bold text-primary">
                  {usersData.filter(u => u.positions).length}
                </p>
                <p className="text-xs text-muted-foreground">
                  con responsabilidades
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, apellido, email, documento..."
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
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Actualizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Lista de Personal
            </CardTitle>
            <CardDescription>
              Gestiona toda la información del personal de la organización
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredUsers}
              columns={columns}
              emptyMessage="No se encontraron usuarios con los criterios de búsqueda"
              onSort={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
