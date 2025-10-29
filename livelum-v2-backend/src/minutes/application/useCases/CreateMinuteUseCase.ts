import { Minute } from '../../domain/entities/Minute';
import type { MinuteRepository } from '../../domain/contracts/MinuteRepository';
import { CreateMinuteRequest } from '../dtos/CreateMinuteRequest';
import { MinuteResponse } from '../dtos/MinuteResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateMinuteUseCase {
  constructor(
    private readonly minuteRepository: MinuteRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateMinuteRequest): Promise<MinuteResponse> {
    this.logger.info('Creando nueva minuta', { title: request.title });

    try {
      const minute = Minute.create(request);
      await this.minuteRepository.save(minute);

      this.logger.info('Minuta creada exitosamente', { minuteId: minute.id });
      return this.mapToResponse(minute);
    } catch (error) {
      this.logger.error('Error al crear minuta', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(minute: Minute): MinuteResponse {
    const primitives = minute.toPrimitives();
    return {
      ...primitives,
      isDraft: minute.isDraft(),
      isPublished: minute.isPublished(),
      isApproved: minute.isApproved(),
      isArchived: minute.isArchived(),
    };
  }
}
