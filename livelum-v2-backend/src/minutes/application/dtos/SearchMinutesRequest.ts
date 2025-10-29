import { MinuteType, MinuteStatus } from '../../domain/enums/MinuteEnums';

export interface SearchMinutesRequest {
  title?: string;
  type?: MinuteType;
  status?: MinuteStatus;
  companyId?: string;
  meetingDateFrom?: Date;
  meetingDateTo?: Date;
  createdBy?: string;
  page?: number;
  limit?: number;
  sortBy?: 'meetingDate' | 'title' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
