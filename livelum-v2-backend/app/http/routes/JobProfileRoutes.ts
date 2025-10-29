import { FastifyInstance } from 'fastify';
import { CreateJobProfileController } from '../controllers/jobProfiles/CreateJobProfileController';
import { SearchJobProfilesController } from '../controllers/jobProfiles/SearchJobProfilesController';

export async function JobProfileRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/job-profiles',
    {
      schema: {
        description: 'Crear un nuevo perfil de puesto',
        tags: ['JobProfiles'],
        body: {
          type: 'object',
          required: ['organizationalChart', 'name', 'description', 'organizationalLevel', 'companyId'],
          properties: {
            organizationalChart: { type: 'number', minimum: 1 },
            name: { type: 'string' },
            description: { type: 'string' },
            supervisorUserId: { type: 'string' },
            supervisorUserName: { type: 'string' },
            parentJobProfileId: { type: 'string' },
            parentJobProfileName: { type: 'string' },
            organizationalLevel: { 
              type: 'string', 
              enum: ['EXECUTIVE', 'MANAGEMENT', 'SUPERVISION', 'OPERATIONAL', 'SUPPORT'] 
            },
            responsibilities: { 
              type: 'array',
              items: { type: 'string' }
            },
            requirements: { 
              type: 'array',
              items: { type: 'string' }
            },
            competencies: { 
              type: 'array',
              items: { type: 'string' }
            },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateJobProfileController.handle
  );

  fastify.get(
    '/job-profiles',
    {
      schema: {
        description: 'Buscar perfiles de puesto con filtros',
        tags: ['JobProfiles'],
        querystring: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'DRAFT'] },
            organizationalLevel: { 
              type: 'string', 
              enum: ['EXECUTIVE', 'MANAGEMENT', 'SUPERVISION', 'OPERATIONAL', 'SUPPORT'] 
            },
            parentJobProfileId: { type: 'string' },
            supervisorUserId: { type: 'string' },
            companyId: { type: 'string' },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['name', 'organizationalChart', 'organizationalLevel', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchJobProfilesController.handle
  );
}

