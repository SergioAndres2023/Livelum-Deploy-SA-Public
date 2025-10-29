import { injectable, inject } from 'tsyringe';
import type { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class DeleteDocumentUseCase {
  constructor(
    @inject(DependencyIdentifier.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      this.logger.info('Deleting document', { id });

      // Buscar el documento existente
      const existingDocument = await this.documentRepository.findById(id);
      if (!existingDocument) {
        throw new Error(`Documento con ID ${id} no encontrado`);
      }

      // Realizar soft delete
      existingDocument.softDelete();

      // Actualizar en el repositorio
      await this.documentRepository.update(existingDocument);

      this.logger.info('Document deleted successfully', { id, code: existingDocument.code });
    } catch (error) {
      this.logger.error('Error deleting document', { error: (error as Error).message, id });
      throw error;
    }
  }
}
