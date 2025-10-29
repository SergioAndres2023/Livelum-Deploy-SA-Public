import { ObjectiveStatus } from '../../domain/enums/ObjectiveEnums';
import { ObjectiveCommentProps } from '../../domain/valueObjects/ObjectiveComment';

export interface ObjectiveResponse {
  id: string;
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
  comments: ObjectiveCommentProps[];
  progress: number;
  isActive: boolean;
  isCompleted: boolean;
  isPaused: boolean;
  isCancelled: boolean;
  isOverdue: boolean;
  daysRemaining: number;
  hasPendingActions: boolean;
  hasOverdueActions: boolean;
  createdAt: Date;
  updatedAt: Date;
}
