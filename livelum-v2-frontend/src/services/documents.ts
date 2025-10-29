import { apiClient, ApiResponse } from '@/lib/api-client';
import { Document, DocumentStats, DocumentFilters } from '@/types/api';

export class DocumentsService {
  // Crear documento
  static async createDocument(data: {
    code: string;
    title: string;
    type: Document['type'];
    author: string;
    description?: string;
    expiryDate?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
  }): Promise<ApiResponse<Document>> {
    return apiClient.post<Document>('/documents', data);
  }

  // Obtener documentos con filtros
  static async getDocuments(filters: DocumentFilters = {}): Promise<ApiResponse<Document[]>> {
    return apiClient.get<Document[]>('/documents', filters);
  }

  // Obtener documento por ID
  static async getDocumentById(id: string): Promise<ApiResponse<Document>> {
    return apiClient.get<Document>(`/documents/${id}`);
  }

  // Actualizar documento
  static async updateDocument(id: string, data: Partial<Document>): Promise<ApiResponse<Document>> {
    return apiClient.put<Document>(`/documents/${id}`, data);
  }

  // Eliminar documento
  static async deleteDocument(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/documents/${id}`);
  }

  // Aprobar documento
  static async approveDocument(id: string): Promise<ApiResponse<Document>> {
    return apiClient.post<Document>(`/documents/${id}/approve`);
  }

  // Obtener estadísticas
  static async getStats(): Promise<ApiResponse<DocumentStats>> {
    return apiClient.get<DocumentStats>('/documents/stats');
  }
}

export default DocumentsService;
