import { Company } from '../../domain/entities/Company';
import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';
import { CreateCompanyRequest } from '../dtos/CreateCompanyRequest';
import { CompanyResponse } from '../dtos/CompanyResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateCompanyRequest): Promise<CompanyResponse> {
    this.logger.info('Creando nueva empresa', { cuit: request.cuit });

    // Verificar si ya existe una empresa con el mismo CUIT
    const existingCompany = await this.companyRepository.findByCuit(request.cuit);
    if (existingCompany) {
      throw new Error(`Ya existe una empresa con el CUIT: ${request.cuit}`);
    }

    try {
      // Crear la entidad company
      const company = Company.create(request);

      // Guardar en el repositorio
      await this.companyRepository.save(company);

      this.logger.info('Empresa creada exitosamente', { 
        companyId: company.id, 
        cuit: company.cuit 
      });

      return this.mapToResponse(company);
    } catch (error) {
      this.logger.error('Error al crear empresa', { 
        error: (error as Error).message,
        request 
      });
      throw error;
    }
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

