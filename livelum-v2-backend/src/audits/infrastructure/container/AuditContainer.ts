import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import type { AuditRepository } from '../../domain/contracts/AuditRepository';
import { AuditMongoRepository } from '../database/repositories/AuditMongoRepository';
import { CreateAuditUseCase } from '../../application/useCases/CreateAuditUseCase';
import { FindAuditByIdUseCase } from '../../application/useCases/FindAuditByIdUseCase';
import { SearchAuditsUseCase } from '../../application/useCases/SearchAuditsUseCase';
import { UpdateAuditUseCase } from '../../application/useCases/UpdateAuditUseCase';
import { DeleteAuditUseCase } from '../../application/useCases/DeleteAuditUseCase';
import { StartAuditUseCase } from '../../application/useCases/StartAuditUseCase';
import { CompleteAuditUseCase } from '../../application/useCases/CompleteAuditUseCase';
import { CancelAuditUseCase } from '../../application/useCases/CancelAuditUseCase';
import { RescheduleAuditUseCase } from '../../application/useCases/RescheduleAuditUseCase';
import { GetAuditStatsUseCase } from '../../application/useCases/GetAuditStatsUseCase';

export const registerAuditModule = (): void => {
  // Repository
  container.register(DependencyIdentifier.AuditRepository, {
    useFactory: (dependencyContainer) => {
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new AuditMongoRepository(logger);
    },
  });

  // Use Cases
  container.register(DependencyIdentifier.CreateAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new CreateAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.FindAuditByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new FindAuditByIdUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.SearchAuditsUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new SearchAuditsUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.UpdateAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new UpdateAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.DeleteAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new DeleteAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.StartAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new StartAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.CompleteAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new CompleteAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.CancelAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new CancelAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.RescheduleAuditUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new RescheduleAuditUseCase(auditRepository, logger);
    },
  });

  container.register(DependencyIdentifier.GetAuditStatsUseCase, {
    useFactory: (dependencyContainer) => {
      const auditRepository = dependencyContainer.resolve<AuditRepository>(DependencyIdentifier.AuditRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new GetAuditStatsUseCase(auditRepository, logger);
    },
  });
};
