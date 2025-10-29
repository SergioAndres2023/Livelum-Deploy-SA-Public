import mongoose, { Model } from 'mongoose';
import type { ProcessNameRepository } from '../../../domain/contracts/ProcessNameRepository';
import { ProcessName } from '../../../domain/entities/ProcessName';
import { ProcessNameDocument } from '../schemas/ProcessNameSchemaType';
import { ProcessNameSchema } from '../schemas/ProcessNameSchema';
import { ProcessNameMapper } from '../mappers/ProcessNameMapper';
export class ProcessNameMongoRepository implements ProcessNameRepository {
  private model: Model<ProcessNameDocument>;

  constructor() {
    // Inicializar el modelo de Mongoose
    this.model = mongoose.model<ProcessNameDocument>('ProcessName', ProcessNameSchema);
  }

  async save(name: ProcessName): Promise<void> {
    const persistence = ProcessNameMapper.toPersistence(name);
    await this.model.create(persistence);
  }

  async findById(id: string): Promise<ProcessName | null> {
    const document = await this.model.findById(id).exec();
    return document ? ProcessNameMapper.toDomain(document) : null;
  }

  async findByTypeId(typeId: string): Promise<ProcessName[]> {
    const documents = await this.model.find({ processTypeId: typeId }).sort({ order: 1 }).exec();
    return documents.map(doc => ProcessNameMapper.toDomain(doc));
  }

  async findAll(): Promise<ProcessName[]> {
    const documents = await this.model.find().sort({ processTypeId: 1, order: 1 }).exec();
    return documents.map(doc => ProcessNameMapper.toDomain(doc));
  }

  async findByOrder(): Promise<ProcessName[]> {
    const documents = await this.model.find().sort({ order: 1 }).exec();
    return documents.map(doc => ProcessNameMapper.toDomain(doc));
  }

  async findByName(name: string): Promise<ProcessName | null> {
    const document = await this.model.findOne({ name }).exec();
    return document ? ProcessNameMapper.toDomain(document) : null;
  }

  async findByTypeIdAndOrder(typeId: string, order: number): Promise<ProcessName | null> {
    const document = await this.model.findOne({ processTypeId: typeId, order }).exec();
    return document ? ProcessNameMapper.toDomain(document) : null;
  }

  async update(name: ProcessName): Promise<void> {
    const persistence = ProcessNameMapper.toPersistence(name);
    await this.model.findByIdAndUpdate(name.id, persistence, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async countByTypeId(typeId: string): Promise<number> {
    return await this.model.countDocuments({ processTypeId: typeId }).exec();
  }

  async countTotal(): Promise<number> {
    return await this.model.countDocuments().exec();
  }
}
