import { ProcessSheet, ProcessSheetProps } from '../../../domain/entities/ProcessSheet';
import { ProcessSheetDocument } from '../schemas/ProcessSheetSchemaType';

export class ProcessSheetMapper {
  static toDomain(document: ProcessSheetDocument): ProcessSheet {
    const props: ProcessSheetProps = {
      id: document._id.toString(),
      code: document.code,
      name: document.name,
      processTypeId: document.processTypeId,
      processNameId: document.processNameId,
      version: document.version,
      status: document.status,
      responsible: document.responsible,
      lastUpdate: document.lastUpdate,
      indicatorIds: document.indicatorIds,
      documentIds: document.documentIds,
      riskIds: document.riskIds,
      opportunityIds: document.opportunityIds,
      equipmentIds: document.equipmentIds,
      supplierIds: document.supplierIds,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    return ProcessSheet.fromPrimitives(props);
  }

  static toPersistence(processSheet: ProcessSheet): Partial<ProcessSheetDocument> {
    const primitives = processSheet.toPrimitives();
    
    return {
      code: primitives.code,
      name: primitives.name,
      processTypeId: primitives.processTypeId,
      processNameId: primitives.processNameId,
      version: primitives.version,
      status: primitives.status,
      responsible: primitives.responsible,
      lastUpdate: primitives.lastUpdate,
      indicatorIds: primitives.indicatorIds,
      documentIds: primitives.documentIds,
      riskIds: primitives.riskIds,
      opportunityIds: primitives.opportunityIds,
      equipmentIds: primitives.equipmentIds,
      supplierIds: primitives.supplierIds,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
