import { Person } from '../../domain/entities/Person';
import type { PersonRepository } from '../../domain/contracts/PersonRepository';
import { CreatePersonRequest } from '../dtos/CreatePersonRequest';
import { PersonResponse } from '../dtos/PersonResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreatePersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreatePersonRequest): Promise<PersonResponse> {
    this.logger.info('Creando nueva persona', { username: request.username, documento: request.documento });

    // Verificar si ya existe una persona con el mismo username
    const existingUsername = await this.personRepository.findByUsername(request.username);
    if (existingUsername) {
      throw new Error(`Ya existe una persona con el username: ${request.username}`);
    }

    // Verificar si ya existe una persona con el mismo documento
    const existingDocument = await this.personRepository.findByDocument(request.documento);
    if (existingDocument) {
      throw new Error(`Ya existe una persona con el documento: ${request.documento}`);
    }

    try {
      // Crear la entidad person
      const person = Person.create(request);

      // Guardar en el repositorio
      await this.personRepository.save(person);

      this.logger.info('Persona creada exitosamente', { 
        personId: person.id, 
        username: person.username 
      });

      return this.mapToResponse(person);
    } catch (error) {
      this.logger.error('Error al crear persona', { 
        error: (error as Error).message,
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

