import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Plus, 
  Edit, 
  BookOpen, 
  Upload,
  ChevronDown,
  Minus,
  X
} from "lucide-react";
import FileUpload from "@/components/FileUpload";

// Datos de ejemplo para puestos
const availablePositions = [
  {
    id: 'responsable-sg',
    title: 'Responsable de SG',
    description: 'Tiene a su cargo la administración del SG de una empresa en particular'
  },
  {
    id: 'direccion',
    title: 'Dirección',
    description: 'Gestión estratégica de la organización'
  },
  {
    id: 'asistente-admin',
    title: 'Asistente administrativo',
    description: 'Analista de Facturación y Cobranzas'
  },
  {
    id: 'consultores',
    title: 'Consultores',
    description: 'Consultores especializados'
  },
  {
    id: 'administracion',
    title: 'Administración',
    description: 'Tiene a su cargo la administración del SG de Empresa'
  }
];

// Datos de ejemplo para habilidades
const availableSkills = [
  {
    id: 'auditorias-internas',
    title: 'Auditorías Internas',
    position: 'Responsable de SG',
    desired: 'Genera/Instruye'
  },
  {
    id: 'gestion-documental',
    title: 'Gestión Documental',
    position: 'Responsable de SG',
    desired: 'Sin supervisión'
  },
  {
    id: 'hallazgos-mejoras',
    title: 'Hallazgos y Mejoras',
    position: 'Asistente administrativo',
    desired: 'Con supervisión'
  }
];

interface PersonalFormData {
  // Datos básicos
  photo: string;
  name: string;
  lastName: string;
  
  // Datos personales
  document: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  
  // Datos de empleado
  isActive: boolean;
  positions: string[];
  
  // Polivalencias
  skills: Record<string, string>;
  
  // Formación
  training: Array<{
    id: string;
    title: string;
    institution: string;
    date: string;
  }>;
  
  // Experiencia
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  
  // Educación
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
  }>;
  
  // Licencias
  licenses: Array<{
    id: string;
    name: string;
    number: string;
    expiryDate: string;
  }>;
  
  // Archivos
  files: File[];
}

export default function PersonalNew() {
  const navigate = useNavigate();
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  
  const form = useForm<PersonalFormData>({
    defaultValues: {
      photo: '',
      name: '',
      lastName: '',
      document: '',
      email: '',
      secondaryEmail: '',
      phone: '',
      isActive: true,
      positions: [],
      skills: {},
      training: [],
      experience: [],
      education: [],
      licenses: [],
      files: []
    }
  });

  const onSubmit = (data: PersonalFormData) => {
    console.log('Datos del formulario:', data);
    // TODO: Implementar guardado
    navigate('/personal/listado');
  };

  const handlePositionToggle = (positionId: string) => {
    setSelectedPositions(prev => {
      if (prev.includes(positionId)) {
        return prev.filter(id => id !== positionId);
      } else {
        return [...prev, positionId];
      }
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions(availablePositions.map(p => p.id));
    }
    setIsSelectAll(!isSelectAll);
  };

  const addTraining = () => {
    const currentTraining = form.getValues('training');
    form.setValue('training', [
      ...currentTraining,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        institution: '',
        date: ''
      }
    ]);
  };

  const removeTraining = (id: string) => {
    const currentTraining = form.getValues('training');
    form.setValue('training', currentTraining.filter(t => t.id !== id));
  };

  const addExperience = () => {
    const currentExperience = form.getValues('experience');
    form.setValue('experience', [
      ...currentExperience,
      {
        id: Math.random().toString(36).substr(2, 9),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const removeExperience = (id: string) => {
    const currentExperience = form.getValues('experience');
    form.setValue('experience', currentExperience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const currentEducation = form.getValues('education');
    form.setValue('education', [
      ...currentEducation,
      {
        id: Math.random().toString(36).substr(2, 9),
        degree: '',
        institution: '',
        year: ''
      }
    ]);
  };

  const removeEducation = (id: string) => {
    const currentEducation = form.getValues('education');
    form.setValue('education', currentEducation.filter(e => e.id !== id));
  };

  const addLicense = () => {
    const currentLicenses = form.getValues('licenses');
    form.setValue('licenses', [
      ...currentLicenses,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        number: '',
        expiryDate: ''
      }
    ]);
  };

  const removeLicense = (id: string) => {
    const currentLicenses = form.getValues('licenses');
    form.setValue('licenses', currentLicenses.filter(l => l.id !== id));
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Personal nuevo
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Crear nuevo registro de personal
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
              title="Documentación"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Sección de Foto */}
                <div className="space-y-2">
                  <Label htmlFor="photo">Foto</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="photo"
                      placeholder="URL de la foto"
                      {...form.register('photo')}
                      className="flex-1"
                    />
                    <Button type="button" size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: "El apellido es obligatorio" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido *</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tabs */}
                <Tabs defaultValue="datos-personales" className="w-full">
                  <TabsList className="grid w-full grid-cols-8 bg-transparent p-0 h-auto">
                    <TabsTrigger 
                      value="datos-personales"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Datos personales
                    </TabsTrigger>
                    <TabsTrigger 
                      value="datos-empleado"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Datos de empleado
                    </TabsTrigger>
                    <TabsTrigger 
                      value="polivalencias"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Polivalencias
                    </TabsTrigger>
                    <TabsTrigger 
                      value="formacion"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Formación
                    </TabsTrigger>
                    <TabsTrigger 
                      value="experiencia"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Experiencia
                    </TabsTrigger>
                    <TabsTrigger 
                      value="educacion"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Educación
                    </TabsTrigger>
                    <TabsTrigger 
                      value="licencias"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Licencias
                    </TabsTrigger>
                    <TabsTrigger 
                      value="archivos"
                      className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                    >
                      Archivos
                    </TabsTrigger>
                  </TabsList>

                  {/* Datos Personales */}
                  <TabsContent value="datos-personales" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CUIT / CUIL / Pasaporte</FormLabel>
                            <FormControl>
                              <Input placeholder="Documento" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "El email es obligatorio" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="email@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="secondaryEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email secundario</FormLabel>
                            <FormControl>
                              <Input placeholder="email-secundario@ejemplo.com" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="+54 11 1234-5678" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  {/* Datos de Empleado */}
                  <TabsContent value="datos-empleado" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Label htmlFor="isActive">Personal activo en la empresa *</Label>
                      </div>
                    </div>

                    {/* Puestos Asignados */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Puestos asignados</CardTitle>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <button 
                            type="button"
                            onClick={handleSelectAll}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            {isSelectAll ? 'Deseleccionar todo' : 'Seleccionar todo'}
                          </button>
                        </div>
                        
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {availablePositions.map((position) => (
                            <div key={position.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                              <Checkbox
                                id={position.id}
                                checked={selectedPositions.includes(position.id)}
                                onCheckedChange={() => handlePositionToggle(position.id)}
                              />
                              <div className="flex-1">
                                <Label 
                                  htmlFor={position.id}
                                  className="font-medium cursor-pointer"
                                >
                                  {position.title}
                                </Label>
                                <p className="text-sm text-gray-600 mt-1">
                                  {position.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Polivalencias */}
                  <TabsContent value="polivalencias" className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Título de la habilidad</th>
                                <th className="text-left p-2">Puesto que requiere</th>
                                <th className="text-left p-2">Conocimiento deseable</th>
                                <th className="text-left p-2">Conocimiento actual del empleado</th>
                              </tr>
                            </thead>
                            <tbody>
                              {availableSkills.length > 0 ? (
                                availableSkills.map((skill) => (
                                  <tr key={skill.id} className="border-b">
                                    <td className="p-2">{skill.title}</td>
                                    <td className="p-2">{skill.position}</td>
                                    <td className="p-2">{skill.desired}</td>
                                    <td className="p-2">
                                      <select className="border rounded px-2 py-1">
                                        <option value="">Seleccionar</option>
                                        <option value="0">No aplica</option>
                                        <option value="1">Capacitación</option>
                                        <option value="2">Con supervisión</option>
                                        <option value="3">Sin supervisión</option>
                                        <option value="4">Genera/Instruye</option>
                                      </select>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={4} className="text-center py-8 text-gray-500">
                                    No hay habilidades requeridas para los puestos seleccionados.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Formación */}
                  <TabsContent value="formacion" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Cursos y Trayectos Formativos</CardTitle>
                          <Button type="button" onClick={addTraining} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar formación
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {form.watch('training').map((training, index) => (
                          <div key={training.id} className="flex items-center gap-2 mb-4 p-3 border rounded-lg">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Input placeholder="Título del curso" />
                              <Input placeholder="Institución" />
                              <Input type="date" />
                            </div>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeTraining(training.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {form.watch('training').length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No hay formación agregada
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Experiencia */}
                  <TabsContent value="experiencia" className="space-y-4">
                    <div className="space-y-4">
                      {/* Experiencias */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Experiencias</CardTitle>
                            <Button type="button" onClick={addExperience} size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Agregar experiencia
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {form.watch('experience').map((exp, index) => (
                            <Card key={exp.id} className="mb-4">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-medium">Experiencia {index + 1}</h4>
                                  <Button 
                                    type="button"
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeExperience(exp.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                                
                                {/* Campos de la experiencia */}
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Empresa</Label>
                                      <Input placeholder="Nombre de la empresa" />
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Puesto</Label>
                                      <Input placeholder="Cargo o puesto" />
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Fecha inicio</Label>
                                      <Input type="date" />
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Fecha fin</Label>
                                      <Input type="date" />
                                    </div>
                                  </div>
                                  
                                  {/* Descripción de la experiencia */}
                                  <div>
                                    <Label className="text-sm font-medium">Descripción</Label>
                                    <Textarea
                                      placeholder="Describe las responsabilidades, logros y detalles de esta experiencia..."
                                      className="min-h-[120px] text-sm mt-1"
                                      rows={5}
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          {form.watch('experience').length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              No hay experiencias agregadas
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      {/* Evidencia documental */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Evidencia documental</h4>
                            <Button type="button" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Agregar documento
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Educación */}
                  <TabsContent value="educacion" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Educación formal</CardTitle>
                          <Button type="button" onClick={addEducation} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar educación
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {form.watch('education').map((edu, index) => (
                          <div key={edu.id} className="flex items-center gap-2 mb-4 p-3 border rounded-lg">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Input placeholder="Título/Carrera" />
                              <Input placeholder="Institución" />
                              <Input placeholder="Año" />
                            </div>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {form.watch('education').length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No hay educación agregada
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Licencias */}
                  <TabsContent value="licencias" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Licencias</CardTitle>
                          <Button type="button" onClick={addLicense} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar licencia
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {form.watch('licenses').map((license, index) => (
                          <div key={license.id} className="flex items-center gap-2 mb-4 p-3 border rounded-lg">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Input placeholder="Nombre de la licencia" />
                              <Input placeholder="Número" />
                              <Input type="date" placeholder="Fecha de vencimiento" />
                            </div>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeLicense(license.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {form.watch('licenses').length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No hay licencias agregadas
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Archivos */}
                  <TabsContent value="archivos" className="space-y-4">
                    <FileUpload
                      onFilesUploaded={(files) => {
                        form.setValue('files', files);
                      }}
                      acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']}
                      maxFileSize={20}
                      maxFiles={10}
                    />
                  </TabsContent>
                </Tabs>

                {/* Botones de acción */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => navigate('/personal/listado')}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Guardar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
