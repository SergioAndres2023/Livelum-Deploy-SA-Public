export interface AddActionRequest {
  description: string;
  responsible: string;
  plannedDate: Date;
  comments?: string;
}
