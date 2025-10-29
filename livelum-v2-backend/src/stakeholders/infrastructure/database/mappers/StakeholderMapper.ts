import { Stakeholder, StakeholderProps } from '../../../domain/entities/Stakeholder';
import { StakeholderSchemaType } from '../schemas/StakeholderSchemaType';

export class StakeholderMapper {
  static toPersistence(stakeholder: Stakeholder): StakeholderSchemaType {
    const primitives = stakeholder.toPrimitives();
    
    return {
      _id: primitives.id,
      numero: primitives.numero,
      nombre: primitives.nombre,
      tipo: primitives.tipo,
      requisitos: primitives.requisitos,
      metodoEvaluacion: primitives.metodoEvaluacion,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: StakeholderSchemaType): Stakeholder {
    const props: StakeholderProps = {
      id: schema._id,
      numero: schema.numero,
      nombre: schema.nombre,
      tipo: schema.tipo,
      requisitos: schema.requisitos,
      metodoEvaluacion: schema.metodoEvaluacion,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Stakeholder.fromPrimitives(props);
  }
}

