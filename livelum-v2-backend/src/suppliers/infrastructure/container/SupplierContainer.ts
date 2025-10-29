import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { SupplierDependencyIdentifier } from '../../domain/dependencyIdentifier/SupplierDependencyIdentifier';

import { SupplierRepository } from '../../domain/contracts/SupplierRepository';
import { SupplierMongoRepository } from '../database/repositories/SupplierMongoRepository';

import { CreateSupplierUseCase } from '../../application/useCases/CreateSupplierUseCase';
import { SearchSuppliersUseCase } from '../../application/useCases/SearchSuppliersUseCase';
import { UpdateSupplierUseCase } from '../../application/useCases/UpdateSupplierUseCase';
import { UpdateSupplierEvaluationUseCase } from '../../application/useCases/UpdateSupplierEvaluationUseCase';

export class SupplierContainer {
  static initialize(): void {
    container.register<SupplierRepository>(SupplierDependencyIdentifier.SupplierRepository, {
      useClass: SupplierMongoRepository,
    });

    container.register(SupplierDependencyIdentifier.CreateSupplierUseCase, {
      useFactory: (c) =>
        new CreateSupplierUseCase(
          c.resolve<SupplierRepository>(SupplierDependencyIdentifier.SupplierRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(SupplierDependencyIdentifier.SearchSuppliersUseCase, {
      useFactory: (c) =>
        new SearchSuppliersUseCase(
          c.resolve<SupplierRepository>(SupplierDependencyIdentifier.SupplierRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(SupplierDependencyIdentifier.UpdateSupplierUseCase, {
      useFactory: (c) =>
        new UpdateSupplierUseCase(
          c.resolve<SupplierRepository>(SupplierDependencyIdentifier.SupplierRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(SupplierDependencyIdentifier.UpdateSupplierEvaluationUseCase, {
      useFactory: (c) =>
        new UpdateSupplierEvaluationUseCase(
          c.resolve<SupplierRepository>(SupplierDependencyIdentifier.SupplierRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

