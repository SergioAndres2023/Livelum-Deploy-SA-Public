import { Skill } from '../../domain/entities/Skill';
import type { SkillRepository } from '../../domain/contracts/SkillRepository';
import { CreateSkillRequest } from '../dtos/CreateSkillRequest';
import { SkillResponse } from '../dtos/SkillResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateSkillUseCase {
  constructor(
    private readonly skillRepository: SkillRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateSkillRequest): Promise<SkillResponse> {
    this.logger.info('Creando nueva competencia/habilidad', { title: request.title });

    try {
      const skill = Skill.create(request);
      await this.skillRepository.save(skill);

      this.logger.info('Competencia creada exitosamente', { skillId: skill.id });
      return this.mapToResponse(skill);
    } catch (error) {
      this.logger.error('Error al crear competencia', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(skill: Skill): SkillResponse {
    const primitives = skill.toPrimitives();
    return {
      ...primitives,
      isActive: skill.isActive(),
    };
  }
}
