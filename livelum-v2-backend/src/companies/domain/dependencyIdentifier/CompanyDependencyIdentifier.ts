/**
 * Identificadores de dependencias para el módulo de Companies
 */
export enum CompanyDependencyIdentifier {
  // Repository
  CompanyRepository = 'CompanyRepository',
  
  // Use Cases
  CreateCompanyUseCase = 'CreateCompanyUseCase',
  FindCompanyByIdUseCase = 'FindCompanyByIdUseCase',
  FindCompanyByCuitUseCase = 'FindCompanyByCuitUseCase',
  SearchCompaniesUseCase = 'SearchCompaniesUseCase',
  UpdateCompanyUseCase = 'UpdateCompanyUseCase',
  DeleteCompanyUseCase = 'DeleteCompanyUseCase',
  ChangeCompanyStatusUseCase = 'ChangeCompanyStatusUseCase',
}

