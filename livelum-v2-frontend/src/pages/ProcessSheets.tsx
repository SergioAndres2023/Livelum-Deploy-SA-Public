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
  ChevronRightIcon,
  MapPin
} from "lucide-react";

// Datos de ejemplo para fichas de procesos
const fichasProcesosData = [
  {
    id: '1',
    ultimaActualizacion: '13:07:47 10-06-2024',
    nombreProceso: 'PROCESOS OPERATIVOS > COMERCIAL',
    version: 1,
    estado: 'AUTORIZADO'
  },
  {
    id: '2',
    ultimaActualizacion: '14:51:28 10-06-2024',
    nombreProceso: 'PROCESOS OPERATIVOS > Postventa',
    version: 4,
    estado: 'ARCHIVADO'
  },
  {
    id: '3',
    ultimaActualizacion: '16:22:15 15-06-2024',
    nombreProceso: 'PROCESOS DE FABRICACIÓN > D&D',
    version: 2,
    estado: 'AUTORIZADO'
  },
  {
    id: '4',
    ultimaActualizacion: '09:45:33 18-06-2024',
    nombreProceso: 'PROCESOS DE APOYO > Legales',
    version: 3,
    estado: 'BORRADOR'
  },
  {
    id: '5',
    ultimaActualizacion: '11:28:42 20-06-2024',
    nombreProceso: 'PROCESOS OPERATIVOS > Reparaciones',
    version: 2,
    estado: 'BORRADOR'
  },
  {
    id: '6',
    ultimaActualizacion: '15:14:56 22-06-2024',
    nombreProceso: 'PROCESOS DE GESTIÓN > RRHH',
    version: 5,
    estado: 'AUTORIZADO'
  },
  {
    id: '7',
    ultimaActualizacion: '20:36:25 24-06-2024',
    nombreProceso: 'PROCESOS OPERATIVOS > Reparaciones',
    version: 2,
    estado: 'BORRADOR'
  },
  {
    id: '8',
    ultimaActualizacion: '08:19:07 26-06-2024',
    nombreProceso: 'PROCESOS DE CALIDAD > Auditorías',
    version: 1,
    estado: 'PENDIENTE'
  },
  {
    id: '9',
    ultimaActualizacion: '17:53:12 28-06-2024',
    nombreProceso: 'PROCESOS DE APOYO > Administración',
    version: 4,
    estado: 'AUTORIZADO'
  },
  {
    id: '10',
    ultimaActualizacion: '14:27:38 02-07-2024',
    nombreProceso: 'PROCESOS OPERATIVOS > Compras',
    version: 3,
    estado: 'ARCHIVADO'
  },
  {
    id: '11',
    ultimaActualizacion: '10:41:29 05-07-2024',
    nombreProceso: 'PROCESOS DE FABRICACIÓN > Control de Calidad',
    version: 2,
    estado: 'AUTORIZADO'
  },
  {
    id: '12',
    ultimaActualizacion: '16:08:44 08-07-2024',
    nombreProceso: 'PROCESOS DE GESTIÓN > Finanzas',
    version: 6,
    estado: 'BORRADOR'
  },
  {
    id: '13',
    ultimaActualizacion: '12:35:02 18-07-2024',
    nombreProceso: 'PROCESOS DE APOYO > Legales',
    version: 2,
    estado: 'PENDIENTE'
  },
  {
    id: '14',
    ultimaActualizacion: '19:22:17 20-07-2024',
    nombreProceso: 'PROCESOS OPERATIVOS > Ventas',
    version: 1,
    estado: 'AUTORIZADO'
  }
];

export default function FichasProcesos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("ultimaActualizacion");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar fichas de procesos
  const getFilteredAndSortedFichas = () => {
    let filtered = fichasProcesosData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombreProceso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.version.toString().includes(searchTerm)
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'ultimaActualizacion':
          // Convertir formato HH:MM:SS DD-MM-YYYY a timestamp
          const parseDateTime = (dateTimeStr: string) => {
            const [time, date] = dateTimeStr.split(' ');
            const [hours, minutes, seconds] = time.split(':');
            const [day, month, year] = date.split('-');
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds)).getTime();
          };
          aValue = parseDateTime(a.ultimaActualizacion);
          bValue = parseDateTime(b.ultimaActualizacion);
          break;
        case 'nombreProceso':
          aValue = a.nombreProceso.toLowerCase();
          bValue = b.nombreProceso.toLowerCase();
          break;
        case 'version':
          aValue = a.version;
          bValue = b.version;
          break;
        case 'estado':
          const estadoOrder = { 'AUTORIZADO': 4, 'BORRADOR': 3, 'PENDIENTE': 2, 'ARCHIVADO': 1 };
          aValue = estadoOrder[a.estado as keyof typeof estadoOrder] || 0;
          bValue = estadoOrder[b.estado as keyof typeof estadoOrder] || 0;
          break;
        default:
          aValue = parseDateTime(a.ultimaActualizacion);
          bValue = parseDateTime(b.ultimaActualizacion);
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

  const filteredFichas = getFilteredAndSortedFichas();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredFichas.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentFichas = filteredFichas.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleAbrirFicha = (fichaId: string) => {
    // TODO: Implementar apertura de ficha
    console.log('Abrir ficha:', fichaId);
  };

  const handleNewFicha = () => {
    // TODO: Implementar creación de nueva ficha
    console.log('Create new ficha');
  };

  const handleIrAlMapa = () => {
    // TODO: Implementar navegación al mapa de procesos
    console.log('Ir al mapa de procesos');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'AUTORIZADO':
        return <Badge variant="outline" className="text-white bg-green-600 border-green-600">AUTORIZADO</Badge>;
      case 'BORRADOR':
        return <Badge variant="outline" className="text-white bg-blue-600 border-blue-600">BORRADOR</Badge>;
      case 'PENDIENTE':
        return <Badge variant="outline" className="text-white bg-orange-600 border-orange-600">PENDIENTE</Badge>;
      case 'ARCHIVADO':
        return <Badge variant="outline" className="text-white bg-gray-600 border-gray-600">ARCHIVADO</Badge>;
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
              Ficha de Procesos
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
            <div className="flex items-center justify-between mb-6">
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
              
              <Button onClick={handleIrAlMapa} variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
                <MapPin className="w-4 h-4 mr-2" />
                Ir al mapa de procesos
              </Button>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 ml-auto">
                <Label htmlFor="search" className="text-sm font-medium">
                  Buscar
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar fichas de procesos..."
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
                      onClick={() => handleSort('ultimaActualizacion')}
                    >
                      <div className="flex items-center gap-2">
                        Última actualización
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('nombreProceso')}
                    >
                      <div className="flex items-center gap-2">
                        Nombre del Proceso
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('version')}
                    >
                      <div className="flex items-center gap-2">
                        Versión
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
                  {currentFichas.map((ficha) => (
                    <TableRow key={ficha.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {ficha.ultimaActualizacion}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 max-w-xs">
                        <div className="truncate" title={ficha.nombreProceso}>
                          {ficha.nombreProceso}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {ficha.version}
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(ficha.estado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAbrirFicha(ficha.id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <ChevronRightIcon className="w-4 h-4 mr-2" />
                          Abrir Ficha
                        </Button>
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
