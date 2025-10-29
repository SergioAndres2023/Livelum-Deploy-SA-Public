import { MinuteType } from '../../domain/enums/MinuteEnums';

export interface CreateMinuteRequest {
  meetingDate: Date;
  title: string;
  type: MinuteType;
  participants: string[];
  participantIds?: string[];
  content: string;
  topics?: string[];
  agreements?: string[];
  actionItems?: string[];
  location?: string;
  duration?: number;
  nextMeetingDate?: Date;
  createdBy: string;
  companyId: string;
}
