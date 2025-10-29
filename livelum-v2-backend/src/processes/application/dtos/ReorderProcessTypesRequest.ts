export interface ReorderProcessTypesRequest {
  reorderItems: Array<{
    id: string;
    order: number;
  }>;
}
