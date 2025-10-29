import { Audit } from '../../../domain/entities/Audit';
import { AuditSchemaType } from '../schemas/AuditSchemaType';
import { Types } from 'mongoose';

export class AuditMapper {
  static toDomain(schema: AuditSchemaType): Audit {
    const props = {
      id: schema._id.toString(),
      title: schema.title,
      auditType: schema.auditType,
      status: schema.status,
      plannedDate: schema.plannedDate,
      actualDate: schema.actualDate,
      auditorName: schema.auditorName,
      scope: schema.scope,
      findings: schema.findings,
      recommendations: schema.recommendations,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Audit.fromPrimitives(props);
  }

  static toPersistence(audit: Audit): any {
    const primitives = audit.toPrimitives();
    
    return {
      _id: primitives.id ? new Types.ObjectId(primitives.id) : new Types.ObjectId(),
      title: primitives.title,
      auditType: primitives.auditType,
      status: primitives.status,
      plannedDate: primitives.plannedDate,
      actualDate: primitives.actualDate,
      auditorName: primitives.auditorName,
      scope: primitives.scope,
      findings: primitives.findings,
      recommendations: primitives.recommendations,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
