export interface ReorderProcessNamesRequest {
  reorderItems: Array<{
    id: string;
    order: number;
  }>;
}
