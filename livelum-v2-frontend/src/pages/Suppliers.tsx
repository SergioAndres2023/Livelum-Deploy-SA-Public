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
  MoreHorizontal,
  TrendingUp
} from "lucide-react";

// Datos de ejemplo para proveedores
const proveedoresData = [
  {
    id: '1',
    rubro: 'Certificaciones',
    proveedor: 'LSQA',
    contacto: {
      cuit: '30-12345678-9',
      email: 'contacto@lsqa.com',
      telefono: '+54 11 1234-5678'
    },
    ultimaEvaluacion: '07-08-2024',
    siguienteEvaluacion: '07-08-2025',
    estado: 'CONDICIONAL',
    evaluacion: 6.7
  },
  {
    id: '2',
    rubro: 'Servicios de Consultoría',
    proveedor: 'Consultoría Integral S.A.',
    contacto: {
      cuit: '30-87654321-0',
      email: 'info@consultoria.com',
      telefono: '+54 11 8765-4321'
    },
    ultimaEvaluacion: '10-06-2024',
    siguienteEvaluacion: '10-06-2025',
    estado: 'APROBADO',
    evaluacion: 9.0
  },
  {
    id: '3',
    rubro: 'Equipos y Tecnología',
    proveedor: 'Tech Solutions',
    contacto: {
      cuit: '30-11223344-5',
      email: 'ventas@techsolutions.com',
      telefono: '+54 11 1122-3344'
    },
    ultimaEvaluacion: '15-05-2024',
    siguienteEvaluacion: '15-05-2025',
    estado: 'NO APROBADO',
    evaluacion: 1.5
  },
  {
    id: '4',
    rubro: 'Materiales y Suministros',
    proveedor: 'Materiales del Norte',
    contacto: {
      cuit: '30-55667788-9',
      email: 'pedidos@materiales.com',
      telefono: '+54 11 5566-7788'
    },
    ultimaEvaluacion: '22-04-2024',
    siguienteEvaluacion: '22-04-2025',
    estado: 'APROBADO',
    evaluacion: 7.0
  },
  {
    id: '5',
    rubro: 'Servicios de Mantenimiento',
    proveedor: 'Mantenimiento Pro',
    contacto: {
      cuit: '30-99887766-5',
      email: 'servicios@mantenimiento.com',
      telefono: '+54 11 9988-7766'
    },
    ultimaEvaluacion: '08-03-2024',
    siguienteEvaluacion: '08-03-2025',
    estado: 'CONDICIONAL',
    evaluacion: 6.0
  },
  {
    id: '6',
    rubro: 'Servicios de Capacitación',
    proveedor: 'Capacitación Empresarial',
    contacto: {
      cuit: '30-44332211-0',
      email: 'cursos@capacitacion.com',
      telefono: '+54 11 4433-2211'
    },
    ultimaEvaluacion: '12-02-2024',
    siguienteEvaluacion: '12-02-2025',
    estado: 'NO APROBADO',
    evaluacion: 3.5
  },
  {
    id: '7',
    rubro: 'Servicios de Auditoría',
    proveedor: 'Audit Partners',
    contacto: {
      cuit: '30-77889900-1',
      email: 'auditoria@auditpartners.com',
      telefono: '+54 11 7788-9900'
    },
    ultimaEvaluacion: '18-01-2024',
    siguienteEvaluacion: '18-01-2025',
    estado: 'CONDICIONAL',
    evaluacion: 6.9
  },
  {
    id: '8',
    rubro: 'Servicios de Transporte',
    proveedor: 'Logística Express',
    contacto: {
      cuit: '30-22334455-6',
      email: 'logistica@express.com',
      telefono: '+54 11 2233-4455'
    },
    ultimaEvaluacion: '25-12-2023',
    siguienteEvaluacion: '25-12-2024',
    estado: 'NO APROBADO',
    evaluacion: 1.0
  },
  {
    id: '9',
    rubro: 'Servicios de Limpieza',
    proveedor: 'Clean Services',
    contacto: {
      cuit: '30-66778899-2',
      email: 'limpieza@cleanservices.com',
      telefono: '+54 11 6677-8899'
    },
    ultimaEvaluacion: '30-11-2023',
    siguienteEvaluacion: '30-11-2024',
    estado: 'NO APROBADO',
    evaluacion: 0.0
  }
];

export default function Proveedores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("evaluacion");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("gestion-proveedores");

  // Función para filtrar y ordenar proveedores
  const getFilteredAndSortedProveedores = () => {
    let filtered = proveedoresData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.rubro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contacto.cuit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contacto.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.estado.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'rubro':
          aValue = a.rubro.toLowerCase();
          bValue = b.rubro.toLowerCase();
          break;
        case 'proveedor':
          aValue = a.proveedor.toLowerCase();
          bValue = b.proveedor.toLowerCase();
          break;
        case 'ultimaEvaluacion':
          aValue = a.ultimaEvaluacion ? new Date(a.ultimaEvaluacion.split('-').reverse().join('-')).getTime() : 0;
          bValue = b.ultimaEvaluacion ? new Date(b.ultimaEvaluacion.split('-').reverse().join('-')).getTime() : 0;
          break;
        case 'siguienteEvaluacion':
          aValue = a.siguienteEvaluacion ? new Date(a.siguienteEvaluacion.split('-').reverse().join('-')).getTime() : 0;
          bValue = b.siguienteEvaluacion ? new Date(b.siguienteEvaluacion.split('-').reverse().join('-')).getTime() : 0;
          break;
        case 'estado':
          const estadoOrder = { 'APROBADO': 3, 'CONDICIONAL': 2, 'NO APROBADO': 1 };
          aValue = estadoOrder[a.estado as keyof typeof estadoOrder] || 0;
          bValue = estadoOrder[b.estado as keyof typeof estadoOrder] || 0;
          break;
        case 'evaluacion':
          aValue = a.evaluacion;
          bValue = b.evaluacion;
          break;
        default:
          aValue = a.evaluacion;
          bValue = b.evaluacion;
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

  const filteredProveedores = getFilteredAndSortedProveedores();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredProveedores.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentProveedores = filteredProveedores.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditProveedor = (proveedorId: string) => {
    // TODO: Implementar edición de proveedor
    console.log('Edit proveedor:', proveedorId);
  };

  const handleNewProveedor = () => {
    // TODO: Implementar creación de nuevo proveedor
    console.log('Create new proveedor');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'APROBADO':
        return <Badge variant="outline" className="text-white bg-green-600 border-green-600">APROBADO</Badge>;
      case 'CONDICIONAL':
        return <Badge variant="outline" className="text-white bg-orange-600 border-orange-600">CONDICIONAL</Badge>;
      case 'NO APROBADO':
        return <Badge variant="outline" className="text-white bg-red-600 border-red-600">NO APROBADO</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getEvaluacionBadge = (evaluacion: number) => {
    if (evaluacion >= 7.0) {
      return <Badge variant="outline" className="text-white bg-green-600 border-green-600">{evaluacion}</Badge>;
    } else if (evaluacion >= 5.0) {
      return <Badge variant="outline" className="text-white bg-yellow-600 border-yellow-600">{evaluacion}</Badge>;
    } else {
      return <Badge variant="outline" className="text-white bg-red-600 border-red-600">{evaluacion}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      const [day, month, year] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Proveedores
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              matriz de evaluaciones
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
            {/* Pestañas de navegación */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant={activeTab === "gestion-caracteristicas" ? "default" : "outline"}
                  onClick={() => setActiveTab("gestion-caracteristicas")}
                  className={activeTab === "gestion-caracteristicas" ? "bg-blue-600 text-white" : ""}
                >
                  Gestión de Características
                </Button>
                <Button
                  variant={activeTab === "gestion-proveedores" ? "default" : "outline"}
                  onClick={() => setActiveTab("gestion-proveedores")}
                  className={activeTab === "gestion-proveedores" ? "bg-green-600 text-white" : ""}
                >
                  Gestión de Proveedores
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="search" className="text-sm font-medium">
                  Buscar
                </Label>
                <Input
                  id="search"
                  placeholder="Buscar proveedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

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
              
              <Button onClick={handleNewProveedor} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo
              </Button>
            </div>

            {/* Tabla */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('rubro')}
                    >
                      <div className="flex items-center gap-2">
                        Rubro
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('proveedor')}
                    >
                      <div className="flex items-center gap-2">
                        Proveedor
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('ultimaEvaluacion')}
                    >
                      <div className="flex items-center gap-2">
                        Últ. Evaluación
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('siguienteEvaluacion')}
                    >
                      <div className="flex items-center gap-2">
                        Sig. Evaluación
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
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('evaluacion')}
                    >
                      <div className="flex items-center gap-2">
                        Evaluación
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProveedores.map((proveedor) => (
                    <TableRow key={proveedor.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {proveedor.rubro}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 max-w-xs">
                        <div className="space-y-1">
                          <button
                            className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                            title={`Ver detalles de ${proveedor.proveedor}`}
                          >
                            {proveedor.proveedor}
                          </button>
                          <div className="text-xs text-gray-500">
                            <div>CUIT: {proveedor.contacto.cuit}</div>
                            <div>Email: {proveedor.contacto.email}</div>
                            <div>Teléfono: {proveedor.contacto.telefono}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(proveedor.ultimaEvaluacion)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(proveedor.siguienteEvaluacion)}
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(proveedor.estado)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getEvaluacionBadge(proveedor.evaluacion)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {proveedor.id === '1' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Agregar"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Ver estadísticas"
                              >
                                <TrendingUp className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600 p-1"
                            title="Más opciones"
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
