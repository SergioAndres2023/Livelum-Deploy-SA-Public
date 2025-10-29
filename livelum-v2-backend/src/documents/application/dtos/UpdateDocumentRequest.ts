import { DocumentType } from '../../domain/enums/DocumentEnums';

export interface UpdateDocumentRequest {
  code?: string;
  title?: string;
  description?: string;
  type?: DocumentType;
  author?: string;
  expiryDate?: Date;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
}
