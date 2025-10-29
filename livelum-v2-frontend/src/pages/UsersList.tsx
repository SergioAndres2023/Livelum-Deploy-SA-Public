import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Edit,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Users,
  User
} from "lucide-react";

// Datos de ejemplo para usuarios (múltiples registros)
const usuariosData = [
  {
    id: 1,
    usuario: "maggie",
    nombre: "Margarita",
    apellido: "Romero",
    email: "maggieromero10@gmail.com",
    telefono: "",
    empresa: "",
    perfiles: "Administrador"
  },
  {
    id: 2,
    usuario: "amherrera",
    nombre: "Martín",
    apellido: "Herrera",
    email: "mherrera@ingferr.com",
    telefono: "3413692003",
    empresa: "INGFERR - INGFERR SRL",
    perfiles: "Consultor, Editor de Onboardings"
  },
  {
    id: 3,
    usuario: "mauricio",
    nombre: "Mauricio",
    apellido: "Ohaco",
    email: "info@mingroup.online",
    telefono: "",
    empresa: "Empresa de ejemplo - Empresa de ejemplo, MINGROUP - MINGROUP, Tio bigotes - Tio bigotes",
    perfiles: "Consultor"
  },
  {
    id: 4,
    usuario: "melani",
    nombre: "Melani",
    apellido: "Ruiz",
    email: "administracion@ingferr.com",
    telefono: "3413692004",
    empresa: "INGFERR - INGFERR SRL",
    perfiles: "Editor de Onboardings"
  },
  {
    id: 5,
    usuario: "sandra",
    nombre: "Sandra",
    apellido: "Zárate",
    email: "sandramzarate@gmail.com",
    telefono: "",
    empresa: "Empresa de ejemplo - Empresa de ejemplo",
    perfiles: "Consultor"
  },
  {
    id: 6,
    usuario: "tomas-nahuel-",
    nombre: "Tomas Nahuel",
    apellido: "Agüero",
    email: "aguerotomas41@gmail.com",
    telefono: "+54 9 11 5142-3225",
    empresa: "Empresa de ejemplo - Empresa de ejemplo",
    perfiles: "Consultor, Editor de Onboardings"
  },
  {
    id: 7,
    usuario: "diego16",
    nombre: "Diego",
    apellido: "Reyes",
    email: "diego.reyes.sg@gmail.com",
    telefono: "+54 9 11 3489-7007",
    empresa: "Empresa de ejemplo - Empresa de ejemplo, MAROLIO - MAROLIO S.A, INGFERR - INGFERR SRL, MECFAR - MECFAR SRL, MARTINOTTI Bolsas y Big Bags - MARTINOTTI, BONATI DC - BONATI DC, Termoplástica San Rafael - Termoplástica San Rafael SRL, Baucru S.A. - Baucru S.A., Nordic Clinic - Nordic Clinic, Mazin Industrial - Mazin Industrial, Lopez Hnos - Lopez Hnos, Tio bigotes - Tio bigotes, MM Reductores - MM Reductores, ERCROM S.R.L. - ERCROM S.R.L., EMERGENCIA MEDICA REGIONAL SRL - EMERGENCIA MEDICA REGIONAL SRL, M NAHMIAS SOCIEDAD ANONIMA - M NAHMIAS SOCIEDAD ANONIMA",
    perfiles: "Consultor, Editor de Onboardings"
  },
  {
    id: 8,
    usuario: "empleado91",
    nombre: "empleadotest",
    apellido: "test",
    email: "gonzalovazquez46@gmail.com",
    telefono: "",
    empresa: "Empresa de ejemplo - Empresa de ejemplo",
    perfiles: ""
  },
  {
    id: 9,
    usuario: "giuliana",
    nombre: "Giuliana",
    apellido: "Martinotti",
    email: "giulimartinotti@hotmail.com",
    telefono: "3465443311",
    empresa: "MARTINOTTI Bolsas y Big Bags - MARTINOTTI",
    perfiles: ""
  },
  {
    id: 10,
    usuario: "INGFERR",
    nombre: "Hernán",
    apellido: "Herrera",
    email: "herrera@ingferr.com",
    telefono: "+54 9 3476 65-7811",
    empresa: "INGFERR - INGFERR SRL",
    perfiles: "Editor de Onboardings"
  },
  {
    id: 11,
    usuario: "marcelo80",
    nombre: "Marcelo",
    apellido: "Arias",
    email: "marceloarias323@gmail.com",
    telefono: "",
    empresa: "Empresa de ejemplo - Empresa de ejemplo",
    perfiles: "Consultor"
  }
];

export default function UsuariosListado() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("usuario");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar usuarios
  const getFilteredAndSortedUsuarios = () => {
    let filtered = usuariosData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.perfiles.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string = '';
      let bValue: string = '';

      switch (sortBy) {
        case 'usuario':
          aValue = a.usuario.toLowerCase();
          bValue = b.usuario.toLowerCase();
          break;
        case 'nombre':
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
          break;
        case 'apellido':
          aValue = a.apellido.toLowerCase();
          bValue = b.apellido.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'empresa':
          aValue = a.empresa.toLowerCase();
          bValue = b.empresa.toLowerCase();
          break;
        case 'perfiles':
          aValue = a.perfiles.toLowerCase();
          bValue = b.perfiles.toLowerCase();
          break;
        default:
          aValue = a.usuario.toLowerCase();
          bValue = b.usuario.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  };

  const filteredUsuarios = getFilteredAndSortedUsuarios();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredUsuarios.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentUsuarios = filteredUsuarios.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditUsuario = (usuarioId: number) => {
    console.log('Edit usuario:', usuarioId);
  };

  const handleNewUsuario = () => {
    console.log('Create new usuario');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleIrAlListadoPerfiles = () => {
    console.log('Ir al listado de Perfiles');
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Usuarios listado
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
            {/* Enlace al listado de perfiles */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                onClick={handleIrAlListadoPerfiles}
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
              >
                <Users className="w-4 h-4 mr-2" />
                Ir al listado de Perfiles
              </Button>
              
              <Button onClick={handleNewUsuario} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar usuarios..."
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
                    <TableHead className="w-16">Foto</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('usuario')}
                    >
                      <div className="flex items-center gap-2">
                        Usuario
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('nombre')}
                    >
                      <div className="flex items-center gap-2">
                        Nombre
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('apellido')}
                    >
                      <div className="flex items-center gap-2">
                        Apellido
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center gap-2">
                        Email
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('telefono')}
                    >
                      <div className="flex items-center gap-2">
                        Teléfono
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('empresa')}
                    >
                      <div className="flex items-center gap-2">
                        Empresa
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('perfiles')}
                    >
                      <div className="flex items-center gap-2">
                        Perfiles
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsuarios.map((usuario) => (
                    <TableRow key={usuario.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" alt={`${usuario.nombre} ${usuario.apellido}`} />
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {usuario.usuario}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {usuario.nombre}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {usuario.apellido}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {usuario.email}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {usuario.telefono || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        {usuario.empresa ? (
                          <div className="truncate" title={usuario.empresa}>
                            {usuario.empresa}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {usuario.perfiles || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUsuario(usuario.id)}
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
