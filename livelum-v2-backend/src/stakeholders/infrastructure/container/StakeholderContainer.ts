import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { StakeholderDependencyIdentifier } from '../../domain/dependencyIdentifier/StakeholderDependencyIdentifier';

import { StakeholderRepository } from '../../domain/contracts/StakeholderRepository';
import { StakeholderMongoRepository } from '../database/repositories/StakeholderMongoRepository';

import { CreateStakeholderUseCase } from '../../application/useCases/CreateStakeholderUseCase';
import { SearchStakeholdersUseCase } from '../../application/useCases/SearchStakeholdersUseCase';
import { UpdateStakeholderUseCase } from '../../application/useCases/UpdateStakeholderUseCase';

export class StakeholderContainer {
  static initialize(): void {
    container.register<StakeholderRepository>(StakeholderDependencyIdentifier.StakeholderRepository, {
      useClass: StakeholderMongoRepository,
    });

    container.register(StakeholderDependencyIdentifier.CreateStakeholderUseCase, {
      useFactory: (c) =>
        new CreateStakeholderUseCase(
          c.resolve<StakeholderRepository>(StakeholderDependencyIdentifier.StakeholderRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(StakeholderDependencyIdentifier.SearchStakeholdersUseCase, {
      useFactory: (c) =>
        new SearchStakeholdersUseCase(
          c.resolve<StakeholderRepository>(StakeholderDependencyIdentifier.StakeholderRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(StakeholderDependencyIdentifier.UpdateStakeholderUseCase, {
      useFactory: (c) =>
        new UpdateStakeholderUseCase(
          c.resolve<StakeholderRepository>(StakeholderDependencyIdentifier.StakeholderRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

