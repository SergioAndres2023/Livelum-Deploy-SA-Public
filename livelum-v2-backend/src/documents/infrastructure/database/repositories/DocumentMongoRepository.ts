import { injectable } from 'tsyringe';
import type { DocumentRepository, DocumentSearchCriteria } from '../../../domain/contracts/DocumentRepository';
import { Document } from '../../../domain/entities/Document';
import { DocumentStatus } from '../../../domain/enums/DocumentEnums';
import { DocumentModel } from '../schemas/DocumentSchema';
import { DocumentMapper } from '../mappers/DocumentMapper';
import type { Logger } from '../../../../cross-cutting/infrastructure/logger/Logger';

@injectable()
export class DocumentMongoRepository implements DocumentRepository {
  constructor(private readonly logger: Logger) {}

  async save(document: Document): Promise<void> {
    try {
      const documentData = DocumentMapper.toPersistence(document);
      const documentModel = new DocumentModel(documentData);
      await documentModel.save();
      
      this.logger.info('Document saved successfully', { id: document.id, code: document.code });
    } catch (error) {
      this.logger.error('Error saving document', { error: (error as Error).message, id: document.id });
      throw error;
    }
  }

  async findById(id: string): Promise<Document | null> {
    try {
      const documentSchema = await DocumentModel.findById(id);
      if (!documentSchema) {
        return null;
      }
      
      return DocumentMapper.toDomain(documentSchema);
    } catch (error) {
      this.logger.error('Error finding document by ID', { error: (error as Error).message, id });
      throw error;
    }
  }

  async findByCode(code: string): Promise<Document | null> {
    try {
      const documentSchema = await DocumentModel.findOne({ code: code.toUpperCase() });
      if (!documentSchema) {
        return null;
      }
      
      return DocumentMapper.toDomain(documentSchema);
    } catch (error) {
      this.logger.error('Error finding document by code', { error: (error as Error).message, code });
      throw error;
    }
  }

  async findByCriteria(criteria: DocumentSearchCriteria): Promise<Document[]> {
    try {
      const query: any = {};

      // Filtros básicos
      if (criteria.title) {
        query.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.code) {
        query.code = { $regex: criteria.code, $options: 'i' };
      }
      if (criteria.type) {
        query.type = criteria.type;
      }
      if (criteria.status) {
        query.status = criteria.status;
      }
      if (criteria.author) {
        query.author = { $regex: criteria.author, $options: 'i' };
      }

      // Filtros de vencimiento
      if (criteria.expiringSoon) {
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() + 30);
        query.expiryDate = { $lte: thresholdDate, $gte: new Date() };
      }
      if (criteria.expired) {
        query.expiryDate = { $lt: new Date() };
      }

      // Construir query con paginación y ordenamiento
      let mongoQuery = DocumentModel.find(query);

      // Ordenamiento
      const sortBy = criteria.sortBy || 'createdAt';
      const sortOrder = criteria.sortOrder === 'asc' ? 1 : -1;
      mongoQuery = mongoQuery.sort({ [sortBy]: sortOrder });

      // Paginación
      if (criteria.page && criteria.limit) {
        const skip = (criteria.page - 1) * criteria.limit;
        mongoQuery = mongoQuery.skip(skip).limit(criteria.limit);
      }

      const documentSchemas = await mongoQuery.exec();
      return documentSchemas.map(schema => DocumentMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error finding documents by criteria', { error: (error as Error).message, criteria });
      throw error;
    }
  }

  async update(document: Document): Promise<void> {
    try {
      const documentData = DocumentMapper.toPersistence(document);
      await DocumentModel.findByIdAndUpdate(document.id, documentData, { new: true });
      
      this.logger.info('Document updated successfully', { id: document.id, code: document.code });
    } catch (error) {
      this.logger.error('Error updating document', { error: (error as Error).message, id: document.id });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // Soft delete: actualizar el documento en lugar de eliminarlo físicamente
      const document = await DocumentModel.findById(id);
      if (!document) {
        throw new Error(`Documento con ID ${id} no encontrado`);
      }
      
      // El soft delete se maneja en el UseCase, aquí solo actualizamos
      await document.save();
      
      this.logger.info('Document soft deleted successfully', { id });
    } catch (error) {
      this.logger.error('Error soft deleting document', { error: (error as Error).message, id });
      throw error;
    }
  }

  async countByStatus(status: DocumentStatus): Promise<number> {
    try {
      return await DocumentModel.countDocuments({ status });
    } catch (error) {
      this.logger.error('Error counting documents by status', { error: (error as Error).message, status });
      throw error;
    }
  }

  async countTotal(): Promise<number> {
    try {
      return await DocumentModel.countDocuments();
    } catch (error) {
      this.logger.error('Error counting total documents', { error: (error as Error).message });
      throw error;
    }
  }

  async findExpiringSoon(daysThreshold: number): Promise<Document[]> {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
      
      const documentSchemas = await DocumentModel.find({
        expiryDate: { $lte: thresholdDate, $gte: new Date() },
        status: { $ne: DocumentStatus.VENCIDO }
      }).sort({ expiryDate: 1 });

      return documentSchemas.map(schema => DocumentMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error finding expiring documents', { error: (error as Error).message, daysThreshold });
      throw error;
    }
  }

  async findExpired(): Promise<Document[]> {
    try {
      const documentSchemas = await DocumentModel.find({
        expiryDate: { $lt: new Date() },
        status: { $ne: DocumentStatus.VENCIDO }
      }).sort({ expiryDate: -1 });

      return documentSchemas.map(schema => DocumentMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error finding expired documents', { error: (error as Error).message });
      throw error;
    }
  }
}
