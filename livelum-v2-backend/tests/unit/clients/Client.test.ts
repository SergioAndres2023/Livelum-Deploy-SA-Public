import { Client } from '@/clients/domain/entities/Client';
import { ClientType, ClientStatus } from '@/clients/domain/enums/ClientEnums';

describe('Client Entity', () => {
  describe('create', () => {
    it('should create a client with valid data', () => {
      const clientData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+34612345678',
        nif: '12345678Z',
        address: 'Calle Mayor 123',
        type: ClientType.INDIVIDUAL,
      };

      const client = Client.create(clientData);

      expect(client.name).toBe('Juan Pérez');
      expect(client.email).toBe('juan@example.com');
      expect(client.phone).toBe('+34612345678');
      expect(client.nif).toBe('12345678Z');
      expect(client.address).toBe('Calle Mayor 123');
      expect(client.type).toBe(ClientType.INDIVIDUAL);
      expect(client.status).toBe(ClientStatus.ACTIVE);
      expect(client.id).toBeDefined();
      expect(client.createdAt).toBeDefined();
      expect(client.updatedAt).toBeDefined();
    });

    it('should throw error for invalid email', () => {
      const clientData = {
        name: 'Juan Pérez',
        email: 'invalid-email',
        type: ClientType.INDIVIDUAL,
      };

      expect(() => Client.create(clientData)).toThrow('El email debe ser válido');
    });

    it('should throw error for short name', () => {
      const clientData = {
        name: 'J',
        email: 'juan@example.com',
        type: ClientType.INDIVIDUAL,
      };

      expect(() => Client.create(clientData)).toThrow('El nombre debe tener al menos 2 caracteres');
    });

    it('should throw error for invalid NIF', () => {
      const clientData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        nif: 'invalid-nif',
        type: ClientType.INDIVIDUAL,
      };

      expect(() => Client.create(clientData)).toThrow('El NIF debe ser válido');
    });
  });

  describe('updateInfo', () => {
    it('should update client information', () => {
      const client = Client.create({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        type: ClientType.INDIVIDUAL,
      });

      const originalUpdatedAt = client.updatedAt;

      client.updateInfo({
        name: 'Juan Carlos Pérez',
        phone: '+34612345678',
      });

      expect(client.name).toBe('Juan Carlos Pérez');
      expect(client.phone).toBe('+34612345678');
      expect(client.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('activate/deactivate', () => {
    it('should activate and deactivate client', () => {
      const client = Client.create({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        type: ClientType.INDIVIDUAL,
      });

      expect(client.isActive()).toBe(true);
      expect(client.status).toBe(ClientStatus.ACTIVE);

      client.deactivate();
      expect(client.isActive()).toBe(false);
      expect(client.status).toBe(ClientStatus.INACTIVE);

      client.activate();
      expect(client.isActive()).toBe(true);
      expect(client.status).toBe(ClientStatus.ACTIVE);
    });
  });

  describe('toPrimitives', () => {
    it('should return client primitives', () => {
      const clientData = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        type: ClientType.INDIVIDUAL,
      };

      const client = Client.create(clientData);
      const primitives = client.toPrimitives();

      expect(primitives).toEqual({
        id: expect.any(String),
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: undefined,
        nif: undefined,
        address: undefined,
        type: ClientType.INDIVIDUAL,
        status: ClientStatus.ACTIVE,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
