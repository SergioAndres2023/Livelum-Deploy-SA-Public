import { FastifyInstance } from 'fastify';
import { CreateClientController } from '../controllers/clients/CreateClientController';
import { FindClientController } from '../controllers/clients/FindClientController';
import { SearchClientsController } from '../controllers/clients/SearchClientsController';
import { UpdateClientController } from '../controllers/clients/UpdateClientController';
import { DeleteClientController } from '../controllers/clients/DeleteClientController';
import { ClientType } from '../../../src/clients/domain/enums/ClientEnums';

export const registerClientRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const createClientController = new CreateClientController();
  const findClientController = new FindClientController();
  const searchClientsController = new SearchClientsController();
  const updateClientController = new UpdateClientController();
  const deleteClientController = new DeleteClientController();

  // POST /api/clients - Crear cliente
  fastify.post('/api/clients', {
    schema: {
      description: 'Crear un nuevo cliente',
      tags: ['clients'],
      body: {
        type: 'object',
        required: ['name', 'email', 'type'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 100 },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string', pattern: '^[+]?[\\d\\s\\-\\(\\)]{9,}$' },
          nif: { type: 'string', pattern: '^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$' },
          address: { type: 'string', maxLength: 500 },
          type: { 
            type: 'string', 
            enum: Object.values(ClientType),
            default: ClientType.INDIVIDUAL
          },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                nif: { type: 'string' },
                address: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
            message: { type: 'string' },
          },
        },
        400: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  }, createClientController.handle.bind(createClientController));

  // GET /api/clients/:id - Buscar cliente por ID
  fastify.get('/api/clients/:id', {
    schema: {
      description: 'Buscar cliente por ID',
      tags: ['clients'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                nif: { type: 'string' },
                address: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
            message: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
      },
    },
  }, findClientController.handle.bind(findClientController));

  // GET /api/clients - Buscar clientes con filtros
  fastify.get('/api/clients', {
    schema: {
      description: 'Buscar clientes con filtros y paginación',
      tags: ['clients'],
      querystring: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          nif: { type: 'string' },
          type: { type: 'string', enum: Object.values(ClientType) },
          status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'PENDING'] },
          page: { type: 'string', pattern: '^[0-9]+$', default: '1' },
          limit: { type: 'string', pattern: '^[0-9]+$', default: '10' },
          sortBy: { type: 'string', enum: ['name', 'email', 'createdAt', 'updatedAt'] },
          sortOrder: { type: 'string', enum: ['asc', 'desc'] },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  nif: { type: 'string' },
                  address: { type: 'string' },
                  type: { type: 'string' },
                  status: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
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
      },
    },
  }, searchClientsController.handle.bind(searchClientsController));

  // PUT /api/clients/:id - Actualizar cliente
  fastify.put('/api/clients/:id', {
    schema: {
      description: 'Actualizar cliente existente',
      tags: ['clients'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 100 },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string', pattern: '^[+]?[\\d\\s\\-\\(\\)]{9,}$' },
          nif: { type: 'string', pattern: '^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$' },
          address: { type: 'string', maxLength: 500 },
          type: { type: 'string', enum: Object.values(ClientType) },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                nif: { type: 'string' },
                address: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
            message: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  }, updateClientController.handle.bind(updateClientController));

  // DELETE /api/clients/:id - Eliminar cliente
  fastify.delete('/api/clients/:id', {
    schema: {
      description: 'Eliminar cliente (soft delete)',
      tags: ['clients'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
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
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  }, deleteClientController.handle.bind(deleteClientController));
};
