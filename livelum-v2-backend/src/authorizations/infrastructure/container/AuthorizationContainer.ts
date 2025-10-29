import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { AuthorizationDependencyIdentifier } from '../../domain/dependencyIdentifier/AuthorizationDependencyIdentifier';

import { AuthorizationRepository } from '../../domain/contracts/AuthorizationRepository';
import { AuthorizationMongoRepository } from '../database/repositories/AuthorizationMongoRepository';

import { CreateAuthorizationUseCase } from '../../application/useCases/CreateAuthorizationUseCase';
import { SearchAuthorizationsUseCase } from '../../application/useCases/SearchAuthorizationsUseCase';

export class AuthorizationContainer {
  static initialize(): void {
    container.register<AuthorizationRepository>(AuthorizationDependencyIdentifier.AuthorizationRepository, {
      useClass: AuthorizationMongoRepository,
    });

    container.register(AuthorizationDependencyIdentifier.CreateAuthorizationUseCase, {
      useFactory: (c) =>
        new CreateAuthorizationUseCase(
          c.resolve<AuthorizationRepository>(AuthorizationDependencyIdentifier.AuthorizationRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(AuthorizationDependencyIdentifier.SearchAuthorizationsUseCase, {
      useFactory: (c) =>
        new SearchAuthorizationsUseCase(
          c.resolve<AuthorizationRepository>(AuthorizationDependencyIdentifier.AuthorizationRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}
