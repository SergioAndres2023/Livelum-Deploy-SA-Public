import { MinuteType, MinuteStatus } from '../enums/MinuteEnums';

export interface MinuteSearchCriteria {
  title?: string;
  type?: MinuteType;
  status?: MinuteStatus;
  companyId?: string;
  meetingDateFrom?: Date;
  meetingDateTo?: Date;
  createdBy?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'meetingDate' | 'title' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
