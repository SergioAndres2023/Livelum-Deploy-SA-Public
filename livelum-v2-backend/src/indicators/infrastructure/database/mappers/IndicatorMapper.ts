import { Indicator } from '../../../domain/entities/Indicator';
import { IndicatorDocument } from '../schemas/IndicatorSchemaType';

export class IndicatorMapper {
  static toDomain(document: IndicatorDocument): Indicator {
    const props = {
      name: document.name,
      code: document.code,
      category: document.category,
      type: document.type,
      currentValue: document.currentValue,
      targetValue: document.targetValue,
      unit: document.unit,
      trend: document.trend,
      status: document.status,
      owner: document.owner,
      lastUpdate: document.lastUpdate,
      frequency: document.frequency,
      description: document.description,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    return Indicator.restore(props, document._id.toString());
  }

  static toPersistence(indicator: Indicator): Partial<IndicatorDocument> {
    const primitives = indicator.toPrimitives();
    
    return {
      _id: primitives.id,
      name: primitives.name,
      code: primitives.code,
      category: primitives.category,
      type: primitives.type,
      currentValue: primitives.currentValue,
      targetValue: primitives.targetValue,
      unit: primitives.unit,
      trend: primitives.trend,
      status: primitives.status,
      owner: primitives.owner,
      lastUpdate: primitives.lastUpdate,
      frequency: primitives.frequency,
      description: primitives.description,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
