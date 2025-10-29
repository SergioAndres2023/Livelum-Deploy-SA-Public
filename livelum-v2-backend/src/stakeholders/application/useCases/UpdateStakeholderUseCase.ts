import { Stakeholder } from '../../domain/entities/Stakeholder';
import type { StakeholderRepository } from '../../domain/contracts/StakeholderRepository';
import { UpdateStakeholderRequest } from '../dtos/UpdateStakeholderRequest';
import { StakeholderResponse } from '../dtos/StakeholderResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateStakeholderUseCase {
  constructor(
    private readonly stakeholderRepository: StakeholderRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateStakeholderRequest): Promise<StakeholderResponse> {
    this.logger.info('Actualizando stakeholder', { id, request });

    const stakeholder = await this.stakeholderRepository.findById(id);
    if (!stakeholder) {
      throw new Error(`Stakeholder no encontrado con ID: ${id}`);
    }

    try {
      stakeholder.update(request);
      await this.stakeholderRepository.save(stakeholder);

      this.logger.info('Stakeholder actualizado exitosamente', { stakeholderId: stakeholder.id });
      return this.mapToResponse(stakeholder);
    } catch (error) {
      this.logger.error('Error al actualizar stakeholder', { error: (error as Error).message, id, request });
      throw error;
    }
  }

  private mapToResponse(stakeholder: Stakeholder): StakeholderResponse {
    const primitives = stakeholder.toPrimitives();
    return {
      id: primitives.id,
      numero: primitives.numero,
      nombre: primitives.nombre,
      tipo: primitives.tipo,
      requisitos: primitives.requisitos,
      metodoEvaluacion: primitives.metodoEvaluacion,
      companyId: primitives.companyId,
      isInternal: stakeholder.isInternal(),
      isExternal: stakeholder.isExternal(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
