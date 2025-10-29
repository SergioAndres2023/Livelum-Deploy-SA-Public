export interface AddCommentRequest {
  text: string;
  actionRequired?: boolean;
  actionDescription?: string;
  actionDueDate?: Date;
  createdBy: string;
}
