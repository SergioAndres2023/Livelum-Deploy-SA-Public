import { Document } from '../../../domain/entities/Document';
import { DocumentSchemaType } from '../schemas/DocumentSchemaType';
import { Types } from 'mongoose';

export class DocumentMapper {
  static toDomain(schema: DocumentSchemaType): Document {
    const props = {
      id: schema._id.toString(),
      code: schema.code,
      title: schema.title,
      description: schema.description,
      version: schema.version,
      type: schema.type,
      status: schema.status,
      author: schema.author,
      createdDate: schema.createdDate,
      expiryDate: schema.expiryDate,
      fileUrl: schema.fileUrl,
      fileName: schema.fileName,
      fileSize: schema.fileSize,
      mimeType: schema.mimeType,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Document.fromPrimitives(props);
  }

  static toPersistence(document: Document): any {
    const primitives = document.toPrimitives();
    
    return {
      _id: primitives.id ? new Types.ObjectId(primitives.id) : new Types.ObjectId(),
      code: primitives.code,
      title: primitives.title,
      description: primitives.description,
      version: primitives.version,
      type: primitives.type,
      status: primitives.status,
      author: primitives.author,
      createdDate: primitives.createdDate,
      expiryDate: primitives.expiryDate,
      fileUrl: primitives.fileUrl,
      fileName: primitives.fileName,
      fileSize: primitives.fileSize,
      mimeType: primitives.mimeType,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
