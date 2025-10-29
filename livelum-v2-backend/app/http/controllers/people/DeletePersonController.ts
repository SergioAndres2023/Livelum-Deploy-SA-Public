import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DeletePersonUseCase } from '@/people/application/useCases/DeletePersonUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';

export class DeletePersonController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<DeletePersonUseCase>(
        PersonDependencyIdentifier.DeletePersonUseCase
      );

      await useCase.execute(request.params.id);

      reply.code(200).send({
        success: true,
        message: 'Persona eliminada exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
