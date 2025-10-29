import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateMinuteUseCase } from '@/minutes/application/useCases/CreateMinuteUseCase';
import { MinuteDependencyIdentifier } from '@/minutes/domain/dependencyIdentifier/MinuteDependencyIdentifier';
import { CreateMinuteRequest } from '@/minutes/application/dtos/CreateMinuteRequest';

export class CreateMinuteController {
  static async handle(
    request: FastifyRequest<{ Body: CreateMinuteRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateMinuteUseCase>(
        MinuteDependencyIdentifier.CreateMinuteUseCase
      );
      const minute = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: minute, message: 'Minuta creada exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
