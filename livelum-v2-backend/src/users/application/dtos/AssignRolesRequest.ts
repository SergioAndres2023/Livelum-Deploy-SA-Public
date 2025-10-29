import { UserRole } from '../../domain/enums/UserEnums';

/**
 * DTO para asignación de roles
 */
export interface AssignRolesRequest {
  roles: UserRole[];
}

