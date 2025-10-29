import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { JobProfileDependencyIdentifier } from '../../domain/dependencyIdentifier/JobProfileDependencyIdentifier';

import { JobProfileRepository } from '../../domain/contracts/JobProfileRepository';
import { JobProfileMongoRepository } from '../database/repositories/JobProfileMongoRepository';

import { CreateJobProfileUseCase } from '../../application/useCases/CreateJobProfileUseCase';
import { SearchJobProfilesUseCase } from '../../application/useCases/SearchJobProfilesUseCase';

export class JobProfileContainer {
  static initialize(): void {
    container.register<JobProfileRepository>(JobProfileDependencyIdentifier.JobProfileRepository, {
      useClass: JobProfileMongoRepository,
    });

    container.register(JobProfileDependencyIdentifier.CreateJobProfileUseCase, {
      useFactory: (c) =>
        new CreateJobProfileUseCase(
          c.resolve<JobProfileRepository>(JobProfileDependencyIdentifier.JobProfileRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(JobProfileDependencyIdentifier.SearchJobProfilesUseCase, {
      useFactory: (c) =>
        new SearchJobProfilesUseCase(
          c.resolve<JobProfileRepository>(JobProfileDependencyIdentifier.JobProfileRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

