import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { UpdateAuditUseCase } from '../../../../src/audits/application/useCases/UpdateAuditUseCase';
import { UpdateAuditRequest } from '../../../../src/audits/application/dtos/UpdateAuditRequest';
import { AuditType } from '../../../../src/audits/domain/enums/AuditEnums';

/**
 * Request parameters interface for updating an audit
 * @interface UpdateAuditParams
 */
interface UpdateAuditParams {
  /** The audit ID to update */
  id: string;
}

/**
 * Request body interface for updating an audit
 * @interface UpdateAuditRequestBody
 */
interface UpdateAuditRequestBody {
  /** New audit title */
  title?: string;
  /** New audit type */
  auditType?: AuditType;
  /** New planned date */
  plannedDate?: Date;
  /** New auditor name */
  auditorName?: string;
  /** New audit scope */
  scope?: string;
}

/**
 * Controller for handling audit update requests
 * @class UpdateAuditController
 */
export class UpdateAuditController {
  /**
   * Updates an existing audit
   * @description Updates an audit's information with the provided data
   * @param {FastifyRequest<{ Params: UpdateAuditParams; Body: UpdateAuditRequestBody }>} request - The HTTP request containing audit ID and update data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * PUT /api/audits/507f1f77bcf86cd799439011
   * {
   *   "title": "Auditoría Interna SGC Q1-2024 - Actualizada",
   *   "auditorName": "María González López",
   *   "scope": "Proceso de gestión documental, control de versiones y trazabilidad"
   * }
   *
   * @throws {400} Bad Request - When validation fails
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{
      Params: UpdateAuditParams;
      Body: UpdateAuditRequestBody;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const updateAuditUseCase = container.resolve<UpdateAuditUseCase>(DependencyIdentifier.UpdateAuditUseCase);

      const updateRequest: UpdateAuditRequest = {
        title: request.body.title,
        auditType: request.body.auditType,
        plannedDate: request.body.plannedDate,
        auditorName: request.body.auditorName,
        scope: request.body.scope,
      };

      const audit = await updateAuditUseCase.execute(request.params.id, updateRequest);

      reply.status(200).send({
        success: true,
        data: audit,
        message: 'Auditoría actualizada exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('no encontrada')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Auditoría no encontrada',
        });
      } else {
        reply.status(400).send({
          success: false,
          error: errorMessage,
          message: 'Error al actualizar auditoría',
        });
      }
    }
  }
}
