import { SupplierSearchCriteria } from './SupplierSearchCriteria';
import { SupplierStatus } from '../enums/SupplierEnums';

export class SupplierSearchCriteriaBuilder {
  private criteria: SupplierSearchCriteria = {};

  static create(): SupplierSearchCriteriaBuilder {
    return new SupplierSearchCriteriaBuilder();
  }

  withRubro(rubro: string): SupplierSearchCriteriaBuilder {
    this.criteria.rubro = rubro;
    return this;
  }

  withProveedor(proveedor: string): SupplierSearchCriteriaBuilder {
    this.criteria.proveedor = proveedor;
    return this;
  }

  withEstado(estado: SupplierStatus): SupplierSearchCriteriaBuilder {
    this.criteria.estado = estado;
    return this;
  }

  withCompanyId(companyId: string): SupplierSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  approvedOnly(): SupplierSearchCriteriaBuilder {
    this.criteria.estado = SupplierStatus.APPROVED;
    return this;
  }

  conditionalOnly(): SupplierSearchCriteriaBuilder {
    this.criteria.estado = SupplierStatus.CONDITIONAL;
    return this;
  }

  notApprovedOnly(): SupplierSearchCriteriaBuilder {
    this.criteria.estado = SupplierStatus.NOT_APPROVED;
    return this;
  }

  evaluationOverdueOnly(): SupplierSearchCriteriaBuilder {
    this.criteria.evaluationOverdue = true;
    return this;
  }

  withMinEvaluacion(min: number): SupplierSearchCriteriaBuilder {
    this.criteria.minEvaluacion = min;
    return this;
  }

  withMaxEvaluacion(max: number): SupplierSearchCriteriaBuilder {
    this.criteria.maxEvaluacion = max;
    return this;
  }

  withPagination(page: number, limit: number): SupplierSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'rubro' | 'proveedor' | 'evaluacion' | 'ultimaEvaluacion' | 'siguienteEvaluacion' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): SupplierSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): SupplierSearchCriteria {
    return { ...this.criteria };
  }
}
