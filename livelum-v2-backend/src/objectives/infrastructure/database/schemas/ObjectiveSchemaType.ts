import { ObjectiveStatus, ActionStatus } from '../../../domain/enums/ObjectiveEnums';

export interface ObjectiveCommentSchemaType {
  id: string;
  text: string;
  actionRequired: boolean;
  actionDescription?: string;
  actionDueDate?: Date;
  actionStatus?: ActionStatus;
  createdBy: string;
  createdAt: Date;
}

export interface ObjectiveSchemaType {
  _id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: Date;
  targetDate: Date;
  status: ObjectiveStatus;
  indicatorId?: string;
  indicatorName?: string;
  responsibleUserId: string;
  responsibleUserName: string;
  companyId: string;
  comments: ObjectiveCommentSchemaType[];
  createdAt: Date;
  updatedAt: Date;
}

