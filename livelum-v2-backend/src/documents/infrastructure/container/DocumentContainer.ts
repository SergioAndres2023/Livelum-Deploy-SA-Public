import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import { DocumentMongoRepository } from '../database/repositories/DocumentMongoRepository';
import { CreateDocumentUseCase } from '../../application/useCases/CreateDocumentUseCase';
import { FindDocumentByIdUseCase } from '../../application/useCases/FindDocumentByIdUseCase';
import { FindDocumentByCodeUseCase } from '../../application/useCases/FindDocumentByCodeUseCase';
import { SearchDocumentsUseCase } from '../../application/useCases/SearchDocumentsUseCase';
import { UpdateDocumentUseCase } from '../../application/useCases/UpdateDocumentUseCase';
import { DeleteDocumentUseCase } from '../../application/useCases/DeleteDocumentUseCase';
import { RestoreDocumentUseCase } from '../../application/useCases/RestoreDocumentUseCase';
import { ApproveDocumentUseCase } from '../../application/useCases/ApproveDocumentUseCase';
import { RejectDocumentUseCase } from '../../application/useCases/RejectDocumentUseCase';
import { GetDocumentStatsUseCase } from '../../application/useCases/GetDocumentStatsUseCase';

export const registerDocumentModule = (): void => {
  // Repository
  container.register(DependencyIdentifier.DocumentRepository, {
    useFactory: (dependencyContainer) => {
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new DocumentMongoRepository(logger);
    },
  });

  // Use Cases
  container.register(DependencyIdentifier.CreateDocumentUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new CreateDocumentUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.FindDocumentByIdUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new FindDocumentByIdUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.FindDocumentByCodeUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new FindDocumentByCodeUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.SearchDocumentsUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new SearchDocumentsUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.UpdateDocumentUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new UpdateDocumentUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.DeleteDocumentUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new DeleteDocumentUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.RestoreDocumentUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new RestoreDocumentUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.ApproveDocumentUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new ApproveDocumentUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.RejectDocumentUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new RejectDocumentUseCase(documentRepository, logger);
    },
  });

  container.register(DependencyIdentifier.GetDocumentStatsUseCase, {
    useFactory: (dependencyContainer) => {
      const documentRepository = dependencyContainer.resolve<DocumentRepository>(DependencyIdentifier.DocumentRepository);
      const logger = dependencyContainer.resolve<Logger>(DependencyIdentifier.Logger);
      return new GetDocumentStatsUseCase(documentRepository, logger);
    },
  });
};
