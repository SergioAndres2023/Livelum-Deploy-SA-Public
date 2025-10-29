import { apiClient, ApiResponse } from '@/lib/api-client';
import { Audit, AuditStats, AuditFilters } from '@/types/api';

export class AuditsService {
  // Crear auditoría
  static async createAudit(data: {
    title: string;
    auditType: Audit['auditType'];
    plannedDate: string;
    auditorName: string;
    scope: string;
  }): Promise<ApiResponse<Audit>> {
    return apiClient.post<Audit>('/audits', data);
  }

  // Obtener auditorías con filtros
  static async getAudits(filters: AuditFilters = {}): Promise<ApiResponse<Audit[]>> {
    return apiClient.get<Audit[]>('/audits', filters);
  }

  // Obtener auditoría por ID
  static async getAuditById(id: string): Promise<ApiResponse<Audit>> {
    return apiClient.get<Audit>(`/audits/${id}`);
  }

  // Actualizar auditoría
  static async updateAudit(id: string, data: Partial<Audit>): Promise<ApiResponse<Audit>> {
    return apiClient.put<Audit>(`/audits/${id}`, data);
  }

  // Eliminar auditoría
  static async deleteAudit(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/audits/${id}`);
  }

  // Iniciar auditoría
  static async startAudit(id: string): Promise<ApiResponse<Audit>> {
    return apiClient.post<Audit>(`/audits/${id}/start`);
  }

  // Completar auditoría
  static async completeAudit(id: string, data: {
    actualDate: string;
    findings?: string;
    recommendations?: string;
  }): Promise<ApiResponse<Audit>> {
    return apiClient.post<Audit>(`/audits/${id}/complete`, data);
  }

  // Cancelar auditoría
  static async cancelAudit(id: string): Promise<ApiResponse<Audit>> {
    return apiClient.post<Audit>(`/audits/${id}/cancel`);
  }

  // Reprogramar auditoría
  static async rescheduleAudit(id: string, newPlannedDate: string): Promise<ApiResponse<Audit>> {
    return apiClient.put<Audit>(`/audits/${id}/reschedule`, { newPlannedDate });
  }

  // Obtener estadísticas
  static async getStats(): Promise<ApiResponse<AuditStats>> {
    return apiClient.get<AuditStats>('/audits/stats');
  }
}

export default AuditsService;
