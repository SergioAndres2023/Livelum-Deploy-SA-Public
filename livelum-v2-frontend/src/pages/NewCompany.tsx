import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit,
  Upload,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  Subscript,
  Superscript,
  Table,
  Link,
  Image,
  Video,
  Code,
  HelpCircle
} from "lucide-react";

export default function EmpresaNuevo() {
  const [activeTab, setActiveTab] = useState("bienvenida");
  const [formData, setFormData] = useState({
    razonSocial: '',
    nombreFantasia: '',
    cuit: '',
    logo: '',
    textoBienvenida: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Guardar empresa:', formData);
  };

  const handleSaveAndExit = () => {
    console.log('Guardar y salir:', formData);
  };

  const handleCancel = () => {
    console.log('Cancelar');
  };

  const handleUploadLogo = () => {
    console.log('Subir logo');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Empresa
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
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Información de la empresa */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="razonSocial">Razón social *</Label>
                  <Input
                    id="razonSocial"
                    placeholder="Razón social"
                    value={formData.razonSocial}
                    onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nombreFantasia">Nombre de fantasía *</Label>
                  <Input
                    id="nombreFantasia"
                    placeholder="Nombre de fantasía"
                    value={formData.nombreFantasia}
                    onChange={(e) => handleInputChange('nombreFantasia', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuit">CUIT *</Label>
                <Input
                  id="cuit"
                  placeholder="CUIT"
                  value={formData.cuit}
                  onChange={(e) => handleInputChange('cuit', e.target.value)}
                />
              </div>
            </div>

            {/* Pestañas de configuración */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-transparent border-b border-gray-200 p-0 h-auto">
                <TabsTrigger 
                  value="bienvenida"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Bienvenida al sistema
                </TabsTrigger>
                <TabsTrigger 
                  value="copiar-configuracion"
                  className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  Copiar configuración
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bienvenida" className="mt-6">
                <div className="space-y-6">
                  {/* Logo */}
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo (se muestra en la bienvenida)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="logo"
                        placeholder="Seleccionar archivo..."
                        value={formData.logo}
                        onChange={(e) => handleInputChange('logo', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleUploadLogo}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Editor de texto enriquecido */}
                  <div className="space-y-2">
                    <Label htmlFor="textoBienvenida">Texto de bienvenida</Label>
                    
                    {/* Toolbar del editor */}
                    <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex items-center gap-2 flex-wrap">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-yellow-100">
                          <span className="text-xs font-bold">A</span>
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                        <select className="text-xs border-0 bg-transparent focus:outline-none">
                          <option>Source Sans Pro</option>
                        </select>
                        <select className="text-xs border-0 bg-transparent focus:outline-none">
                          <option>14</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <select className="text-xs border-0 bg-transparent focus:outline-none">
                          <option>T</option>
                        </select>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Underline className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Strikethrough className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <List className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ListOrdered className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <AlignRight className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <AlignJustify className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Outdent className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Indent className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Subscript className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Superscript className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Table className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Link className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Image className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 border-l border-gray-300 pl-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Code className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <HelpCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Área de texto */}
                    <Textarea
                      id="textoBienvenida"
                      placeholder="Escribir texto de bienvenida..."
                      value={formData.textoBienvenida}
                      onChange={(e) => handleInputChange('textoBienvenida', e.target.value)}
                      className="border-t-0 rounded-t-none min-h-[200px] resize-none"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="copiar-configuracion" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <Edit className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Contenido de la pestaña Copiar configuración</p>
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
