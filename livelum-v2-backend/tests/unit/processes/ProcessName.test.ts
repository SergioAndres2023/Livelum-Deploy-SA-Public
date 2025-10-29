import { ProcessName } from '../../../src/processes/domain/entities/ProcessName';

describe('ProcessName', () => {
  describe('create', () => {
    it('should create a ProcessName with valid data', () => {
      const primitives = {
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'Sistemas'
      };

      const processName = ProcessName.create(primitives);

      expect(processName.order).toBe(1);
      expect(processName.processTypeId).toBe('507f1f77bcf86cd799439011');
      expect(processName.name).toBe('Sistemas');
      expect(processName.id).toBeDefined();
      expect(processName.createdAt).toBeInstanceOf(Date);
      expect(processName.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw error for invalid order', () => {
      const primitives = {
        order: 0,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'Sistemas'
      };

      expect(() => ProcessName.create(primitives)).toThrow('El orden debe ser mayor a 0');
    });

    it('should throw error for empty processTypeId', () => {
      const primitives = {
        order: 1,
        processTypeId: '',
        name: 'Sistemas'
      };

      expect(() => ProcessName.create(primitives)).toThrow('El ID del tipo de proceso es requerido');
    });

    it('should throw error for short name', () => {
      const primitives = {
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'A'
      };

      expect(() => ProcessName.create(primitives)).toThrow('El nombre debe tener al menos 2 caracteres');
    });

    it('should throw error for empty name', () => {
      const primitives = {
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: ''
      };

      expect(() => ProcessName.create(primitives)).toThrow('El nombre debe tener al menos 2 caracteres');
    });
  });

  describe('updateInfo', () => {
    let processName: ProcessName;

    beforeEach(() => {
      processName = ProcessName.create({
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'Sistemas'
      });
    });

    it('should update order', () => {
      const originalUpdatedAt = processName.updatedAt;
      
      processName.updateInfo({ order: 3 });
      
      expect(processName.order).toBe(3);
      expect(processName.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should update processTypeId', () => {
      const originalUpdatedAt = processName.updatedAt;
      const newProcessTypeId = '507f1f77bcf86cd799439012';
      
      processName.updateInfo({ processTypeId: newProcessTypeId });
      
      expect(processName.processTypeId).toBe(newProcessTypeId);
      expect(processName.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should update name', () => {
      const originalUpdatedAt = processName.updatedAt;
      
      processName.updateInfo({ name: 'Sistemas de Gestión' });
      
      expect(processName.name).toBe('Sistemas de Gestión');
      expect(processName.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for invalid order', () => {
      expect(() => processName.updateInfo({ order: 0 })).toThrow('El orden debe ser mayor a 0');
    });

    it('should throw error for empty processTypeId', () => {
      expect(() => processName.updateInfo({ processTypeId: '' })).toThrow('El ID del tipo de proceso es requerido');
    });
  });

  describe('updateOrder', () => {
    let processName: ProcessName;

    beforeEach(() => {
      processName = ProcessName.create({
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'Sistemas'
      });
    });

    it('should update order', () => {
      const originalUpdatedAt = processName.updatedAt;
      
      processName.updateOrder(5);
      
      expect(processName.order).toBe(5);
      expect(processName.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for invalid order', () => {
      expect(() => processName.updateOrder(0)).toThrow('El orden debe ser mayor a 0');
    });
  });

  describe('updateProcessType', () => {
    let processName: ProcessName;

    beforeEach(() => {
      processName = ProcessName.create({
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'Sistemas'
      });
    });

    it('should update processTypeId', () => {
      const originalUpdatedAt = processName.updatedAt;
      const newProcessTypeId = '507f1f77bcf86cd799439012';
      
      processName.updateProcessType(newProcessTypeId);
      
      expect(processName.processTypeId).toBe(newProcessTypeId);
      expect(processName.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for empty processTypeId', () => {
      expect(() => processName.updateProcessType('')).toThrow('El ID del tipo de proceso es requerido');
    });
  });

  describe('toPrimitives', () => {
    it('should return primitives correctly', () => {
      const primitives = {
        order: 1,
        processTypeId: '507f1f77bcf86cd799439011',
        name: 'Sistemas'
      };

      const processName = ProcessName.create(primitives);
      const result = processName.toPrimitives();

      expect(result.order).toBe(1);
      expect(result.processTypeId).toBe('507f1f77bcf86cd799439011');
      expect(result.name).toBe('Sistemas');
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });
});
