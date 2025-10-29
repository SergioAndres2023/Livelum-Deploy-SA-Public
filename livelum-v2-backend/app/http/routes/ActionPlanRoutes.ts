import { FastifyInstance } from 'fastify';
import { CreateActionPlanController } from '../controllers/actionPlans/CreateActionPlanController';
import { SearchActionPlansController } from '../controllers/actionPlans/SearchActionPlansController';
import { AddActionToPlanController } from '../controllers/actionPlans/AddActionToPlanController';

export async function ActionPlanRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/action-plans',
    {
      schema: {
        description: 'Crear un nuevo plan de acción',
        tags: ['ActionPlans'],
        body: {
          type: 'object',
          required: ['createdDate', 'originType', 'originDescription', 'companyId', 'createdBy'],
          properties: {
            createdDate: { type: 'string', format: 'date-time' },
            originType: { type: 'string', enum: ['FINDING', 'OBJECTIVE', 'RISK', 'MANAGEMENT_REVIEW', 'AUDIT', 'OTHER'] },
            originDescription: { type: 'string' },
            originId: { type: 'string' },
            companyId: { type: 'string' },
            createdBy: { type: 'string' },
          },
        },
      },
    },
    CreateActionPlanController.handle
  );

  fastify.get(
    '/action-plans',
    {
      schema: {
        description: 'Buscar planes de acción con filtros',
        tags: ['ActionPlans'],
        querystring: {
          type: 'object',
          properties: {
            originType: { type: 'string', enum: ['FINDING', 'OBJECTIVE', 'RISK', 'MANAGEMENT_REVIEW', 'AUDIT', 'OTHER'] },
            originId: { type: 'string' },
            status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE'] },
            companyId: { type: 'string' },
            createdDateFrom: { type: 'string', format: 'date-time' },
            createdDateTo: { type: 'string', format: 'date-time' },
            minCompletionPercentage: { type: 'number', minimum: 0, maximum: 100 },
            maxCompletionPercentage: { type: 'number', minimum: 0, maximum: 100 },
            overdueActions: { type: 'boolean' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['createdDate', 'status', 'completionPercentage', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchActionPlansController.handle
  );

  fastify.post(
    '/action-plans/:id/actions',
    {
      schema: {
        description: 'Agregar acción a plan de acción',
        tags: ['ActionPlans'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['description', 'responsible', 'plannedDate'],
          properties: {
            description: { type: 'string' },
            responsible: { type: 'string' },
            plannedDate: { type: 'string', format: 'date-time' },
            comments: { type: 'string' },
          },
        },
      },
    },
    AddActionToPlanController.handle
  );
}

