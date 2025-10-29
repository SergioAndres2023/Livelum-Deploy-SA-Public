import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { UserDependencyIdentifier } from '../../domain/dependencyIdentifier/UserDependencyIdentifier';

// Repository
import { UserRepository } from '../../domain/contracts/UserRepository';
import { UserMongoRepository } from '../database/repositories/UserMongoRepository';

// Services
import { PasswordHashService } from '../../domain/services/PasswordHashService';
import { BcryptPasswordHashService } from '../services/BcryptPasswordHashService';

// Use Cases
import { CreateUserUseCase } from '../../application/useCases/CreateUserUseCase';
import { FindUserByIdUseCase } from '../../application/useCases/FindUserByIdUseCase';
import { FindUserByUsernameUseCase } from '../../application/useCases/FindUserByUsernameUseCase';
import { FindUserByEmailUseCase } from '../../application/useCases/FindUserByEmailUseCase';
import { SearchUsersUseCase } from '../../application/useCases/SearchUsersUseCase';
import { UpdateUserUseCase } from '../../application/useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';
import { ChangeUserPasswordUseCase } from '../../application/useCases/ChangeUserPasswordUseCase';
import { ChangeUserStatusUseCase } from '../../application/useCases/ChangeUserStatusUseCase';
import { AssignRolesUseCase } from '../../application/useCases/AssignRolesUseCase';
import { VerifyEmailUseCase } from '../../application/useCases/VerifyEmailUseCase';
import { LoginUserUseCase } from '../../application/useCases/LoginUserUseCase';
import { RequestPasswordResetUseCase } from '../../application/useCases/RequestPasswordResetUseCase';
import { ResetPasswordUseCase } from '../../application/useCases/ResetPasswordUseCase';

/**
 * Inicializa todas las dependencias del módulo de Users
 */
export class UserContainer {
  static initialize(): void {
    // Repository
    container.register<UserRepository>(UserDependencyIdentifier.UserRepository, {
      useClass: UserMongoRepository,
    });

    // Services
    container.register<PasswordHashService>(
      UserDependencyIdentifier.PasswordHashService,
      {
        useClass: BcryptPasswordHashService,
      }
    );

    // Use Cases
    container.register(UserDependencyIdentifier.CreateUserUseCase, {
      useFactory: (c) =>
        new CreateUserUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve<PasswordHashService>(UserDependencyIdentifier.PasswordHashService),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.FindUserByIdUseCase, {
      useFactory: (c) =>
        new FindUserByIdUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.FindUserByUsernameUseCase, {
      useFactory: (c) =>
        new FindUserByUsernameUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.FindUserByEmailUseCase, {
      useFactory: (c) =>
        new FindUserByEmailUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.SearchUsersUseCase, {
      useFactory: (c) =>
        new SearchUsersUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.UpdateUserUseCase, {
      useFactory: (c) =>
        new UpdateUserUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.DeleteUserUseCase, {
      useFactory: (c) =>
        new DeleteUserUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.ChangeUserPasswordUseCase, {
      useFactory: (c) =>
        new ChangeUserPasswordUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve<PasswordHashService>(UserDependencyIdentifier.PasswordHashService),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.ChangeUserStatusUseCase, {
      useFactory: (c) =>
        new ChangeUserStatusUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.AssignRolesUseCase, {
      useFactory: (c) =>
        new AssignRolesUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.VerifyEmailUseCase, {
      useFactory: (c) =>
        new VerifyEmailUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.LoginUserUseCase, {
      useFactory: (c) =>
        new LoginUserUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve<PasswordHashService>(UserDependencyIdentifier.PasswordHashService),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.RequestPasswordResetUseCase, {
      useFactory: (c) =>
        new RequestPasswordResetUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve<PasswordHashService>(UserDependencyIdentifier.PasswordHashService),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(UserDependencyIdentifier.ResetPasswordUseCase, {
      useFactory: (c) =>
        new ResetPasswordUseCase(
          c.resolve<UserRepository>(UserDependencyIdentifier.UserRepository),
          c.resolve<PasswordHashService>(UserDependencyIdentifier.PasswordHashService),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

