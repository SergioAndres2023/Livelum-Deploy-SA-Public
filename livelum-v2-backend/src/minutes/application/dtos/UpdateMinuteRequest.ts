import { MinuteType } from '../../domain/enums/MinuteEnums';

export interface UpdateMinuteRequest {
  title?: string;
  meetingDate?: Date;
  type?: MinuteType;
  content?: string;
  participants?: string[];
  participantIds?: string[];
  topics?: string[];
  agreements?: string[];
  actionItems?: string[];
  location?: string;
  duration?: number;
  nextMeetingDate?: Date;
}
