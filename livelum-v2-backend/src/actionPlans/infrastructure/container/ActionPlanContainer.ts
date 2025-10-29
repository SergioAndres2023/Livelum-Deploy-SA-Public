import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { ActionPlanDependencyIdentifier } from '../../domain/dependencyIdentifier/ActionPlanDependencyIdentifier';

import { ActionPlanRepository } from '../../domain/contracts/ActionPlanRepository';
import { ActionPlanMongoRepository } from '../database/repositories/ActionPlanMongoRepository';

import { CreateActionPlanUseCase } from '../../application/useCases/CreateActionPlanUseCase';
import { SearchActionPlansUseCase } from '../../application/useCases/SearchActionPlansUseCase';
import { AddActionToActionPlanUseCase } from '../../application/useCases/AddActionToActionPlanUseCase';

export class ActionPlanContainer {
  static initialize(): void {
    container.register<ActionPlanRepository>(ActionPlanDependencyIdentifier.ActionPlanRepository, {
      useClass: ActionPlanMongoRepository,
    });

    container.register(ActionPlanDependencyIdentifier.CreateActionPlanUseCase, {
      useFactory: (c) =>
        new CreateActionPlanUseCase(
          c.resolve<ActionPlanRepository>(ActionPlanDependencyIdentifier.ActionPlanRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(ActionPlanDependencyIdentifier.SearchActionPlansUseCase, {
      useFactory: (c) =>
        new SearchActionPlansUseCase(
          c.resolve<ActionPlanRepository>(ActionPlanDependencyIdentifier.ActionPlanRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(ActionPlanDependencyIdentifier.AddActionToActionPlanUseCase, {
      useFactory: (c) =>
        new AddActionToActionPlanUseCase(
          c.resolve<ActionPlanRepository>(ActionPlanDependencyIdentifier.ActionPlanRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

