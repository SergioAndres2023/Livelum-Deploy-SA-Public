import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Edit,
  BookOpen,
  MapPin,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Datos de configuración de ficha de proceso
const configuracionFichaData = {
  razonSocial: "Empresa de ejemplo",
  nombreFantasia: "Empresa de ejemplo"
};

// Opciones de configuración organizadas por categorías
const opcionesConfiguracion = [
  // Carátula
  {
    categoria: "Carátula",
    opciones: [
      { id: "caratula-autoridad", label: "Carátula: Autoridad", checked: true },
      { id: "caratula-organizacion", label: "Carátula: Organización", checked: false },
      { id: "caratula-responsable", label: "Carátula: Responsable", checked: true },
      { id: "caratula-tipo", label: "Carátula: Tipo", checked: false },
      { id: "caratula-turnos", label: "Carátula: Turnos", checked: false }
    ]
  },
  // Registros del proceso
  {
    categoria: "Registros del proceso",
    opciones: [
      { id: "registros-adjuntos", label: "Registros del proceso: Adjuntos", checked: true },
      { id: "registros-detalle", label: "Registros del proceso: Detalle", checked: true }
    ]
  },
  // Características
  {
    categoria: "Características",
    opciones: [
      { id: "caracteristicas-detalle", label: "Características: Detalle de las características", checked: true }
    ]
  },
  // Flujograma
  {
    categoria: "Flujograma",
    opciones: [
      { id: "flujograma-detalle", label: "Flujograma: Detalle del flujograma", checked: false },
      { id: "flujograma-flujogramas", label: "Flujograma: Flujogramas", checked: true }
    ]
  },
  // Documentos del proceso
  {
    categoria: "Documentos del proceso",
    opciones: [
      { id: "documentos-proceso", label: "Documentos del proceso: Documentos del proceso", checked: true }
    ]
  },
  // Recursos humanos
  {
    categoria: "Recursos humanos",
    opciones: [
      { id: "recursos-humanos", label: "Recursos humanos: Recursos humanos", checked: true }
    ]
  },
  // Riesgos / Oportunidades
  {
    categoria: "Riesgos / Oportunidades",
    opciones: [
      { id: "riesgos-oportunidades", label: "Riesgos / Oportunidades: Riesgos / Oportunidades", checked: true }
    ]
  },
  // Indicadores del proceso
  {
    categoria: "Indicadores del proceso",
    opciones: [
      { id: "indicadores-proceso", label: "Indicadores del proceso: Indicadores del proceso", checked: true }
    ]
  },
  // Documentos asociados
  {
    categoria: "Documentos asociados",
    opciones: [
      { id: "documentos-asociados", label: "Documentos asociados: Documentos asociados", checked: true }
    ]
  },
  // Documentos externos
  {
    categoria: "Documentos externos",
    opciones: [
      { id: "documentos-externos", label: "Documentos externos: Documentos externos", checked: true }
    ]
  },
  // Equipos y Sistemas
  {
    categoria: "Equipos y Sistemas",
    opciones: [
      { id: "equipos-sistemas", label: "Equipos y Sistemas: Equipos y Sistemas", checked: true }
    ]
  }
];

export default function FichaProcesos() {
  const [razonSocial, setRazonSocial] = useState(configuracionFichaData.razonSocial);
  const [nombreFantasia, setNombreFantasia] = useState(configuracionFichaData.nombreFantasia);
  const [opciones, setOpciones] = useState(opcionesConfiguracion);
  const [detalleExpanded, setDetalleExpanded] = useState(true);

  const handleSave = () => {
    // TODO: Implementar guardado de configuración
    console.log('Guardar configuración:', {
      razonSocial,
      nombreFantasia,
      opciones
    });
  };

  const handleSelectAll = () => {
    const opcionesActualizadas = opciones.map(categoria => ({
      ...categoria,
      opciones: categoria.opciones.map(opcion => ({
        ...opcion,
        checked: true
      }))
    }));
    setOpciones(opcionesActualizadas);
  };

  const handleDeselectAll = () => {
    const opcionesActualizadas = opciones.map(categoria => ({
      ...categoria,
      opciones: categoria.opciones.map(opcion => ({
        ...opcion,
        checked: false
      }))
    }));
    setOpciones(opcionesActualizadas);
  };

  const handleOptionChange = (categoriaIndex: number, opcionIndex: number, checked: boolean) => {
    const opcionesActualizadas = [...opciones];
    opcionesActualizadas[categoriaIndex].opciones[opcionIndex].checked = checked;
    setOpciones(opcionesActualizadas);
  };

  const handleIrAlMapa = () => {
    // TODO: Implementar navegación al mapa de procesos
    console.log('Ir al mapa de procesos');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Configuración de ficha de proceso
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              modificación
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

        {/* Enlace al mapa de procesos */}
        <div className="mb-6">
          <Button 
            onClick={handleIrAlMapa}
            variant="link"
            className="p-0 h-auto text-blue-600 hover:text-blue-800"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Ir al mapa de procesos
          </Button>
        </div>

        {/* Formulario principal */}
        <Card>
          <CardContent className="p-6">
            {/* Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="razon-social" className="text-sm font-medium">
                  Razón social *
                </Label>
                <Input
                  id="razon-social"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  placeholder="Ingrese la razón social"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre-fantasia" className="text-sm font-medium">
                  Nombre de fantasía *
                </Label>
                <Input
                  id="nombre-fantasia"
                  value={nombreFantasia}
                  onChange={(e) => setNombreFantasia(e.target.value)}
                  placeholder="Ingrese el nombre de fantasía"
                />
              </div>
            </div>

            {/* Sección Detalle */}
            <Card className="bg-gray-50 border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Detalle</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDetalleExpanded(!detalleExpanded)}
                    className="p-1"
                  >
                    {detalleExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              {detalleExpanded && (
                <CardContent className="pt-0">
                  {/* Controles de selección */}
                  <div className="flex items-center justify-end gap-4 mb-6">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleSelectAll}
                      className="p-0 h-auto text-blue-600 hover:text-blue-800"
                    >
                      Seleccionar todo
                    </Button>
                    <span className="text-gray-400">/</span>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleDeselectAll}
                      className="p-0 h-auto text-blue-600 hover:text-blue-800"
                    >
                      Deseleccionar todo
                    </Button>
                  </div>

                  {/* Grid de opciones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {opciones.map((categoria, categoriaIndex) => (
                      <div key={categoria.categoria} className="space-y-3">
                        {categoria.opciones.map((opcion, opcionIndex) => (
                          <div key={opcion.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={opcion.id}
                              checked={opcion.checked}
                              onCheckedChange={(checked) => 
                                handleOptionChange(categoriaIndex, opcionIndex, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={opcion.id}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {opcion.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Barra de desplazamiento horizontal simulada */}
                  <div className="mt-6">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gray-400 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Botón Guardar */}
            <div className="flex justify-end mt-8">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                Guardar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
