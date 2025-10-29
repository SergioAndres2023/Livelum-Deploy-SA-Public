import { Company } from '../../domain/entities/Company';
import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';
import { CompanyResponse } from '../dtos/CompanyResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class FindCompanyByCuitUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(cuit: string): Promise<CompanyResponse | null> {
    this.logger.info('Buscando empresa por CUIT', { cuit });

    const company = await this.companyRepository.findByCuit(cuit);

    if (!company) {
      this.logger.warn('Empresa no encontrada', { cuit });
      return null;
    }

    this.logger.info('Empresa encontrada', { cuit, companyId: company.id });
    return this.mapToResponse(company);
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

