import mongoose, { Model } from 'mongoose';
import type { IndicatorRepository, IndicatorStats } from '../../../domain/contracts/IndicatorRepository';
import { Indicator } from '../../../domain/entities/Indicator';
import { IndicatorDocument } from '../schemas/IndicatorSchemaType';
import { IndicatorSchema } from '../schemas/IndicatorSchema';
import { IndicatorMapper } from '../mappers/IndicatorMapper';
import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../../domain/enums/IndicatorEnums';

export class IndicatorMongoRepository implements IndicatorRepository {
  private model: Model<IndicatorDocument>;

  constructor() {
    this.model = mongoose.model<IndicatorDocument>('Indicator', IndicatorSchema);
  }

  async save(indicator: Indicator): Promise<void> {
    const persistence = IndicatorMapper.toPersistence(indicator);
    await this.model.create(persistence);
  }

  async findById(id: string): Promise<Indicator | null> {
    const document = await this.model.findById(id).exec();
    return document ? IndicatorMapper.toDomain(document) : null;
  }

  async findByCode(code: string): Promise<Indicator | null> {
    const document = await this.model.findOne({ code }).exec();
    return document ? IndicatorMapper.toDomain(document) : null;
  }

  async findByCriteria(criteria: any): Promise<Indicator[]> {
    const query: any = {};
    
    if (criteria.name) {
      query.name = { $regex: criteria.name, $options: 'i' };
    }
    if (criteria.code) {
      query.code = { $regex: criteria.code, $options: 'i' };
    }
    if (criteria.category) {
      query.category = criteria.category;
    }
    if (criteria.type) {
      query.type = criteria.type;
    }
    if (criteria.trend) {
      query.trend = criteria.trend;
    }
    if (criteria.status) {
      query.status = criteria.status;
    }
    if (criteria.owner) {
      query.owner = { $regex: criteria.owner, $options: 'i' };
    }
    if (criteria.frequency) {
      query.frequency = criteria.frequency;
    }
    if (criteria.isCritical) {
      query.status = IndicatorStatus.CRITICAL;
    }
    if (criteria.isWarning) {
      query.status = IndicatorStatus.WARNING;
    }
    if (criteria.isGood) {
      query.status = IndicatorStatus.GOOD;
    }
    if (criteria.isAboveTarget) {
      query.$expr = { $gt: ['$currentValue', '$targetValue'] };
    }
    if (criteria.isBelowTarget) {
      query.$expr = { $lt: ['$currentValue', '$targetValue'] };
    }
    if (criteria.lastUpdateFrom) {
      query.lastUpdate = { $gte: criteria.lastUpdateFrom };
    }
    if (criteria.lastUpdateTo) {
      query.lastUpdate = { ...query.lastUpdate, $lte: criteria.lastUpdateTo };
    }
    if (criteria.createdAtFrom) {
      query.createdAt = { $gte: criteria.createdAtFrom };
    }
    if (criteria.createdAtTo) {
      query.createdAt = { ...query.createdAt, $lte: criteria.createdAtTo };
    }

    const options: mongoose.QueryOptions = {};
    if (criteria.limit) {
      options.limit = criteria.limit;
    }
    if (criteria.offset) {
      options.skip = criteria.offset;
    }
    if (criteria.sortBy && criteria.sortOrder) {
      options.sort = { [criteria.sortBy]: criteria.sortOrder === 'asc' ? 1 : -1 };
    } else {
      options.sort = { createdAt: -1 };
    }

    const documents = await this.model.find(query, null, options).exec();
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async findAll(): Promise<Indicator[]> {
    const documents = await this.model.find().sort({ createdAt: -1 }).exec();
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async update(indicator: Indicator): Promise<void> {
    const persistence = IndicatorMapper.toPersistence(indicator);
    await this.model.findByIdAndUpdate(indicator.id, persistence).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async countByStatus(status: IndicatorStatus): Promise<number> {
    return this.model.countDocuments({ status }).exec();
  }

  async countByType(type: IndicatorType): Promise<number> {
    return this.model.countDocuments({ type }).exec();
  }

  async countByCategory(category: IndicatorCategory): Promise<number> {
    return this.model.countDocuments({ category }).exec();
  }

  async countByTrend(trend: IndicatorTrend): Promise<number> {
    return this.model.countDocuments({ trend }).exec();
  }

  async countByFrequency(frequency: IndicatorFrequency): Promise<number> {
    return this.model.countDocuments({ frequency }).exec();
  }

  async countCritical(): Promise<number> {
    return this.model.countDocuments({ status: IndicatorStatus.CRITICAL }).exec();
  }

  async countWarning(): Promise<number> {
    return this.model.countDocuments({ status: IndicatorStatus.WARNING }).exec();
  }

  async countGood(): Promise<number> {
    return this.model.countDocuments({ status: IndicatorStatus.GOOD }).exec();
  }

  async countAboveTarget(): Promise<number> {
    return this.model.countDocuments({
      $expr: { $gt: ['$currentValue', '$targetValue'] }
    }).exec();
  }

  async countBelowTarget(): Promise<number> {
    return this.model.countDocuments({
      $expr: { $lt: ['$currentValue', '$targetValue'] }
    }).exec();
  }

  async countOnTarget(): Promise<number> {
    return this.model.countDocuments({
      $expr: { $eq: ['$currentValue', '$targetValue'] }
    }).exec();
  }

  async getStats(): Promise<IndicatorStats> {
    const total = await this.model.countDocuments().exec();
    const critical = await this.countCritical();
    const warning = await this.countWarning();
    const good = await this.countGood();
    const aboveTarget = await this.countAboveTarget();
    const belowTarget = await this.countBelowTarget();
    const onTarget = await this.countOnTarget();

    const byStatus: Record<IndicatorStatus, number> = {} as Record<IndicatorStatus, number>;
    for (const status of Object.values(IndicatorStatus)) {
      byStatus[status] = await this.countByStatus(status);
    }

    const byType: Record<IndicatorType, number> = {} as Record<IndicatorType, number>;
    for (const type of Object.values(IndicatorType)) {
      byType[type] = await this.countByType(type);
    }

    const byCategory: Record<IndicatorCategory, number> = {} as Record<IndicatorCategory, number>;
    for (const category of Object.values(IndicatorCategory)) {
      byCategory[category] = await this.countByCategory(category);
    }

    const byTrend: Record<IndicatorTrend, number> = {} as Record<IndicatorTrend, number>;
    for (const trend of Object.values(IndicatorTrend)) {
      byTrend[trend] = await this.countByTrend(trend);
    }

    const byFrequency: Record<IndicatorFrequency, number> = {} as Record<IndicatorFrequency, number>;
    for (const frequency of Object.values(IndicatorFrequency)) {
      byFrequency[frequency] = await this.countByFrequency(frequency);
    }

    return {
      total,
      byStatus,
      byType,
      byCategory,
      byTrend,
      byFrequency,
      critical,
      warning,
      good,
      aboveTarget,
      belowTarget,
      onTarget,
    };
  }

  async findCritical(): Promise<Indicator[]> {
    const documents = await this.model.find({
      status: IndicatorStatus.CRITICAL
    }).sort({ lastUpdate: 1 }).exec();
    
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async findWarning(): Promise<Indicator[]> {
    const documents = await this.model.find({
      status: IndicatorStatus.WARNING
    }).sort({ lastUpdate: 1 }).exec();
    
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async findGood(): Promise<Indicator[]> {
    const documents = await this.model.find({
      status: IndicatorStatus.GOOD
    }).sort({ currentValue: -1 }).exec();
    
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async findAboveTarget(): Promise<Indicator[]> {
    const documents = await this.model.find({
      $expr: { $gt: ['$currentValue', '$targetValue'] }
    }).sort({ currentValue: -1 }).exec();
    
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async findBelowTarget(): Promise<Indicator[]> {
    const documents = await this.model.find({
      $expr: { $lt: ['$currentValue', '$targetValue'] }
    }).sort({ currentValue: 1 }).exec();
    
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }

  async findOnTarget(): Promise<Indicator[]> {
    const documents = await this.model.find({
      $expr: { $eq: ['$currentValue', '$targetValue'] }
    }).sort({ lastUpdate: -1 }).exec();
    
    return documents.map(doc => IndicatorMapper.toDomain(doc as any));
  }
}
