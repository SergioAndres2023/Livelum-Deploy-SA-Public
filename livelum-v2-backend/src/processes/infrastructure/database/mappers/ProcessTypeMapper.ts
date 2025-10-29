import { ProcessType, ProcessTypeProps } from '../../../domain/entities/ProcessType';
import { ProcessTypeDocument } from '../schemas/ProcessTypeSchemaType';

export class ProcessTypeMapper {
  static toDomain(document: ProcessTypeDocument): ProcessType {
    const props: ProcessTypeProps = {
      id: document._id.toString(),
      order: document.order,
      name: document.name,
      links: document.links,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    return ProcessType.fromPrimitives(props);
  }

  static toPersistence(processType: ProcessType): Partial<ProcessTypeDocument> {
    const primitives = processType.toPrimitives();
    
    return {
      order: primitives.order,
      name: primitives.name,
      links: primitives.links,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
