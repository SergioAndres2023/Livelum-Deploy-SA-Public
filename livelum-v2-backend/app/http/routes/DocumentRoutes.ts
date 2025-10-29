import { FastifyInstance } from 'fastify';
import { CreateDocumentController } from '../controllers/documents/CreateDocumentController';
import { FindDocumentController } from '../controllers/documents/FindDocumentController';
import { SearchDocumentsController } from '../controllers/documents/SearchDocumentsController';
import { UpdateDocumentController } from '../controllers/documents/UpdateDocumentController';
import { DeleteDocumentController } from '../controllers/documents/DeleteDocumentController';
import { RestoreDocumentController } from '../controllers/documents/RestoreDocumentController';
import { ApproveDocumentController } from '../controllers/documents/ApproveDocumentController';
import { GetDocumentStatsController } from '../controllers/documents/GetDocumentStatsController';
import { DocumentType, DocumentStatus } from '../../../src/documents/domain/enums/DocumentEnums';

export const registerDocumentRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const createDocumentController = new CreateDocumentController();
  const findDocumentController = new FindDocumentController();
  const searchDocumentsController = new SearchDocumentsController();
  const updateDocumentController = new UpdateDocumentController();
  const deleteDocumentController = new DeleteDocumentController();
  const restoreDocumentController = new RestoreDocumentController();
  const approveDocumentController = new ApproveDocumentController();
  const getDocumentStatsController = new GetDocumentStatsController();

  // POST /api/documents - Crear documento
  fastify.post('/api/documents', {
    schema: {
      description: 'Crear un nuevo documento',
      tags: ['documents'],
      body: {
        type: 'object',
        required: ['code', 'title', 'type', 'author'],
        properties: {
          code: { 
            type: 'string', 
            minLength: 3, 
            maxLength: 20,
            pattern: '^[A-Z0-9-]+$',
            description: 'Código único del documento (ej: DOC-001)'
          },
          title: { 
            type: 'string', 
            minLength: 2, 
            maxLength: 200,
            description: 'Título del documento'
          },
          description: { 
            type: 'string', 
            maxLength: 1000,
            description: 'Descripción del documento'
          },
          type: { 
            type: 'string', 
            enum: Object.values(DocumentType),
            description: 'Tipo de documento'
          },
          author: { 
            type: 'string', 
            minLength: 2, 
            maxLength: 100,
            description: 'Autor del documento'
          },
          expiryDate: { 
            type: 'string', 
            format: 'date-time',
            description: 'Fecha de vencimiento del documento'
          },
          fileUrl: { 
            type: 'string',
            description: 'URL del archivo en S3'
          },
          fileName: { 
            type: 'string', 
            maxLength: 255,
            description: 'Nombre del archivo'
          },
          fileSize: { 
            type: 'number', 
            minimum: 0,
            description: 'Tamaño del archivo en bytes'
          },
          mimeType: { 
            type: 'string',
            description: 'Tipo MIME del archivo'
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
                code: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                version: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                author: { type: 'string' },
                createdDate: { type: 'string', format: 'date-time' },
                expiryDate: { type: 'string', format: 'date-time' },
                fileUrl: { type: 'string' },
                fileName: { type: 'string' },
                fileSize: { type: 'number' },
                mimeType: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                isExpired: { type: 'boolean' },
                isExpiringSoon: { type: 'boolean' },
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
        409: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  }, createDocumentController.handle.bind(createDocumentController));

  // GET /api/documents/:id - Buscar documento por ID
  fastify.get('/api/documents/:id', {
    schema: {
      description: 'Buscar documento por ID',
      tags: ['documents'],
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
                code: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                version: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                author: { type: 'string' },
                createdDate: { type: 'string', format: 'date-time' },
                expiryDate: { type: 'string', format: 'date-time' },
                fileUrl: { type: 'string' },
                fileName: { type: 'string' },
                fileSize: { type: 'number' },
                mimeType: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                isExpired: { type: 'boolean' },
                isExpiringSoon: { type: 'boolean' },
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
  }, findDocumentController.handle.bind(findDocumentController));

  // GET /api/documents - Buscar documentos con filtros
  fastify.get('/api/documents', {
    schema: {
      description: 'Buscar documentos con filtros y paginación',
      tags: ['documents'],
      querystring: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Filtrar por título (búsqueda parcial)' },
          code: { type: 'string', description: 'Filtrar por código (búsqueda parcial)' },
          type: { type: 'string', enum: Object.values(DocumentType), description: 'Filtrar por tipo' },
          status: { type: 'string', enum: Object.values(DocumentStatus), description: 'Filtrar por estado' },
          author: { type: 'string', description: 'Filtrar por autor (búsqueda parcial)' },
          expiringSoon: { type: 'string', enum: ['true', 'false'], description: 'Filtrar documentos próximos a vencer' },
          expired: { type: 'string', enum: ['true', 'false'], description: 'Filtrar documentos vencidos' },
          page: { type: 'string', pattern: '^[0-9]+$', default: '1', description: 'Número de página' },
          limit: { type: 'string', pattern: '^[0-9]+$', default: '10', description: 'Elementos por página' },
          sortBy: { type: 'string', enum: ['title', 'code', 'createdDate', 'expiryDate', 'createdAt', 'updatedAt'], description: 'Campo para ordenar' },
          sortOrder: { type: 'string', enum: ['asc', 'desc'], description: 'Orden de clasificación' },
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
                  code: { type: 'string' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  version: { type: 'string' },
                  type: { type: 'string' },
                  status: { type: 'string' },
                  author: { type: 'string' },
                  createdDate: { type: 'string', format: 'date-time' },
                  expiryDate: { type: 'string', format: 'date-time' },
                  fileUrl: { type: 'string' },
                  fileName: { type: 'string' },
                  fileSize: { type: 'number' },
                  mimeType: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  isExpired: { type: 'boolean' },
                  isExpiringSoon: { type: 'boolean' },
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
  }, searchDocumentsController.handle.bind(searchDocumentsController));

  // PUT /api/documents/:id - Actualizar documento
  fastify.put('/api/documents/:id', {
    schema: {
      description: 'Actualizar documento existente',
      tags: ['documents'],
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
          code: { 
            type: 'string', 
            minLength: 3, 
            maxLength: 20,
            pattern: '^[A-Z0-9-]+$'
          },
          title: { 
            type: 'string', 
            minLength: 2, 
            maxLength: 200
          },
          description: { 
            type: 'string', 
            maxLength: 1000
          },
          type: { 
            type: 'string', 
            enum: Object.values(DocumentType)
          },
          author: { 
            type: 'string', 
            minLength: 2, 
            maxLength: 100
          },
          expiryDate: { 
            type: 'string', 
            format: 'date-time'
          },
          fileUrl: { 
            type: 'string'
          },
          fileName: { 
            type: 'string', 
            maxLength: 255
          },
          fileSize: { 
            type: 'number', 
            minimum: 0
          },
          mimeType: { 
            type: 'string'
          },
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
                code: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                version: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                author: { type: 'string' },
                createdDate: { type: 'string', format: 'date-time' },
                expiryDate: { type: 'string', format: 'date-time' },
                fileUrl: { type: 'string' },
                fileName: { type: 'string' },
                fileSize: { type: 'number' },
                mimeType: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                isExpired: { type: 'boolean' },
                isExpiringSoon: { type: 'boolean' },
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
  }, updateDocumentController.handle.bind(updateDocumentController));

  // DELETE /api/documents/:id - Eliminar documento
  fastify.delete('/api/documents/:id', {
    schema: {
      description: 'Eliminar documento (soft delete)',
      tags: ['documents'],
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
  }, deleteDocumentController.handle.bind(deleteDocumentController));

  // POST /api/documents/:id/restore - Restaurar documento eliminado
  fastify.post('/api/documents/:id/restore', {
    schema: {
      description: 'Restaurar documento eliminado',
      tags: ['documents'],
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
                code: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                version: { type: 'string' },
                type: { type: 'string', enum: Object.values(DocumentType) },
                status: { type: 'string', enum: Object.values(DocumentStatus) },
                author: { type: 'string' },
                createdDate: { type: 'string', format: 'date-time' },
                expiryDate: { type: 'string', format: 'date-time' },
                fileUrl: { type: 'string' },
                fileName: { type: 'string' },
                fileSize: { type: 'number' },
                mimeType: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                isExpired: { type: 'boolean' },
                isExpiringSoon: { type: 'boolean' },
              },
            },
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
  }, restoreDocumentController.handle.bind(restoreDocumentController));

  // POST /api/documents/:id/approve - Aprobar documento
  fastify.post('/api/documents/:id/approve', {
    schema: {
      description: 'Aprobar documento en revisión',
      tags: ['documents'],
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
                code: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                version: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                author: { type: 'string' },
                createdDate: { type: 'string', format: 'date-time' },
                expiryDate: { type: 'string', format: 'date-time' },
                fileUrl: { type: 'string' },
                fileName: { type: 'string' },
                fileSize: { type: 'number' },
                mimeType: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                isExpired: { type: 'boolean' },
                isExpiringSoon: { type: 'boolean' },
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
  }, approveDocumentController.handle.bind(approveDocumentController));

  // GET /api/documents/stats - Estadísticas de documentos
  fastify.get('/api/documents/stats', {
    schema: {
      description: 'Obtener estadísticas de documentos',
      tags: ['documents'],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                total: { type: 'number' },
                inReview: { type: 'number' },
                approved: { type: 'number' },
                expiringSoon: { type: 'number' },
                expired: { type: 'number' },
                byType: {
                  type: 'object',
                  properties: {
                    MANUAL: { type: 'number' },
                    POLITICA: { type: 'number' },
                    FORMATO: { type: 'number' },
                    PROCEDIMIENTO: { type: 'number' },
                  },
                },
              },
            },
            message: { type: 'string' },
          },
        },
      },
    },
  }, getDocumentStatsController.handle.bind(getDocumentStatsController));
};
