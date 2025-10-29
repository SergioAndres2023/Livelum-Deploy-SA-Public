import { FastifyInstance } from 'fastify';
import { CreateProcessNameController } from '../controllers/processes/CreateProcessNameController';
import { FindProcessNameController } from '../controllers/processes/FindProcessNameController';
import { GetProcessNamesByTypeController } from '../controllers/processes/GetProcessNamesByTypeController';
import { UpdateProcessNameController } from '../controllers/processes/UpdateProcessNameController';
import { DeleteProcessNameController } from '../controllers/processes/DeleteProcessNameController';
import { ReorderProcessNamesController } from '../controllers/processes/ReorderProcessNamesController';

// Esquemas de respuesta reutilizables
const badRequestResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

const notFoundResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

const conflictResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

export const registerProcessNameRoutes = async (fastify: FastifyInstance): Promise<void> => {
  // Instanciar controllers directamente
  const createController = new CreateProcessNameController();
  const findController = new FindProcessNameController();
  const getByTypeController = new GetProcessNamesByTypeController();
  const updateController = new UpdateProcessNameController();
  const deleteController = new DeleteProcessNameController();
  const reorderController = new ReorderProcessNamesController();

  // POST /api/process-names
  fastify.post('/api/process-names', {
    schema: {
      tags: ['process-names'],
      summary: 'Crear nombre de proceso',
      description: 'Crea un nuevo nombre de proceso',
      body: {
        type: 'object',
        required: ['order', 'processTypeId', 'name'],
        properties: {
          order: { type: 'number', minimum: 1 },
          processTypeId: { type: 'string' },
          name: { type: 'string', minLength: 2 },
        },
      },
      response: {
        201: {
          description: 'Nombre de proceso creado',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order: { type: 'number' },
            processTypeId: { type: 'string' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        400: badRequestResponse,
        404: notFoundResponse,
        409: conflictResponse,
      },
    },
  }, createController.handle.bind(createController));

  // GET /api/process-names
  fastify.get('/api/process-names', {
    schema: {
      tags: ['process-names'],
      summary: 'Obtener nombres de proceso',
      description: 'Obtiene todos los nombres de proceso, opcionalmente filtrados por tipo',
      querystring: {
        type: 'object',
        properties: {
          processTypeId: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Lista de nombres de proceso',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              order: { type: 'number' },
              processTypeId: { type: 'string' },
              name: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  }, getByTypeController.handle.bind(getByTypeController));

  // GET /api/process-names/:id
  fastify.get('/api/process-names/:id', {
    schema: {
      tags: ['process-names'],
      summary: 'Obtener nombre de proceso por ID',
      description: 'Obtiene un nombre de proceso específico',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Nombre de proceso encontrado',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order: { type: 'number' },
            processTypeId: { type: 'string' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        404: notFoundResponse,
      },
    },
  }, findController.handle.bind(findController));

  // PUT /api/process-names/:id
  fastify.put('/api/process-names/:id', {
    schema: {
      tags: ['process-names'],
      summary: 'Actualizar nombre de proceso',
      description: 'Actualiza un nombre de proceso existente',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        properties: {
          order: { type: 'number', minimum: 1 },
          processTypeId: { type: 'string' },
          name: { type: 'string', minLength: 2 },
        },
      },
      response: {
        200: {
          description: 'Nombre de proceso actualizado',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order: { type: 'number' },
            processTypeId: { type: 'string' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        400: badRequestResponse,
        404: notFoundResponse,
        409: conflictResponse,
      },
    },
  }, updateController.handle.bind(updateController));

  // DELETE /api/process-names/:id
  fastify.delete('/api/process-names/:id', {
    schema: {
      tags: ['process-names'],
      summary: 'Eliminar nombre de proceso',
      description: 'Elimina un nombre de proceso',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        204: { description: 'Nombre de proceso eliminado' },
        404: notFoundResponse,
        409: conflictResponse,
      },
    },
  }, deleteController.handle.bind(deleteController));

  // PUT /api/process-names/reorder
  fastify.put('/api/process-names/reorder', {
    schema: {
      tags: ['process-names'],
      summary: 'Reordenar nombres de proceso',
      description: 'Actualiza el orden de múltiples nombres de proceso',
      body: {
        type: 'object',
        required: ['reorderItems'],
        properties: {
          reorderItems: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'order'],
              properties: {
                id: { type: 'string' },
                order: { type: 'number', minimum: 1 },
              },
            },
          },
        },
      },
      response: {
        200: {
          description: 'Nombres de proceso reordenados',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        404: notFoundResponse,
      },
    },
  }, reorderController.handle.bind(reorderController));
};
