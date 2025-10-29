import { Objective } from '../../../domain/entities/Objective';
import { ObjectiveSchemaType } from '../schemas/ObjectiveSchemaType';

export class ObjectiveMapper {
  static toPersistence(objective: Objective): ObjectiveSchemaType {
    const primitives = objective.toPrimitives();
    
    return {
      _id: primitives.id,
      title: primitives.title,
      description: primitives.description,
      targetValue: primitives.targetValue,
      currentValue: primitives.currentValue,
      unit: primitives.unit,
      startDate: primitives.startDate,
      targetDate: primitives.targetDate,
      status: primitives.status,
      indicatorId: primitives.indicatorId,
      indicatorName: primitives.indicatorName,
      responsibleUserId: primitives.responsibleUserId,
      responsibleUserName: primitives.responsibleUserName,
      companyId: primitives.companyId,
      comments: primitives.comments,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: ObjectiveSchemaType): Objective {
    // fromPrimitives espera ObjectiveCommentProps[] y los convierte internamente a ObjectiveComment[]
    return Objective.fromPrimitives({
      id: schema._id,
      title: schema.title,
      description: schema.description,
      targetValue: schema.targetValue,
      currentValue: schema.currentValue,
      unit: schema.unit,
      startDate: schema.startDate,
      targetDate: schema.targetDate,
      status: schema.status,
      indicatorId: schema.indicatorId,
      indicatorName: schema.indicatorName,
      responsibleUserId: schema.responsibleUserId,
      responsibleUserName: schema.responsibleUserName,
      companyId: schema.companyId,
      comments: schema.comments,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    });
  }
}

