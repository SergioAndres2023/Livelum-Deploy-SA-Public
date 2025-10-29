import { ActionPlanOriginType } from '../../domain/enums/ActionPlanEnums';

export interface UpdateActionPlanRequest {
  originDescription?: string;
  originType?: ActionPlanOriginType;
  originId?: string;
}
