import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Edit,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Users
} from "lucide-react";

// Datos de ejemplo para perfiles de usuario
const perfilesData = [
  {
    id: 1,
    organigrama: 1,
    perfil: "Administrador",
    descripcion: "Administrador de \"todas\" las empresas"
  },
  {
    id: 2,
    organigrama: 2,
    perfil: "Consultor",
    descripcion: "Tiene a su cargo la facilitación de Sistemas de Gestión en \"varias\" Empresas"
  },
  {
    id: 3,
    organigrama: 2,
    perfil: "Editor de Onboardings",
    descripcion: "Responsable de crear y gestionar los procesos de incorporación de nuevas empresas"
  },
  {
    id: 4,
    organigrama: 3,
    perfil: "Gestión de Usuarios",
    descripcion: "Administra usuarios, permisos y roles dentro del sistema"
  },
  {
    id: 5,
    organigrama: 3,
    perfil: "Gestión de Empresas",
    descripcion: "Gestiona la información y configuración de las empresas del sistema"
  },
  {
    id: 6,
    organigrama: 4,
    perfil: "Reportes",
    descripcion: "Acceso completo a la generación y visualización de reportes del sistema"
  },
  {
    id: 7,
    organigrama: 4,
    perfil: "Configuración",
    descripcion: "Configura parámetros del sistema y personalización de procesos"
  },
  {
    id: 8,
    organigrama: 5,
    perfil: "Auditor Interno",
    descripcion: "Realiza auditorías internas y seguimiento de procesos de calidad"
  },
  {
    id: 9,
    organigrama: 5,
    perfil: "Responsable de Calidad",
    descripcion: "Supervisa y mejora los procesos de calidad en las empresas"
  },
  {
    id: 10,
    organigrama: 6,
    perfil: "Operador",
    descripcion: "Acceso limitado para operaciones básicas del sistema"
  }
];

export default function PerfilesUsuario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("organigrama");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar perfiles
  const getFilteredAndSortedPerfiles = () => {
    let filtered = perfilesData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.perfil.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'organigrama':
          aValue = a.organigrama;
          bValue = b.organigrama;
          break;
        case 'perfil':
          aValue = a.perfil.toLowerCase();
          bValue = b.perfil.toLowerCase();
          break;
        case 'descripcion':
          aValue = a.descripcion.toLowerCase();
          bValue = b.descripcion.toLowerCase();
          break;
        default:
          aValue = a.organigrama;
          bValue = b.organigrama;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const aStr = String(aValue);
        const bStr = String(bValue);
        return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      }
    });

    return filtered;
  };

  const filteredPerfiles = getFilteredAndSortedPerfiles();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredPerfiles.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentPerfiles = filteredPerfiles.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditPerfil = (perfilId: number) => {
    console.log('Edit perfil:', perfilId);
  };

  const handleNewPerfil = () => {
    console.log('Create new perfil');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleIrAlListadoUsuarios = () => {
    console.log('Ir al listado de Usuarios');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Perfiles de Usuario
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
            {/* Enlace al listado de usuarios */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                onClick={handleIrAlListadoUsuarios}
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
              >
                <Users className="w-4 h-4 mr-2" />
                Ir al listado de Usuarios
              </Button>
              
              <Button onClick={handleNewPerfil} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar perfiles..."
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
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('organigrama')}
                    >
                      <div className="flex items-center gap-2">
                        Organigrama
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('perfil')}
                    >
                      <div className="flex items-center gap-2">
                        Perfil
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('descripcion')}
                    >
                      <div className="flex items-center gap-2">
                        Descripción
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPerfiles.map((perfil) => (
                    <TableRow key={perfil.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {perfil.organigrama}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {perfil.perfil}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {perfil.descripcion}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPerfil(perfil.id)}
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
