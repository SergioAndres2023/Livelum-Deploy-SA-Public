import { ProcessType } from '../../../src/processes/domain/entities/ProcessType';

describe('ProcessType', () => {
  describe('create', () => {
    it('should create a ProcessType with valid data', () => {
      const primitives = {
        order: 1,
        name: 'Procesos Estratégicos',
        links: [
          { name: 'Manual de Calidad', path: '/documents/manual-calidad.pdf' }
        ]
      };

      const processType = ProcessType.create(primitives);

      expect(processType.order).toBe(1);
      expect(processType.name).toBe('PROCESOS ESTRATÉGICOS');
      expect(processType.links).toHaveLength(1);
      expect(processType.links[0]?.name).toBe('Manual de Calidad');
      expect(processType.links[0]?.path).toBe('/documents/manual-calidad.pdf');
      expect(processType.id).toBeDefined();
      expect(processType.createdAt).toBeInstanceOf(Date);
      expect(processType.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a ProcessType without links', () => {
      const primitives = {
        order: 2,
        name: 'Procesos de Fabricación'
      };

      const processType = ProcessType.create(primitives);

      expect(processType.order).toBe(2);
      expect(processType.name).toBe('PROCESOS DE FABRICACIÓN');
      expect(processType.links).toHaveLength(0);
    });

    it('should throw error for invalid order', () => {
      const primitives = {
        order: 0,
        name: 'Procesos Estratégicos'
      };

      expect(() => ProcessType.create(primitives)).toThrow('El orden debe ser mayor a 0');
    });

    it('should throw error for short name', () => {
      const primitives = {
        order: 1,
        name: 'AB'
      };

      expect(() => ProcessType.create(primitives)).toThrow('El nombre debe tener al menos 3 caracteres');
    });

    it('should throw error for empty name', () => {
      const primitives = {
        order: 1,
        name: ''
      };

      expect(() => ProcessType.create(primitives)).toThrow('El nombre debe tener al menos 3 caracteres');
    });

    it('should throw error for invalid link name', () => {
      const primitives = {
        order: 1,
        name: 'Procesos Estratégicos',
        links: [
          { name: '', path: '/documents/manual.pdf' }
        ]
      };

      expect(() => ProcessType.create(primitives)).toThrow('El nombre del link en la posición 1 no puede estar vacío');
    });

    it('should throw error for invalid link path', () => {
      const primitives = {
        order: 1,
        name: 'Procesos Estratégicos',
        links: [
          { name: 'Manual', path: '' }
        ]
      };

      expect(() => ProcessType.create(primitives)).toThrow('El path del link en la posición 1 no puede estar vacío');
    });
  });

  describe('updateInfo', () => {
    let processType: ProcessType;

    beforeEach(() => {
      processType = ProcessType.create({
        order: 1,
        name: 'Procesos Estratégicos',
        links: [{ name: 'Manual', path: '/documents/manual.pdf' }]
      });
    });

    it('should update order', () => {
      const originalUpdatedAt = processType.updatedAt;
      
      processType.updateInfo({ order: 3 });
      
      expect(processType.order).toBe(3);
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should update name', () => {
      const originalUpdatedAt = processType.updatedAt;
      
      processType.updateInfo({ name: 'Nuevos Procesos' });
      
      expect(processType.name).toBe('NUEVOS PROCESOS');
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should update links', () => {
      const originalUpdatedAt = processType.updatedAt;
      const newLinks = [
        { name: 'Manual Actualizado', path: '/documents/manual-actualizado.pdf' }
      ];
      
      processType.updateInfo({ links: newLinks });
      
      expect(processType.links).toEqual(newLinks);
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for invalid order', () => {
      expect(() => processType.updateInfo({ order: 0 })).toThrow('El orden debe ser mayor a 0');
    });
  });

  describe('updateOrder', () => {
    let processType: ProcessType;

    beforeEach(() => {
      processType = ProcessType.create({
        order: 1,
        name: 'Procesos Estratégicos'
      });
    });

    it('should update order', () => {
      const originalUpdatedAt = processType.updatedAt;
      
      processType.updateOrder(5);
      
      expect(processType.order).toBe(5);
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for invalid order', () => {
      expect(() => processType.updateOrder(0)).toThrow('El orden debe ser mayor a 0');
    });
  });

  describe('addLink', () => {
    let processType: ProcessType;

    beforeEach(() => {
      processType = ProcessType.create({
        order: 1,
        name: 'Procesos Estratégicos'
      });
    });

    it('should add a new link', () => {
      const originalUpdatedAt = processType.updatedAt;
      
      processType.addLink({ name: 'Manual de Calidad', path: '/documents/manual.pdf' });
      
      expect(processType.links).toHaveLength(1);
      expect(processType.links[0]?.name).toBe('Manual de Calidad');
      expect(processType.links[0]?.path).toBe('/documents/manual.pdf');
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for duplicate link name', () => {
      processType.addLink({ name: 'Manual', path: '/documents/manual.pdf' });
      
      expect(() => processType.addLink({ name: 'Manual', path: '/documents/otro.pdf' }))
        .toThrow('Ya existe un link con el nombre "Manual"');
    });

    it('should throw error for empty link name', () => {
      expect(() => processType.addLink({ name: '', path: '/documents/manual.pdf' }))
        .toThrow('El nombre del link no puede estar vacío');
    });

    it('should throw error for empty link path', () => {
      expect(() => processType.addLink({ name: 'Manual', path: '' }))
        .toThrow('El path del link no puede estar vacío');
    });
  });

  describe('removeLink', () => {
    let processType: ProcessType;

    beforeEach(() => {
      processType = ProcessType.create({
        order: 1,
        name: 'Procesos Estratégicos',
        links: [
          { name: 'Manual de Calidad', path: '/documents/manual.pdf' },
          { name: 'Procedimientos', path: '/documents/procedimientos.pdf' }
        ]
      });
    });

    it('should remove an existing link', () => {
      const originalUpdatedAt = processType.updatedAt;
      
      processType.removeLink('Manual de Calidad');
      
      expect(processType.links).toHaveLength(1);
      expect(processType.links[0]?.name).toBe('Procedimientos');
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for non-existent link', () => {
      expect(() => processType.removeLink('No Existe'))
        .toThrow('No se encontró un link con el nombre "No Existe"');
    });
  });

  describe('updateLink', () => {
    let processType: ProcessType;

    beforeEach(() => {
      processType = ProcessType.create({
        order: 1,
        name: 'Procesos Estratégicos',
        links: [
          { name: 'Manual de Calidad', path: '/documents/manual.pdf' }
        ]
      });
    });

    it('should update an existing link', () => {
      const originalUpdatedAt = processType.updatedAt;
      
      processType.updateLink('Manual de Calidad', { 
        name: 'Manual Actualizado', 
        path: '/documents/manual-actualizado.pdf' 
      });
      
      expect(processType.links[0]?.name).toBe('Manual Actualizado');
      expect(processType.links[0]?.path).toBe('/documents/manual-actualizado.pdf');
      expect(processType.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should throw error for non-existent link', () => {
      expect(() => processType.updateLink('No Existe', { 
        name: 'Nuevo', 
        path: '/documents/nuevo.pdf' 
      })).toThrow('No se encontró un link con el nombre "No Existe"');
    });

    it('should throw error for duplicate name', () => {
      processType.addLink({ name: 'Otro Manual', path: '/documents/otro.pdf' });
      
      expect(() => processType.updateLink('Manual de Calidad', { 
        name: 'Otro Manual', 
        path: '/documents/nuevo.pdf' 
      })).toThrow('Ya existe un link con el nombre "Otro Manual"');
    });
  });

  describe('toPrimitives', () => {
    it('should return primitives correctly', () => {
      const primitives = {
        order: 1,
        name: 'Procesos Estratégicos',
        links: [{ name: 'Manual', path: '/documents/manual.pdf' }]
      };

      const processType = ProcessType.create(primitives);
      const result = processType.toPrimitives();

      expect(result.order).toBe(1);
      expect(result.name).toBe('PROCESOS ESTRATÉGICOS');
      expect(result.links).toHaveLength(1);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });
});
