import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  fullName: z.string().min(2, "Nombre completo requerido"),
  username: z.string().min(6, "Usuario debe tener al menos 6 caracteres (se usará como contraseña inicial)"),
  position: z.string().min(2, "Posición requerida"),
  profileId: z.string(),
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
      position: "",
      profileId: "3", // Usuario por defecto
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      // Password inicial = username (según briefing)
      // Asegurar que la contraseña tenga al menos 6 caracteres (requisito de Supabase)
      const initialPassword = values.username.length >= 6 
        ? values.username
        : values.username + "123"; // Agregar caracteres si es muy corta
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: initialPassword,
        options: {
          data: {
            username: values.username,
            full_name: values.fullName,
            position: values.position,
            profile_id: values.profileId,
          },
        },
      });

      if (error) {
        if (isMountedRef.current) {
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Error de registro",
            description: error.message || "No se pudo crear el usuario. Verifica que el email no esté en uso.",
          });
        }
        return;
      }

      // Navegar inmediatamente con mensaje de éxito en el estado
      if (isMountedRef.current) {
        setIsLoading(false);
        // Navegar con el mensaje en el estado para evitar problemas de renderizado
        navigate("/login", { 
          replace: true,
          state: { 
            registered: true, 
            username: values.username,
            message: `Usuario registrado exitosamente. Contraseña inicial: ${values.username}`
          } 
        });
      }
    } catch (error) {
      console.error("Error en registro:", error);
      if (isMountedRef.current) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-elevated border-0">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="text-2xl font-semibold">Registro</CardTitle>
                <CardDescription>
                  Crear nueva cuenta en el sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="tu@empresa.com"
                          disabled={isLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Juan Pérez"
                          disabled={isLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="jperez"
                          disabled={isLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        La contraseña inicial será igual al nombre de usuario (mínimo 6 caracteres)
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Posición</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Analista de Procesos"
                          disabled={isLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profileId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perfil</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Seleccionar perfil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3">Usuario</SelectItem>
                          <SelectItem value="2">Manager</SelectItem>
                          <SelectItem value="1">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-11 font-medium" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Registrar Usuario
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}