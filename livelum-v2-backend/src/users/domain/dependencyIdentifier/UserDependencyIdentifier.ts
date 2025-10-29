/**
 * Identificadores de dependencias para el módulo de Users
 */
export enum UserDependencyIdentifier {
  // Repository
  UserRepository = 'UserRepository',
  
  // Services
  PasswordHashService = 'PasswordHashService',
  
  // Use Cases
  CreateUserUseCase = 'CreateUserUseCase',
  FindUserByIdUseCase = 'FindUserByIdUseCase',
  FindUserByUsernameUseCase = 'FindUserByUsernameUseCase',
  FindUserByEmailUseCase = 'FindUserByEmailUseCase',
  SearchUsersUseCase = 'SearchUsersUseCase',
  UpdateUserUseCase = 'UpdateUserUseCase',
  DeleteUserUseCase = 'DeleteUserUseCase',
  ChangeUserPasswordUseCase = 'ChangeUserPasswordUseCase',
  ChangeUserStatusUseCase = 'ChangeUserStatusUseCase',
  AssignRolesUseCase = 'AssignRolesUseCase',
  VerifyEmailUseCase = 'VerifyEmailUseCase',
  LoginUserUseCase = 'LoginUserUseCase',
  RequestPasswordResetUseCase = 'RequestPasswordResetUseCase',
  ResetPasswordUseCase = 'ResetPasswordUseCase',
}

