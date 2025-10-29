import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchJobProfilesUseCase } from '@/jobProfiles/application/useCases/SearchJobProfilesUseCase';
import { JobProfileDependencyIdentifier } from '@/jobProfiles/domain/dependencyIdentifier/JobProfileDependencyIdentifier';
import { SearchJobProfilesRequest } from '@/jobProfiles/application/dtos/SearchJobProfilesRequest';

export class SearchJobProfilesController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchJobProfilesRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchJobProfilesUseCase>(
        JobProfileDependencyIdentifier.SearchJobProfilesUseCase
      );
      const jobProfiles = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: jobProfiles, total: jobProfiles.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
