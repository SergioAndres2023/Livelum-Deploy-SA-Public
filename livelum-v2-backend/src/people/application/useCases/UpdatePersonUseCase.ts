import { Person } from '../../domain/entities/Person';
import type { PersonRepository } from '../../domain/contracts/PersonRepository';
import { UpdatePersonRequest } from '../dtos/UpdatePersonRequest';
import { PersonResponse } from '../dtos/PersonResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdatePersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdatePersonRequest): Promise<PersonResponse> {
    this.logger.info('Actualizando persona', { id, request });

    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Persona no encontrada con ID: ${id}`);
    }

    if (request.username && request.username !== person.username) {
      const existing = await this.personRepository.findByUsername(request.username);
      if (existing && existing.id !== id) {
        throw new Error(`Ya existe otra persona con el username: ${request.username}`);
      }
    }

    if (request.documento && request.documento !== person.documento) {
      const existing = await this.personRepository.findByDocument(request.documento);
      if (existing && existing.id !== id) {
        throw new Error(`Ya existe otra persona con el documento: ${request.documento}`);
      }
    }

    try {
      person.update(request);
      await this.personRepository.save(person);

      this.logger.info('Persona actualizada exitosamente', { 
        personId: person.id,
        username: person.username 
      });

      return this.mapToResponse(person);
    } catch (error) {
      this.logger.error('Error al actualizar persona', { 
        error: (error as Error).message,
        id,
        request 
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
