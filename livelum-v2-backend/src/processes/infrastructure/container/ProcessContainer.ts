import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';

// Repositories
import { ProcessTypeMongoRepository } from '../database/repositories/ProcessTypeMongoRepository';
import { ProcessNameMongoRepository } from '../database/repositories/ProcessNameMongoRepository';

// UseCases - ProcessType
import { CreateProcessTypeUseCase } from '../../application/useCases/CreateProcessTypeUseCase';
import { FindProcessTypeByIdUseCase } from '../../application/useCases/FindProcessTypeByIdUseCase';
import { GetAllProcessTypesUseCase } from '../../application/useCases/GetAllProcessTypesUseCase';
import { UpdateProcessTypeUseCase } from '../../application/useCases/UpdateProcessTypeUseCase';
import { DeleteProcessTypeUseCase } from '../../application/useCases/DeleteProcessTypeUseCase';
import { ReorderProcessTypesUseCase } from '../../application/useCases/ReorderProcessTypesUseCase';

// UseCases - ProcessName
import { CreateProcessNameUseCase } from '../../application/useCases/CreateProcessNameUseCase';
import { FindProcessNameByIdUseCase } from '../../application/useCases/FindProcessNameByIdUseCase';
import { GetProcessNamesByTypeUseCase } from '../../application/useCases/GetProcessNamesByTypeUseCase';
import { UpdateProcessNameUseCase } from '../../application/useCases/UpdateProcessNameUseCase';
import { DeleteProcessNameUseCase } from '../../application/useCases/DeleteProcessNameUseCase';
import { ReorderProcessNamesUseCase } from '../../application/useCases/ReorderProcessNamesUseCase';

export const registerProcessModule = (): void => {
  // Repositories
  container.register(ProcessDependencyIdentifier.ProcessTypeRepository, {
    useFactory: () => {
      return new ProcessTypeMongoRepository();
    },
  });

  container.register(ProcessDependencyIdentifier.ProcessNameRepository, {
    useFactory: () => {
      return new ProcessNameMongoRepository();
    },
  });

  // UseCases - ProcessType
  container.register(ProcessDependencyIdentifier.CreateProcessTypeUseCase, {
    useFactory: (dependencyContainer) => {
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new CreateProcessTypeUseCase(processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.FindProcessTypeByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new FindProcessTypeByIdUseCase(processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.GetAllProcessTypesUseCase, {
    useFactory: (dependencyContainer) => {
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new GetAllProcessTypesUseCase(processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.UpdateProcessTypeUseCase, {
    useFactory: (dependencyContainer) => {
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new UpdateProcessTypeUseCase(processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.DeleteProcessTypeUseCase, {
    useFactory: (dependencyContainer) => {
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new DeleteProcessTypeUseCase(processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.ReorderProcessTypesUseCase, {
    useFactory: (dependencyContainer) => {
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new ReorderProcessTypesUseCase(processTypeRepository);
    },
  });

  // UseCases - ProcessName
  container.register(ProcessDependencyIdentifier.CreateProcessNameUseCase, {
    useFactory: (dependencyContainer) => {
      const processNameRepository = dependencyContainer.resolve<ProcessNameRepository>(ProcessDependencyIdentifier.ProcessNameRepository);
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new CreateProcessNameUseCase(processNameRepository, processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.FindProcessNameByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const processNameRepository = dependencyContainer.resolve<ProcessNameRepository>(ProcessDependencyIdentifier.ProcessNameRepository);
      return new FindProcessNameByIdUseCase(processNameRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.GetProcessNamesByTypeUseCase, {
    useFactory: (dependencyContainer) => {
      const processNameRepository = dependencyContainer.resolve<ProcessNameRepository>(ProcessDependencyIdentifier.ProcessNameRepository);
      return new GetProcessNamesByTypeUseCase(processNameRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.UpdateProcessNameUseCase, {
    useFactory: (dependencyContainer) => {
      const processNameRepository = dependencyContainer.resolve<ProcessNameRepository>(ProcessDependencyIdentifier.ProcessNameRepository);
      const processTypeRepository = dependencyContainer.resolve<ProcessTypeRepository>(ProcessDependencyIdentifier.ProcessTypeRepository);
      return new UpdateProcessNameUseCase(processNameRepository, processTypeRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.DeleteProcessNameUseCase, {
    useFactory: (dependencyContainer) => {
      const processNameRepository = dependencyContainer.resolve<ProcessNameRepository>(ProcessDependencyIdentifier.ProcessNameRepository);
      return new DeleteProcessNameUseCase(processNameRepository);
    },
  });

  container.register(ProcessDependencyIdentifier.ReorderProcessNamesUseCase, {
    useFactory: (dependencyContainer) => {
      const processNameRepository = dependencyContainer.resolve<ProcessNameRepository>(ProcessDependencyIdentifier.ProcessNameRepository);
      return new ReorderProcessNamesUseCase(processNameRepository);
    },
  });
};
