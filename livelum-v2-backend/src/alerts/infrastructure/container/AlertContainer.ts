import { container } from 'tsyringe';
import { AlertDependencyIdentifier } from '../../domain/dependencyIdentifier/AlertDependencyIdentifier';
import { AlertRepository } from '../../domain/contracts/AlertRepository';

// Repositories
import { AlertMongoRepository } from '../database/repositories/AlertMongoRepository';

// UseCases
import { CreateAlertUseCase } from '../../application/useCases/CreateAlertUseCase';
import { FindAlertByIdUseCase } from '../../application/useCases/FindAlertByIdUseCase';
import { SearchAlertsUseCase } from '../../application/useCases/SearchAlertsUseCase';
import { UpdateAlertUseCase } from '../../application/useCases/UpdateAlertUseCase';
import { DeleteAlertUseCase } from '../../application/useCases/DeleteAlertUseCase';
import { SendAlertUseCase } from '../../application/useCases/SendAlertUseCase';
import { MarkAlertAsReadUseCase } from '../../application/useCases/MarkAlertAsReadUseCase';
import { GetAlertStatsUseCase } from '../../application/useCases/GetAlertStatsUseCase';

export const registerAlertModule = (): void => {
  // Repository
  container.register(AlertDependencyIdentifier.AlertRepository, {
    useFactory: () => {
      return new AlertMongoRepository();
    },
  });

  // UseCases
  container.register(AlertDependencyIdentifier.CreateAlertUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new CreateAlertUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.FindAlertByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new FindAlertByIdUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.SearchAlertsUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new SearchAlertsUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.UpdateAlertUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new UpdateAlertUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.DeleteAlertUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new DeleteAlertUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.SendAlertUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new SendAlertUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.MarkAlertAsReadUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new MarkAlertAsReadUseCase(alertRepository);
    },
  });

  container.register(AlertDependencyIdentifier.GetAlertStatsUseCase, {
    useFactory: (dependencyContainer) => {
      const alertRepository = dependencyContainer.resolve<AlertRepository>(AlertDependencyIdentifier.AlertRepository);
      return new GetAlertStatsUseCase(alertRepository);
    },
  });
};
