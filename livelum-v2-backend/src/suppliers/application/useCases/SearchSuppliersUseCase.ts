import { Supplier } from '../../domain/entities/Supplier';
import type { SupplierRepository } from '../../domain/contracts/SupplierRepository';
import { SearchSuppliersRequest } from '../dtos/SearchSuppliersRequest';
import { SupplierResponse } from '../dtos/SupplierResponse';
import { SupplierSearchCriteriaBuilder } from '../../domain/filters/SupplierSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchSuppliersUseCase {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchSuppliersRequest): Promise<SupplierResponse[]> {
    this.logger.info('Buscando proveedores', { request });

    const builder = SupplierSearchCriteriaBuilder.create();
    if (request.rubro) builder.withRubro(request.rubro);
    if (request.proveedor) builder.withProveedor(request.proveedor);
    if (request.estado) builder.withEstado(request.estado);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.evaluationOverdue) builder.evaluationOverdueOnly();
    if (request.minEvaluacion !== undefined) builder.withMinEvaluacion(request.minEvaluacion);
    if (request.maxEvaluacion !== undefined) builder.withMaxEvaluacion(request.maxEvaluacion);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const suppliers = await this.supplierRepository.findByCriteria(criteria);

    this.logger.info('Proveedores encontrados', { count: suppliers.length });
    return suppliers.map(s => this.mapToResponse(s));
  }

  private mapToResponse(supplier: Supplier): SupplierResponse {
    const primitives = supplier.toPrimitives();
    return {
      id: primitives.id,
      rubro: primitives.rubro,
      proveedor: primitives.proveedor,
      contacto: primitives.contacto,
      ultimaEvaluacion: primitives.ultimaEvaluacion,
      siguienteEvaluacion: primitives.siguienteEvaluacion,
      estado: primitives.estado,
      evaluacion: primitives.evaluacion,
      companyId: primitives.companyId,
      isApproved: supplier.isApproved(),
      isConditional: supplier.isConditional(),
      isNotApproved: supplier.isNotApproved(),
      isEvaluationOverdue: supplier.isEvaluationOverdue(),
      daysUntilNextEvaluation: supplier.getDaysUntilNextEvaluation(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
