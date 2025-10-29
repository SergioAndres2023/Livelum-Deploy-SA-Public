import { apiClient, ApiResponse } from '@/lib/api-client';
import { ProcessType, ProcessName } from '@/types/api';

export class ProcessTypesService {
  // Crear tipo de proceso
  static async createProcessType(data: {
    order: number;
    name: string;
    links?: Array<{ name: string; path: string }>;
  }): Promise<ApiResponse<ProcessType>> {
    return apiClient.post<ProcessType>('/process-types', data);
  }

  // Obtener todos los tipos de proceso
  static async getProcessTypes(): Promise<ApiResponse<ProcessType[]>> {
    return apiClient.get<ProcessType[]>('/process-types');
  }

  // Obtener tipo de proceso por ID
  static async getProcessTypeById(id: string): Promise<ApiResponse<ProcessType>> {
    return apiClient.get<ProcessType>(`/process-types/${id}`);
  }

  // Actualizar tipo de proceso
  static async updateProcessType(id: string, data: Partial<ProcessType>): Promise<ApiResponse<ProcessType>> {
    return apiClient.put<ProcessType>(`/process-types/${id}`, data);
  }

  // Eliminar tipo de proceso
  static async deleteProcessType(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/process-types/${id}`);
  }

  // Reordenar tipos de proceso
  static async reorderProcessTypes(reorderItems: Array<{ id: string; order: number }>): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/process-types/reorder', { reorderItems });
  }
}

export class ProcessNamesService {
  // Crear nombre de proceso
  static async createProcessName(data: {
    order: number;
    processTypeId: string;
    name: string;
  }): Promise<ApiResponse<ProcessName>> {
    return apiClient.post<ProcessName>('/process-names', data);
  }

  // Obtener nombres de proceso
  static async getProcessNames(processTypeId?: string): Promise<ApiResponse<ProcessName[]>> {
    const params = processTypeId ? { processTypeId } : undefined;
    return apiClient.get<ProcessName[]>('/process-names', params);
  }

  // Obtener nombre de proceso por ID
  static async getProcessNameById(id: string): Promise<ApiResponse<ProcessName>> {
    return apiClient.get<ProcessName>(`/process-names/${id}`);
  }

  // Actualizar nombre de proceso
  static async updateProcessName(id: string, data: Partial<ProcessName>): Promise<ApiResponse<ProcessName>> {
    return apiClient.put<ProcessName>(`/process-names/${id}`, data);
  }

  // Eliminar nombre de proceso
  static async deleteProcessName(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/process-names/${id}`);
  }

  // Reordenar nombres de proceso
  static async reorderProcessNames(reorderItems: Array<{ id: string; order: number }>): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/process-names/reorder', { reorderItems });
  }
}

export default { ProcessTypesService, ProcessNamesService };
