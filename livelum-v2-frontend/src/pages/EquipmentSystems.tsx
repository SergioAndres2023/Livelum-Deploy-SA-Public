import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

// Datos de ejemplo para equipos y sistemas
const equiposSistemasData = [
  {
    id: '1',
    nombreEquipo: 'balanza',
    marca: 'dfd',
    modelo: '936105',
    numeroSerie: 'fdfd',
    codigo: 'fdsf',
    ubicacionFisica: 'dfdf',
    estado: 'ACTIVO'
  },
  {
    id: '2',
    nombreEquipo: 'CAMIONETA',
    marca: 'FIAT',
    modelo: 'Fiorino',
    numeroSerie: '12125555',
    codigo: 'ABffgd455',
    ubicacionFisica: 'Taller central',
    estado: 'ACTIVO'
  },
  {
    id: '3',
    nombreEquipo: 'Torno',
    marca: 'RIOMU',
    modelo: 'Seria',
    numeroSerie: '12125555',
    codigo: 'XX4456w',
    ubicacionFisica: 'Taller de Mantenimiento',
    estado: 'ACTIVO'
  },
  {
    id: '4',
    nombreEquipo: 'Torno',
    marca: '',
    modelo: '',
    numeroSerie: '',
    codigo: '',
    ubicacionFisica: '',
    estado: 'ACTIVO'
  },
  {
    id: '5',
    nombreEquipo: 'TORNO',
    marca: '',
    modelo: '',
    numeroSerie: '',
    codigo: '',
    ubicacionFisica: '',
    estado: 'ACTIVO'
  },
  {
    id: '6',
    nombreEquipo: 'Computadora de Escritorio',
    marca: 'Dell',
    modelo: 'OptiPlex 7090',
    numeroSerie: 'DL7090123456',
    codigo: 'PC-001',
    ubicacionFisica: 'Oficina Administrativa',
    estado: 'ACTIVO'
  },
  {
    id: '7',
    nombreEquipo: 'Impresora Multifunción',
    marca: 'HP',
    modelo: 'LaserJet Pro',
    numeroSerie: 'HP78901234',
    codigo: 'IMP-001',
    ubicacionFisica: 'Oficina Administrativa',
    estado: 'MANTENIMIENTO'
  },
  {
    id: '8',
    nombreEquipo: 'Servidor',
    marca: 'IBM',
    modelo: 'System x3650',
    numeroSerie: 'IBM12345678',
    codigo: 'SRV-001',
    ubicacionFisica: 'Sala de Servidores',
    estado: 'ACTIVO'
  },
  {
    id: '9',
    nombreEquipo: 'Switch de Red',
    marca: 'Cisco',
    modelo: 'Catalyst 2960',
    numeroSerie: 'CS12345678',
    codigo: 'SW-001',
    ubicacionFisica: 'Sala de Servidores',
    estado: 'ACTIVO'
  },
  {
    id: '10',
    nombreEquipo: 'Router',
    marca: 'TP-Link',
    modelo: 'Archer C7',
    numeroSerie: 'TP98765432',
    codigo: 'RT-001',
    ubicacionFisica: 'Oficina Principal',
    estado: 'INACTIVO'
  },
  {
    id: '11',
    nombreEquipo: 'Proyector',
    marca: 'Epson',
    modelo: 'PowerLite 1781W',
    numeroSerie: 'EP45678901',
    codigo: 'PROJ-001',
    ubicacionFisica: 'Sala de Reuniones',
    estado: 'ACTIVO'
  },
  {
    id: '12',
    nombreEquipo: 'Equipo de Medición',
    marca: 'Fluke',
    modelo: '87V',
    numeroSerie: 'FL23456789',
    codigo: 'MED-001',
    ubicacionFisica: 'Laboratorio',
    estado: 'ACTIVO'
  }
];

export default function EquiposSistemas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("nombreEquipo");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar equipos y sistemas
  const getFilteredAndSortedEquipos = () => {
    let filtered = equiposSistemasData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombreEquipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ubicacionFisica.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.estado.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'nombreEquipo':
          aValue = a.nombreEquipo.toLowerCase();
          bValue = b.nombreEquipo.toLowerCase();
          break;
        case 'marca':
          aValue = a.marca.toLowerCase();
          bValue = b.marca.toLowerCase();
          break;
        case 'modelo':
          aValue = a.modelo.toLowerCase();
          bValue = b.modelo.toLowerCase();
          break;
        case 'numeroSerie':
          aValue = a.numeroSerie.toLowerCase();
          bValue = b.numeroSerie.toLowerCase();
          break;
        case 'codigo':
          aValue = a.codigo.toLowerCase();
          bValue = b.codigo.toLowerCase();
          break;
        case 'ubicacionFisica':
          aValue = a.ubicacionFisica.toLowerCase();
          bValue = b.ubicacionFisica.toLowerCase();
          break;
        case 'estado':
          const estadoOrder = { 'ACTIVO': 3, 'MANTENIMIENTO': 2, 'INACTIVO': 1 };
          aValue = estadoOrder[a.estado as keyof typeof estadoOrder] || 0;
          bValue = estadoOrder[b.estado as keyof typeof estadoOrder] || 0;
          break;
        default:
          aValue = a.nombreEquipo.toLowerCase();
          bValue = b.nombreEquipo.toLowerCase();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortOrder === 'asc') {
          return (aValue as number) - (bValue as number);
        } else {
          return (bValue as number) - (aValue as number);
        }
      }
    });

    return filtered;
  };

  const filteredEquipos = getFilteredAndSortedEquipos();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredEquipos.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentEquipos = filteredEquipos.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditEquipo = (equipoId: string) => {
    // TODO: Implementar edición de equipo
    console.log('Edit equipo:', equipoId);
  };

  const handleNewEquipo = () => {
    // TODO: Implementar creación de nuevo equipo
    console.log('Create new equipo');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'ACTIVO':
        return <Badge variant="outline" className="text-white bg-green-600 border-green-600">ACTIVO</Badge>;
      case 'MANTENIMIENTO':
        return <Badge variant="outline" className="text-white bg-yellow-600 border-yellow-600">MANTENIMIENTO</Badge>;
      case 'INACTIVO':
        return <Badge variant="outline" className="text-white bg-red-600 border-red-600">INACTIVO</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Equipos y Sistemas
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              listado
            </p>
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
            {/* Controles superiores */}
            <div className="flex items-center justify-end mb-6">
              <Button onClick={handleNewEquipo} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo
              </Button>
            </div>

            {/* Filtros */}
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
                  placeholder="Buscar equipos y sistemas..."
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
                      onClick={() => handleSort('nombreEquipo')}
                    >
                      <div className="flex items-center gap-2">
                        Nombre del equipo
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('marca')}
                    >
                      <div className="flex items-center gap-2">
                        Marca
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('modelo')}
                    >
                      <div className="flex items-center gap-2">
                        Modelo
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('numeroSerie')}
                    >
                      <div className="flex items-center gap-2">
                        N° de serie
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('codigo')}
                    >
                      <div className="flex items-center gap-2">
                        Código
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('ubicacionFisica')}
                    >
                      <div className="flex items-center gap-2">
                        Ubicación física
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('estado')}
                    >
                      <div className="flex items-center gap-2">
                        Estado
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEquipos.map((equipo) => (
                    <TableRow key={equipo.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {equipo.nombreEquipo}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {equipo.marca || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {equipo.modelo || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {equipo.numeroSerie || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {equipo.codigo || '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {equipo.ubicacionFisica || '-'}
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(equipo.estado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEquipo(equipo.id)}
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
