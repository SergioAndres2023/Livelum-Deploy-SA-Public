import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateSkillUseCase } from '@/skills/application/useCases/CreateSkillUseCase';
import { SkillDependencyIdentifier } from '@/skills/domain/dependencyIdentifier/SkillDependencyIdentifier';
import { CreateSkillRequest } from '@/skills/application/dtos/CreateSkillRequest';

export class CreateSkillController {
  static async handle(
    request: FastifyRequest<{ Body: CreateSkillRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateSkillUseCase>(
        SkillDependencyIdentifier.CreateSkillUseCase
      );
      const skill = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: skill, message: 'Competencia creada exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
