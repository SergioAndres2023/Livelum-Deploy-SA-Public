import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { AssignRolesUseCase } from '@/users/application/useCases/AssignRolesUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { AssignRolesRequest } from '@/users/application/dtos/AssignRolesRequest';

export class AssignRolesController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: AssignRolesRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<AssignRolesUseCase>(
        UserDependencyIdentifier.AssignRolesUseCase
      );

      const user = await useCase.execute(request.params.id, request.body);

      reply.code(200).send({
        success: true,
        data: user,
        message: 'Roles asignados exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

