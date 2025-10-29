export interface CreateProcessTypeRequest {
  order: number;
  name: string;
  links?: Array<{
    name: string;
    path: string;
  }>;
}
