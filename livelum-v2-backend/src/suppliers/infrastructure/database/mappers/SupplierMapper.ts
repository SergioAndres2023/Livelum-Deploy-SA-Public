import { Supplier, SupplierProps } from '../../../domain/entities/Supplier';
import { SupplierSchemaType } from '../schemas/SupplierSchemaType';

export class SupplierMapper {
  static toPersistence(supplier: Supplier): SupplierSchemaType {
    const primitives = supplier.toPrimitives();
    
    return {
      _id: primitives.id,
      rubro: primitives.rubro,
      proveedor: primitives.proveedor,
      contacto: primitives.contacto,
      ultimaEvaluacion: primitives.ultimaEvaluacion,
      siguienteEvaluacion: primitives.siguienteEvaluacion,
      estado: primitives.estado,
      evaluacion: primitives.evaluacion,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: SupplierSchemaType): Supplier {
    const props: SupplierProps = {
      id: schema._id,
      rubro: schema.rubro,
      proveedor: schema.proveedor,
      contacto: schema.contacto,
      ultimaEvaluacion: schema.ultimaEvaluacion,
      siguienteEvaluacion: schema.siguienteEvaluacion,
      estado: schema.estado,
      evaluacion: schema.evaluacion,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Supplier.fromPrimitives(props);
  }
}

