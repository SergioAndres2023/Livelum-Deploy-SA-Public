import { RiskStatus } from '../../domain/enums/RiskEnums';

export interface ChangeRiskStatusRequest {
  status: RiskStatus;
}
