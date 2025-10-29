// Tipos basados en el Swagger del backend
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: 'INDIVIDUAL' | 'COMPANY' | 'ORGANIZATION';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  code: string;
  title: string;
  description?: string;
  version: string;
  type: 'MANUAL' | 'POLITICA' | 'FORMATO' | 'PROCEDIMIENTO';
  status: 'BORRADOR' | 'IN_REVIEW' | 'APPROVED' | 'VENCIDO' | 'ARCHIVED';
  author: string;
  createdDate: string;
  expiryDate?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt: string;
  updatedAt: string;
  isExpired: boolean;
  isExpiringSoon: boolean;
}

export interface Audit {
  id: string;
  title: string;
  auditType: 'INTERNAL' | 'EXTERNAL';
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  plannedDate: string;
  actualDate?: string;
  auditorName: string;
  scope: string;
  findings?: string;
  recommendations?: string;
  createdAt: string;
  updatedAt: string;
  isOverdue: boolean;
  isUpcoming: boolean;
  daysUntilPlanned: number;
  daysOverdue: number;
}

export interface Risk {
  id: string;
  title: string;
  code: string;
  category: 'TECNOLOGICO' | 'RECURSOS_HUMANOS' | 'REGULATORIO' | 'OPERACIONAL' | 'FINANCIERO' | 'ESTRATEGICO' | 'COMPLIANCE' | 'SEGURIDAD';
  probability: 'BAJA' | 'MEDIA' | 'ALTA';
  impact: 'BAJO' | 'MEDIO' | 'ALTO';
  riskLevel: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO';
  status: 'ACTIVE' | 'MONITORED' | 'MITIGATED' | 'CLOSED';
  owner: string;
  dueDate: string;
  description: string;
  mitigation: string;
  isOverdue: boolean;
  isCritical: boolean;
  isHighRisk: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessType {
  id: string;
  order: number;
  name: string;
  links: ProcessTypeLink[];
  createdAt: string;
  updatedAt: string;
}

export interface ProcessTypeLink {
  name: string;
  path: string;
}

export interface ProcessName {
  id: string;
  order: number;
  processTypeId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para estadísticas
export interface DocumentStats {
  total: number;
  inReview: number;
  approved: number;
  expiringSoon: number;
  expired: number;
  byType: {
    MANUAL: number;
    POLITICA: number;
    FORMATO: number;
    PROCEDIMIENTO: number;
  };
}

export interface AuditStats {
  total: number;
  planned: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  overdue: number;
  upcoming: number;
  byType: {
    INTERNAL: number;
    EXTERNAL: number;
  };
}

export interface RiskStats {
  total: number;
  active: number;
  monitored: number;
  mitigated: number;
  closed: number;
  critical: number;
  highRisk: number;
  overdue: number;
  byCategory: Record<string, number>;
  byRiskLevel: {
    BAJO: number;
    MEDIO: number;
    ALTO: number;
    CRITICO: number;
  };
}

// Tipos para filtros y paginación
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DocumentFilters extends PaginationParams {
  title?: string;
  code?: string;
  type?: Document['type'];
  status?: Document['status'];
  author?: string;
  expiringSoon?: boolean;
  expired?: boolean;
}

export interface AuditFilters extends PaginationParams {
  title?: string;
  auditType?: Audit['auditType'];
  status?: Audit['status'];
  auditorName?: string;
  upcoming?: boolean;
  overdue?: boolean;
  completed?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface RiskFilters extends PaginationParams {
  title?: string;
  code?: string;
  category?: Risk['category'];
  probability?: Risk['probability'];
  impact?: Risk['impact'];
  riskLevel?: Risk['riskLevel'];
  status?: Risk['status'];
  owner?: string;
  critical?: boolean;
  highRisk?: boolean;
  overdue?: boolean;
}
