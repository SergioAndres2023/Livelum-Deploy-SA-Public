import { Person } from '../../domain/entities/Person';
import type { PersonRepository } from '../../domain/contracts/PersonRepository';
import { SearchPeopleRequest } from '../dtos/SearchPeopleRequest';
import { PersonResponse } from '../dtos/PersonResponse';
import { PersonSearchCriteriaBuilder } from '../../domain/filters/PersonSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchPeopleUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchPeopleRequest): Promise<PersonResponse[]> {
    this.logger.info('Buscando personas', { request });

    const builder = PersonSearchCriteriaBuilder.create();

    if (request.username) builder.withUsername(request.username);
    if (request.nombre) builder.withNombre(request.nombre);
    if (request.apellido) builder.withApellido(request.apellido);
    if (request.email) builder.withEmail(request.email);
    if (request.documento) builder.withDocumento(request.documento);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.status) builder.withStatus(request.status);
    if (request.contractType) builder.withContractType(request.contractType);
    if (request.department) builder.withDepartment(request.department);
    if (request.position) builder.withPosition(request.position);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    else if (request.limit) builder.withLimit(request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const people = await this.personRepository.findByCriteria(criteria);

    this.logger.info('Personas encontradas', { count: people.length });

    return people.map(person => this.mapToResponse(person));
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
