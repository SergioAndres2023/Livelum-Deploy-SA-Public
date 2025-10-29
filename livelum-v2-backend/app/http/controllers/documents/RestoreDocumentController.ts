import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RestoreDocumentUseCase } from '../../../../src/documents/application/useCases/RestoreDocumentUseCase';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

export class RestoreDocumentController {
  /**
   * @route POST /api/documents/:id/restore
   * @summary Restaurar documento eliminado
   * @tags documents
   * @param {string} id.path.required - ID del documento
   * @return {object} 200 - Documento restaurado exitosamente
   * @return {ErrorResponse} 404 - Documento no encontrado
   * @return {ErrorResponse} 400 - Error de validación
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const restoreDocumentUseCase = container.resolve<RestoreDocumentUseCase>(
        DependencyIdentifier.RestoreDocumentUseCase
      );

      const document = await restoreDocumentUseCase.execute(request.params.id);

      return reply.status(200).send({ success: true, data: document });
    } catch (error) {
      if ((error as Error).message.includes('no encontrado')) {
        return reply.status(404).send({ success: false, error: 'Not Found', message: (error as Error).message });
      }
      if ((error as Error).message.includes('no está eliminado')) {
        return reply.status(400).send({ success: false, error: 'Bad Request', message: (error as Error).message });
      }
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
