import mongoose, { Model } from 'mongoose';
import type { RiskRepository, RiskSearchCriteria, RiskStats } from '../../../domain/contracts/RiskRepository';
import { Risk } from '../../../domain/entities/Risk';
import { RiskDocument } from '../schemas/RiskSchemaType';
import { RiskSchema } from '../schemas/RiskSchema';
import { RiskMapper } from '../mappers/RiskMapper';
import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../../domain/enums/RiskEnums';

export class RiskMongoRepository implements RiskRepository {
  private model: Model<RiskDocument>;

  constructor() {
    // Inicializar el modelo de Mongoose
    this.model = mongoose.model<RiskDocument>('Risk', RiskSchema);
  }

  async save(risk: Risk): Promise<void> {
    const persistence = RiskMapper.toPersistence(risk);
    await this.model.create(persistence);
  }

  async findById(id: string): Promise<Risk | null> {
    const document = await this.model.findById(id).exec();
    return document ? RiskMapper.toDomain(document) : null;
  }

  async findByCode(code: string): Promise<Risk | null> {
    const document = await this.model.findOne({ code }).exec();
    return document ? RiskMapper.toDomain(document) : null;
  }

  async findByCriteria(criteria: RiskSearchCriteria): Promise<Risk[]> {
    const query: any = {};

    // Filtros básicos
    if (criteria.title) {
      query.title = { $regex: criteria.title, $options: 'i' };
    }
    if (criteria.code) {
      query.code = { $regex: criteria.code, $options: 'i' };
    }
    if (criteria.category) {
      query.category = criteria.category;
    }
    if (criteria.probability) {
      query.probability = criteria.probability;
    }
    if (criteria.impact) {
      query.impact = criteria.impact;
    }
    if (criteria.riskLevel) {
      query.riskLevel = criteria.riskLevel;
    }
    if (criteria.status) {
      query.status = criteria.status;
    }
    if (criteria.owner) {
      query.owner = { $regex: criteria.owner, $options: 'i' };
    }

    // Filtros de fecha
    if (criteria.dueDateFrom || criteria.dueDateTo) {
      query.dueDate = {};
      if (criteria.dueDateFrom) {
        query.dueDate.$gte = criteria.dueDateFrom;
      }
      if (criteria.dueDateTo) {
        query.dueDate.$lte = criteria.dueDateTo;
      }
    }

    if (criteria.createdAtFrom || criteria.createdAtTo) {
      query.createdAt = {};
      if (criteria.createdAtFrom) {
        query.createdAt.$gte = criteria.createdAtFrom;
      }
      if (criteria.createdAtTo) {
        query.createdAt.$lte = criteria.createdAtTo;
      }
    }

    // Filtros especiales
    if (criteria.isOverdue) {
      query.dueDate = { $lt: new Date() };
      query.status = { $ne: RiskStatus.CLOSED };
    }

    if (criteria.isCritical) {
      query.riskLevel = RiskLevel.CRITICO;
    }

    // Configurar ordenamiento
    const sort: any = {};
    if (criteria.sortBy) {
      sort[criteria.sortBy] = criteria.sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Orden por defecto
    }

    // Configurar paginación
    const options: any = { sort };
    if (criteria.limit) {
      options.limit = criteria.limit;
    }
    if (criteria.offset) {
      options.skip = criteria.offset;
    }

    const documents = await this.model.find(query, null, options).exec();
    return documents.map(doc => RiskMapper.toDomain(doc as any));
  }

  async findAll(): Promise<Risk[]> {
    const documents = await this.model.find().sort({ createdAt: -1 }).exec();
    return documents.map(doc => RiskMapper.toDomain(doc as any));
  }

  async update(risk: Risk): Promise<void> {
    const persistence = RiskMapper.toPersistence(risk);
    await this.model.findByIdAndUpdate(risk.id, persistence).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async countByStatus(status: RiskStatus): Promise<number> {
    return await this.model.countDocuments({ status }).exec();
  }

  async countByLevel(level: RiskLevel): Promise<number> {
    return await this.model.countDocuments({ riskLevel: level }).exec();
  }

  async countByCategory(category: RiskCategory): Promise<number> {
    return await this.model.countDocuments({ category }).exec();
  }

  async countByProbability(probability: RiskProbability): Promise<number> {
    return await this.model.countDocuments({ probability }).exec();
  }

  async countByImpact(impact: RiskImpact): Promise<number> {
    return await this.model.countDocuments({ impact }).exec();
  }

  async countOverdue(): Promise<number> {
    return await this.model.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: RiskStatus.CLOSED }
    }).exec();
  }

  async countCritical(): Promise<number> {
    return await this.model.countDocuments({ riskLevel: RiskLevel.CRITICO }).exec();
  }

  async getStats(): Promise<RiskStats> {
    const [
      total,
      byStatus,
      byLevel,
      byCategory,
      overdue,
      critical
    ] = await Promise.all([
      this.model.countDocuments().exec(),
      this.getStatusStats(),
      this.getLevelStats(),
      this.getCategoryStats(),
      this.countOverdue(),
      this.countCritical()
    ]);

    return {
      total,
      byStatus,
      byLevel,
      byCategory,
      overdue,
      critical,
      highRisk: byLevel[RiskLevel.ALTO] + byLevel[RiskLevel.CRITICO]
    };
  }

  private async getStatusStats(): Promise<Record<RiskStatus, number>> {
    const [active, monitored, mitigated, closed] = await Promise.all([
      this.countByStatus(RiskStatus.ACTIVE),
      this.countByStatus(RiskStatus.MONITORED),
      this.countByStatus(RiskStatus.MITIGATED),
      this.countByStatus(RiskStatus.CLOSED)
    ]);

    return {
      [RiskStatus.ACTIVE]: active,
      [RiskStatus.MONITORED]: monitored,
      [RiskStatus.MITIGATED]: mitigated,
      [RiskStatus.CLOSED]: closed
    };
  }

  private async getLevelStats(): Promise<Record<RiskLevel, number>> {
    const [bajo, medio, alto, critico] = await Promise.all([
      this.countByLevel(RiskLevel.BAJO),
      this.countByLevel(RiskLevel.MEDIO),
      this.countByLevel(RiskLevel.ALTO),
      this.countByLevel(RiskLevel.CRITICO)
    ]);

    return {
      [RiskLevel.BAJO]: bajo,
      [RiskLevel.MEDIO]: medio,
      [RiskLevel.ALTO]: alto,
      [RiskLevel.CRITICO]: critico
    };
  }

  private async getCategoryStats(): Promise<Record<RiskCategory, number>> {
    const categories = Object.values(RiskCategory);
    const counts = await Promise.all(
      categories.map(category => this.countByCategory(category))
    );

    const result: Record<RiskCategory, number> = {} as Record<RiskCategory, number>;
    categories.forEach((category, index) => {
      result[category] = counts[index] || 0;
    });

    return result;
  }

  async findOverdue(): Promise<Risk[]> {
    const documents = await this.model.find({
      dueDate: { $lt: new Date() },
      status: { $ne: RiskStatus.CLOSED }
    }).sort({ dueDate: 1 }).exec();
    
    return documents.map(doc => RiskMapper.toDomain(doc as any));
  }

  async findCritical(): Promise<Risk[]> {
    const documents = await this.model.find({
      riskLevel: RiskLevel.CRITICO
    }).sort({ dueDate: 1 }).exec();
    
    return documents.map(doc => RiskMapper.toDomain(doc as any));
  }

  async findHighRisk(): Promise<Risk[]> {
    const documents = await this.model.find({
      riskLevel: { $in: [RiskLevel.ALTO, RiskLevel.CRITICO] }
    }).sort({ riskLevel: -1, dueDate: 1 }).exec();
    
    return documents.map(doc => RiskMapper.toDomain(doc as any));
  }
}
