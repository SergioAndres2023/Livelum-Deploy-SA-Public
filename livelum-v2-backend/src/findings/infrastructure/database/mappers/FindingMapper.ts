import { Finding, FindingProps } from '../../../domain/entities/Finding';
import { FindingSchemaType } from '../schemas/FindingSchemaType';

export class FindingMapper {
  static toPersistence(finding: Finding): FindingSchemaType {
    const primitives = finding.toPrimitives();
    
    return {
      _id: primitives.id,
      detectionDate: primitives.detectionDate,
      emissionDate: primitives.emissionDate,
      summary: primitives.summary,
      description: primitives.description,
      processId: primitives.processId,
      processName: primitives.processName,
      origin: primitives.origin,
      type: primitives.type,
      status: primitives.status,
      containmentActions: primitives.containmentActions,
      causeAnalysis: primitives.causeAnalysis,
      causeAnalysisDate: primitives.causeAnalysisDate,
      relatedFindings: primitives.relatedFindings,
      relatedAudits: primitives.relatedAudits,
      performedBy: primitives.performedBy,
      involvedActors: primitives.involvedActors,
      actions: primitives.actions,
      controls: primitives.controls,
      companyId: primitives.companyId,
      version: primitives.version,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: FindingSchemaType): Finding {
    const props: FindingProps = {
      id: schema._id,
      detectionDate: schema.detectionDate,
      emissionDate: schema.emissionDate,
      summary: schema.summary,
      description: schema.description,
      processId: schema.processId,
      processName: schema.processName,
      origin: schema.origin,
      type: schema.type,
      status: schema.status,
      containmentActions: schema.containmentActions,
      causeAnalysis: schema.causeAnalysis,
      causeAnalysisDate: schema.causeAnalysisDate,
      relatedFindings: schema.relatedFindings,
      relatedAudits: schema.relatedAudits,
      performedBy: schema.performedBy,
      involvedActors: schema.involvedActors,
      actions: schema.actions,
      controls: schema.controls,
      companyId: schema.companyId,
      version: schema.version,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Finding.fromPrimitives(props);
  }
}

