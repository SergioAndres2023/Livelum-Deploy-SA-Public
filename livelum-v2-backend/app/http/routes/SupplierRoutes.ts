import { FastifyInstance } from 'fastify';
import { CreateSupplierController } from '../controllers/suppliers/CreateSupplierController';
import { SearchSuppliersController } from '../controllers/suppliers/SearchSuppliersController';
import { UpdateSupplierController } from '../controllers/suppliers/UpdateSupplierController';
import { UpdateSupplierEvaluationController } from '../controllers/suppliers/UpdateSupplierEvaluationController';

export async function SupplierRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/suppliers',
    {
      schema: {
        description: 'Crear un nuevo proveedor',
        tags: ['Suppliers'],
        body: {
          type: 'object',
          required: ['rubro', 'proveedor', 'contacto', 'companyId'],
          properties: {
            rubro: { type: 'string' },
            proveedor: { type: 'string' },
            contacto: {
              type: 'object',
              required: ['cuit', 'email', 'telefono'],
              properties: {
                cuit: { type: 'string' },
                email: { type: 'string', format: 'email' },
                telefono: { type: 'string' },
              },
            },
            ultimaEvaluacion: { type: 'string', format: 'date-time' },
            siguienteEvaluacion: { type: 'string', format: 'date-time' },
            evaluacion: { type: 'number', minimum: 0, maximum: 10 },
            companyId: { type: 'string' },
          },
        },
      },
    },
    CreateSupplierController.handle
  );

  fastify.get(
    '/suppliers',
    {
      schema: {
        description: 'Buscar proveedores con filtros',
        tags: ['Suppliers'],
        querystring: {
          type: 'object',
          properties: {
            rubro: { type: 'string' },
            proveedor: { type: 'string' },
            estado: { type: 'string', enum: ['APPROVED', 'CONDITIONAL', 'NOT_APPROVED'] },
            companyId: { type: 'string' },
            evaluationOverdue: { type: 'boolean' },
            minEvaluacion: { type: 'number', minimum: 0, maximum: 10 },
            maxEvaluacion: { type: 'number', minimum: 0, maximum: 10 },
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
            sortBy: { type: 'string', enum: ['rubro', 'proveedor', 'evaluacion', 'ultimaEvaluacion', 'siguienteEvaluacion', 'createdAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
          },
        },
      },
    },
    SearchSuppliersController.handle
  );

  fastify.put(
    '/suppliers/:id',
    {
      schema: {
        description: 'Actualizar proveedor',
        tags: ['Suppliers'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            rubro: { type: 'string' },
            proveedor: { type: 'string' },
            contacto: {
              type: 'object',
              properties: {
                cuit: { type: 'string' },
                email: { type: 'string', format: 'email' },
                telefono: { type: 'string' },
              },
            },
            ultimaEvaluacion: { type: 'string', format: 'date-time' },
            siguienteEvaluacion: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    UpdateSupplierController.handle
  );

  fastify.patch(
    '/suppliers/:id/evaluation',
    {
      schema: {
        description: 'Actualizar evaluación del proveedor',
        tags: ['Suppliers'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['evaluacion'],
          properties: {
            evaluacion: { type: 'number', minimum: 0, maximum: 10 },
            ultimaEvaluacion: { type: 'string', format: 'date-time' },
            siguienteEvaluacion: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    UpdateSupplierEvaluationController.handle
  );
}

