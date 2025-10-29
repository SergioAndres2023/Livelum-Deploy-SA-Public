// Configuración de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
};


// URLs de endpoints
export const API_ENDPOINTS = {
  // Documentos
  DOCUMENTS: '/documents',
  DOCUMENTS_STATS: '/documents/stats',
  
  // Auditorías
  AUDITS: '/audits',
  AUDITS_STATS: '/audits/stats',
  
  // Riesgos
  RISKS: '/risks',
  RISKS_STATS: '/risks/stats',
  
  // Procesos
  PROCESS_TYPES: '/process-types',
  PROCESS_NAMES: '/process-names',
  
  // Clientes
  CLIENTS: '/clients',
} as const;

// Configuración de paginación por defecto
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc' as const,
} as const;
