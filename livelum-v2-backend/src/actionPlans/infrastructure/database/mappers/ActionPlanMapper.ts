import { ActionPlan, ActionPlanProps } from '../../../domain/entities/ActionPlan';
import { ActionPlanSchemaType } from '../schemas/ActionPlanSchemaType';

export class ActionPlanMapper {
  static toPersistence(actionPlan: ActionPlan): ActionPlanSchemaType {
    const primitives = actionPlan.toPrimitives();
    
    return {
      _id: primitives.id,
      createdDate: primitives.createdDate,
      originType: primitives.originType,
      originDescription: primitives.originDescription,
      originId: primitives.originId,
      status: primitives.status,
      actions: primitives.actions,
      controls: primitives.controls,
      completionPercentage: primitives.completionPercentage,
      companyId: primitives.companyId,
      createdBy: primitives.createdBy,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: ActionPlanSchemaType): ActionPlan {
    const props: ActionPlanProps = {
      id: schema._id,
      createdDate: schema.createdDate,
      originType: schema.originType,
      originDescription: schema.originDescription,
      originId: schema.originId,
      status: schema.status,
      actions: schema.actions,
      controls: schema.controls,
      completionPercentage: schema.completionPercentage,
      companyId: schema.companyId,
      createdBy: schema.createdBy,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return ActionPlan.fromPrimitives(props);
  }
}

