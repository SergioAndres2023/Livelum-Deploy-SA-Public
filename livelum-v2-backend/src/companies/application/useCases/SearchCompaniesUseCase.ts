import { Company } from '../../domain/entities/Company';
import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';
import { SearchCompaniesRequest } from '../dtos/SearchCompaniesRequest';
import { CompanyResponse } from '../dtos/CompanyResponse';
import { CompanySearchCriteriaBuilder } from '../../domain/filters/CompanySearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchCompaniesUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchCompaniesRequest): Promise<CompanyResponse[]> {
    this.logger.info('Buscando empresas', { request });

    // Construir criterios de búsqueda
    const builder = CompanySearchCriteriaBuilder.create();

    if (request.razonSocial) {
      builder.withRazonSocial(request.razonSocial);
    }

    if (request.nombreFantasia) {
      builder.withNombreFantasia(request.nombreFantasia);
    }

    if (request.cuit) {
      builder.withCuit(request.cuit);
    }

    if (request.ciudad) {
      builder.withCiudad(request.ciudad);
    }

    if (request.provincia) {
      builder.withProvincia(request.provincia);
    }

    if (request.status) {
      builder.withStatus(request.status);
    }

    if (request.page && request.limit) {
      builder.withPagination(request.page, request.limit);
    } else if (request.limit) {
      builder.withLimit(request.limit);
    }

    if (request.sortBy && request.sortOrder) {
      builder.withSorting(request.sortBy, request.sortOrder);
    }

    const criteria = builder.build();

    // Buscar empresas
    const companies = await this.companyRepository.findByCriteria(criteria);

    this.logger.info('Empresas encontradas', { count: companies.length });

    return companies.map(company => this.mapToResponse(company));
  }

  private mapToResponse(company: Company): CompanyResponse {
    const primitives = company.toPrimitives();
    return {
      id: primitives.id,
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
      isActive: company.isActive(),
      isInactive: company.isInactive(),
      isSuspended: company.isSuspended(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}

