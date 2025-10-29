import { FastifyInstance } from 'fastify';
import { CreateObjectiveController } from '../controllers/objectives/CreateObjectiveController';
import { SearchObjectivesController } from '../controllers/objectives/SearchObjectivesController';
import { UpdateObjectiveController } from '../controllers/objectives/UpdateObjectiveController';
import { AddCommentController } from '../controllers/objectives/AddCommentController';

export async function ObjectiveRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/objectives',
    {
      schema: {
        description: 'Crear un nuevo objetivo',
        tags: ['Objectives'],
        body: {
          type: 'object',
          required: ['title', 'description', 'targetValue', 'unit', 'startDate', 'targetDate', 'responsibleUserId', 'responsibleUserName', 'companyId'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            targetValue: { type: 'number' },
            currentValue: { type: 'number' },
            unit: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            targetDate: { type: 'string', format: 'date-time' },
            indicatorId: { type: 'string' },
            indicatorName: { type: 'string' },
            responsibleUserId: { type: 'string' },
            responsibleUserName: { type: 'string' },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateObjectiveController.handle
  );

  fastify.get(
    '/objectives',
    {
      schema: {
        description: 'Buscar objetivos con filtros',
        tags: ['Objectives'],
        querystring: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            companyId: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED'] },
            responsibleUserId: { type: 'string' },
            indicatorId: { type: 'string' },
            overdue: { type: 'boolean' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['title', 'targetDate', 'createdAt', 'progress'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchObjectivesController.handle
  );

  fastify.put(
    '/objectives/:id',
    {
      schema: {
        description: 'Actualizar objetivo',
        tags: ['Objectives'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            targetValue: { type: 'number' },
            unit: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            targetDate: { type: 'string', format: 'date-time' },
            indicatorId: { type: 'string' },
            indicatorName: { type: 'string' },
            responsibleUserId: { type: 'string' },
            responsibleUserName: { type: 'string' },
          },
        },
      },
    },
    UpdateObjectiveController.handle
  );

  fastify.post(
    '/objectives/:id/comments',
    {
      schema: {
        description: 'Agregar comentario a objetivo',
        tags: ['Objectives'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['text', 'createdBy'],
          properties: {
            text: { type: 'string' },
            actionRequired: { type: 'boolean' },
            actionDescription: { type: 'string' },
            actionDueDate: { type: 'string', format: 'date-time' },
            createdBy: { type: 'string' },
          },
        },
      },
    },
    AddCommentController.handle
  );
}

