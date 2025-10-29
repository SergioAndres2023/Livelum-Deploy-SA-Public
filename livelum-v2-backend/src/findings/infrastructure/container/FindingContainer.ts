import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { FindingDependencyIdentifier } from '../../domain/dependencyIdentifier/FindingDependencyIdentifier';

import { FindingRepository } from '../../domain/contracts/FindingRepository';
import { FindingMongoRepository } from '../database/repositories/FindingMongoRepository';

import { CreateFindingUseCase } from '../../application/useCases/CreateFindingUseCase';
import { SearchFindingsUseCase } from '../../application/useCases/SearchFindingsUseCase';
import { UpdateFindingUseCase } from '../../application/useCases/UpdateFindingUseCase';
import { AddActionToFindingUseCase } from '../../application/useCases/AddActionToFindingUseCase';

export class FindingContainer {
  static initialize(): void {
    container.register<FindingRepository>(FindingDependencyIdentifier.FindingRepository, {
      useClass: FindingMongoRepository,
    });

    container.register(FindingDependencyIdentifier.CreateFindingUseCase, {
      useFactory: (c) =>
        new CreateFindingUseCase(
          c.resolve<FindingRepository>(FindingDependencyIdentifier.FindingRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(FindingDependencyIdentifier.SearchFindingsUseCase, {
      useFactory: (c) =>
        new SearchFindingsUseCase(
          c.resolve<FindingRepository>(FindingDependencyIdentifier.FindingRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(FindingDependencyIdentifier.UpdateFindingUseCase, {
      useFactory: (c) =>
        new UpdateFindingUseCase(
          c.resolve<FindingRepository>(FindingDependencyIdentifier.FindingRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(FindingDependencyIdentifier.AddActionToFindingUseCase, {
      useFactory: (c) =>
        new AddActionToFindingUseCase(
          c.resolve<FindingRepository>(FindingDependencyIdentifier.FindingRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

