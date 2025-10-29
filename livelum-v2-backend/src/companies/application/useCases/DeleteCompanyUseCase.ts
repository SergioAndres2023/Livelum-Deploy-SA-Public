import type { CompanyRepository } from '../../domain/contracts/CompanyRepository';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class DeleteCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.info('Eliminando empresa', { id });

    // Verificar que la empresa exista
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new Error(`Empresa no encontrada con ID: ${id}`);
    }

    try {
      await this.companyRepository.delete(id);

      this.logger.info('Empresa eliminada exitosamente', { 
        companyId: id,
        cuit: company.cuit 
      });
    } catch (error) {
      this.logger.error('Error al eliminar empresa', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

