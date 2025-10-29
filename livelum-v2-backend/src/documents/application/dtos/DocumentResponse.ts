import { DocumentType, DocumentStatus } from '../../domain/enums/DocumentEnums';

export interface DocumentResponse {
  id: string;
  code: string;
  title: string;
  description?: string;
  version: string;
  type: DocumentType;
  status: DocumentStatus;
  author: string;
  createdDate: Date;
  expiryDate?: Date;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt: Date;
  updatedAt: Date;
  isExpired: boolean;
  isExpiringSoon: boolean;
}

export interface DocumentStatsResponse {
  total: number;
  inReview: number;
  approved: number;
  expiringSoon: number;
  expired: number;
  byType: {
    [key in DocumentType]: number;
  };
}
