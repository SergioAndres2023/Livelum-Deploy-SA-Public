# Livelum v2 Backend

Backend API para el sistema Livelum v2 implementado con **arquitectura DDD (Domain-Driven Design)** y **arquitectura hexagonal**.

## 🏗️ Arquitectura

### Patrones Implementados

- ✅ **Domain-Driven Design (DDD)**
- ✅ **Arquitectura Hexagonal (Ports & Adapters)**
- ✅ **Dependency Injection** con TSyringe
- ✅ **Repository Pattern**
- ✅ **Use Case Pattern**
- ✅ **Builder Pattern** (para criterios de búsqueda)
- ✅ **Object Mother Pattern** (para datos de prueba)
- ✅ **Factory Pattern** (en el container)

### Estructura de Carpetas

```
backend/
├── app/                    # Capa de presentación
│   ├── http/
│   │   ├── controllers/    # Controladores HTTP
│   │   ├── routes/         # Definición de rutas
│   │   ├── hooks/          # Hooks de Fastify
│   │   └── Server.ts       # Configuración del servidor
│   └── index.ts           # Punto de entrada
├── config/                # Configuración
│   ├── index.ts
│   └── environments.ts
├── src/
│   ├── clients/           # Módulo de Clientes (ejemplo completo)
│   │   ├── domain/        # Capa de dominio
│   │   │   ├── contracts/ # Interfaces (puertos)
│   │   │   ├── entities/  # Entidades de negocio
│   │   │   ├── enums/     # Enumeraciones
│   │   │   └── filters/   # Criterios de búsqueda
│   │   ├── application/   # Capa de aplicación
│   │   │   ├── useCases/  # Casos de uso
│   │   │   └── dtos/      # Data Transfer Objects
│   │   └── infrastructure/ # Capa de infraestructura
│   │       ├── container/ # Inyección de dependencias
│   │       └── database/  # Implementaciones de BD
│   └── cross-cutting/     # Infraestructura común
│       ├── domain/
│       └── infrastructure/
└── tests/                 # Tests
    ├── unit/              # Tests unitarios
    ├── integration/       # Tests de integración
    └── e2e/              # Tests end-to-end
```

## 🚀 Tecnologías

- **Node.js 18+** - Runtime
- **TypeScript** - Lenguaje tipado
- **Fastify** - Framework web (más rápido que Express)
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **TSyringe** - Inyección de dependencias
- **Pino** - Logger estructurado
- **Jest** - Framework de testing
- **Docker** - Contenedorización

## 📋 Comandos Disponibles

### Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Construir proyecto
npm run build

# Ejecutar en producción
npm start
```

### Testing
```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests e2e
npm run test:e2e
```

### Calidad de Código
```bash
# Linting
npm run lint

# Linting con fix automático
npm run lint:fix

# Formatear código
npm run format

# Verificar formato
npm run check:format
```

## 🔧 Configuración

### Variables de Entorno

Copia `env.example` a `.env` y configura:

```bash
# Base de datos
MONGODB_URI=mongodb://localhost:27017/livelum

# JWT
JWT_SECRET=your-secret-key

# Servidor
NODE_ENV=development
PORT=3000
```

### Docker

```bash
# Construir imagen
docker build -t livelum-backend .

# Ejecutar contenedor
docker run -p 3000:3000 livelum-backend
```

## 📚 API Documentation

Una vez iniciado el servidor, la documentación Swagger estará disponible en:
- **Desarrollo**: http://localhost:3000/docs
- **Producción**: Deshabilitado por defecto

## 🧪 Testing

### Estructura de Tests

- **Unit Tests**: Testean entidades, use cases y lógica de negocio
- **Integration Tests**: Testean repositorios y servicios con BD real
- **E2E Tests**: Testean endpoints completos con servidor real

### Ejemplo de Test

```typescript
describe('CreateClientUseCase', () => {
  it('should create a client successfully', async () => {
    const useCase = new CreateClientUseCase(mockRepository, mockLogger);
    const result = await useCase.execute(validClientData);
    
    expect(result).toBeDefined();
    expect(result.email).toBe(validClientData.email);
  });
});
```

## 🏗️ Agregar Nuevos Módulos

Para agregar un nuevo módulo (ej: `products`), sigue esta estructura:

1. **Crear estructura de carpetas**:
   ```
   src/products/
   ├── domain/
   │   ├── contracts/ProductRepository.ts
   │   ├── entities/Product.ts
   │   ├── enums/ProductEnums.ts
   │   └── filters/ProductCriteriaMother.ts
   ├── application/
   │   ├── useCases/
   │   └── dtos/
   └── infrastructure/
       ├── container/ProductContainer.ts
       └── database/
   ```

2. **Implementar capa de dominio**:
   - Entidad con lógica de negocio
   - Enums necesarios
   - Interface del repositorio
   - Criterios de búsqueda con Builder

3. **Implementar capa de aplicación**:
   - Use cases específicos
   - DTOs de entrada y salida

4. **Implementar capa de infraestructura**:
   - Schema de MongoDB
   - Mappers
   - Implementación del repositorio
   - Container con inyección de dependencias

5. **Implementar capa HTTP**:
   - Controllers
   - Routes
   - Registro en Server.ts

## 🔍 Logging

El sistema usa **Pino** para logging estructurado:

```typescript
logger.info('Cliente creado', { clientId: '123', email: 'test@example.com' });
logger.error('Error al crear cliente', { error: error.message, request });
```

## 🐳 Docker

### Multi-stage Build

- **base**: Imagen base con Node.js
- **builder**: Para compilación
- **development**: Para desarrollo con herramientas
- **installer**: Para instalar dependencias y build
- **runtime**: Imagen final optimizada

### Health Checks

Todos los servicios incluyen health checks:
- **Backend**: `GET /health`
- **MongoDB**: `mongosh --eval "db.adminCommand('ping')"`

## 📈 Monitoreo

- **Health Check**: `GET /health`
- **Logs estructurados** con Pino
- **Métricas de performance** (futuro)
- **Tracing distribuido** (futuro)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Implementa siguiendo los patrones DDD
4. Añade tests
5. Ejecuta `npm run lint` y `npm test`
6. Crea un Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles.