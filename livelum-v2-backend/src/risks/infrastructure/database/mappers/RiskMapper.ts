import { Risk, RiskProps } from '../../../domain/entities/Risk';
import { RiskDocument } from '../schemas/RiskSchemaType';

export class RiskMapper {
  static toDomain(document: RiskDocument): Risk {
    const props: RiskProps = {
      title: document.title,
      code: document.code,
      category: document.category,
      probability: document.probability,
      impact: document.impact,
      riskLevel: document.riskLevel,
      status: document.status,
      owner: document.owner,
      dueDate: document.dueDate,
      description: document.description,
      mitigation: document.mitigation,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
    return Risk.restore(props, document._id);
  }

  static toPersistence(entity: Risk): RiskDocument {
    const primitives = entity.toPrimitives();
    return {
      _id: primitives.id,
      title: primitives.title,
      code: primitives.code,
      category: primitives.category,
      probability: primitives.probability,
      impact: primitives.impact,
      riskLevel: primitives.riskLevel,
      status: primitives.status,
      owner: primitives.owner,
      dueDate: primitives.dueDate,
      description: primitives.description,
      mitigation: primitives.mitigation,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    } as RiskDocument;
  }
}
