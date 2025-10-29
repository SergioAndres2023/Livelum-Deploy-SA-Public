import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Edit,
  Upload,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export default function MiPerfil() {
  const [formData, setFormData] = useState({
    foto: '',
    password: '••••••',
    email: 'maggieromero10@gmail.com',
    telefono: '',
    nombreUsuario: 'maggie',
    nombre: 'Margarita',
    apellido: 'Romero',
    emailSecundario: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordLocked, setIsPasswordLocked] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordLockToggle = () => {
    setIsPasswordLocked(!isPasswordLocked);
  };

  const handleSave = () => {
    console.log('Guardar perfil:', formData);
  };

  const handleSaveAndExit = () => {
    console.log('Guardar y salir:', formData);
  };

  const handleCancel = () => {
    console.log('Cancelar');
  };

  const handleUploadPhoto = () => {
    console.log('Subir foto');
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Usuario
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
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Formulario en dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna Izquierda */}
              <div className="space-y-6">
                {/* Foto */}
                <div className="space-y-2">
                  <Label htmlFor="foto">Foto</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="foto"
                      placeholder="Seleccionar archivo..."
                      value={formData.foto}
                      onChange={(e) => handleInputChange('foto', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleUploadPhoto}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={isPasswordLocked}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePasswordToggle}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePasswordLockToggle}
                      className="text-orange-500 hover:text-orange-700"
                    >
                      <Lock className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    placeholder="Telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                  />
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-6">
                {/* Nombre de usuario */}
                <div className="space-y-2">
                  <Label htmlFor="nombreUsuario">Nombre de usuario *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="nombreUsuario"
                      value={formData.nombreUsuario}
                      onChange={(e) => handleInputChange('nombreUsuario', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-500 hover:text-orange-700"
                    >
                      <Lock className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                  />
                </div>

                {/* Apellido */}
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                  />
                </div>

                {/* Email secundario */}
                <div className="space-y-2">
                  <Label htmlFor="emailSecundario">Email secundario</Label>
                  <Input
                    id="emailSecundario"
                    type="email"
                    placeholder="Email secundario"
                    value={formData.emailSecundario}
                    onChange={(e) => handleInputChange('emailSecundario', e.target.value)}
                  />
                </div>
              </div>
            </div>

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
