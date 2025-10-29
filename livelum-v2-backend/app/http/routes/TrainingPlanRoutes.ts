import { FastifyInstance } from 'fastify';
import { CreateTrainingPlanController } from '../controllers/trainingPlans/CreateTrainingPlanController';
import { SearchTrainingPlansController } from '../controllers/trainingPlans/SearchTrainingPlansController';

export async function TrainingPlanRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/training-plans',
    {
      schema: {
        description: 'Crear un nuevo plan de capacitación',
        tags: ['TrainingPlans'],
        body: {
          type: 'object',
          required: ['plannedDate', 'topic', 'type', 'companyId'],
          properties: {
            plannedDate: { type: 'string', format: 'date-time' },
            topic: { type: 'string' },
            type: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'] },
            instructor: { type: 'string' },
            provider: { type: 'string' },
            duration: { type: 'number', minimum: 0 },
            participants: { 
              type: 'array',
              items: { type: 'string' }
            },
            participantIds: { 
              type: 'array',
              items: { type: 'string' }
            },
            objectives: { type: 'string' },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateTrainingPlanController.handle
  );

  fastify.get(
    '/training-plans',
    {
      schema: {
        description: 'Buscar planes de capacitación con filtros',
        tags: ['TrainingPlans'],
        querystring: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            type: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'] },
            status: { 
              type: 'string', 
              enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED_SATISFACTORY', 'COMPLETED_UNSATISFACTORY', 'CANCELLED', 'OVERDUE'] 
            },
            companyId: { type: 'string' },
            plannedDateFrom: { type: 'string', format: 'date-time' },
            plannedDateTo: { type: 'string', format: 'date-time' },
            overdue: { type: 'boolean' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['plannedDate', 'topic', 'status', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchTrainingPlansController.handle
  );
}

