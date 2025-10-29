import { FastifyInstance } from 'fastify';
import { CreateEquipmentController } from '../controllers/equipment/CreateEquipmentController';
import { SearchEquipmentController } from '../controllers/equipment/SearchEquipmentController';

export async function EquipmentRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/equipment',
    {
      schema: {
        description: 'Crear un nuevo equipo o sistema',
        tags: ['Equipment'],
        body: {
          type: 'object',
          required: ['name', 'type', 'companyId'],
          properties: {
            name: { type: 'string' },
            type: { 
              type: 'string', 
              enum: ['COMPUTER', 'SERVER', 'NETWORK', 'PRINTER', 'TOOL', 'MACHINERY', 'VEHICLE', 'MEASUREMENT', 'OTHER'] 
            },
            brand: { type: 'string' },
            model: { type: 'string' },
            serialNumber: { type: 'string' },
            code: { type: 'string' },
            physicalLocation: { type: 'string' },
            acquisitionDate: { type: 'string', format: 'date' },
            responsible: { type: 'string' },
            notes: { type: 'string' },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateEquipmentController.handle
  );

  fastify.get(
    '/equipment',
    {
      schema: {
        description: 'Buscar equipos y sistemas con filtros',
        tags: ['Equipment'],
        querystring: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: { 
              type: 'string', 
              enum: ['COMPUTER', 'SERVER', 'NETWORK', 'PRINTER', 'TOOL', 'MACHINERY', 'VEHICLE', 'MEASUREMENT', 'OTHER'] 
            },
            status: { 
              type: 'string', 
              enum: ['ACTIVE', 'MAINTENANCE', 'INACTIVE', 'RETIRED'] 
            },
            brand: { type: 'string' },
            physicalLocation: { type: 'string' },
            responsible: { type: 'string' },
            needsMaintenance: { type: 'boolean' },
            companyId: { type: 'string' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['name', 'type', 'status', 'brand', 'physicalLocation', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchEquipmentController.handle
  );
}
