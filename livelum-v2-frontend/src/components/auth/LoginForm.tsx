import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Users, BarChart3, AlertTriangle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mostrar mensaje de éxito si viene del registro
  useEffect(() => {
    const state = location.state as { registered?: boolean; message?: string; username?: string } | null;
    if (state?.registered && state?.message) {
      // Usar setTimeout para asegurar que el componente está completamente montado
      const timer = setTimeout(() => {
        toast({
          title: "Usuario registrado",
          description: state.message,
        });
      }, 100);
      // Limpiar el estado de navegación
      window.history.replaceState({}, '', location.pathname);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez al montar

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: error.message,
        });
        return;
      }

      // Navigate to dashboard after successful login
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Sistema de <br />
            <span className="text-primary">Gestión Documental</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            Controla documentos, procesos, indicadores y riesgos de tu organización en una plataforma integrada.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>Gestión de Personal</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Indicadores</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4 text-primary" />
              <span>Documentos</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-primary" />
              <span>Riesgos</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-elevated border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
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
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          disabled={isLoading}
                          className="h-11"
                          autoComplete="current-password"
                        />
                      </FormControl>
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
                  Ingresar
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-primary-dark"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}