import { ClientType } from '../../domain/enums/ClientEnums';

export interface CreateClientRequest {
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: ClientType;
}
