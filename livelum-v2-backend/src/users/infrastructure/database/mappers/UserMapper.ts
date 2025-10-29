import { User, UserProps } from '../../../domain/entities/User';
import { UserSchemaType } from '../schemas/UserSchemaType';

/**
 * Mapper para convertir entre la entidad User y el schema de MongoDB
 */
export class UserMapper {
  /**
   * Convierte de entidad de dominio a schema de persistencia
   */
  static toPersistence(user: User): UserSchemaType {
    const primitives = user.toPrimitives();
    
    return {
      _id: primitives.id,
      username: primitives.username,
      nombre: primitives.nombre,
      apellido: primitives.apellido,
      email: primitives.email,
      password: primitives.password,
      telefono: primitives.telefono,
      companyId: primitives.companyId,
      roles: primitives.roles,
      status: primitives.status,
      avatar: primitives.avatar,
      lastLogin: primitives.lastLogin,
      emailVerified: primitives.emailVerified,
      resetPasswordToken: primitives.resetPasswordToken,
      resetPasswordExpires: primitives.resetPasswordExpires,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  /**
   * Convierte de schema de persistencia a entidad de dominio
   */
  static toDomain(schema: UserSchemaType): User {
    const props: UserProps = {
      id: schema._id,
      username: schema.username,
      nombre: schema.nombre,
      apellido: schema.apellido,
      email: schema.email,
      password: schema.password,
      telefono: schema.telefono,
      companyId: schema.companyId,
      roles: schema.roles,
      status: schema.status,
      avatar: schema.avatar,
      lastLogin: schema.lastLogin,
      emailVerified: schema.emailVerified,
      resetPasswordToken: schema.resetPasswordToken,
      resetPasswordExpires: schema.resetPasswordExpires,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return User.fromPrimitives(props);
  }
}

