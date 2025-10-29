import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit,
  Upload,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export default function UsuarioNuevo() {
  // Estados para los datos personales
  const [foto, setFoto] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [emailSecundario, setEmailSecundario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [perfil, setPerfil] = useState("");
  
  // Estados para acceso al sistema
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [activo, setActivo] = useState(true);
  const [permisos, setPermisos] = useState<string[]>([]);

  const handleSave = () => {
    const usuarioData = {
      foto,
      nombre,
      apellido,
      documento,
      email,
      emailSecundario,
      telefono,
      direccion,
      fechaNacimiento,
      empresa,
      perfil,
      usuario,
      password,
      activo,
      permisos
    };
    console.log('Guardar usuario:', usuarioData);
  };

  const handleSaveAndExit = () => {
    handleSave();
    console.log('Guardar y salir');
  };

  const handleCancel = () => {
    console.log('Cancelar');
  };

  const handleUploadFoto = () => {
    console.log('Subir foto');
  };

  const togglePermiso = (permiso: string) => {
    setPermisos(prev => 
      prev.includes(permiso) 
        ? prev.filter(p => p !== permiso)
        : [...prev, permiso]
    );
  };

  const permisosDisponibles = [
    "Administrador",
    "Consultor",
    "Editor de Onboardings",
    "Gestión de Usuarios",
    "Gestión de Empresas",
    "Reportes",
    "Configuración"
  ];

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">
              Usuario nuevo
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
            <div className="space-y-6">
              {/* Campos básicos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Foto */}
                <div className="space-y-2">
                  <Label htmlFor="foto">Foto</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="foto"
                      placeholder="Seleccionar archivo..."
                      value={foto}
                      onChange={(e) => setFoto(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleUploadFoto}
                      className="px-3"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                {/* Apellido */}
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
              </div>

              {/* Pestañas */}
              <Tabs defaultValue="datos-personales" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="datos-personales"
                    className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                  >
                    Datos personales
                  </TabsTrigger>
                  <TabsTrigger 
                    value="acceso-sistema"
                    className="bg-transparent hover:text-blue-600 hover:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
                  >
                    Acceso al Sistema
                  </TabsTrigger>
                </TabsList>

                {/* Pestaña Datos personales */}
                <TabsContent value="datos-personales" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CUIT / CUIL / Pasaporte */}
                    <div className="space-y-2">
                      <Label htmlFor="documento">CUIT / CUIL / Pasaporte</Label>
                      <Input
                        id="documento"
                        placeholder="Documento"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Email secundario */}
                    <div className="space-y-2">
                      <Label htmlFor="email-secundario">Email secundario</Label>
                      <Input
                        id="email-secundario"
                        type="email"
                        placeholder="Email secundario"
                        value={emailSecundario}
                        onChange={(e) => setEmailSecundario(e.target.value)}
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Textarea
                        id="direccion"
                        placeholder="Dirección completa"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="space-y-2">
                      <Label htmlFor="fecha-nacimiento">Fecha de nacimiento</Label>
                      <Input
                        id="fecha-nacimiento"
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                      />
                    </div>

                    {/* Empresa */}
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Select value={empresa} onValueChange={setEmpresa}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empresa-ejemplo">Empresa de ejemplo</SelectItem>
                          <SelectItem value="ingferr">INGFERR - INGFERR SRL</SelectItem>
                          <SelectItem value="marolio">MAROLIO - MAROLIO S.A</SelectItem>
                          <SelectItem value="mingroup">MINGROUP - MINGROUP</SelectItem>
                          <SelectItem value="martinotti">MARTINOTTI Bolsas y Big Bags - MARTINOTTI</SelectItem>
                          <SelectItem value="baucru">Baucru S.A. - Baucru S.A.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Perfil */}
                    <div className="space-y-2">
                      <Label htmlFor="perfil">Perfil</Label>
                      <Select value={perfil} onValueChange={setPerfil}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administrador">Administrador</SelectItem>
                          <SelectItem value="consultor">Consultor</SelectItem>
                          <SelectItem value="editor-onboardings">Editor de Onboardings</SelectItem>
                          <SelectItem value="gestor-usuarios">Gestión de Usuarios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* Pestaña Acceso al Sistema */}
                <TabsContent value="acceso-sistema" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Usuario */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario">Usuario *</Label>
                      <Input
                        id="usuario"
                        placeholder="Nombre de usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={mostrarPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setMostrarPassword(!mostrarPassword)}
                        >
                          {mostrarPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Confirmar Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña *</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={mostrarConfirmPassword ? "text" : "password"}
                          placeholder="Confirmar contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                        >
                          {mostrarConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Estado activo */}
                    <div className="space-y-2">
                      <Label htmlFor="activo">Estado del usuario</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="activo"
                          checked={activo}
                          onCheckedChange={setActivo}
                        />
                        <Label htmlFor="activo" className="text-sm">
                          {activo ? "Activo" : "Inactivo"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Permisos */}
                  <div className="space-y-4">
                    <Label>Permisos del usuario</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {permisosDisponibles.map((permiso) => (
                        <div key={permiso} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={permiso}
                            checked={permisos.includes(permiso)}
                            onChange={() => togglePermiso(permiso)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <Label htmlFor={permiso} className="text-sm">
                            {permiso}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Cancelar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveAndExit}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Guardar y Salir
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Guardar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
