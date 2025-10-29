import { Stakeholder } from '../../domain/entities/Stakeholder';
import type { StakeholderRepository } from '../../domain/contracts/StakeholderRepository';
import { CreateStakeholderRequest } from '../dtos/CreateStakeholderRequest';
import { StakeholderResponse } from '../dtos/StakeholderResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateStakeholderUseCase {
  constructor(
    private readonly stakeholderRepository: StakeholderRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateStakeholderRequest): Promise<StakeholderResponse> {
    this.logger.info('Creando nuevo stakeholder', { nombre: request.nombre });

    try {
      const nextNumber = await this.stakeholderRepository.getNextNumber(request.companyId);
      const stakeholder = Stakeholder.create(request, nextNumber);
      await this.stakeholderRepository.save(stakeholder);

      this.logger.info('Stakeholder creado exitosamente', { stakeholderId: stakeholder.id });
      return this.mapToResponse(stakeholder);
    } catch (error) {
      this.logger.error('Error al crear stakeholder', { error: (error as Error).message, request });
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
