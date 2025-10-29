import { Supplier } from '../../domain/entities/Supplier';
import type { SupplierRepository } from '../../domain/contracts/SupplierRepository';
import { CreateSupplierRequest } from '../dtos/CreateSupplierRequest';
import { SupplierResponse } from '../dtos/SupplierResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateSupplierUseCase {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateSupplierRequest): Promise<SupplierResponse> {
    this.logger.info('Creando nuevo proveedor', { proveedor: request.proveedor });

    try {
      const supplier = Supplier.create(request);
      await this.supplierRepository.save(supplier);

      this.logger.info('Proveedor creado exitosamente', { supplierId: supplier.id });
      return this.mapToResponse(supplier);
    } catch (error) {
      this.logger.error('Error al crear proveedor', { error: (error as Error).message, request });
      throw error;
    }
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
