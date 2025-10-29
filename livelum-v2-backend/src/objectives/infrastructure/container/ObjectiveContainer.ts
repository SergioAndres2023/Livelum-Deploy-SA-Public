import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { ObjectiveDependencyIdentifier } from '../../domain/dependencyIdentifier/ObjectiveDependencyIdentifier';

import { ObjectiveRepository } from '../../domain/contracts/ObjectiveRepository';
import { ObjectiveMongoRepository } from '../database/repositories/ObjectiveMongoRepository';

import { CreateObjectiveUseCase } from '../../application/useCases/CreateObjectiveUseCase';
import { SearchObjectivesUseCase } from '../../application/useCases/SearchObjectivesUseCase';
import { UpdateObjectiveUseCase } from '../../application/useCases/UpdateObjectiveUseCase';
import { AddCommentUseCase } from '../../application/useCases/AddCommentUseCase';

export class ObjectiveContainer {
  static initialize(): void {
    container.register<ObjectiveRepository>(ObjectiveDependencyIdentifier.ObjectiveRepository, {
      useClass: ObjectiveMongoRepository,
    });

    container.register(ObjectiveDependencyIdentifier.CreateObjectiveUseCase, {
      useFactory: (c) =>
        new CreateObjectiveUseCase(
          c.resolve<ObjectiveRepository>(ObjectiveDependencyIdentifier.ObjectiveRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(ObjectiveDependencyIdentifier.SearchObjectivesUseCase, {
      useFactory: (c) =>
        new SearchObjectivesUseCase(
          c.resolve<ObjectiveRepository>(ObjectiveDependencyIdentifier.ObjectiveRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(ObjectiveDependencyIdentifier.UpdateObjectiveUseCase, {
      useFactory: (c) =>
        new UpdateObjectiveUseCase(
          c.resolve<ObjectiveRepository>(ObjectiveDependencyIdentifier.ObjectiveRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(ObjectiveDependencyIdentifier.AddCommentUseCase, {
      useFactory: (c) =>
        new AddCommentUseCase(
          c.resolve<ObjectiveRepository>(ObjectiveDependencyIdentifier.ObjectiveRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

