import { ProcessName, ProcessNameProps } from '../../../domain/entities/ProcessName';
import { ProcessNameDocument } from '../schemas/ProcessNameSchemaType';

export class ProcessNameMapper {
  static toDomain(document: ProcessNameDocument): ProcessName {
    const props: ProcessNameProps = {
      id: document._id.toString(),
      order: document.order,
      processTypeId: document.processTypeId,
      name: document.name,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    return ProcessName.fromPrimitives(props);
  }

  static toPersistence(processName: ProcessName): Partial<ProcessNameDocument> {
    const primitives = processName.toPrimitives();
    
    return {
      order: primitives.order,
      processTypeId: primitives.processTypeId,
      name: primitives.name,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
