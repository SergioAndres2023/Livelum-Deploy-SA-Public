import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { SkillDependencyIdentifier } from '../../domain/dependencyIdentifier/SkillDependencyIdentifier';

import { SkillRepository } from '../../domain/contracts/SkillRepository';
import { SkillMongoRepository } from '../database/repositories/SkillMongoRepository';

import { CreateSkillUseCase } from '../../application/useCases/CreateSkillUseCase';
import { SearchSkillsUseCase } from '../../application/useCases/SearchSkillsUseCase';

export class SkillContainer {
  static initialize(): void {
    container.register<SkillRepository>(SkillDependencyIdentifier.SkillRepository, {
      useClass: SkillMongoRepository,
    });

    container.register(SkillDependencyIdentifier.CreateSkillUseCase, {
      useFactory: (c) =>
        new CreateSkillUseCase(
          c.resolve<SkillRepository>(SkillDependencyIdentifier.SkillRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(SkillDependencyIdentifier.SearchSkillsUseCase, {
      useFactory: (c) =>
        new SearchSkillsUseCase(
          c.resolve<SkillRepository>(SkillDependencyIdentifier.SkillRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}
