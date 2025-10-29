import { Person, PersonProps } from '../../../domain/entities/Person';
import { PersonSchemaType } from '../schemas/PersonSchemaType';

export class PersonMapper {
  static toPersistence(person: Person): PersonSchemaType {
    const primitives = person.toPrimitives();
    
    return {
      _id: primitives.id,
      username: primitives.username,
      nombre: primitives.nombre,
      apellido: primitives.apellido,
      email: primitives.email,
      documento: primitives.documento,
      telefono: primitives.telefono,
      companyId: primitives.companyId,
      status: primitives.status,
      positions: primitives.positions,
      contractType: primitives.contractType,
      hireDate: primitives.hireDate,
      terminationDate: primitives.terminationDate,
      avatar: primitives.avatar,
      department: primitives.department,
      supervisor: primitives.supervisor,
      salary: primitives.salary,
      emergencyContact: primitives.emergencyContact,
      address: primitives.address,
      birthDate: primitives.birthDate,
      notes: primitives.notes,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: PersonSchemaType): Person {
    const props: PersonProps = {
      id: schema._id,
      username: schema.username,
      nombre: schema.nombre,
      apellido: schema.apellido,
      email: schema.email,
      documento: schema.documento,
      telefono: schema.telefono,
      companyId: schema.companyId,
      status: schema.status,
      positions: schema.positions,
      contractType: schema.contractType,
      hireDate: schema.hireDate,
      terminationDate: schema.terminationDate,
      avatar: schema.avatar,
      department: schema.department,
      supervisor: schema.supervisor,
      salary: schema.salary,
      emergencyContact: schema.emergencyContact,
      address: schema.address,
      birthDate: schema.birthDate,
      notes: schema.notes,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Person.fromPrimitives(props);
  }
}

