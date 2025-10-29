import { apiClient, ApiResponse } from '@/lib/api-client';
import { Risk, RiskStats, RiskFilters } from '@/types/api';

export class RisksService {
  // Crear riesgo
  static async createRisk(data: {
    title: string;
    code: string;
    category: Risk['category'];
    probability: Risk['probability'];
    impact: Risk['impact'];
    owner: string;
    dueDate: string;
    description: string;
    mitigation: string;
  }): Promise<ApiResponse<Risk>> {
    return apiClient.post<Risk>('/risks', data);
  }

  // Obtener riesgos con filtros
  static async getRisks(filters: RiskFilters = {}): Promise<ApiResponse<Risk[]>> {
    return apiClient.get<Risk[]>('/risks', filters);
  }

  // Obtener riesgo por ID
  static async getRiskById(id: string): Promise<ApiResponse<Risk>> {
    return apiClient.get<Risk>(`/risks/${id}`);
  }

  // Obtener riesgo por código
  static async getRiskByCode(code: string): Promise<ApiResponse<Risk>> {
    return apiClient.get<Risk>(`/risks/code/${code}`);
  }

  // Actualizar riesgo
  static async updateRisk(id: string, data: Partial<Risk>): Promise<ApiResponse<Risk>> {
    return apiClient.put<Risk>(`/risks/${id}`, data);
  }

  // Actualizar estado del riesgo
  static async updateRiskStatus(id: string, status: Risk['status']): Promise<ApiResponse<Risk>> {
    return apiClient.put<Risk>(`/risks/${id}/status`, { status });
  }

  // Eliminar riesgo
  static async deleteRisk(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/risks/${id}`);
  }

  // Obtener estadísticas
  static async getStats(): Promise<ApiResponse<RiskStats>> {
    return apiClient.get<RiskStats>('/risks/stats');
  }
}

export default RisksService;
