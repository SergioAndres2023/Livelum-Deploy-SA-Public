import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, MessageSquare, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApprovalStep {
  id: string;
  approver: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  comments?: string;
  required: boolean;
}

interface DocumentApprovalProps {
  documentTitle: string;
  documentCode: string;
  submittedBy: string;
  submittedDate: string;
  approvalSteps: ApprovalStep[];
  onApprove?: (stepId: string, comments?: string) => void;
  onReject?: (stepId: string, comments: string) => void;
  currentUserId?: string;
  className?: string;
}

export default function DocumentApproval({
  documentTitle,
  documentCode,
  submittedBy,
  submittedDate,
  approvalSteps,
  onApprove,
  onReject,
  currentUserId = "user1",
  className = ""
}: DocumentApprovalProps) {
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const getStatusIcon = (status: ApprovalStep['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: ApprovalStep['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Aprobado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rechazado</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>;
    }
  };

  const handleApprove = (stepId: string) => {
    if (onApprove) {
      onApprove(stepId, comments[stepId]);
      setComments(prev => ({ ...prev, [stepId]: '' }));
      toast({
        title: "Documento Aprobado",
        description: "El documento ha sido aprobado exitosamente",
      });
    }
  };

  const handleReject = (stepId: string) => {
    const comment = comments[stepId];
    if (!comment?.trim()) {
      toast({
        variant: "destructive",
        title: "Comentario requerido",
        description: "Debes agregar un comentario al rechazar un documento",
      });
      return;
    }

    if (onReject) {
      onReject(stepId, comment);
      setComments(prev => ({ ...prev, [stepId]: '' }));
      toast({
        title: "Documento Rechazado",
        description: "El documento ha sido rechazado",
        variant: "destructive"
      });
    }
  };

  const updateComment = (stepId: string, value: string) => {
    setComments(prev => ({ ...prev, [stepId]: value }));
  };

  const getCurrentUserStep = () => {
    return approvalSteps.find(step => 
      step.approver === currentUserId && step.status === 'pending'
    );
  };

  const getOverallStatus = () => {
    if (approvalSteps.some(step => step.status === 'rejected')) {
      return 'rejected';
    }
    
    const requiredSteps = approvalSteps.filter(step => step.required);
    if (requiredSteps.every(step => step.status === 'approved')) {
      return 'approved';
    }
    
    return 'pending';
  };

  const overallStatus = getOverallStatus();
  const currentUserStep = getCurrentUserStep();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Document Info Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{documentTitle}</CardTitle>
              <CardDescription className="mt-1">
                Código: {documentCode}
              </CardDescription>
            </div>
            {getStatusBadge(overallStatus as ApprovalStep['status'])}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Enviado por: {submittedBy}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Fecha: {submittedDate}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Approval Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Flujo de Aprobación
          </CardTitle>
          <CardDescription>
            Seguimiento del proceso de aprobación del documento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvalSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < approvalSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-muted-foreground/20" />
                )}
                
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  {/* Status Icon */}
                  <div className="mt-1">
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1 space-y-3">
                    {/* Approver Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {step.approver.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{step.approver}</p>
                          <p className="text-sm text-muted-foreground">{step.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {step.required && (
                          <Badge variant="outline" className="text-xs">Requerido</Badge>
                        )}
                        {getStatusBadge(step.status)}
                      </div>
                    </div>

                    {/* Date and Comments */}
                    {step.date && (
                      <p className="text-sm text-muted-foreground">
                        Fecha: {step.date}
                      </p>
                    )}

                    {step.comments && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Comentarios:</span>
                        </div>
                        <p className="text-sm">{step.comments}</p>
                      </div>
                    )}

                    {/* Action Buttons for Current User */}
                    {step.status === 'pending' && currentUserStep?.id === step.id && (
                      <div className="space-y-3 pt-2 border-t">
                        <Textarea
                          placeholder="Agregar comentarios (opcional para aprobar, obligatorio para rechazar)..."
                          value={comments[step.id] || ''}
                          onChange={(e) => updateComment(step.id, e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApprove(step.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprobar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleReject(step.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rechazar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Estado General</p>
              <p className="text-sm text-muted-foreground">
                {approvalSteps.filter(s => s.status === 'approved').length} de{' '}
                {approvalSteps.filter(s => s.required).length} aprobaciones requeridas completadas
              </p>
            </div>
            {getStatusBadge(overallStatus as ApprovalStep['status'])}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}