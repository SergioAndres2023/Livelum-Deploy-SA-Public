import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { ClientRepository } from '../../domain/contracts/ClientRepository';
import { ClientMongoRepository } from '../database/repositories/ClientMongoRepository';
import { CreateClientUseCase } from '../../application/useCases/CreateClientUseCase';
import { FindClientByIdUseCase } from '../../application/useCases/FindClientByIdUseCase';
import { SearchClientsUseCase } from '../../application/useCases/SearchClientsUseCase';
import { UpdateClientUseCase } from '../../application/useCases/UpdateClientUseCase';
import { DeleteClientUseCase } from '../../application/useCases/DeleteClientUseCase';

export const registerClientModule = (): void => {
  // Repository
  container.register(DependencyIdentifier.ClientRepository, {
    useFactory: (dependencyContainer) => {
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new ClientMongoRepository(logger);
    },
  });

  // Use Cases
  container.register(DependencyIdentifier.CreateClientUseCase, {
    useFactory: (dependencyContainer) => {
      const clientRepository = dependencyContainer.resolve<ClientRepository>(DependencyIdentifier.ClientRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new CreateClientUseCase(clientRepository, logger);
    },
  });

  container.register(DependencyIdentifier.FindClientByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const clientRepository = dependencyContainer.resolve<ClientRepository>(DependencyIdentifier.ClientRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new FindClientByIdUseCase(clientRepository, logger);
    },
  });

  container.register(DependencyIdentifier.SearchClientsUseCase, {
    useFactory: (dependencyContainer) => {
      const clientRepository = dependencyContainer.resolve<ClientRepository>(DependencyIdentifier.ClientRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new SearchClientsUseCase(clientRepository, logger);
    },
  });

  container.register(DependencyIdentifier.UpdateClientUseCase, {
    useFactory: (dependencyContainer) => {
      const clientRepository = dependencyContainer.resolve<ClientRepository>(DependencyIdentifier.ClientRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new UpdateClientUseCase(clientRepository, logger);
    },
  });

  container.register(DependencyIdentifier.DeleteClientUseCase, {
    useFactory: (dependencyContainer) => {
      const clientRepository = dependencyContainer.resolve<ClientRepository>(DependencyIdentifier.ClientRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new DeleteClientUseCase(clientRepository, logger);
    },
  });
};
