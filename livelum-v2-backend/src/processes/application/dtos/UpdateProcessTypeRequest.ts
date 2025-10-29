export interface UpdateProcessTypeRequest {
  order?: number;
  name?: string;
  links?: Array<{
    name: string;
    path: string;
  }>;
}
