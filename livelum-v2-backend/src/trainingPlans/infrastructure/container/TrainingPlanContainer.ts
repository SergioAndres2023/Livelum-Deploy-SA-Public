import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { TrainingPlanDependencyIdentifier } from '../../domain/dependencyIdentifier/TrainingPlanDependencyIdentifier';

import { TrainingPlanRepository } from '../../domain/contracts/TrainingPlanRepository';
import { TrainingPlanMongoRepository } from '../database/repositories/TrainingPlanMongoRepository';

import { CreateTrainingPlanUseCase } from '../../application/useCases/CreateTrainingPlanUseCase';
import { SearchTrainingPlansUseCase } from '../../application/useCases/SearchTrainingPlansUseCase';

export class TrainingPlanContainer {
  static initialize(): void {
    container.register<TrainingPlanRepository>(TrainingPlanDependencyIdentifier.TrainingPlanRepository, {
      useClass: TrainingPlanMongoRepository,
    });

    container.register(TrainingPlanDependencyIdentifier.CreateTrainingPlanUseCase, {
      useFactory: (c) =>
        new CreateTrainingPlanUseCase(
          c.resolve<TrainingPlanRepository>(TrainingPlanDependencyIdentifier.TrainingPlanRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(TrainingPlanDependencyIdentifier.SearchTrainingPlansUseCase, {
      useFactory: (c) =>
        new SearchTrainingPlansUseCase(
          c.resolve<TrainingPlanRepository>(TrainingPlanDependencyIdentifier.TrainingPlanRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

