import { FastifyInstance } from 'fastify';
import { CreateProcessTypeController } from '../controllers/processes/CreateProcessTypeController';
import { FindProcessTypeController } from '../controllers/processes/FindProcessTypeController';
import { GetAllProcessTypesController } from '../controllers/processes/GetAllProcessTypesController';
import { UpdateProcessTypeController } from '../controllers/processes/UpdateProcessTypeController';
import { DeleteProcessTypeController } from '../controllers/processes/DeleteProcessTypeController';
import { ReorderProcessTypesController } from '../controllers/processes/ReorderProcessTypesController';

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

export const registerProcessTypeRoutes = async (fastify: FastifyInstance): Promise<void> => {
  // Instanciar controllers directamente
  const createController = new CreateProcessTypeController();
  const findController = new FindProcessTypeController();
  const getAllController = new GetAllProcessTypesController();
  const updateController = new UpdateProcessTypeController();
  const deleteController = new DeleteProcessTypeController();
  const reorderController = new ReorderProcessTypesController();

  // POST /api/process-types
  fastify.post('/api/process-types', {
    schema: {
      tags: ['process-types'],
      summary: 'Crear tipo de proceso',
      description: 'Crea un nuevo tipo de proceso',
      body: {
        type: 'object',
        required: ['order', 'name'],
        properties: {
          order: { type: 'number', minimum: 1 },
          name: { type: 'string', minLength: 3 },
          links: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name', 'path'],
              properties: {
                name: { type: 'string' },
                path: { type: 'string' },
              },
            },
          },
        },
      },
      response: {
        201: {
          description: 'Tipo de proceso creado',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order: { type: 'number' },
            name: { type: 'string' },
            links: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  path: { type: 'string' },
                },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        400: badRequestResponse,
        409: conflictResponse,
      },
    },
  }, createController.handle.bind(createController));

  // GET /api/process-types
  fastify.get('/api/process-types', {
    schema: {
      tags: ['process-types'],
      summary: 'Obtener todos los tipos de proceso',
      description: 'Obtiene todos los tipos de proceso ordenados por order',
      response: {
        200: {
          description: 'Lista de tipos de proceso',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              order: { type: 'number' },
              name: { type: 'string' },
              links: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    path: { type: 'string' },
                  },
                },
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
  }, getAllController.handle.bind(getAllController));

  // GET /api/process-types/:id
  fastify.get('/api/process-types/:id', {
    schema: {
      tags: ['process-types'],
      summary: 'Obtener tipo de proceso por ID',
      description: 'Obtiene un tipo de proceso específico',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Tipo de proceso encontrado',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order: { type: 'number' },
            name: { type: 'string' },
            links: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  path: { type: 'string' },
                },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        404: notFoundResponse,
      },
    },
  }, findController.handle.bind(findController));

  // PUT /api/process-types/:id
  fastify.put('/api/process-types/:id', {
    schema: {
      tags: ['process-types'],
      summary: 'Actualizar tipo de proceso',
      description: 'Actualiza un tipo de proceso existente',
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
          name: { type: 'string', minLength: 3 },
          links: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name', 'path'],
              properties: {
                name: { type: 'string' },
                path: { type: 'string' },
              },
            },
          },
        },
      },
      response: {
        200: {
          description: 'Tipo de proceso actualizado',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order: { type: 'number' },
            name: { type: 'string' },
            links: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  path: { type: 'string' },
                },
              },
            },
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

  // DELETE /api/process-types/:id
  fastify.delete('/api/process-types/:id', {
    schema: {
      tags: ['process-types'],
      summary: 'Eliminar tipo de proceso',
      description: 'Elimina un tipo de proceso',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        204: { description: 'Tipo de proceso eliminado' },
        404: notFoundResponse,
        409: conflictResponse,
      },
    },
  }, deleteController.handle.bind(deleteController));

  // PUT /api/process-types/reorder
  fastify.put('/api/process-types/reorder', {
    schema: {
      tags: ['process-types'],
      summary: 'Reordenar tipos de proceso',
      description: 'Actualiza el orden de múltiples tipos de proceso',
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
          description: 'Tipos de proceso reordenados',
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
