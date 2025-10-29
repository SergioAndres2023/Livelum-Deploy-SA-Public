import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreatePersonUseCase } from '@/people/application/useCases/CreatePersonUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';
import { CreatePersonRequest } from '@/people/application/dtos/CreatePersonRequest';

export class CreatePersonController {
  static async handle(
    request: FastifyRequest<{ Body: CreatePersonRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreatePersonUseCase>(
        PersonDependencyIdentifier.CreatePersonUseCase
      );

      const person = await useCase.execute(request.body);

      reply.code(201).send({
        success: true,
        data: person,
        message: 'Persona creada exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
