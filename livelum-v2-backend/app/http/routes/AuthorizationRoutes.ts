import { FastifyInstance } from 'fastify';
import { CreateAuthorizationController } from '../controllers/authorizations/CreateAuthorizationController';
import { SearchAuthorizationsController } from '../controllers/authorizations/SearchAuthorizationsController';

export async function AuthorizationRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/authorizations',
    {
      schema: {
        description: 'Crear una nueva autorización',
        tags: ['Authorizations'],
        body: {
          type: 'object',
          required: ['type', 'entityId', 'entityName', 'version', 'requestedBy', 'companyId'],
          properties: {
            type: { 
              type: 'string', 
              enum: ['PROCESS', 'DOCUMENT', 'CHANGE', 'RISK', 'OTHER'] 
            },
            entityId: { type: 'string' },
            entityName: { type: 'string' },
            version: { type: 'string' },
            requestedBy: { type: 'string' },
            comments: { type: 'string' },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateAuthorizationController.handle
  );

  fastify.get(
    '/authorizations',
    {
      schema: {
        description: 'Buscar autorizaciones con filtros',
        tags: ['Authorizations'],
        querystring: {
          type: 'object',
          properties: {
            type: { 
              type: 'string', 
              enum: ['PROCESS', 'DOCUMENT', 'CHANGE', 'RISK', 'OTHER'] 
            },
            status: { 
              type: 'string', 
              enum: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] 
            },
            entityId: { type: 'string' },
            requestedBy: { type: 'string' },
            companyId: { type: 'string' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['requestedAt', 'entityName', 'status', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchAuthorizationsController.handle
  );
}
