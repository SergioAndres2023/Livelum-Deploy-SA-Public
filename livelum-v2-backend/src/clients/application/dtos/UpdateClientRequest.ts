import { ClientType } from '../../domain/enums/ClientEnums';

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
  nif?: string;
  address?: string;
  type?: ClientType;
}
