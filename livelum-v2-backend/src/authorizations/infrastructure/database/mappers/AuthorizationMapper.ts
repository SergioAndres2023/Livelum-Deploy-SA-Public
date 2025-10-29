import { Authorization, AuthorizationProps } from '../../../domain/entities/Authorization';
import { AuthorizationSchemaType } from '../schemas/AuthorizationSchemaType';

export class AuthorizationMapper {
  static toPersistence(authorization: Authorization): AuthorizationSchemaType {
    const primitives = authorization.toPrimitives();
    
    return {
      _id: primitives.id,
      type: primitives.type,
      entityId: primitives.entityId,
      entityName: primitives.entityName,
      version: primitives.version,
      status: primitives.status,
      requestedBy: primitives.requestedBy,
      requestedAt: primitives.requestedAt,
      approvedBy: primitives.approvedBy,
      approvedAt: primitives.approvedAt,
      rejectedBy: primitives.rejectedBy,
      rejectedAt: primitives.rejectedAt,
      comments: primitives.comments,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: AuthorizationSchemaType): Authorization {
    const props: AuthorizationProps = {
      id: schema._id,
      type: schema.type,
      entityId: schema.entityId,
      entityName: schema.entityName,
      version: schema.version,
      status: schema.status,
      requestedBy: schema.requestedBy,
      requestedAt: schema.requestedAt,
      approvedBy: schema.approvedBy,
      approvedAt: schema.approvedAt,
      rejectedBy: schema.rejectedBy,
      rejectedAt: schema.rejectedAt,
      comments: schema.comments,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Authorization.fromPrimitives(props);
  }
}
