import { ActionPlanOriginType, ActionPlanStatus } from '../../../domain/enums/ActionPlanEnums';
import { PlanActionProps } from '../../../domain/valueObjects/PlanAction';
import { PlanControlProps } from '../../../domain/valueObjects/PlanControl';

export interface ActionPlanSchemaType {
  _id: string;
  createdDate: Date;
  originType: ActionPlanOriginType;
  originDescription: string;
  originId?: string;
  status: ActionPlanStatus;
  actions: PlanActionProps[];
  controls: PlanControlProps[];
  completionPercentage: number;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

