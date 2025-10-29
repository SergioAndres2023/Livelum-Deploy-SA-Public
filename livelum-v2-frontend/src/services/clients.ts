import { apiClient, ApiResponse } from '@/lib/api-client';
import { Client } from '@/types/api';

export interface ClientFilters {
  name?: string;
  email?: string;
  phone?: string;
  nif?: string;
  type?: Client['type'];
  status?: Client['status'];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ClientsService {
  // Crear cliente
  static async createClient(data: {
    name: string;
    email: string;
    type?: Client['type'];
    phone?: string;
    nif?: string;
    address?: string;
  }): Promise<ApiResponse<Client>> {
    return apiClient.post<Client>('/clients', data);
  }

  // Obtener clientes con filtros
  static async getClients(filters: ClientFilters = {}): Promise<ApiResponse<Client[]>> {
    return apiClient.get<Client[]>('/clients', filters);
  }

  // Obtener cliente por ID
  static async getClientById(id: string): Promise<ApiResponse<Client>> {
    return apiClient.get<Client>(`/clients/${id}`);
  }

  // Actualizar cliente
  static async updateClient(id: string, data: Partial<Client>): Promise<ApiResponse<Client>> {
    return apiClient.put<Client>(`/clients/${id}`, data);
  }

  // Eliminar cliente
  static async deleteClient(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/clients/${id}`);
  }
}

export default ClientsService;
