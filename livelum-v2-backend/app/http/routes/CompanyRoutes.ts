import { FastifyInstance } from 'fastify';
import { CreateCompanyController } from '../controllers/companies/CreateCompanyController';
import { FindCompanyByIdController } from '../controllers/companies/FindCompanyByIdController';
import { FindCompanyByCuitController } from '../controllers/companies/FindCompanyByCuitController';
import { SearchCompaniesController } from '../controllers/companies/SearchCompaniesController';
import { UpdateCompanyController } from '../controllers/companies/UpdateCompanyController';
import { DeleteCompanyController } from '../controllers/companies/DeleteCompanyController';
import { ChangeCompanyStatusController } from '../controllers/companies/ChangeCompanyStatusController';
import { CompanyStatus } from '../../../src/companies/domain/enums/CompanyEnums';

export const registerCompanyRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const createCompanyController = new CreateCompanyController();
  const findCompanyByIdController = new FindCompanyByIdController();
  const findCompanyByCuitController = new FindCompanyByCuitController();
  const searchCompaniesController = new SearchCompaniesController();
  const updateCompanyController = new UpdateCompanyController();
  const deleteCompanyController = new DeleteCompanyController();
  const changeCompanyStatusController = new ChangeCompanyStatusController();

  // POST /api/companies - Crear empresa
  fastify.post('/api/companies', {
    schema: {
      description: 'Crear una nueva empresa',
      tags: ['companies'],
      body: {
        type: 'object',
        required: ['razonSocial', 'nombreFantasia', 'cuit'],
        properties: {
          razonSocial: { type: 'string', minLength: 2, maxLength: 200 },
          nombreFantasia: { type: 'string', minLength: 2, maxLength: 200 },
          cuit: { type: 'string', pattern: '^[0-9]{2}-[0-9]{8}-[0-9]$' },
          direccion: { type: 'string', maxLength: 500 },
          ciudad: { type: 'string', maxLength: 100 },
          provincia: { type: 'string', maxLength: 100 },
          codigoPostal: { type: 'string', maxLength: 20 },
          telefono: { type: 'string', pattern: '^[+]?[\\d\\s\\-\\(\\)]{9,}$' },
          email: { type: 'string', format: 'email' },
          website: { type: 'string', format: 'uri' },
          logo: { type: 'string' },
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
                razonSocial: { type: 'string' },
                nombreFantasia: { type: 'string' },
                cuit: { type: 'string' },
                direccion: { type: 'string' },
                ciudad: { type: 'string' },
                provincia: { type: 'string' },
                codigoPostal: { type: 'string' },
                telefono: { type: 'string' },
                email: { type: 'string' },
                website: { type: 'string' },
                logo: { type: 'string' },
                status: { type: 'string' },
                isActive: { type: 'boolean' },
                isInactive: { type: 'boolean' },
                isSuspended: { type: 'boolean' },
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
  }, createCompanyController.handle.bind(createCompanyController));

  // GET /api/companies/:id - Buscar empresa por ID
  fastify.get('/api/companies/:id', {
    schema: {
      description: 'Buscar empresa por ID',
      tags: ['companies'],
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
                razonSocial: { type: 'string' },
                nombreFantasia: { type: 'string' },
                cuit: { type: 'string' },
                status: { type: 'string' },
                isActive: { type: 'boolean' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
              },
            },
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
  }, findCompanyByIdController.handle.bind(findCompanyByIdController));

  // GET /api/companies/by-cuit - Buscar empresa por CUIT
  fastify.get('/api/companies/by-cuit', {
    schema: {
      description: 'Buscar empresa por CUIT',
      tags: ['companies'],
      querystring: {
        type: 'object',
        required: ['cuit'],
        properties: {
          cuit: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' },
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
  }, findCompanyByCuitController.handle.bind(findCompanyByCuitController));

  // GET /api/companies - Buscar empresas con filtros
  fastify.get('/api/companies', {
    schema: {
      description: 'Buscar empresas con filtros y paginación',
      tags: ['companies'],
      querystring: {
        type: 'object',
        properties: {
          razonSocial: { type: 'string' },
          nombreFantasia: { type: 'string' },
          cuit: { type: 'string' },
          ciudad: { type: 'string' },
          provincia: { type: 'string' },
          status: { type: 'string', enum: Object.values(CompanyStatus) },
          page: { type: 'string', pattern: '^[0-9]+$', default: '1' },
          limit: { type: 'string', pattern: '^[0-9]+$', default: '10' },
          sortBy: { type: 'string', enum: ['razonSocial', 'nombreFantasia', 'cuit', 'createdAt', 'updatedAt'] },
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
              items: { type: 'object' },
            },
            total: { type: 'number' },
          },
        },
      },
    },
  }, searchCompaniesController.handle.bind(searchCompaniesController));

  // PUT /api/companies/:id - Actualizar empresa
  fastify.put('/api/companies/:id', {
    schema: {
      description: 'Actualizar empresa existente',
      tags: ['companies'],
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
          razonSocial: { type: 'string', minLength: 2, maxLength: 200 },
          nombreFantasia: { type: 'string', minLength: 2, maxLength: 200 },
          cuit: { type: 'string', pattern: '^[0-9]{2}-[0-9]{8}-[0-9]$' },
          direccion: { type: 'string', maxLength: 500 },
          ciudad: { type: 'string', maxLength: 100 },
          provincia: { type: 'string', maxLength: 100 },
          codigoPostal: { type: 'string', maxLength: 20 },
          telefono: { type: 'string', pattern: '^[+]?[\\d\\s\\-\\(\\)]{9,}$' },
          email: { type: 'string', format: 'email' },
          website: { type: 'string', format: 'uri' },
          logo: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' },
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
  }, updateCompanyController.handle.bind(updateCompanyController));

  // DELETE /api/companies/:id - Eliminar empresa
  fastify.delete('/api/companies/:id', {
    schema: {
      description: 'Eliminar empresa',
      tags: ['companies'],
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
  }, deleteCompanyController.handle.bind(deleteCompanyController));

  // PATCH /api/companies/:id/status - Cambiar estado de empresa
  fastify.patch('/api/companies/:id/status', {
    schema: {
      description: 'Cambiar estado de empresa',
      tags: ['companies'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { 
            type: 'string', 
            enum: Object.values(CompanyStatus),
          },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' },
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
  }, changeCompanyStatusController.handle.bind(changeCompanyStatusController));
};

