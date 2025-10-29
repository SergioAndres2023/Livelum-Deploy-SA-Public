/**
 * Identificadores de dependencias para el módulo de People
 */
export enum PersonDependencyIdentifier {
  // Repository
  PersonRepository = 'PersonRepository',
  
  // Use Cases
  CreatePersonUseCase = 'CreatePersonUseCase',
  FindPersonByIdUseCase = 'FindPersonByIdUseCase',
  FindPersonByUsernameUseCase = 'FindPersonByUsernameUseCase',
  FindPersonByDocumentUseCase = 'FindPersonByDocumentUseCase',
  SearchPeopleUseCase = 'SearchPeopleUseCase',
  UpdatePersonUseCase = 'UpdatePersonUseCase',
  DeletePersonUseCase = 'DeletePersonUseCase',
  ChangePersonStatusUseCase = 'ChangePersonStatusUseCase',
  AssignPositionsUseCase = 'AssignPositionsUseCase',
}

