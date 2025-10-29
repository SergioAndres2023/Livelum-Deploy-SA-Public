import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchFindingsUseCase } from '@/findings/application/useCases/SearchFindingsUseCase';
import { FindingDependencyIdentifier } from '@/findings/domain/dependencyIdentifier/FindingDependencyIdentifier';
import { SearchFindingsRequest } from '@/findings/application/dtos/SearchFindingsRequest';

export class SearchFindingsController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchFindingsRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchFindingsUseCase>(
        FindingDependencyIdentifier.SearchFindingsUseCase
      );
      const findings = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: findings, total: findings.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
