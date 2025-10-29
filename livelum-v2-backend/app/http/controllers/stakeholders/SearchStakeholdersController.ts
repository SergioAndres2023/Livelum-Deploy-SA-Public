import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchStakeholdersUseCase } from '@/stakeholders/application/useCases/SearchStakeholdersUseCase';
import { StakeholderDependencyIdentifier } from '@/stakeholders/domain/dependencyIdentifier/StakeholderDependencyIdentifier';
import { SearchStakeholdersRequest } from '@/stakeholders/application/dtos/SearchStakeholdersRequest';

export class SearchStakeholdersController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchStakeholdersRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchStakeholdersUseCase>(
        StakeholderDependencyIdentifier.SearchStakeholdersUseCase
      );
      const stakeholders = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: stakeholders, total: stakeholders.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
