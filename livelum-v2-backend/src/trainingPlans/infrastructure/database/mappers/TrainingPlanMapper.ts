import { TrainingPlan, TrainingPlanProps } from '../../../domain/entities/TrainingPlan';
import { TrainingPlanSchemaType } from '../schemas/TrainingPlanSchemaType';

export class TrainingPlanMapper {
  static toPersistence(trainingPlan: TrainingPlan): TrainingPlanSchemaType {
    const primitives = trainingPlan.toPrimitives();
    
    return {
      _id: primitives.id,
      plannedDate: primitives.plannedDate,
      topic: primitives.topic,
      type: primitives.type,
      completionDate: primitives.completionDate,
      status: primitives.status,
      instructor: primitives.instructor,
      provider: primitives.provider,
      duration: primitives.duration,
      participants: primitives.participants || [],
      participantIds: primitives.participantIds || [],
      objectives: primitives.objectives,
      evaluation: primitives.evaluation,
      comments: primitives.comments,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: TrainingPlanSchemaType): TrainingPlan {
    const props: TrainingPlanProps = {
      id: schema._id,
      plannedDate: schema.plannedDate,
      topic: schema.topic,
      type: schema.type,
      completionDate: schema.completionDate,
      status: schema.status,
      instructor: schema.instructor,
      provider: schema.provider,
      duration: schema.duration,
      participants: schema.participants,
      participantIds: schema.participantIds,
      objectives: schema.objectives,
      evaluation: schema.evaluation,
      comments: schema.comments,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return TrainingPlan.fromPrimitives(props);
  }
}

