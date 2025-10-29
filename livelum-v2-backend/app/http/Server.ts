import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import config from '../../config/index';
import { registerCompanyRoutes } from './routes/CompanyRoutes';
import { UserRoutes } from './routes/UserRoutes';
import { PersonRoutes } from './routes/PersonRoutes';
import { ObjectiveRoutes } from './routes/ObjectiveRoutes';
import { StakeholderRoutes } from './routes/StakeholderRoutes';
import { SupplierRoutes } from './routes/SupplierRoutes';
import { FindingRoutes } from './routes/FindingRoutes';
import { ActionPlanRoutes } from './routes/ActionPlanRoutes';
import { JobProfileRoutes } from './routes/JobProfileRoutes';
import { TrainingPlanRoutes } from './routes/TrainingPlanRoutes';
import { MinuteRoutes } from './routes/MinuteRoutes';
import { SkillRoutes } from './routes/SkillRoutes';
import { AuthorizationRoutes } from './routes/AuthorizationRoutes';
import { EquipmentRoutes } from './routes/EquipmentRoutes';
import { registerClientRoutes } from './routes/ClientRoutes';
import { registerDocumentRoutes } from './routes/DocumentRoutes';
import { registerAuditRoutes } from './routes/AuditRoutes';
import { registerProcessTypeRoutes } from './routes/ProcessTypeRoutes';
import { registerProcessNameRoutes } from './routes/ProcessNameRoutes';
import { registerRiskRoutes } from './routes/RiskRoutes';
import { registerIndicatorRoutes } from './routes/IndicatorRoutes';
import { registerAlertRoutes } from './routes/AlertRoutes';
import { Logger } from '../../src/cross-cutting/infrastructure/logger/Logger';

export class Server {
  private fastify: FastifyInstance;

  constructor(private readonly logger: Logger) {
    this.fastify = Fastify({
      logger: false, // Usamos nuestro propio logger
      trustProxy: true,
    });
  }

  async start(domain: string, port: number): Promise<void> {
    try {
      await this.registerPlugins();
      await this.registerSwagger();
      await this.registerRoutes();
      // Asegura que todos los plugins y rutas estén listos antes de exponer la spec
      await this.fastify.ready();
      // Generar la especificación una vez con todas las rutas registradas (como en cli-api-service)
      if (config.swagger.enabled) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (this.fastify as any).swagger?.();
      }
      
      await this.fastify.listen({ 
        host: '0.0.0.0', 
        port 
      });

      this.logger.info(`🚀 Servidor iniciado en http://${domain}:${port}`);
      
      if (config.swagger.enabled) {
        this.logger.info(`📚 Documentación disponible en http://${domain}:${port}${config.swagger.path}`);
      }
    } catch (error) {
      this.logger.error('Error al iniciar servidor', { error: (error as Error).message });
      throw error;
    }
  }

  private async registerPlugins(): Promise<void> {
    // CORS
    await this.fastify.register(cors, {
      origin: config.cors.origin,
      credentials: config.cors.credentials,
    });

    // Helmet para seguridad
    await this.fastify.register(helmet, {
      contentSecurityPolicy: false, // Deshabilitado para Swagger
    });

    // Compresión
    await this.fastify.register(compress);

    // Health check
    this.fastify.get('/health', async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.env,
      };
    });
  }

  private async registerRoutes(): Promise<void> {
    // Registrar rutas de empresas
    await registerCompanyRoutes(this.fastify);
    // Registrar rutas de usuarios
    await this.fastify.register(UserRoutes, { prefix: '/api' });
    // Registrar rutas de personas/personal
    await this.fastify.register(PersonRoutes, { prefix: '/api' });
    // Registrar rutas de objetivos
    await this.fastify.register(ObjectiveRoutes, { prefix: '/api' });
    // Registrar rutas de stakeholders
    await this.fastify.register(StakeholderRoutes, { prefix: '/api' });
    // Registrar rutas de proveedores
    await this.fastify.register(SupplierRoutes, { prefix: '/api' });
    // Registrar rutas de hallazgos
    await this.fastify.register(FindingRoutes, { prefix: '/api' });
    // Registrar rutas de planes de acción
    await this.fastify.register(ActionPlanRoutes, { prefix: '/api' });
    // Registrar rutas de perfiles de puesto
    await this.fastify.register(JobProfileRoutes, { prefix: '/api' });
    // Registrar rutas de planes de capacitación
    await this.fastify.register(TrainingPlanRoutes, { prefix: '/api' });
    // Registrar rutas de minutas
    await this.fastify.register(MinuteRoutes, { prefix: '/api' });
    // Registrar rutas de competencias/habilidades
    await this.fastify.register(SkillRoutes, { prefix: '/api' });
    // Registrar rutas de autorizaciones
    await this.fastify.register(AuthorizationRoutes, { prefix: '/api' });
    // Registrar rutas de equipos y sistemas
    await this.fastify.register(EquipmentRoutes, { prefix: '/api' });
    // Registrar rutas de clientes
    await registerClientRoutes(this.fastify);
    // Registrar rutas de documentos
    await registerDocumentRoutes(this.fastify);
    // Registrar rutas de auditorías
    await registerAuditRoutes(this.fastify);
    // Registrar rutas de tipos de proceso
    await registerProcessTypeRoutes(this.fastify);
    // Registrar rutas de nombres de proceso
    await registerProcessNameRoutes(this.fastify);
    // Registrar rutas de riesgos
    await registerRiskRoutes(this.fastify);
    // Registrar rutas de indicadores
    await registerIndicatorRoutes(this.fastify);
    // Registrar rutas de alertas
    await registerAlertRoutes(this.fastify);
  }

  private async registerSwagger(): Promise<void> {
    if (!config.swagger.enabled) {
      return;
    }

    await this.fastify.register(swagger, {
      swagger: {
        info: {
          title: 'Livelum v2 API',
          description: 'API REST para el sistema Livelum v2 con arquitectura DDD',
          version: '1.0.0',
        },
        host: `${config.domain}:${config.port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'Auth', description: 'Endpoints de autenticación' },
          { name: 'Users', description: 'Endpoints de gestión de usuarios' },
          { name: 'People', description: 'Endpoints de gestión de personal' },
          { name: 'Objectives', description: 'Endpoints de gestión de objetivos' },
          { name: 'Stakeholders', description: 'Endpoints de gestión de partes interesadas' },
          { name: 'Suppliers', description: 'Endpoints de gestión de proveedores' },
          { name: 'Findings', description: 'Endpoints de gestión de hallazgos' },
          { name: 'ActionPlans', description: 'Endpoints de gestión de planes de acción' },
          { name: 'JobProfiles', description: 'Endpoints de gestión de perfiles de puesto' },
          { name: 'TrainingPlans', description: 'Endpoints de gestión de planes de capacitación' },
          { name: 'Minutes', description: 'Endpoints de gestión de minutas/actas' },
          { name: 'Skills', description: 'Endpoints de gestión de competencias/habilidades' },
          { name: 'Authorizations', description: 'Endpoints de gestión de autorizaciones' },
          { name: 'Equipment', description: 'Endpoints de gestión de equipos y sistemas' },
          { name: 'clients', description: 'Endpoints de clientes' },
          { name: 'documents', description: 'Endpoints de documentos' },
          { name: 'audits', description: 'Endpoints de auditorías' },
          { name: 'process-types', description: 'Endpoints de tipos de proceso' },
          { name: 'process-names', description: 'Endpoints de nombres de proceso' },
          { name: 'risks', description: 'Endpoints de gestión de riesgos' },
          { name: 'indicators', description: 'Endpoints de gestión de indicadores' },
          { name: 'alerts', description: 'Endpoints de gestión de alertas' }
        ],
        definitions: {
          Client: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              nif: { type: 'string' },
              address: { type: 'string' },
              type: { type: 'string', enum: ['INDIVIDUAL', 'COMPANY', 'ORGANIZATION'] },
              status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'PENDING'] },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'email', 'type', 'status', 'createdAt', 'updatedAt'],
          },
          Document: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              code: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              version: { type: 'string' },
              type: { type: 'string', enum: ['MANUAL', 'POLITICA', 'FORMATO', 'PROCEDIMIENTO'] },
              status: { type: 'string', enum: ['BORRADOR', 'EN_REVISION', 'APROBADO', 'VENCIDO', 'ELIMINADO'] },
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
            required: ['id', 'code', 'title', 'version', 'type', 'status', 'author', 'createdDate', 'createdAt', 'updatedAt', 'isExpired', 'isExpiringSoon'],
          },
          Audit: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              auditType: { type: 'string', enum: ['INTERNAL', 'EXTERNAL'] },
              status: { type: 'string', enum: ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] },
              plannedDate: { type: 'string', format: 'date-time' },
              actualDate: { type: 'string', format: 'date-time' },
              auditorName: { type: 'string' },
              scope: { type: 'string' },
              findings: { type: 'string' },
              recommendations: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              isOverdue: { type: 'boolean' },
              isUpcoming: { type: 'boolean' },
              daysUntilPlanned: { type: 'number' },
              daysOverdue: { type: 'number' },
            },
            required: ['id', 'title', 'auditType', 'status', 'plannedDate', 'auditorName', 'scope', 'createdAt', 'updatedAt', 'isOverdue', 'isUpcoming', 'daysUntilPlanned', 'daysOverdue'],
          },
          ProcessTypeLink: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              path: { type: 'string' },
            },
            required: ['name', 'path'],
          },
          ProcessType: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              order: { type: 'number' },
              name: { type: 'string' },
              links: {
                type: 'array',
                items: { $ref: '#/definitions/ProcessTypeLink' },
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'order', 'name', 'links', 'createdAt', 'updatedAt'],
          },
          ProcessName: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              order: { type: 'number' },
              processTypeId: { type: 'string' },
              name: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'order', 'processTypeId', 'name', 'createdAt', 'updatedAt'],
          },
          Risk: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              code: { type: 'string' },
              category: { type: 'string', enum: ['TECNOLOGICO', 'RECURSOS_HUMANOS', 'REGULATORIO', 'OPERACIONAL', 'FINANCIERO', 'ESTRATEGICO', 'COMPLIANCE', 'SEGURIDAD'] },
              probability: { type: 'string', enum: ['BAJA', 'MEDIA', 'ALTA'] },
              impact: { type: 'string', enum: ['BAJO', 'MEDIO', 'ALTO'] },
              riskLevel: { type: 'string', enum: ['BAJO', 'MEDIO', 'ALTO', 'CRITICO'] },
              status: { type: 'string', enum: ['ACTIVE', 'MONITORED', 'MITIGATED', 'CLOSED'] },
              owner: { type: 'string' },
              dueDate: { type: 'string', format: 'date-time' },
              description: { type: 'string' },
              mitigation: { type: 'string' },
              isOverdue: { type: 'boolean' },
              isCritical: { type: 'boolean' },
              isHighRisk: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'title', 'code', 'category', 'probability', 'impact', 'riskLevel', 'status', 'owner', 'dueDate', 'description', 'mitigation', 'isOverdue', 'isCritical', 'isHighRisk', 'createdAt', 'updatedAt'],
          },
          Indicator: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              code: { type: 'string' },
              category: { type: 'string', enum: ['CALIDAD', 'OPERACIONES', 'PRODUCTIVIDAD', 'FINANCIERO', 'RECURSOS_HUMANOS', 'SEGURIDAD', 'MEDIO_AMBIENTE', 'SATISFACCION_CLIENTE'] },
              type: { type: 'string', enum: ['PORCENTAJE', 'TIEMPO', 'NUMERICO', 'MONETARIO', 'RATIO', 'INDICE'] },
              currentValue: { type: 'number' },
              targetValue: { type: 'number' },
              unit: { type: 'string' },
              trend: { type: 'string', enum: ['UP', 'DOWN', 'STABLE'] },
              status: { type: 'string', enum: ['GOOD', 'WARNING', 'CRITICAL'] },
              owner: { type: 'string' },
              lastUpdate: { type: 'string', format: 'date-time' },
              frequency: { type: 'string', enum: ['DIARIO', 'SEMANAL', 'MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'] },
              description: { type: 'string' },
              isAboveTarget: { type: 'boolean' },
              isBelowTarget: { type: 'boolean' },
              isOnTarget: { type: 'boolean' },
              progressPercentage: { type: 'number' },
              isCritical: { type: 'boolean' },
              isWarning: { type: 'boolean' },
              isGood: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'code', 'category', 'type', 'currentValue', 'targetValue', 'unit', 'trend', 'status', 'owner', 'lastUpdate', 'frequency', 'isAboveTarget', 'isBelowTarget', 'isOnTarget', 'progressPercentage', 'isCritical', 'isWarning', 'isGood', 'createdAt', 'updatedAt'],
          },
          Alert: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              message: { type: 'string' },
              type: { type: 'string', enum: ['INFO', 'WARNING', 'ERROR', 'CRITICAL', 'SUCCESS'] },
              status: { type: 'string', enum: ['PENDING', 'SENT', 'READ', 'ACKNOWLEDGED', 'DISMISSED'] },
              priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] },
              category: { type: 'string', enum: ['SYSTEM', 'SECURITY', 'PERFORMANCE', 'BUSINESS', 'COMPLIANCE', 'MAINTENANCE'] },
              channel: { type: 'string', enum: ['EMAIL', 'SMS', 'PUSH', 'DASHBOARD', 'WEBHOOK'] },
              recipient: { type: 'string' },
              sender: { type: 'string' },
              relatedEntityType: { type: 'string' },
              relatedEntityId: { type: 'string' },
              scheduledFor: { type: 'string', format: 'date-time' },
              sentAt: { type: 'string', format: 'date-time' },
              readAt: { type: 'string', format: 'date-time' },
              acknowledgedAt: { type: 'string', format: 'date-time' },
              dismissedAt: { type: 'string', format: 'date-time' },
              metadata: { type: 'object' },
              isPending: { type: 'boolean' },
              isSent: { type: 'boolean' },
              isRead: { type: 'boolean' },
              isAcknowledged: { type: 'boolean' },
              isDismissed: { type: 'boolean' },
              isActive: { type: 'boolean' },
              isOverdue: { type: 'boolean' },
              isHighPriority: { type: 'boolean' },
              isCritical: { type: 'boolean' },
              ageInMinutes: { type: 'number' },
              timeToSend: { type: 'number' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'title', 'message', 'type', 'status', 'priority', 'category', 'channel', 'recipient', 'sender', 'isPending', 'isSent', 'isRead', 'isAcknowledged', 'isDismissed', 'isActive', 'isOverdue', 'isHighPriority', 'isCritical', 'ageInMinutes', 'timeToSend', 'createdAt', 'updatedAt'],
          },
          ErrorResponse: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
            required: ['success', 'error', 'message'],
          },
        },
      },
    });

    await this.fastify.register(swaggerUi, {
      routePrefix: config.swagger.path,
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (_request, _reply, next) {
          next();
        },
        preHandler: function (_request, _reply, next) {
          next();
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
    });
  }

  async stop(): Promise<void> {
    try {
      await this.fastify.close();
      this.logger.info('Servidor detenido exitosamente');
    } catch (error) {
      this.logger.error('Error al detener servidor', { error: (error as Error).message });
      throw error;
    }
  }

  getFastifyInstance(): FastifyInstance {
    return this.fastify;
  }
}
