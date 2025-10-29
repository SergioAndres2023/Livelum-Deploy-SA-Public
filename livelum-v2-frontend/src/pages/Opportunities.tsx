import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Target, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Filter,
  Building2
} from "lucide-react";

const opportunitiesData = [
  {
    id: 1,
    title: "Sistema ERP Completo",
    client: "Banco Central",
    value: 45000,
    probability: 85,
    stage: "Negociación",
    expectedClose: "2024-02-15",
    owner: "María García",
    priority: "Alta"
  },
  {
    id: 2,
    title: "Plataforma E-commerce",
    client: "Retail Corp",
    value: 32500,
    probability: 70,
    stage: "Propuesta",
    expectedClose: "2024-02-28",
    owner: "Carlos López",
    priority: "Media"
  },
  {
    id: 3,
    title: "Integración CRM",
    client: "Manufacturing Ltd",
    value: 28000,
    probability: 60,
    stage: "Calificación",
    expectedClose: "2024-03-10",
    owner: "Ana Martínez",
    priority: "Media"
  },
  {
    id: 4,
    title: "Consultoría Digital",
    client: "Services Group",
    value: 22000,
    probability: 40,
    stage: "Prospecto",
    expectedClose: "2024-03-20",
    owner: "David Rodríguez",
    priority: "Baja"
  },
  {
    id: 5,
    title: "Migración Cloud",
    client: "Tech Solutions S.A.",
    value: 38000,
    probability: 75,
    stage: "Demostración",
    expectedClose: "2024-02-05",
    owner: "Laura Sánchez",
    priority: "Alta"
  }
];

const Oportunidades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [opportunities] = useState(opportunitiesData);

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "Negociación":
        return <Badge className="bg-success text-success-foreground">Negociación</Badge>;
      case "Propuesta":
        return <Badge className="bg-primary text-primary-foreground">Propuesta</Badge>;
      case "Demostración":
        return <Badge className="bg-warning text-warning-foreground">Demostración</Badge>;
      case "Calificación":
        return <Badge variant="secondary">Calificación</Badge>;
      case "Prospecto":
        return <Badge variant="outline">Prospecto</Badge>;
      default:
        return <Badge variant="secondary">{stage}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "Media":
        return <Badge className="bg-warning text-warning-foreground">Media</Badge>;
      case "Baja":
        return <Badge variant="secondary">Baja</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestión de Oportunidades</h1>
        <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Oportunidad
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total Oportunidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{opportunities.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Valor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">€{totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Valor Ponderado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">€{Math.round(weightedValue).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-muted/20 shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prob. Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(opportunities.reduce((sum, opp) => sum + opp.probability, 0) / opportunities.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline by Stage */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <CardTitle>Pipeline por Etapa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {["Prospecto", "Calificación", "Demostración", "Propuesta", "Negociación"].map((stage) => {
              const stageOpps = opportunities.filter(opp => opp.stage === stage);
              const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
              return (
                <div key={stage} className="text-center p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">{stage}</h4>
                  <p className="text-lg font-bold text-foreground">{stageOpps.length}</p>
                  <p className="text-sm text-primary">€{stageValue.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Table */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between space-y-0">
            <CardTitle>Lista de Oportunidades</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar oportunidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Oportunidad</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Probabilidad</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Cierre Esperado</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span>{opportunity.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-3 h-3 text-muted-foreground" />
                      <span>{opportunity.client}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-primary">
                    €{opportunity.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{opportunity.probability}%</span>
                      </div>
                      <Progress value={opportunity.probability} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStageBadge(opportunity.stage)}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(opportunity.priority)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-3 h-3 mr-1 text-muted-foreground" />
                      {new Date(opportunity.expectedClose).toLocaleDateString('es-ES')}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {opportunity.owner}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oportunidades;