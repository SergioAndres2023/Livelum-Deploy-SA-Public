import { FastifyInstance } from 'fastify';
import { CreateAuditController } from '../controllers/audits/CreateAuditController';
import { FindAuditController } from '../controllers/audits/FindAuditController';
import { SearchAuditsController } from '../controllers/audits/SearchAuditsController';
import { UpdateAuditController } from '../controllers/audits/UpdateAuditController';
import { DeleteAuditController } from '../controllers/audits/DeleteAuditController';
import { StartAuditController } from '../controllers/audits/StartAuditController';
import { CompleteAuditController } from '../controllers/audits/CompleteAuditController';
import { CancelAuditController } from '../controllers/audits/CancelAuditController';
import { RescheduleAuditController } from '../controllers/audits/RescheduleAuditController';
import { GetAuditStatsController } from '../controllers/audits/GetAuditStatsController';
import { AuditStatus, AuditType } from '../../../src/audits/domain/enums/AuditEnums';

// Esquema de Audit para reutilizar en todas las respuestas
const auditSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    auditType: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'] },
    status: { type: 'string', enum: ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] },
    plannedDate: { type: 'string', format: 'date-time' },
    actualDate: { type: 'string', format: 'date-time' },
    auditorName: { type: 'string' },
    scope: { type: 'string' },
    findings: { type: 'string' },
    recommendations: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    isOverdue: { type: 'boolean' },
    isUpcoming: { type: 'boolean' },
    daysUntilPlanned: { type: 'number' },
    daysOverdue: { type: 'number' },
  },
};

// Esquema de ErrorResponse para reutilizar
const errorResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

/**
 * Registers all audit-related routes with their respective schemas for Swagger documentation
 * @param {FastifyInstance} fastify - The Fastify instance to register routes on
 * @returns {Promise<void>} Promise that resolves when all routes are registered
 */
export const registerAuditRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const createAuditController = new CreateAuditController();
  const findAuditController = new FindAuditController();
  const searchAuditsController = new SearchAuditsController();
  const updateAuditController = new UpdateAuditController();
  const deleteAuditController = new DeleteAuditController();
  const startAuditController = new StartAuditController();
  const completeAuditController = new CompleteAuditController();
  const cancelAuditController = new CancelAuditController();
  const rescheduleAuditController = new RescheduleAuditController();
  const getAuditStatsController = new GetAuditStatsController();

  // POST /api/audits - Create audit
  fastify.post('/api/audits', {
    schema: {
      description: 'Create a new audit',
      tags: ['audits'],
      body: {
        type: 'object',
        required: ['title', 'auditType', 'plannedDate', 'auditorName', 'scope'],
        properties: {
          title: { 
            type: 'string', 
            minLength: 3, 
            maxLength: 200, 
            description: 'Audit title' 
          },
          auditType: { 
            type: 'string', 
            enum: Object.values(AuditType), 
            description: 'Type of audit: INTERNAL or EXTERNAL' 
          },
          plannedDate: { 
            type: 'string', 
            format: 'date-time', 
            description: 'Planned date for the audit' 
          },
          auditorName: { 
            type: 'string', 
            minLength: 2, 
            maxLength: 100, 
            description: 'Name of the auditor' 
          },
          scope: { 
            type: 'string', 
            minLength: 10, 
            maxLength: 1000, 
            description: 'Scope of the audit' 
          },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
      },
    },
  }, createAuditController.handle.bind(createAuditController));

  // GET /api/audits/:id - Find audit by ID
  fastify.get('/api/audits/:id', {
    schema: {
      description: 'Find audit by ID',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, findAuditController.handle.bind(findAuditController));

  // GET /api/audits - Search audits with filters
  fastify.get('/api/audits', {
    schema: {
      description: 'Search audits with filters and pagination',
      tags: ['audits'],
      querystring: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Filter by title (partial match)' },
          auditType: { type: 'string', enum: Object.values(AuditType), description: 'Filter by audit type' },
          status: { type: 'string', enum: Object.values(AuditStatus), description: 'Filter by audit status' },
          auditorName: { type: 'string', description: 'Filter by auditor name (partial match)' },
          upcoming: { type: 'boolean', description: 'Filter for upcoming audits' },
          overdue: { type: 'boolean', description: 'Filter for overdue audits' },
          completed: { type: 'boolean', description: 'Filter for completed audits' },
          dateFrom: { type: 'string', format: 'date', description: 'Filter by date range start' },
          dateTo: { type: 'string', format: 'date', description: 'Filter by date range end' },
          page: { type: 'string', pattern: '^[0-9]+$', default: '1', description: 'Page number for pagination' },
          limit: { type: 'string', pattern: '^[0-9]+$', default: '10', description: 'Number of items per page' },
          sortBy: { 
            type: 'string', 
            enum: ['title', 'auditType', 'status', 'auditorName', 'plannedDate', 'actualDate', 'createdAt', 'updatedAt'], 
            default: 'plannedDate', 
            description: 'Field to sort by' 
          },
          sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'asc', description: 'Sort order' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: auditSchema,
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'number' },
                limit: { type: 'number' },
                total: { type: 'number' },
              },
            },
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, searchAuditsController.handle.bind(searchAuditsController));

  // PUT /api/audits/:id - Update audit
  fastify.put('/api/audits/:id', {
    schema: {
      description: 'Update an existing audit',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID to update' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 3, maxLength: 200, description: 'New audit title' },
          auditType: { type: 'string', enum: Object.values(AuditType), description: 'New audit type' },
          plannedDate: { type: 'string', format: 'date-time', description: 'New planned date' },
          auditorName: { type: 'string', minLength: 2, maxLength: 100, description: 'New auditor name' },
          scope: { type: 'string', minLength: 10, maxLength: 1000, description: 'New audit scope' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, updateAuditController.handle.bind(updateAuditController));

  // DELETE /api/audits/:id - Delete audit (soft delete)
  fastify.delete('/api/audits/:id', {
    schema: {
      description: 'Delete an audit (soft delete by cancelling)',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID to delete' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, deleteAuditController.handle.bind(deleteAuditController));

  // POST /api/audits/:id/start - Start audit
  fastify.post('/api/audits/:id/start', {
    schema: {
      description: 'Start an audit (change status from PLANNED to IN_PROGRESS)',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID to start' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, startAuditController.handle.bind(startAuditController));

  // POST /api/audits/:id/complete - Complete audit
  fastify.post('/api/audits/:id/complete', {
    schema: {
      description: 'Complete an audit (change status from IN_PROGRESS to COMPLETED)',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID to complete' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['actualDate'],
        properties: {
          actualDate: { type: 'string', format: 'date-time', description: 'Actual completion date' },
          findings: { type: 'string', maxLength: 2000, description: 'Audit findings' },
          recommendations: { type: 'string', maxLength: 2000, description: 'Audit recommendations' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, completeAuditController.handle.bind(completeAuditController));

  // POST /api/audits/:id/cancel - Cancel audit
  fastify.post('/api/audits/:id/cancel', {
    schema: {
      description: 'Cancel an audit (change status to CANCELLED)',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID to cancel' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, cancelAuditController.handle.bind(cancelAuditController));

  // PUT /api/audits/:id/reschedule - Reschedule audit
  fastify.put('/api/audits/:id/reschedule', {
    schema: {
      description: 'Reschedule an audit (update planned date)',
      tags: ['audits'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Audit ID to reschedule' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['newPlannedDate'],
        properties: {
          newPlannedDate: { type: 'string', format: 'date-time', description: 'New planned date for the audit' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: auditSchema,
            message: { type: 'string' },
          },
        },
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
  }, rescheduleAuditController.handle.bind(rescheduleAuditController));

  // GET /api/audits/stats - Get audit statistics
  fastify.get('/api/audits/stats', {
    schema: {
      description: 'Get comprehensive audit statistics',
      tags: ['audits'],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                total: { type: 'number', description: 'Total number of audits' },
                planned: { type: 'number', description: 'Number of planned audits' },
                inProgress: { type: 'number', description: 'Number of audits in progress' },
                completed: { type: 'number', description: 'Number of completed audits' },
                cancelled: { type: 'number', description: 'Number of cancelled audits' },
                overdue: { type: 'number', description: 'Number of overdue audits' },
                upcoming: { type: 'number', description: 'Number of upcoming audits' },
                byType: {
                  type: 'object',
                  properties: {
                    INTERNAL: { type: 'number' },
                    EXTERNAL: { type: 'number' },
                  },
                },
              },
            },
            message: { type: 'string' },
          },
        },
        500: errorResponseSchema,
      },
    },
  }, getAuditStatsController.handle.bind(getAuditStatsController));
};
