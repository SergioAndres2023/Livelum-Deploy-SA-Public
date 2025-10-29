import { Supplier } from '../../domain/entities/Supplier';
import type { SupplierRepository } from '../../domain/contracts/SupplierRepository';
import { UpdateSupplierEvaluationRequest } from '../dtos/UpdateSupplierEvaluationRequest';
import { SupplierResponse } from '../dtos/SupplierResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateSupplierEvaluationUseCase {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateSupplierEvaluationRequest): Promise<SupplierResponse> {
    this.logger.info('Actualizando evaluación de proveedor', { id, request });

    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new Error(`Proveedor no encontrado con ID: ${id}`);
    }

    try {
      supplier.updateEvaluation(
        request.evaluacion,
        request.ultimaEvaluacion,
        request.siguienteEvaluacion
      );
      await this.supplierRepository.save(supplier);

      this.logger.info('Evaluación de proveedor actualizada exitosamente', { supplierId: supplier.id });
      return this.mapToResponse(supplier);
    } catch (error) {
      this.logger.error('Error al actualizar evaluación', { error: (error as Error).message, id, request });
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
