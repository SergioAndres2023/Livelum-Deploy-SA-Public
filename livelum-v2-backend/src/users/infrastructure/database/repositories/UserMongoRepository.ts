import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/contracts/UserRepository';
import { UserSearchCriteria } from '../../../domain/filters/UserSearchCriteria';
import { UserModel } from '../schemas/UserSchema';
import { UserMapper } from '../mappers/UserMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UserMongoRepository implements UserRepository {
  constructor(private readonly logger: Logger) {}

  async save(user: User): Promise<void> {
    try {
      const schema = UserMapper.toPersistence(user);
      await UserModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Usuario guardado', { userId: user.id });
    } catch (error) {
      this.logger.error('Error al guardar usuario', { 
        error: (error as Error).message,
        userId: user.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const schema = await UserModel.findById(id).lean();
      if (!schema) {
        return null;
      }
      return UserMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar usuario por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const schema = await UserModel.findOne({ username }).lean();
      if (!schema) {
        return null;
      }
      return UserMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar usuario por username', { 
        error: (error as Error).message,
        username 
      });
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const schema = await UserModel.findOne({ 
        email: email.toLowerCase() 
      }).lean();
      if (!schema) {
        return null;
      }
      return UserMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar usuario por email', { 
        error: (error as Error).message,
        email 
      });
      throw error;
    }
  }

  async findByResetToken(token: string): Promise<User | null> {
    try {
      const schema = await UserModel.findOne({ 
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }
      }).lean();
      if (!schema) {
        return null;
      }
      return UserMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar usuario por token de reset', { 
        error: (error as Error).message 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: UserSearchCriteria): Promise<User[]> {
    try {
      const filter: any = {};

      if (criteria.username) {
        filter.username = { $regex: criteria.username, $options: 'i' };
      }

      if (criteria.nombre) {
        filter.nombre = { $regex: criteria.nombre, $options: 'i' };
      }

      if (criteria.apellido) {
        filter.apellido = { $regex: criteria.apellido, $options: 'i' };
      }

      if (criteria.email) {
        filter.email = { $regex: criteria.email, $options: 'i' };
      }

      if (criteria.companyId) {
        filter.companyId = criteria.companyId;
      }

      if (criteria.role) {
        filter.roles = criteria.role;
      }

      if (criteria.status) {
        filter.status = criteria.status;
      }

      if (criteria.emailVerified !== undefined) {
        filter.emailVerified = criteria.emailVerified;
      }

      const query = UserModel.find(filter);

      // Ordenamiento
      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      }

      // Paginación
      if (criteria.offset !== undefined) {
        query.skip(criteria.offset);
      }

      if (criteria.limit !== undefined) {
        query.limit(criteria.limit);
      }

      const schemas = await query.lean();
      return schemas.map(schema => UserMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar usuarios por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: UserSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.username) {
        filter.username = { $regex: criteria.username, $options: 'i' };
      }

      if (criteria.nombre) {
        filter.nombre = { $regex: criteria.nombre, $options: 'i' };
      }

      if (criteria.apellido) {
        filter.apellido = { $regex: criteria.apellido, $options: 'i' };
      }

      if (criteria.email) {
        filter.email = { $regex: criteria.email, $options: 'i' };
      }

      if (criteria.companyId) {
        filter.companyId = criteria.companyId;
      }

      if (criteria.role) {
        filter.roles = criteria.role;
      }

      if (criteria.status) {
        filter.status = criteria.status;
      }

      if (criteria.emailVerified !== undefined) {
        filter.emailVerified = criteria.emailVerified;
      }

      return await UserModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar usuarios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
      this.logger.info('Usuario eliminado', { userId: id });
    } catch (error) {
      this.logger.error('Error al eliminar usuario', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async existsByUsername(username: string): Promise<boolean> {
    try {
      const count = await UserModel.countDocuments({ username });
      return count > 0;
    } catch (error) {
      this.logger.error('Error al verificar existencia por username', { 
        error: (error as Error).message,
        username 
      });
      throw error;
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const count = await UserModel.countDocuments({ 
        email: email.toLowerCase() 
      });
      return count > 0;
    } catch (error) {
      this.logger.error('Error al verificar existencia por email', { 
        error: (error as Error).message,
        email 
      });
      throw error;
    }
  }
}

