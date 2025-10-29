import mongoose, { Model } from 'mongoose';
import type { ProcessTypeRepository } from '../../../domain/contracts/ProcessTypeRepository';
import { ProcessType } from '../../../domain/entities/ProcessType';
import { ProcessTypeDocument } from '../schemas/ProcessTypeSchemaType';
import { ProcessTypeSchema } from '../schemas/ProcessTypeSchema';
import { ProcessTypeMapper } from '../mappers/ProcessTypeMapper';
export class ProcessTypeMongoRepository implements ProcessTypeRepository {
  private model: Model<ProcessTypeDocument>;

  constructor() {
    // Inicializar el modelo de Mongoose
    this.model = mongoose.model<ProcessTypeDocument>('ProcessType', ProcessTypeSchema);
  }

  async save(type: ProcessType): Promise<void> {
    const persistence = ProcessTypeMapper.toPersistence(type);
    await this.model.create(persistence);
  }

  async findById(id: string): Promise<ProcessType | null> {
    const document = await this.model.findById(id).exec();
    return document ? ProcessTypeMapper.toDomain(document) : null;
  }

  async findAll(): Promise<ProcessType[]> {
    const documents = await this.model.find().exec();
    return documents.map(doc => ProcessTypeMapper.toDomain(doc));
  }

  async findByOrder(): Promise<ProcessType[]> {
    const documents = await this.model.find().sort({ order: 1 }).exec();
    return documents.map(doc => ProcessTypeMapper.toDomain(doc));
  }

  async findByName(name: string): Promise<ProcessType | null> {
    const document = await this.model.findOne({ name: name.toUpperCase() }).exec();
    return document ? ProcessTypeMapper.toDomain(document) : null;
  }

  async findByOrderValue(order: number): Promise<ProcessType | null> {
    const document = await this.model.findOne({ order }).exec();
    return document ? ProcessTypeMapper.toDomain(document) : null;
  }

  async update(type: ProcessType): Promise<void> {
    const persistence = ProcessTypeMapper.toPersistence(type);
    await this.model.findByIdAndUpdate(type.id, persistence, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async countTotal(): Promise<number> {
    return await this.model.countDocuments().exec();
  }
}
