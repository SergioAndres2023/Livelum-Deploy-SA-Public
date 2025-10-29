import { Person } from '../../domain/entities/Person';
import type { PersonRepository } from '../../domain/contracts/PersonRepository';
import { PersonStatus } from '../../domain/enums/PersonEnums';
import { PersonResponse } from '../dtos/PersonResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ChangePersonStatusUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, newStatus: PersonStatus): Promise<PersonResponse> {
    this.logger.info('Cambiando estado de persona', { id, newStatus });

    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Persona no encontrada con ID: ${id}`);
    }

    try {
      person.changeStatus(newStatus);
      await this.personRepository.save(person);

      this.logger.info('Estado de persona cambiado exitosamente', { 
        personId: person.id,
        username: person.username,
        newStatus 
      });

      return this.mapToResponse(person);
    } catch (error) {
      this.logger.error('Error al cambiar estado de persona', { 
        error: (error as Error).message,
        id,
        newStatus 
      });
      throw error;
    }
  }

  private mapToResponse(person: Person): PersonResponse {
    const primitives = person.toPrimitives();
    return {
      id: primitives.id,
      username: primitives.username,
      nombre: primitives.nombre,
      apellido: primitives.apellido,
      fullName: person.getFullName(),
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
      isActive: person.isActive(),
      isInactive: person.isInactive(),
      isOnLeave: person.isOnLeave(),
      isSuspended: person.isSuspended(),
      isTerminated: person.isTerminated(),
      yearsOfService: person.getYearsOfService(),
      age: person.getAge(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
