import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  FileText,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  RefreshCw
} from "lucide-react";

// Datos de ejemplo para los procesos
const procesosEstrategicos = [
  { nombre: "Gestión de Calidad", autorizado: "", pendiente: "", borrador: "v.2" }
];

const procesosFabricacion = [
  { nombre: "D&D", autorizado: "v.1", pendiente: "", borrador: "v.2" }
];

const procesosOperativos = [
  { nombre: "COMERCIAL", autorizado: "v.1", pendiente: "", borrador: "v.2" },
  { nombre: "Postventa", autorizado: "v.8", pendiente: "", borrador: "" },
  { nombre: "Reparaciones", autorizado: "", pendiente: "", borrador: "v.2" }
];

const procesosApoyo = [
  { nombre: "SISTEMAS", autorizado: "v.1", pendiente: "", borrador: "" },
  { nombre: "Legales", autorizado: "v.1", pendiente: "", borrador: "v.2" },
  { nombre: "Sistemas", autorizado: "", pendiente: "", borrador: "v.1" },
  { nombre: "Gestion de RRHH", autorizado: "v.2", pendiente: "", borrador: "" }
];

const partesInteresadas = [
  "Dirección",
  "Personal de la Organización",
  "Cámaras",
  "PROFESIONALES (consultores)",
  "convenios",
  "Proveedores",
  "Dirección"
];

export default function MapaProcesos() {
  const [selectedTab, setSelectedTab] = useState("nombres");

  const handleTiposProcesos = () => {
    console.log('Ir a Tipos de procesos');
  };

  const handleNombresProcesos = () => {
    console.log('Ir a Nombres de procesos');
  };

  const getVersionBadge = (version: string, type: 'autorizado' | 'pendiente' | 'borrador') => {
    if (!version) return null;
    
    const colorClass = {
      autorizado: 'bg-green-100 text-green-800',
      pendiente: 'bg-orange-100 text-orange-800',
      borrador: 'bg-blue-100 text-blue-800'
    }[type];

    return (
      <Badge className={`text-xs ${colorClass}`}>
        {version}
      </Badge>
    );
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Mapa de Procesos
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
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Documento"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedTab === "tipos" ? "outline" : "default"}
            onClick={() => {
              setSelectedTab("tipos");
              handleTiposProcesos();
            }}
            className={selectedTab === "tipos" ? "bg-white text-gray-700 border-gray-300" : "bg-green-600 text-white"}
          >
            Tipos de procesos
          </Button>
          <Button
            variant={selectedTab === "nombres" ? "default" : "outline"}
            onClick={() => {
              setSelectedTab("nombres");
              handleNombresProcesos();
            }}
            className={selectedTab === "nombres" ? "bg-green-600 text-white" : "bg-white text-gray-700 border-gray-300"}
          >
            Nombres de procesos
          </Button>
        </div>

        {/* Mapa de Procesos */}
        <div className="relative min-h-[800px]">
          {/* Partes Interesadas Izquierda */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <Card className="w-48 bg-blue-900 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-center">Partes interesadas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs space-y-1">
                  {partesInteresadas.map((parte, index) => (
                    <li key={index} className="text-center">{parte}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Flecha desde Partes Interesadas Izquierda */}
          <div className="absolute left-48 top-1/2 transform -translate-y-1/2 z-5">
            <ArrowRight className="w-8 h-8 text-orange-500" />
          </div>

          {/* Proceso de Mejora Continua */}
          <div className="absolute right-0 top-0 z-10">
            <Card className="w-48 bg-blue-900 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-center flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Proceso de mejora continua
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Flecha desde Procesos Estratégicos a Mejora Continua */}
          <div className="absolute right-48 top-20 z-5">
            <ArrowRight className="w-8 h-8 text-orange-500" />
          </div>

          {/* Flecha desde Mejora Continua a Procesos Estratégicos */}
          <div className="absolute right-48 top-0 z-5">
            <ArrowUp className="w-8 h-8 text-orange-500" />
          </div>

          {/* Contenedor Central */}
          <div className="mx-48 space-y-4">
            {/* PROCESOS ESTRATÉGICOS */}
            <Card className="border-2 border-green-600">
              <CardHeader className="bg-green-600 text-white pb-2">
                <CardTitle className="text-lg font-bold text-center">PROCESOS ESTRATÉGICOS</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="bg-green-100 p-3 mb-4 rounded">
                  <div className="text-sm font-medium text-green-800 text-center">
                    Análisis de contexto • Partes Interesadas • Gestión de Riesgos • Objetivos • Revisión por la Dirección
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Versiones de las fichas</TableHead>
                      <TableHead className="text-center">Autorizado</TableHead>
                      <TableHead className="text-center">Pendiente</TableHead>
                      <TableHead className="text-center">Borrador</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procesosEstrategicos.map((proceso, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{proceso.nombre}</TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.autorizado, 'autorizado')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.pendiente, 'pendiente')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.borrador, 'borrador')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Flecha hacia abajo */}
            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-orange-500" />
            </div>

            {/* PROCESOS DE FABRICACIÓN */}
            <Card className="border-2 border-orange-500">
              <CardHeader className="bg-orange-500 text-white pb-2">
                <CardTitle className="text-lg font-bold text-center">PROCESOS DE FABRICACIÓN</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Versiones de las fichas</TableHead>
                      <TableHead className="text-center">Autorizado</TableHead>
                      <TableHead className="text-center">Pendiente</TableHead>
                      <TableHead className="text-center">Borrador</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procesosFabricacion.map((proceso, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{proceso.nombre}</TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.autorizado, 'autorizado')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.pendiente, 'pendiente')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.borrador, 'borrador')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Flecha hacia abajo */}
            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-orange-500" />
            </div>

            {/* PROCESOS OPERATIVOS */}
            <Card className="border-2 border-orange-500">
              <CardHeader className="bg-orange-500 text-white pb-2">
                <CardTitle className="text-lg font-bold text-center">PROCESOS OPERATIVOS</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Versiones de las fichas</TableHead>
                      <TableHead className="text-center">Autorizado</TableHead>
                      <TableHead className="text-center">Pendiente</TableHead>
                      <TableHead className="text-center">Borrador</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procesosOperativos.map((proceso, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{proceso.nombre}</TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.autorizado, 'autorizado')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.pendiente, 'pendiente')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.borrador, 'borrador')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Flecha hacia abajo */}
            <div className="flex justify-center">
              <ArrowDown className="w-8 h-8 text-orange-500" />
            </div>

            {/* PROCESOS DE APOYO */}
            <Card className="border-2 border-orange-500">
              <CardHeader className="bg-orange-500 text-white pb-2">
                <CardTitle className="text-lg font-bold text-center">PROCESOS DE APOYO</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Versiones de las fichas</TableHead>
                      <TableHead className="text-center">Autorizado</TableHead>
                      <TableHead className="text-center">Pendiente</TableHead>
                      <TableHead className="text-center">Borrador</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procesosApoyo.map((proceso, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{proceso.nombre}</TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.autorizado, 'autorizado')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.pendiente, 'pendiente')}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVersionBadge(proceso.borrador, 'borrador')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Partes Interesadas Derecha */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <Card className="w-48 bg-blue-900 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-center">Partes interesadas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs space-y-1">
                  {partesInteresadas.map((parte, index) => (
                    <li key={index} className="text-center">{parte}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Flecha hacia Partes Interesadas Derecha */}
          <div className="absolute right-48 top-1/2 transform -translate-y-1/2 z-5">
            <ArrowRight className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
