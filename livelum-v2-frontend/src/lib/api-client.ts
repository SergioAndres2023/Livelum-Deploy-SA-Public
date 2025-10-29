// Cliente API para conectar con el backend MongoDB
import { API_CONFIG } from '@/config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
    };
    
    // Solo añadir Content-Type si hay body o si se especifica explícitamente
    if (options.body || options.headers?.['Content-Type']) {
      config.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
    } else if (options.headers) {
      config.headers = options.headers;
    }

    try {
      const response = await fetch(url, config);
      
      let data;
      
      // Verificar si hay contenido
      const contentType = response.headers.get('content-type');
      const hasJsonContent = contentType && contentType.includes('application/json');
      
      if (response.status === 204) {
        // No Content - respuesta exitosa sin cuerpo
        data = { success: true };
      } else {
        // Leer el contenido una sola vez
        const text = await response.text();
        
        if (hasJsonContent) {
          // Intentar parsear JSON
          try {
            if (text.length > 0) {
              const parsedData = JSON.parse(text);
              
              // Si la respuesta es un array directo, envolverlo en la estructura esperada
              if (Array.isArray(parsedData)) {
                data = { success: true, data: parsedData };
              } else if (parsedData && typeof parsedData === 'object' && !parsedData.success) {
                // Si es un objeto directo sin 'success', envolverlo
                data = { success: true, data: parsedData };
              } else {
                data = parsedData;
              }
            } else {
              data = { success: true, data: [] };
            }
          } catch (parseError) {
            console.error(`[API Client] JSON parse error:`, parseError);
            data = { success: false, message: 'Invalid JSON response' };
          }
        } else {
          // Respuesta no JSON
          data = { success: false, message: `Non-JSON response: ${text}` };
        }
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`[API Client] Request failed:`, error);
      throw error;
    }
  }

  // Métodos HTTP
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${endpoint}${queryString}`);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Instancia del cliente
export const apiClient = new ApiClient();

// Exportar también para uso directo
export default apiClient;
