import { Company, CompanyProps } from '../../../domain/entities/Company';
import { CompanySchemaType } from '../schemas/CompanySchemaType';

/**
 * Mapper para convertir entre Company (dominio) y CompanySchemaType (persistencia)
 */
export class CompanyMapper {
  /**
   * Convierte de entidad de dominio a schema de persistencia
   */
  static toPersistence(company: Company): CompanySchemaType {
    const primitives = company.toPrimitives();

    return {
      _id: primitives.id,
      razonSocial: primitives.razonSocial,
      nombreFantasia: primitives.nombreFantasia,
      cuit: primitives.cuit,
      direccion: primitives.direccion,
      ciudad: primitives.ciudad,
      provincia: primitives.provincia,
      codigoPostal: primitives.codigoPostal,
      telefono: primitives.telefono,
      email: primitives.email,
      website: primitives.website,
      logo: primitives.logo,
      status: primitives.status,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  /**
   * Convierte de schema de persistencia a entidad de dominio
   */
  static toDomain(raw: CompanySchemaType): Company {
    const props: CompanyProps = {
      id: raw._id,
      razonSocial: raw.razonSocial,
      nombreFantasia: raw.nombreFantasia,
      cuit: raw.cuit,
      direccion: raw.direccion,
      ciudad: raw.ciudad,
      provincia: raw.provincia,
      codigoPostal: raw.codigoPostal,
      telefono: raw.telefono,
      email: raw.email,
      website: raw.website,
      logo: raw.logo,
      status: raw.status,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };

    return Company.fromPrimitives(props);
  }

  /**
   * Convierte un array de schemas a un array de entidades de dominio
   */
  static toDomainArray(rawArray: CompanySchemaType[]): Company[] {
    return rawArray.map(raw => this.toDomain(raw));
  }
}

