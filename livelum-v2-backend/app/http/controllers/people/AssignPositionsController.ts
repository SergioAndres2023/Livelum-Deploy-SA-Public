import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { AssignPositionsUseCase } from '@/people/application/useCases/AssignPositionsUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';
import { AssignPositionsRequest } from '@/people/application/dtos/AssignPositionsRequest';

export class AssignPositionsController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: AssignPositionsRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<AssignPositionsUseCase>(
        PersonDependencyIdentifier.AssignPositionsUseCase
      );

      const person = await useCase.execute(request.params.id, request.body);

      reply.code(200).send({
        success: true,
        data: person,
        message: 'Puestos asignados exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
