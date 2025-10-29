import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateJobProfileUseCase } from '@/jobProfiles/application/useCases/CreateJobProfileUseCase';
import { JobProfileDependencyIdentifier } from '@/jobProfiles/domain/dependencyIdentifier/JobProfileDependencyIdentifier';
import { CreateJobProfileRequest } from '@/jobProfiles/application/dtos/CreateJobProfileRequest';

export class CreateJobProfileController {
  static async handle(
    request: FastifyRequest<{ Body: CreateJobProfileRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateJobProfileUseCase>(
        JobProfileDependencyIdentifier.CreateJobProfileUseCase
      );
      const jobProfile = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: jobProfile, message: 'Perfil de puesto creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
