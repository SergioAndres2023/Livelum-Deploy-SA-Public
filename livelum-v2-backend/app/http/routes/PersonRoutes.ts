import { FastifyInstance } from 'fastify';
import { CreatePersonController } from '../controllers/people/CreatePersonController';
import { FindPersonByIdController } from '../controllers/people/FindPersonByIdController';
import { SearchPeopleController } from '../controllers/people/SearchPeopleController';
import { UpdatePersonController } from '../controllers/people/UpdatePersonController';
import { DeletePersonController } from '../controllers/people/DeletePersonController';
import { ChangePersonStatusController } from '../controllers/people/ChangePersonStatusController';
import { AssignPositionsController } from '../controllers/people/AssignPositionsController';

export async function PersonRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/people',
    {
      schema: {
        description: 'Crear una nueva persona',
        tags: ['People'],
        body: {
          type: 'object',
          required: ['username', 'nombre', 'apellido', 'documento', 'companyId'],
          properties: {
            username: { type: 'string' },
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            email: { type: 'string', format: 'email' },
            documento: { type: 'string' },
            telefono: { type: 'string' },
            companyId: { type: 'string' },
            positions: { type: 'array', items: { type: 'string' } },
            contractType: { type: 'string', enum: ['PERMANENT', 'TEMPORARY', 'PART_TIME', 'CONTRACTOR', 'INTERN', 'FREELANCE'] },
            hireDate: { type: 'string', format: 'date-time' },
            avatar: { type: 'string' },
            department: { type: 'string' },
            supervisor: { type: 'string' },
            salary: { type: 'number' },
            address: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            notes: { type: 'string' },
          },
        },
      },
    },
    CreatePersonController.handle
  );

  fastify.get(
    '/people/:id',
    {
      schema: {
        description: 'Buscar persona por ID',
        tags: ['People'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    FindPersonByIdController.handle
  );

  fastify.get(
    '/people',
    {
      schema: {
        description: 'Buscar personas con filtros',
        tags: ['People'],
        querystring: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            email: { type: 'string' },
            documento: { type: 'string' },
            companyId: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'SUSPENDED', 'TERMINATED'] },
            contractType: { type: 'string', enum: ['PERMANENT', 'TEMPORARY', 'PART_TIME', 'CONTRACTOR', 'INTERN', 'FREELANCE'] },
            department: { type: 'string' },
            position: { type: 'string' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['username', 'nombre', 'apellido', 'email', 'documento', 'createdAt', 'updatedAt', 'hireDate'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchPeopleController.handle
  );

  fastify.put(
    '/people/:id',
    {
      schema: {
        description: 'Actualizar persona',
        tags: ['People'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            email: { type: 'string', format: 'email' },
            documento: { type: 'string' },
            telefono: { type: 'string' },
            positions: { type: 'array', items: { type: 'string' } },
            contractType: { type: 'string', enum: ['PERMANENT', 'TEMPORARY', 'PART_TIME', 'CONTRACTOR', 'INTERN', 'FREELANCE'] },
            avatar: { type: 'string' },
            department: { type: 'string' },
            supervisor: { type: 'string' },
            salary: { type: 'number' },
            address: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            notes: { type: 'string' },
          },
        },
      },
    },
    UpdatePersonController.handle
  );

  fastify.delete(
    '/people/:id',
    {
      schema: {
        description: 'Eliminar persona',
        tags: ['People'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    DeletePersonController.handle
  );

  fastify.patch(
    '/people/:id/status',
    {
      schema: {
        description: 'Cambiar estado de persona',
        tags: ['People'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'SUSPENDED', 'TERMINATED'] },
          },
        },
      },
    },
    ChangePersonStatusController.handle
  );

  fastify.patch(
    '/people/:id/positions',
    {
      schema: {
        description: 'Asignar puestos a persona',
        tags: ['People'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['positions'],
          properties: {
            positions: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    AssignPositionsController.handle
  );
}

