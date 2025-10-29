import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, Unlink, Plus, AlertTriangle, Target } from "lucide-react";

interface ContextLinksProps {
  sourceId: string;
  sourceType: "document" | "process" | "indicator";
  sourceTitle: string;
}

const mockRisks = [
  { id: "r1", title: "Pérdida de documentos críticos", category: "Operacional" },
  { id: "r2", title: "Incumplimiento normativo", category: "Cumplimiento" },
  { id: "r3", title: "Falla en sistemas de backup", category: "Tecnológico" }
];

const mockOpportunities = [
  { id: "o1", title: "Automatización de procesos", category: "Mejora" },
  { id: "o2", title: "Certificación ISO adicional", category: "Calidad" },
  { id: "o3", title: "Optimización de recursos", category: "Eficiencia" }
];

const existingLinks = [
  {
    id: "1",
    targetId: "r1",
    targetType: "risk",
    targetTitle: "Pérdida de documentos críticos",
    linkDescription: "Este documento es crítico para mitigar el riesgo de pérdida de información",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    targetId: "o2",
    targetType: "opportunity",
    targetTitle: "Certificación ISO adicional",
    linkDescription: "Documento necesario para aprovechar la oportunidad de certificación",
    createdAt: "2024-01-20"
  }
];

export default function ContextLinks({ sourceId, sourceType, sourceTitle }: ContextLinksProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTargetType, setSelectedTargetType] = useState<"risk" | "opportunity">("risk");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [linkDescription, setLinkDescription] = useState("");

  const availableTargets = selectedTargetType === "risk" ? mockRisks : mockOpportunities;

  const handleCreateLink = () => {
    // Here you would integrate with your backend
    console.log("Creating link:", {
      sourceId,
      sourceType,
      targetId: selectedTarget,
      targetType: selectedTargetType,
      linkDescription
    });
    setIsDialogOpen(false);
    setSelectedTarget("");
    setLinkDescription("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Link className="w-5 h-5 mr-2" />
            Trazabilidad de Contexto
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Vincular
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vincular con Riesgo u Oportunidad</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Vincular a:</Label>
                  <Select value={selectedTargetType} onValueChange={(value: "risk" | "opportunity") => setSelectedTargetType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="risk">Riesgo</SelectItem>
                      <SelectItem value="opportunity">Oportunidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Seleccionar {selectedTargetType === "risk" ? "Riesgo" : "Oportunidad"}:</Label>
                  <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Seleccionar ${selectedTargetType === "risk" ? "riesgo" : "oportunidad"}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTargets.map((target) => (
                        <SelectItem key={target.id} value={target.id}>
                          {target.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Descripción del vínculo:</Label>
                  <Textarea
                    value={linkDescription}
                    onChange={(e) => setLinkDescription(e.target.value)}
                    placeholder="Explica cómo este elemento se relaciona con el riesgo/oportunidad seleccionado..."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateLink} disabled={!selectedTarget || !linkDescription}>
                    Crear Vínculo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground mb-3">
            Vínculos activos para: <span className="font-medium">{sourceTitle}</span>
          </div>
          
          {existingLinks.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No hay vínculos establecidos. Haz clic en "Vincular" para crear el primero.
            </div>
          ) : (
            existingLinks.map((link) => (
              <div key={link.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {link.targetType === "risk" ? (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  ) : (
                    <Target className="w-4 h-4 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Badge variant={link.targetType === "risk" ? "destructive" : "default"}>
                      {link.targetType === "risk" ? "Riesgo" : "Oportunidad"}
                    </Badge>
                    <span className="text-sm font-medium">{link.targetTitle}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {link.linkDescription}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Creado: {new Date(link.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Unlink className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}