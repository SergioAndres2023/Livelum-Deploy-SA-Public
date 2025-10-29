import { Client } from '../../../domain/entities/Client';
import { ClientSchemaType } from '../schemas/ClientSchemaType';
import { Types } from 'mongoose';

export class ClientMapper {
  static toDomain(schema: ClientSchemaType): Client {
    const props = {
      id: schema._id.toString(),
      name: schema.name,
      email: schema.email,
      phone: schema.phone,
      nif: schema.nif,
      address: schema.address,
      type: schema.type,
      status: schema.status,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Client.fromPrimitives(props);
  }

  static toPersistence(client: Client): any {
    const primitives = client.toPrimitives();
    
    return {
      _id: primitives.id ? new Types.ObjectId(primitives.id) : new Types.ObjectId(),
      name: primitives.name,
      email: primitives.email,
      phone: primitives.phone,
      nif: primitives.nif,
      address: primitives.address,
      type: primitives.type,
      status: primitives.status,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
