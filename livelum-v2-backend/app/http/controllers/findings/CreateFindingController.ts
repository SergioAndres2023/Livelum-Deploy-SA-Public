import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateFindingUseCase } from '@/findings/application/useCases/CreateFindingUseCase';
import { FindingDependencyIdentifier } from '@/findings/domain/dependencyIdentifier/FindingDependencyIdentifier';
import { CreateFindingRequest } from '@/findings/application/dtos/CreateFindingRequest';

export class CreateFindingController {
  static async handle(
    request: FastifyRequest<{ Body: CreateFindingRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateFindingUseCase>(
        FindingDependencyIdentifier.CreateFindingUseCase
      );
      const finding = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: finding, message: 'Hallazgo creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
