import { ActionPlanOriginType } from '../../domain/enums/ActionPlanEnums';

export interface CreateActionPlanRequest {
  createdDate: Date;
  originType: ActionPlanOriginType;
  originDescription: string;
  originId?: string;
  companyId: string;
  createdBy: string;
}
