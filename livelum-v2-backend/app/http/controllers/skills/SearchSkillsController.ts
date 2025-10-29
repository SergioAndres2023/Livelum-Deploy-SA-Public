import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchSkillsUseCase } from '@/skills/application/useCases/SearchSkillsUseCase';
import { SkillDependencyIdentifier } from '@/skills/domain/dependencyIdentifier/SkillDependencyIdentifier';
import { SearchSkillsRequest } from '@/skills/application/dtos/SearchSkillsRequest';

export class SearchSkillsController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchSkillsRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchSkillsUseCase>(
        SkillDependencyIdentifier.SearchSkillsUseCase
      );
      const skills = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: skills, total: skills.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
