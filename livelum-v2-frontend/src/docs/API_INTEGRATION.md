# Integración con Backend MongoDB

## Resumen

El frontend ahora está conectado con el backend MongoDB a través de las APIs REST definidas en el Swagger. Los datos hardcodeados han sido reemplazados por datos reales de la base de datos.

## Archivos Creados

### 1. Cliente API
- `src/lib/api-client.ts` - Cliente HTTP base para todas las llamadas a la API
- `src/config/api.ts` - Configuración de URLs y endpoints

### 2. Tipos TypeScript
- `src/types/api.ts` - Interfaces basadas en el Swagger del backend

### 3. Servicios
- `src/services/documents.ts` - Servicios para gestión de documentos
- `src/services/audits.ts` - Servicios para gestión de auditorías
- `src/services/risks.ts` - Servicios para gestión de riesgos
- `src/services/processes.ts` - Servicios para gestión de procesos
- `src/services/clients.ts` - Servicios para gestión de clientes

### 4. Hooks Personalizados
- `src/hooks/useDashboard.ts` - Hook para datos del dashboard
- `src/hooks/useProcesses.ts` - Hook para datos de procesos

## Páginas Actualizadas

### Dashboard (`src/pages/Dashboard.tsx`)
- **Antes**: Datos hardcodeados estáticos
- **Ahora**: Datos reales de MongoDB
- **Características**:
  - Estadísticas de documentos, auditorías y riesgos
  - Botón de actualización manual
  - Manejo de errores con reintentos
  - Estados de carga

### Matriz de Polivalencias (`src/pages/MatrizPolivalencias.tsx`)
- **Antes**: Datos hardcodeados de habilidades
- **Ahora**: Habilidades obtenidas de la API de procesos
- **Características**:
  - Integración con tipos de proceso y nombres de proceso
  - Fallback a datos de ejemplo si la API falla
  - Botón de actualización manual
  - Visualización de tipos de proceso disponibles

## Configuración

### Variables de Entorno
Crear archivo `.env.local` en el directorio `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### URLs por Defecto
- **API Base**: `http://localhost:3000/api`
- **Backend**: `http://localhost:3000`
- **MongoDB**: `mongodb://localhost:27017`

## Uso

### Dashboard
```typescript
import { useDashboard } from '@/hooks/useDashboard';

const { documentStats, auditStats, riskStats, loading, error, refetch } = useDashboard();
```

### Procesos
```typescript
import { useProcesses } from '@/hooks/useProcesses';

const { processTypes, processNames, loading, error, refetch } = useProcesses();
```

### Servicios Directos
```typescript
import DocumentsService from '@/services/documents';

// Obtener documentos
const response = await DocumentsService.getDocuments({
  page: 1,
  limit: 10,
  status: 'APROBADO'
});

// Crear documento
const newDoc = await DocumentsService.createDocument({
  code: 'DOC-001',
  title: 'Mi Documento',
  type: 'MANUAL',
  author: 'Usuario'
});
```

## Manejo de Errores

- **Errores de Red**: Se muestran en la UI con opción de reintento
- **Errores de API**: Se registran en consola y se muestran al usuario
- **Fallbacks**: Si la API falla, se usan datos de ejemplo cuando sea posible
- **Estados de Carga**: Indicadores visuales durante las operaciones

## Beneficios

1. **Datos Reales**: El frontend ahora muestra información actualizada de MongoDB
2. **Sincronización**: Los datos se actualizan en tiempo real
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades usando las APIs existentes
4. **Mantenibilidad**: Código organizado en servicios reutilizables
5. **Type Safety**: Tipos TypeScript basados en el Swagger del backend

## Próximos Pasos

1. Agregar más páginas conectadas a la API
2. Implementar caché para mejorar rendimiento
3. Agregar optimistic updates para mejor UX
4. Implementar paginación en las listas
5. Agregar filtros y búsquedas avanzadas
