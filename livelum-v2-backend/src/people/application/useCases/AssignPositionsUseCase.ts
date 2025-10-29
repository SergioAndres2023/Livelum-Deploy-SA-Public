import { Person } from '../../domain/entities/Person';
import type { PersonRepository } from '../../domain/contracts/PersonRepository';
import { AssignPositionsRequest } from '../dtos/AssignPositionsRequest';
import { PersonResponse } from '../dtos/PersonResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class AssignPositionsUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: AssignPositionsRequest): Promise<PersonResponse> {
    this.logger.info('Asignando puestos a persona', { id, positions: request.positions });

    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Persona no encontrada con ID: ${id}`);
    }

    try {
      person.assignPositions(request.positions);
      await this.personRepository.save(person);

      this.logger.info('Puestos asignados exitosamente', { 
        personId: person.id,
        username: person.username,
        positions: request.positions 
      });

      return this.mapToResponse(person);
    } catch (error) {
      this.logger.error('Error al asignar puestos', { 
        error: (error as Error).message,
        id,
        positions: request.positions 
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
