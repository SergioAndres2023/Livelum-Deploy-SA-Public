export interface ProcessTypeResponse {
  id: string;
  order: number;
  name: string;
  links: Array<{
    name: string;
    path: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
