import { FastifyInstance } from 'fastify';
import { CreateUserController } from '../controllers/users/CreateUserController';
import { FindUserByIdController } from '../controllers/users/FindUserByIdController';
import { FindUserByUsernameController } from '../controllers/users/FindUserByUsernameController';
import { SearchUsersController } from '../controllers/users/SearchUsersController';
import { UpdateUserController } from '../controllers/users/UpdateUserController';
import { DeleteUserController } from '../controllers/users/DeleteUserController';
import { LoginUserController } from '../controllers/users/LoginUserController';
import { ChangeUserPasswordController } from '../controllers/users/ChangeUserPasswordController';
import { ChangeUserStatusController } from '../controllers/users/ChangeUserStatusController';
import { AssignRolesController } from '../controllers/users/AssignRolesController';
import { VerifyEmailController } from '../controllers/users/VerifyEmailController';
import { RequestPasswordResetController } from '../controllers/users/RequestPasswordResetController';
import { ResetPasswordController } from '../controllers/users/ResetPasswordController';

export async function UserRoutes(fastify: FastifyInstance) {
  // Autenticación
  fastify.post(
    '/auth/login',
    {
      schema: {
        description: 'Login de usuario',
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', description: 'Nombre de usuario' },
            password: { type: 'string', description: 'Contraseña' },
          },
        },
        response: {
          200: {
            description: 'Login exitoso',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { type: 'object' },
            },
          },
        },
      },
    },
    LoginUserController.handle
  );

  // Password Reset
  fastify.post(
    '/auth/request-password-reset',
    {
      schema: {
        description: 'Solicitar reseteo de contraseña',
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email', description: 'Email del usuario' },
          },
        },
      },
    },
    RequestPasswordResetController.handle
  );

  fastify.post(
    '/auth/reset-password',
    {
      schema: {
        description: 'Resetear contraseña con token',
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['token', 'newPassword'],
          properties: {
            token: { type: 'string', description: 'Token de reseteo' },
            newPassword: { type: 'string', description: 'Nueva contraseña' },
          },
        },
      },
    },
    ResetPasswordController.handle
  );

  // CRUD de Usuarios
  fastify.post(
    '/users',
    {
      schema: {
        description: 'Crear un nuevo usuario',
        tags: ['Users'],
        body: {
          type: 'object',
          required: ['username', 'nombre', 'apellido', 'email', 'password', 'companyId'],
          properties: {
            username: { type: 'string', description: 'Nombre de usuario único' },
            nombre: { type: 'string', description: 'Nombre' },
            apellido: { type: 'string', description: 'Apellido' },
            email: { type: 'string', format: 'email', description: 'Email único' },
            password: { type: 'string', description: 'Contraseña' },
            telefono: { type: 'string', description: 'Teléfono' },
            companyId: { type: 'string', description: 'ID de la empresa' },
            roles: { 
              type: 'array', 
              items: { 
                type: 'string',
                enum: ['ADMIN', 'CONSULTOR', 'EDITOR_ONBOARDINGS', 'VIEWER']
              },
              description: 'Roles del usuario'
            },
            avatar: { type: 'string', description: 'URL del avatar' },
          },
        },
        response: {
          201: {
            description: 'Usuario creado exitosamente',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { type: 'object' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    CreateUserController.handle
  );

  fastify.get(
    '/users/:id',
    {
      schema: {
        description: 'Buscar usuario por ID',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
      },
    },
    FindUserByIdController.handle
  );

  fastify.get(
    '/users/by-username',
    {
      schema: {
        description: 'Buscar usuario por username',
        tags: ['Users'],
        querystring: {
          type: 'object',
          required: ['username'],
          properties: {
            username: { type: 'string', description: 'Username del usuario' },
          },
        },
      },
    },
    FindUserByUsernameController.handle
  );

  fastify.get(
    '/users',
    {
      schema: {
        description: 'Buscar usuarios con filtros',
        tags: ['Users'],
        querystring: {
          type: 'object',
          properties: {
            username: { type: 'string', description: 'Filtrar por username' },
            nombre: { type: 'string', description: 'Filtrar por nombre' },
            apellido: { type: 'string', description: 'Filtrar por apellido' },
            email: { type: 'string', description: 'Filtrar por email' },
            companyId: { type: 'string', description: 'Filtrar por empresa' },
            role: { 
              type: 'string',
              enum: ['ADMIN', 'CONSULTOR', 'EDITOR_ONBOARDINGS', 'VIEWER'],
              description: 'Filtrar por rol'
            },
            status: { 
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'],
              description: 'Filtrar por estado'
            },
            emailVerified: { type: 'boolean', description: 'Filtrar por email verificado' },
            page: { type: 'integer', minimum: 1, description: 'Número de página' },
            limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Límite de resultados' },
            sortBy: { 
              type: 'string',
              enum: ['username', 'nombre', 'apellido', 'email', 'createdAt', 'updatedAt', 'lastLogin'],
              description: 'Campo de ordenamiento'
            },
            sortOrder: { 
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Orden de clasificación'
            },
          },
        },
      },
    },
    SearchUsersController.handle
  );

  fastify.put(
    '/users/:id',
    {
      schema: {
        description: 'Actualizar usuario',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
        body: {
          type: 'object',
          properties: {
            username: { type: 'string', description: 'Nombre de usuario' },
            nombre: { type: 'string', description: 'Nombre' },
            apellido: { type: 'string', description: 'Apellido' },
            email: { type: 'string', format: 'email', description: 'Email' },
            telefono: { type: 'string', description: 'Teléfono' },
            avatar: { type: 'string', description: 'URL del avatar' },
          },
        },
      },
    },
    UpdateUserController.handle
  );

  fastify.delete(
    '/users/:id',
    {
      schema: {
        description: 'Eliminar usuario',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
      },
    },
    DeleteUserController.handle
  );

  // Gestión de contraseña
  fastify.patch(
    '/users/:id/change-password',
    {
      schema: {
        description: 'Cambiar contraseña de usuario',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
        body: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: { type: 'string', description: 'Contraseña actual' },
            newPassword: { type: 'string', description: 'Nueva contraseña' },
          },
        },
      },
    },
    ChangeUserPasswordController.handle
  );

  // Gestión de estado
  fastify.patch(
    '/users/:id/status',
    {
      schema: {
        description: 'Cambiar estado de usuario',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
        body: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { 
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'],
              description: 'Nuevo estado'
            },
          },
        },
      },
    },
    ChangeUserStatusController.handle
  );

  // Gestión de roles
  fastify.patch(
    '/users/:id/roles',
    {
      schema: {
        description: 'Asignar roles a usuario',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
        body: {
          type: 'object',
          required: ['roles'],
          properties: {
            roles: { 
              type: 'array',
              items: {
                type: 'string',
                enum: ['ADMIN', 'CONSULTOR', 'EDITOR_ONBOARDINGS', 'VIEWER']
              },
              description: 'Roles a asignar'
            },
          },
        },
      },
    },
    AssignRolesController.handle
  );

  // Verificación de email
  fastify.patch(
    '/users/:id/verify-email',
    {
      schema: {
        description: 'Verificar email de usuario',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del usuario' },
          },
        },
      },
    },
    VerifyEmailController.handle
  );
}

