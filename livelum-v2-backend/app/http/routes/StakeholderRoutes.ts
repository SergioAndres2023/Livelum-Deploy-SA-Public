import { FastifyInstance } from 'fastify';
import { CreateStakeholderController } from '../controllers/stakeholders/CreateStakeholderController';
import { SearchStakeholdersController } from '../controllers/stakeholders/SearchStakeholdersController';
import { UpdateStakeholderController } from '../controllers/stakeholders/UpdateStakeholderController';

export async function StakeholderRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/stakeholders',
    {
      schema: {
        description: 'Crear un nuevo stakeholder/parte interesada',
        tags: ['Stakeholders'],
        body: {
          type: 'object',
          required: ['nombre', 'tipo', 'requisitos', 'metodoEvaluacion', 'companyId'],
          properties: {
            nombre: { type: 'string', description: 'Nombre del stakeholder' },
            tipo: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'], description: 'Tipo de stakeholder' },
            requisitos: { type: 'string', description: 'Requisitos del stakeholder' },
            metodoEvaluacion: { type: 'string', description: 'Método de evaluación' },
            companyId: { type: 'string', description: 'ID de la compañía' },
          },
        },
        response: {
          201: {
            description: 'Stakeholder creado exitosamente',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  numero: { type: 'number' },
                  nombre: { type: 'string' },
                  tipo: { type: 'string' },
                  requisitos: { type: 'string' },
                  metodoEvaluacion: { type: 'string' },
                  companyId: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                },
              },
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Error de validación',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: { type: 'string' },
            },
          },
        },
      },
    },
    CreateStakeholderController.handle
  );

  fastify.get(
    '/stakeholders',
    {
      schema: {
        description: 'Buscar stakeholders con filtros',
        tags: ['Stakeholders'],
        querystring: {
          type: 'object',
          properties: {
            nombre: { type: 'string', description: 'Filtrar por nombre' },
            tipo: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'], description: 'Filtrar por tipo' },
            companyId: { type: 'string', description: 'ID de la compañía' },
            page: { type: 'integer', minimum: 1, description: 'Número de página' },
            limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Resultados por página' },
            sortBy: { type: 'string', enum: ['numero', 'nombre', 'tipo', 'createdAt'], description: 'Campo de ordenamiento' },
            sortOrder: { type: 'string', enum: ['asc', 'desc'], description: 'Dirección de ordenamiento' },
          },
        },
        response: {
          200: {
            description: 'Lista de stakeholders',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: { type: 'object' },
              },
              total: { type: 'number' },
            },
          },
        },
      },
    },
    SearchStakeholdersController.handle
  );

  fastify.put(
    '/stakeholders/:id',
    {
      schema: {
        description: 'Actualizar stakeholder',
        tags: ['Stakeholders'],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', description: 'ID del stakeholder' },
          },
        },
        body: {
          type: 'object',
          properties: {
            nombre: { type: 'string', description: 'Nombre del stakeholder' },
            tipo: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'], description: 'Tipo de stakeholder' },
            requisitos: { type: 'string', description: 'Requisitos del stakeholder' },
            metodoEvaluacion: { type: 'string', description: 'Método de evaluación' },
          },
        },
        response: {
          200: {
            description: 'Stakeholder actualizado',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { type: 'object' },
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Stakeholder no encontrado',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: { type: 'string' },
            },
          },
        },
      },
    },
    UpdateStakeholderController.handle
  );
}

