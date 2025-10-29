import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit,
  FileText,
  Calendar
} from "lucide-react";

export default function HallazgoNuevo() {
  const [activeTab, setActiveTab] = useState("caratula");
  const [formData, setFormData] = useState({
    proceso: '',
    fechaEmision: '13/10/2025',
    origen: '',
    tipo: '',
    hallazgosRelacionados: '',
    auditoriasRelacionadas: '',
    resumen: '',
    realizadoPor: 'Margarita Romero',
    actoresInvolucrados: '',
    fechaDeteccion: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.resumen.trim()) {
      newErrors.resumen = 'Completa este campo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Guardar hallazgo:', formData);
    }
  };

  const handleSaveAndExit = () => {
    if (validateForm()) {
      console.log('Guardar y salir:', formData);
    }
  };

  const handleCancel = () => {
    console.log('Cancelar');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Gestión de Hallazgo
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              nuevo
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
            <button 
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              title="Documento"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Información Superior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="proceso">Proceso *</Label>
                <Select value={formData.proceso} onValueChange={(value) => handleInputChange('proceso', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comunicacion-institucional">Comunicación institucional</SelectItem>
                    <SelectItem value="direccion-estrategica">Dirección estratégica</SelectItem>
                    <SelectItem value="procesos-apoyo-legales">PROCESOS DE APOYO &gt; Legales</SelectItem>
                    <SelectItem value="procesos-apoyo-rrhh">PROCESOS DE APOYO &gt; Gestion de RRHH</SelectItem>
                    <SelectItem value="procesos-apoyo-sistemas">PROCESOS DE APOYO &gt; SISTEMAS</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="compras">Compras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fecha-emision">Fecha de emisión *</Label>
                <div className="relative">
                  <Input
                    id="fecha-emision"
                    type="date"
                    value={formData.fechaEmision}
                    onChange={(e) => handleInputChange('fechaEmision', e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Pestañas */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-transparent border-b border-gray-200 p-0 h-auto">
                <TabsTrigger 
                  value="caratula"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Carátula
                </TabsTrigger>
                <TabsTrigger 
                  value="reporte"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Reporte
                </TabsTrigger>
                <TabsTrigger 
                  value="accion-contencion"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Acción de contención
                </TabsTrigger>
                <TabsTrigger 
                  value="analisis-causas"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Análisis de causas
                </TabsTrigger>
                <TabsTrigger 
                  value="acciones"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Acciones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="caratula" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="origen">Origen *</Label>
                      <Select value={formData.origen} onValueChange={(value) => handleInputChange('origen', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione origen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auditoria-externa">Auditoria externa</SelectItem>
                          <SelectItem value="auditoria-interna">Auditoria interna</SelectItem>
                          <SelectItem value="interno">Interno</SelectItem>
                          <SelectItem value="reclamo-cliente">Reclamo de cliente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo *</Label>
                      <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oportunidad-mejora">Oportunidad de mejora</SelectItem>
                          <SelectItem value="no-conformidad">No conformidad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="hallazgos-relacionados">Hallazgos relacionados</Label>
                      <Input
                        id="hallazgos-relacionados"
                        placeholder="Hallazgos relacionados"
                        value={formData.hallazgosRelacionados}
                        onChange={(e) => handleInputChange('hallazgosRelacionados', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="auditorias-relacionadas">Auditorias relacionadas</Label>
                      <Input
                        id="auditorias-relacionadas"
                        placeholder="Auditorias relacionadas"
                        value={formData.auditoriasRelacionadas}
                        onChange={(e) => handleInputChange('auditoriasRelacionadas', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resumen">Resumen *</Label>
                    <Textarea
                      id="resumen"
                      placeholder="Resumen"
                      value={formData.resumen}
                      onChange={(e) => handleInputChange('resumen', e.target.value)}
                      className={errors.resumen ? 'border-red-500' : ''}
                      rows={4}
                    />
                    {errors.resumen && (
                      <p className="text-red-500 text-sm">{errors.resumen}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="realizado-por">Realizado por *</Label>
                      <Input
                        id="realizado-por"
                        value={formData.realizadoPor}
                        onChange={(e) => handleInputChange('realizadoPor', e.target.value)}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="actores-involucrados">Actores involucrados</Label>
                      <Input
                        id="actores-involucrados"
                        placeholder="Actores involucrados"
                        value={formData.actoresInvolucrados}
                        onChange={(e) => handleInputChange('actoresInvolucrados', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fecha-deteccion">Fecha de detección *</Label>
                    <div className="relative">
                      <Input
                        id="fecha-deteccion"
                        type="date"
                        value={formData.fechaDeteccion}
                        onChange={(e) => handleInputChange('fechaDeteccion', e.target.value)}
                        className="pl-10"
                      />
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reporte" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Contenido de la pestaña Reporte</p>
                  <p className="text-sm">Esta sección estará disponible próximamente</p>
                </div>
              </TabsContent>

              <TabsContent value="accion-contencion" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Contenido de la pestaña Acción de contención</p>
                  <p className="text-sm">Esta sección estará disponible próximamente</p>
                </div>
              </TabsContent>

              <TabsContent value="analisis-causas" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Contenido de la pestaña Análisis de causas</p>
                  <p className="text-sm">Esta sección estará disponible próximamente</p>
                </div>
              </TabsContent>

              <TabsContent value="acciones" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Contenido de la pestaña Acciones</p>
                  <p className="text-sm">Esta sección estará disponible próximamente</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Botones de Acción */}
            <div className="flex items-center gap-4 pt-6 border-t mt-8">
              <Button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Guardar
              </Button>
              <Button 
                onClick={handleSaveAndExit}
                className="bg-green-600 hover:bg-green-700"
              >
                Guardar y Salir
              </Button>
              <Button 
                onClick={handleCancel}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
