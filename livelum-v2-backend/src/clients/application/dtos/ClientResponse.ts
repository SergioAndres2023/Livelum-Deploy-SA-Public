import { ClientStatus, ClientType } from '../../domain/enums/ClientEnums';

export interface ClientResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: ClientType;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
}
