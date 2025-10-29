import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { CreateAuditUseCase } from '../../../../src/audits/application/useCases/CreateAuditUseCase';
import { CreateAuditRequest } from '../../../../src/audits/application/dtos/CreateAuditRequest';
import { AuditType } from '../../../../src/audits/domain/enums/AuditEnums';

/**
 * Request body interface for creating a new audit
 * @interface CreateAuditRequestBody
 */
interface CreateAuditRequestBody {
  /** Audit's title */
  title: string;
  /** Audit type: INTERNAL or EXTERNAL */
  auditType: AuditType;
  /** Planned date for the audit */
  plannedDate: Date;
  /** Name of the auditor */
  auditorName: string;
  /** Scope of the audit */
  scope: string;
}

/**
 * Controller for handling audit creation requests
 * @class CreateAuditController
 */
export class CreateAuditController {
  /**
   * Creates a new audit
   * @description Creates a new audit in the system with the provided information
   * @param {FastifyRequest<{ Body: CreateAuditRequestBody }>} request - The HTTP request containing audit data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * POST /api/audits
   * {
   *   "title": "Auditoría Interna SGC Q1-2024",
   *   "auditType": "INTERNAL",
   *   "plannedDate": "2024-03-15T00:00:00.000Z",
   *   "auditorName": "María González",
   *   "scope": "Proceso de gestión documental y control de versiones"
   * }
   *
   * @throws {400} Bad Request - When validation fails
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Body: CreateAuditRequestBody }>, reply: FastifyReply): Promise<void> {
    try {
      const createAuditUseCase = container.resolve<CreateAuditUseCase>(DependencyIdentifier.CreateAuditUseCase);

      const auditRequest: CreateAuditRequest = {
        title: request.body.title,
        auditType: request.body.auditType,
        plannedDate: request.body.plannedDate,
        auditorName: request.body.auditorName,
        scope: request.body.scope,
      };

      const audit = await createAuditUseCase.execute(auditRequest);

      reply.status(201).send({
        success: true,
        data: audit,
        message: 'Auditoría creada exitosamente',
      });
    } catch (error) {
      reply.status(400).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al crear auditoría',
      });
    }
  }
}
