import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../domain/dependencyIdentifier/RiskDependencyIdentifier';
import { RiskRepository } from '../../domain/contracts/RiskRepository';

// Repository
import { RiskMongoRepository } from '../database/repositories/RiskMongoRepository';

// UseCases
import { CreateRiskUseCase } from '../../application/useCases/CreateRiskUseCase';
import { FindRiskByIdUseCase } from '../../application/useCases/FindRiskByIdUseCase';
import { FindRiskByCodeUseCase } from '../../application/useCases/FindRiskByCodeUseCase';
import { SearchRisksUseCase } from '../../application/useCases/SearchRisksUseCase';
import { UpdateRiskUseCase } from '../../application/useCases/UpdateRiskUseCase';
import { DeleteRiskUseCase } from '../../application/useCases/DeleteRiskUseCase';
import { ChangeRiskStatusUseCase } from '../../application/useCases/ChangeRiskStatusUseCase';
import { GetRiskStatsUseCase } from '../../application/useCases/GetRiskStatsUseCase';

export const registerRiskModule = (): void => {
  // Repository
  container.register(RiskDependencyIdentifier.RiskRepository, {
    useFactory: () => {
      return new RiskMongoRepository();
    },
  });

  // UseCases
  container.register(RiskDependencyIdentifier.CreateRiskUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new CreateRiskUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.FindRiskByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new FindRiskByIdUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.FindRiskByCodeUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new FindRiskByCodeUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.SearchRisksUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new SearchRisksUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.UpdateRiskUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new UpdateRiskUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.DeleteRiskUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new DeleteRiskUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.ChangeRiskStatusUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new ChangeRiskStatusUseCase(riskRepository);
    },
  });

  container.register(RiskDependencyIdentifier.GetRiskStatsUseCase, {
    useFactory: (dependencyContainer) => {
      const riskRepository = dependencyContainer.resolve<RiskRepository>(RiskDependencyIdentifier.RiskRepository);
      return new GetRiskStatsUseCase(riskRepository);
    },
  });
};
