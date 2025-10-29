import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';

// Repositories
import { IndicatorMongoRepository } from '../database/repositories/IndicatorMongoRepository';

// UseCases
import { CreateIndicatorUseCase } from '../../application/useCases/CreateIndicatorUseCase';
import { FindIndicatorByIdUseCase } from '../../application/useCases/FindIndicatorByIdUseCase';
import { FindIndicatorByCodeUseCase } from '../../application/useCases/FindIndicatorByCodeUseCase';
import { SearchIndicatorsUseCase } from '../../application/useCases/SearchIndicatorsUseCase';
import { UpdateIndicatorUseCase } from '../../application/useCases/UpdateIndicatorUseCase';
import { DeleteIndicatorUseCase } from '../../application/useCases/DeleteIndicatorUseCase';
import { UpdateIndicatorValueUseCase } from '../../application/useCases/UpdateIndicatorValueUseCase';
import { GetIndicatorStatsUseCase } from '../../application/useCases/GetIndicatorStatsUseCase';

export const registerIndicatorModule = (): void => {
  // Repository
  container.register(IndicatorDependencyIdentifier.IndicatorRepository, {
    useFactory: () => {
      return new IndicatorMongoRepository();
    },
  });

  // UseCases
  container.register(IndicatorDependencyIdentifier.CreateIndicatorUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new CreateIndicatorUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.FindIndicatorByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new FindIndicatorByIdUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.FindIndicatorByCodeUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new FindIndicatorByCodeUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.SearchIndicatorsUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new SearchIndicatorsUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.UpdateIndicatorUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new UpdateIndicatorUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.DeleteIndicatorUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new DeleteIndicatorUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.UpdateIndicatorValueUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new UpdateIndicatorValueUseCase(indicatorRepository);
    },
  });

  container.register(IndicatorDependencyIdentifier.GetIndicatorStatsUseCase, {
    useFactory: (dependencyContainer) => {
      const indicatorRepository = dependencyContainer.resolve<IndicatorRepository>(IndicatorDependencyIdentifier.IndicatorRepository);
      return new GetIndicatorStatsUseCase(indicatorRepository);
    },
  });
};
