import { Equipment } from '../../domain/entities/Equipment';
import type { EquipmentRepository } from '../../domain/contracts/EquipmentRepository';
import { SearchEquipmentRequest } from '../dtos/SearchEquipmentRequest';
import { EquipmentResponse } from '../dtos/EquipmentResponse';
import { EquipmentSearchCriteriaBuilder } from '../../domain/filters/EquipmentSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchEquipmentUseCase {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchEquipmentRequest): Promise<EquipmentResponse[]> {
    this.logger.info('Buscando equipos', { request });

    const builder = EquipmentSearchCriteriaBuilder.create();
    if (request.name) builder.withName(request.name);
    if (request.type) builder.withType(request.type);
    if (request.status) builder.withStatus(request.status);
    if (request.brand) builder.withBrand(request.brand);
    if (request.physicalLocation) builder.withPhysicalLocation(request.physicalLocation);
    if (request.responsible) builder.withResponsible(request.responsible);
    if (request.needsMaintenance) builder.needsMaintenanceOnly();
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const equipment = await this.equipmentRepository.findByCriteria(criteria);

    this.logger.info('Equipos encontrados', { count: equipment.length });
    return equipment.map(e => this.mapToResponse(e));
  }

  private mapToResponse(equipment: Equipment): EquipmentResponse {
    const primitives = equipment.toPrimitives();
    return {
      ...primitives,
      isActive: equipment.isActive(),
      isInMaintenance: equipment.isInMaintenance(),
      needsMaintenance: equipment.needsMaintenance(),
    };
  }
}
