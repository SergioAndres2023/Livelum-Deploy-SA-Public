import { MinuteType, MinuteStatus } from '../../../domain/enums/MinuteEnums';

export interface MinuteSchemaType {
  _id: string;
  meetingDate: Date;
  title: string;
  type: MinuteType;
  status: MinuteStatus;
  participants: string[];
  participantIds: string[];
  content: string;
  topics: string[];
  agreements: string[];
  actionItems: string[];
  location?: string;
  duration?: number;
  nextMeetingDate?: Date;
  attachments: string[];
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

