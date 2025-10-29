import { FastifyInstance } from 'fastify';
import { CreateFindingController } from '../controllers/findings/CreateFindingController';
import { SearchFindingsController } from '../controllers/findings/SearchFindingsController';
import { UpdateFindingController } from '../controllers/findings/UpdateFindingController';
import { AddActionController } from '../controllers/findings/AddActionController';

export async function FindingRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/findings',
    {
      schema: {
        description: 'Crear un nuevo hallazgo',
        tags: ['Findings'],
        body: {
          type: 'object',
          required: ['detectionDate', 'emissionDate', 'summary', 'description', 'processId', 'processName', 'origin', 'type', 'performedBy', 'companyId'],
          properties: {
            detectionDate: { type: 'string', format: 'date-time' },
            emissionDate: { type: 'string', format: 'date-time' },
            summary: { type: 'string' },
            description: { type: 'string' },
            processId: { type: 'string' },
            processName: { type: 'string' },
            origin: { type: 'string', enum: ['CUSTOMER_COMPLAINT', 'INTERNAL_AUDIT', 'EXTERNAL_AUDIT', 'MANAGEMENT_REVIEW', 'PROCESS_MONITORING', 'EMPLOYEE_REPORT', 'SUPPLIER_EVALUATION', 'OTHER'] },
            type: { type: 'string', enum: ['IMPROVEMENT_OPPORTUNITY', 'NON_CONFORMITY', 'OBSERVATION', 'CRITICAL_NON_CONFORMITY'] },
            containmentActions: { type: 'string' },
            causeAnalysis: { type: 'string' },
            causeAnalysisDate: { type: 'string', format: 'date-time' },
            relatedFindings: { type: 'array', items: { type: 'string' } },
            relatedAudits: { type: 'array', items: { type: 'string' } },
            performedBy: { type: 'string' },
            involvedActors: { type: 'array', items: { type: 'string' } },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateFindingController.handle
  );

  fastify.get(
    '/findings',
    {
      schema: {
        description: 'Buscar hallazgos con filtros',
        tags: ['Findings'],
        querystring: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            origin: { type: 'string' },
            type: { type: 'string' },
            status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'PENDING_VERIFICATION', 'VERIFIED', 'CLOSED', 'CANCELLED'] },
            processId: { type: 'string' },
            companyId: { type: 'string' },
            detectionDateFrom: { type: 'string', format: 'date-time' },
            detectionDateTo: { type: 'string', format: 'date-time' },
            overdueActions: { type: 'boolean' },
            overdueControls: { type: 'boolean' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['detectionDate', 'emissionDate', 'status', 'type', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchFindingsController.handle
  );

  fastify.put(
    '/findings/:id',
    {
      schema: {
        description: 'Actualizar hallazgo',
        tags: ['Findings'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            description: { type: 'string' },
            processId: { type: 'string' },
            processName: { type: 'string' },
            origin: { type: 'string' },
            type: { type: 'string' },
            containmentActions: { type: 'string' },
            causeAnalysis: { type: 'string' },
            causeAnalysisDate: { type: 'string', format: 'date-time' },
            relatedFindings: { type: 'array', items: { type: 'string' } },
            relatedAudits: { type: 'array', items: { type: 'string' } },
            involvedActors: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    UpdateFindingController.handle
  );

  fastify.post(
    '/findings/:id/actions',
    {
      schema: {
        description: 'Agregar acción a hallazgo',
        tags: ['Findings'],
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
    AddActionController.handle
  );
}

