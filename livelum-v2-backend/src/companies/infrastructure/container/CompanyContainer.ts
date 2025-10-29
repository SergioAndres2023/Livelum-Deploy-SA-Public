import { container, instanceCachingFactory } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

// Domain
import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';

// Infrastructure
import { CompanyMongoRepository } from '../database/repositories/CompanyMongoRepository';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';

// Application
import { CreateCompanyUseCase } from '../../application/useCases/CreateCompanyUseCase';
import { FindCompanyByIdUseCase } from '../../application/useCases/FindCompanyByIdUseCase';
import { FindCompanyByCuitUseCase } from '../../application/useCases/FindCompanyByCuitUseCase';
import { SearchCompaniesUseCase } from '../../application/useCases/SearchCompaniesUseCase';
import { UpdateCompanyUseCase } from '../../application/useCases/UpdateCompanyUseCase';
import { DeleteCompanyUseCase } from '../../application/useCases/DeleteCompanyUseCase';
import { ChangeCompanyStatusUseCase } from '../../application/useCases/ChangeCompanyStatusUseCase';

/**
 * Contenedor de dependencias para el módulo de Companies
 */
export const initializeCompanyContainer = (): void => {
  // Repository
  container.register(CompanyDependencyIdentifier.CompanyRepository, {
    useFactory: instanceCachingFactory(() => {
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new CompanyMongoRepository(logger);
    }),
  });

  // Use Cases
  container.register(CompanyDependencyIdentifier.CreateCompanyUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new CreateCompanyUseCase(companyRepository, logger);
    }),
  });

  container.register(CompanyDependencyIdentifier.FindCompanyByIdUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new FindCompanyByIdUseCase(companyRepository, logger);
    }),
  });

  container.register(CompanyDependencyIdentifier.FindCompanyByCuitUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new FindCompanyByCuitUseCase(companyRepository, logger);
    }),
  });

  container.register(CompanyDependencyIdentifier.SearchCompaniesUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new SearchCompaniesUseCase(companyRepository, logger);
    }),
  });

  container.register(CompanyDependencyIdentifier.UpdateCompanyUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new UpdateCompanyUseCase(companyRepository, logger);
    }),
  });

  container.register(CompanyDependencyIdentifier.DeleteCompanyUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new DeleteCompanyUseCase(companyRepository, logger);
    }),
  });

  container.register(CompanyDependencyIdentifier.ChangeCompanyStatusUseCase, {
    useFactory: instanceCachingFactory(() => {
      const companyRepository = container.resolve<CompanyRepository>(CompanyDependencyIdentifier.CompanyRepository);
      const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
      return new ChangeCompanyStatusUseCase(companyRepository, logger);
    }),
  });
};

