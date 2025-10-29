import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdatePersonUseCase } from '@/people/application/useCases/UpdatePersonUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';
import { UpdatePersonRequest } from '@/people/application/dtos/UpdatePersonRequest';

export class UpdatePersonController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdatePersonRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdatePersonUseCase>(
        PersonDependencyIdentifier.UpdatePersonUseCase
      );

      const person = await useCase.execute(request.params.id, request.body);

      reply.code(200).send({
        success: true,
        data: person,
        message: 'Persona actualizada exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
