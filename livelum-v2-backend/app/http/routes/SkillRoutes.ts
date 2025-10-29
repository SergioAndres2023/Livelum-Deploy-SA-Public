import { FastifyInstance } from 'fastify';
import { CreateSkillController } from '../controllers/skills/CreateSkillController';
import { SearchSkillsController } from '../controllers/skills/SearchSkillsController';

export async function SkillRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/skills',
    {
      schema: {
        description: 'Crear una nueva competencia/habilidad',
        tags: ['Skills'],
        body: {
          type: 'object',
          required: ['number', 'title', 'category', 'companyId'],
          properties: {
            number: { type: 'number', minimum: 1 },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { 
              type: 'string', 
              enum: ['TECHNICAL', 'MANAGEMENT', 'COMMUNICATION', 'LEADERSHIP', 'ANALYTICAL', 'ORGANIZATIONAL', 'TOOLS', 'OTHER'] 
            },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateSkillController.handle
  );

  fastify.get(
    '/skills',
    {
      schema: {
        description: 'Buscar competencias/habilidades con filtros',
        tags: ['Skills'],
        querystring: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            category: { 
              type: 'string', 
              enum: ['TECHNICAL', 'MANAGEMENT', 'COMMUNICATION', 'LEADERSHIP', 'ANALYTICAL', 'ORGANIZATIONAL', 'TOOLS', 'OTHER'] 
            },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'] },
            companyId: { type: 'string' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['number', 'title', 'category', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchSkillsController.handle
  );
}
