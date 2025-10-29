import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { FindPersonByIdUseCase } from '@/people/application/useCases/FindPersonByIdUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';

export class FindPersonByIdController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<FindPersonByIdUseCase>(
        PersonDependencyIdentifier.FindPersonByIdUseCase
      );

      const person = await useCase.execute(request.params.id);

      if (!person) {
        reply.code(404).send({
          success: false,
          error: 'Persona no encontrada',
        });
        return;
      }

      reply.code(200).send({
        success: true,
        data: person,
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
