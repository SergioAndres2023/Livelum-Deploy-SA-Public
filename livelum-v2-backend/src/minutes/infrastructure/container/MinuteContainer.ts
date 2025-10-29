import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { MinuteDependencyIdentifier } from '../../domain/dependencyIdentifier/MinuteDependencyIdentifier';

import { MinuteRepository } from '../../domain/contracts/MinuteRepository';
import { MinuteMongoRepository } from '../database/repositories/MinuteMongoRepository';

import { CreateMinuteUseCase } from '../../application/useCases/CreateMinuteUseCase';
import { SearchMinutesUseCase } from '../../application/useCases/SearchMinutesUseCase';

export class MinuteContainer {
  static initialize(): void {
    container.register<MinuteRepository>(MinuteDependencyIdentifier.MinuteRepository, {
      useClass: MinuteMongoRepository,
    });

    container.register(MinuteDependencyIdentifier.CreateMinuteUseCase, {
      useFactory: (c) =>
        new CreateMinuteUseCase(
          c.resolve<MinuteRepository>(MinuteDependencyIdentifier.MinuteRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(MinuteDependencyIdentifier.SearchMinutesUseCase, {
      useFactory: (c) =>
        new SearchMinutesUseCase(
          c.resolve<MinuteRepository>(MinuteDependencyIdentifier.MinuteRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

