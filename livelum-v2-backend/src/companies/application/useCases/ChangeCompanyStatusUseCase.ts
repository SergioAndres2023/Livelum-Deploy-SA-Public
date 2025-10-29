import { Company } from '../../domain/entities/Company';
import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';
import { CompanyStatus } from '../../domain/enums/CompanyEnums';
import { CompanyResponse } from '../dtos/CompanyResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ChangeCompanyStatusUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, newStatus: CompanyStatus): Promise<CompanyResponse> {
    this.logger.info('Cambiando estado de empresa', { id, newStatus });

    // Buscar la empresa
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new Error(`Empresa no encontrada con ID: ${id}`);
    }

    try {
      // Cambiar el estado
      company.changeStatus(newStatus);

      // Guardar cambios
      await this.companyRepository.save(company);

      this.logger.info('Estado de empresa cambiado exitosamente', { 
        companyId: company.id,
        cuit: company.cuit,
        newStatus 
      });

      return this.mapToResponse(company);
    } catch (error) {
      this.logger.error('Error al cambiar estado de empresa', { 
        error: (error as Error).message,
        id,
        newStatus 
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

