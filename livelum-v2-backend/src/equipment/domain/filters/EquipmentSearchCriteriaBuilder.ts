import { EquipmentSearchCriteria } from './EquipmentSearchCriteria';
import { EquipmentStatus, EquipmentType } from '../enums/EquipmentEnums';

export class EquipmentSearchCriteriaBuilder {
  private criteria: EquipmentSearchCriteria = {};

  static create(): EquipmentSearchCriteriaBuilder {
    return new EquipmentSearchCriteriaBuilder();
  }

  withName(name: string): EquipmentSearchCriteriaBuilder {
    this.criteria.name = name;
    return this;
  }

  withType(type: EquipmentType): EquipmentSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: EquipmentStatus): EquipmentSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withBrand(brand: string): EquipmentSearchCriteriaBuilder {
    this.criteria.brand = brand;
    return this;
  }

  withPhysicalLocation(location: string): EquipmentSearchCriteriaBuilder {
    this.criteria.physicalLocation = location;
    return this;
  }

  withResponsible(responsible: string): EquipmentSearchCriteriaBuilder {
    this.criteria.responsible = responsible;
    return this;
  }

  withCompanyId(companyId: string): EquipmentSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  activeOnly(): EquipmentSearchCriteriaBuilder {
    this.criteria.status = EquipmentStatus.ACTIVE;
    return this;
  }

  needsMaintenanceOnly(): EquipmentSearchCriteriaBuilder {
    this.criteria.needsMaintenance = true;
    return this;
  }

  withPagination(page: number, limit: number): EquipmentSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'name' | 'type' | 'status' | 'brand' | 'physicalLocation' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): EquipmentSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): EquipmentSearchCriteria {
    return { ...this.criteria };
  }
}
