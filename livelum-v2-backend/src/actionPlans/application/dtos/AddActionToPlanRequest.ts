export interface AddActionToPlanRequest {
  description: string;
  responsible: string;
  plannedDate: Date;
  comments?: string;
}
