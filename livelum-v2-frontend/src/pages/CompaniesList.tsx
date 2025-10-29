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

// Datos de ejemplo para empresas (múltiples registros)
const empresasData = [
  { id: 1, razonSocial: "Empresa de ejemplo", nombreFantasia: "Empresa de ejemplo", cuit: "123" },
  { id: 2, razonSocial: "Grupo Ming", nombreFantasia: "Grupo Ming", cuit: "20221562624" },
  { id: 3, razonSocial: "Mytbel SA", nombreFantasia: "Mytbel", cuit: "30714595063" },
  { id: 4, razonSocial: "Agroprimus SA", nombreFantasia: "Agroprimus", cuit: "30708855770" },
  { id: 5, razonSocial: "Fundición Palazzo SRL", nombreFantasia: "Fundición Palazzo", cuit: "30707204245" },
  { id: 6, razonSocial: "Rotoe", nombreFantasia: "Rotoe", cuit: "20285761116" },
  { id: 7, razonSocial: "Rega SA", nombreFantasia: "Rega", cuit: "30543448628" },
  { id: 8, razonSocial: "MAROLIO S.A.", nombreFantasia: "MAROLIO", cuit: "30-71130359-2" },
  { id: 9, razonSocial: "Diego Coronel", nombreFantasia: "Diego Coronel", cuit: "20248261723" },
  { id: 10, razonSocial: "RURALES ALFA", nombreFantasia: "RURALES ALFA", cuit: "30-70884479-5" },
  { id: 11, razonSocial: "INGFERR SRL", nombreFantasia: "INGFERR", cuit: "33-71616521-9" },
  { id: 12, razonSocial: "MECFAR SRL", nombreFantasia: "MECFAR", cuit: "30-70797858-5" },
  { id: 13, razonSocial: "MARTINOTTI", nombreFantasia: "MARTINOTTI Bolsas y Big Bags", cuit: "20148534161" },
  { id: 14, razonSocial: "Termoplástica San Rafael SRL", nombreFantasia: "Termoplástica San Rafael", cuit: "30-63668564-6" },
  { id: 15, razonSocial: "Baucru SA", nombreFantasia: "Baucru", cuit: "30-71594608-0" },
  { id: 16, razonSocial: "Clínica Nórdica", nombreFantasia: "Clínica Nórdica", cuit: "20292487887" },
  { id: 17, razonSocial: "Mazin Industrial", nombreFantasia: "Mazin Industrial", cuit: "20-18303778-2" },
  { id: 18, razonSocial: "López Hnos.", nombreFantasia: "López Hnos.", cuit: "30503894072" },
  { id: 19, razonSocial: "Tíos bigotes", nombreFantasia: "Tíos bigotes", cuit: "30-71581343-9" },
  { id: 20, razonSocial: "Abelardo Pongolini", nombreFantasia: "Abelardo Pongolini", cuit: "30-71506454-1" },
  { id: 21, razonSocial: "Cafés Munanis", nombreFantasia: "Cafés Munanis", cuit: "30-70953218-5" },
  { id: 22, razonSocial: "Reductores MM", nombreFantasia: "Reductores MM", cuit: "33500625649" },
  { id: 23, razonSocial: "Neo-Plast", nombreFantasia: "Neo-Plast", cuit: "1" },
  { id: 24, razonSocial: "Polímeros de Santa Fe", nombreFantasia: "Polímeros de Santa Fe", cuit: "1" },
  { id: 25, razonSocial: "ERCROM SRL", nombreFantasia: "ERCROM", cuit: "1" },
  { id: 26, razonSocial: "EMERGENCIA MEDICA REGIONAL SRL", nombreFantasia: "EMERGENCIA MEDICA REGIONAL", cuit: "1" },
  { id: 27, razonSocial: "Innovación en sellos", nombreFantasia: "Innovación en sellos", cuit: "1" },
  { id: 28, razonSocial: "CAM CNC SAS", nombreFantasia: "CAM CNC", cuit: "1" },
  { id: 29, razonSocial: "M NAHMIAS SOCIEDAD ANÓNIMA", nombreFantasia: "M NAHMIAS", cuit: "1" }
];

export default function EmpresasListado() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Función para filtrar y ordenar empresas
  const getFilteredAndSortedEmpresas = () => {
    let filtered = empresasData;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombreFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cuit.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortBy) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'razonSocial':
          aValue = a.razonSocial.toLowerCase();
          bValue = b.razonSocial.toLowerCase();
          break;
        case 'nombreFantasia':
          aValue = a.nombreFantasia.toLowerCase();
          bValue = b.nombreFantasia.toLowerCase();
          break;
        case 'cuit':
          aValue = a.cuit.toLowerCase();
          bValue = b.cuit.toLowerCase();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
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

  const filteredEmpresas = getFilteredAndSortedEmpresas();

  // Paginación
  const recordsPerPageNum = parseInt(recordsPerPage);
  const totalPages = Math.ceil(filteredEmpresas.length / recordsPerPageNum);
  const startIndex = (currentPage - 1) * recordsPerPageNum;
  const endIndex = startIndex + recordsPerPageNum;
  const currentEmpresas = filteredEmpresas.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEditEmpresa = (empresaId: number) => {
    console.log('Edit empresa:', empresaId);
  };

  const handleNewEmpresa = () => {
    console.log('Create new empresa');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleIrAlListadoPerfiles = () => {
    console.log('Ir al listado de Perfiles');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Empresas listado
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
              
              <Button onClick={handleNewEmpresa} className="bg-green-600 hover:bg-green-700">
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
                  placeholder="Buscar empresas..."
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
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center gap-2">
                        #
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('razonSocial')}
                    >
                      <div className="flex items-center gap-2">
                        Razón social
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('nombreFantasia')}
                    >
                      <div className="flex items-center gap-2">
                        Nombre de fantasía
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('cuit')}
                    >
                      <div className="flex items-center gap-2">
                        CUIT
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmpresas.map((empresa) => (
                    <TableRow key={empresa.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {empresa.id}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {empresa.razonSocial}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {empresa.nombreFantasia}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {empresa.cuit}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEmpresa(empresa.id)}
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
