import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ChangePersonStatusUseCase } from '@/people/application/useCases/ChangePersonStatusUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';
import { PersonStatus } from '@/people/domain/enums/PersonEnums';

export class ChangePersonStatusController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: { status: PersonStatus } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<ChangePersonStatusUseCase>(
        PersonDependencyIdentifier.ChangePersonStatusUseCase
      );

      const person = await useCase.execute(request.params.id, request.body.status);

      reply.code(200).send({
        success: true,
        data: person,
        message: 'Estado de persona cambiado exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
