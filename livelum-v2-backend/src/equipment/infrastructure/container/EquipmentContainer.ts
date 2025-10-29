import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { EquipmentDependencyIdentifier } from '../../domain/dependencyIdentifier/EquipmentDependencyIdentifier';

import { EquipmentRepository } from '../../domain/contracts/EquipmentRepository';
import { EquipmentMongoRepository } from '../database/repositories/EquipmentMongoRepository';

import { CreateEquipmentUseCase } from '../../application/useCases/CreateEquipmentUseCase';
import { SearchEquipmentUseCase } from '../../application/useCases/SearchEquipmentUseCase';

export class EquipmentContainer {
  static initialize(): void {
    container.register<EquipmentRepository>(EquipmentDependencyIdentifier.EquipmentRepository, {
      useClass: EquipmentMongoRepository,
    });

    container.register(EquipmentDependencyIdentifier.CreateEquipmentUseCase, {
      useFactory: (c) =>
        new CreateEquipmentUseCase(
          c.resolve<EquipmentRepository>(EquipmentDependencyIdentifier.EquipmentRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(EquipmentDependencyIdentifier.SearchEquipmentUseCase, {
      useFactory: (c) =>
        new SearchEquipmentUseCase(
          c.resolve<EquipmentRepository>(EquipmentDependencyIdentifier.EquipmentRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}
