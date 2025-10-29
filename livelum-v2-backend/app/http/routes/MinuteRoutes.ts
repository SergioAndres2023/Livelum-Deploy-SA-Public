import { FastifyInstance } from 'fastify';
import { CreateMinuteController } from '../controllers/minutes/CreateMinuteController';
import { SearchMinutesController } from '../controllers/minutes/SearchMinutesController';

export async function MinuteRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/minutes',
    {
      schema: {
        description: 'Crear una nueva minuta/acta',
        tags: ['Minutes'],
        body: {
          type: 'object',
          required: ['meetingDate', 'title', 'type', 'participants', 'content', 'createdBy', 'companyId'],
          properties: {
            meetingDate: { type: 'string', format: 'date-time' },
            title: { type: 'string' },
            type: { 
              type: 'string', 
              enum: ['MANAGEMENT_REVIEW', 'COMMITTEE_MEETING', 'QUALITY_REVIEW', 'AUDIT_MEETING', 'PLANNING_MEETING', 'GENERAL_MEETING', 'OTHER'] 
            },
            participants: { 
              type: 'array',
              items: { type: 'string' },
              minItems: 1
            },
            participantIds: { 
              type: 'array',
              items: { type: 'string' }
            },
            content: { type: 'string' },
            topics: { 
              type: 'array',
              items: { type: 'string' }
            },
            agreements: { 
              type: 'array',
              items: { type: 'string' }
            },
            actionItems: { 
              type: 'array',
              items: { type: 'string' }
            },
            location: { type: 'string' },
            duration: { type: 'number', minimum: 0 },
            nextMeetingDate: { type: 'string', format: 'date-time' },
            createdBy: { type: 'string' },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateMinuteController.handle
  );

  fastify.get(
    '/minutes',
    {
      schema: {
        description: 'Buscar minutas/actas con filtros',
        tags: ['Minutes'],
        querystring: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            type: { 
              type: 'string', 
              enum: ['MANAGEMENT_REVIEW', 'COMMITTEE_MEETING', 'QUALITY_REVIEW', 'AUDIT_MEETING', 'PLANNING_MEETING', 'GENERAL_MEETING', 'OTHER'] 
            },
            status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'APPROVED', 'ARCHIVED'] },
            companyId: { type: 'string' },
            meetingDateFrom: { type: 'string', format: 'date-time' },
            meetingDateTo: { type: 'string', format: 'date-time' },
            createdBy: { type: 'string' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['meetingDate', 'title', 'status', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchMinutesController.handle
  );
}

