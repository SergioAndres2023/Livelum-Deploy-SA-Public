import { Company } from '../../domain/entities/Company';
import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';
import { UpdateCompanyRequest } from '../dtos/UpdateCompanyRequest';
import { CompanyResponse } from '../dtos/CompanyResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateCompanyRequest): Promise<CompanyResponse> {
    this.logger.info('Actualizando empresa', { id, request });

    // Buscar la empresa
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new Error(`Empresa no encontrada con ID: ${id}`);
    }

    // Si se está actualizando el CUIT, verificar que no exista otra empresa con ese CUIT
    if (request.cuit && request.cuit !== company.cuit) {
      const existingCompany = await this.companyRepository.findByCuit(request.cuit);
      if (existingCompany && existingCompany.id !== id) {
        throw new Error(`Ya existe otra empresa con el CUIT: ${request.cuit}`);
      }
    }

    try {
      // Actualizar la entidad
      company.update(request);

      // Guardar cambios
      await this.companyRepository.save(company);

      this.logger.info('Empresa actualizada exitosamente', { 
        companyId: company.id,
        cuit: company.cuit 
      });

      return this.mapToResponse(company);
    } catch (error) {
      this.logger.error('Error al actualizar empresa', { 
        error: (error as Error).message,
        id,
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

