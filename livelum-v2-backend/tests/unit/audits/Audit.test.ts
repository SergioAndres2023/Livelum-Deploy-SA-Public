import { Audit } from '../../../src/audits/domain/entities/Audit';
import { AuditStatus, AuditType } from '../../../src/audits/domain/enums/AuditEnums';

describe('Audit Entity', () => {
  const basePrimitives = {
    title: 'Auditoría Interna SGC Q1-2024',
    auditType: AuditType.INTERNAL,
    plannedDate: new Date('2024-03-15T00:00:00Z'),
    auditorName: 'María González',
    scope: 'Proceso de gestión documental y control de versiones',
  };

  describe('Creation', () => {
    it('should create an audit instance successfully', () => {
      const audit = Audit.create(basePrimitives);

      expect(audit).toBeInstanceOf(Audit);
      expect(audit.id).toBeDefined();
      expect(audit.title).toBe('Auditoría Interna SGC Q1-2024');
      expect(audit.auditType).toBe(AuditType.INTERNAL);
      expect(audit.status).toBe(AuditStatus.PLANNED);
      expect(audit.auditorName).toBe('María González');
      expect(audit.scope).toBe('Proceso de gestión documental y control de versiones');
      expect(audit.plannedDate).toEqual(new Date('2024-03-15T00:00:00Z'));
      expect(audit.createdAt).toBeInstanceOf(Date);
      expect(audit.updatedAt).toBeInstanceOf(Date);
      expect(audit.isOverdue()).toBe(false);
      expect(audit.isUpcoming()).toBe(false);
    });

    it('should throw error for invalid title', () => {
      expect(() => Audit.create({ ...basePrimitives, title: 'AB' }))
        .toThrow('El título debe tener al menos 3 caracteres');
    });

    it('should throw error for invalid auditor name', () => {
      expect(() => Audit.create({ ...basePrimitives, auditorName: 'A' }))
        .toThrow('El nombre del auditor debe tener al menos 2 caracteres');
    });

    it('should throw error for invalid scope', () => {
      expect(() => Audit.create({ ...basePrimitives, scope: 'Short' }))
        .toThrow('El alcance debe tener al menos 10 caracteres');
    });

    it('should throw error for past planned date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      expect(() => Audit.create({ ...basePrimitives, plannedDate: pastDate }))
        .toThrow('La fecha planificada debe ser en el futuro');
    });
  });

  describe('Update Info', () => {
    it('should update audit information', () => {
      const audit = Audit.create(basePrimitives);
      const oldUpdatedAt = audit.updatedAt;

      audit.updateInfo({
        title: 'Auditoría Interna SGC Q1-2024 - Actualizada',
        auditorName: 'María González López',
        scope: 'Proceso de gestión documental, control de versiones y trazabilidad',
      });

      expect(audit.title).toBe('Auditoría Interna SGC Q1-2024 - Actualizada');
      expect(audit.auditorName).toBe('María González López');
      expect(audit.scope).toBe('Proceso de gestión documental, control de versiones y trazabilidad');
      expect(audit.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it('should update audit type', () => {
      const audit = Audit.create(basePrimitives);
      audit.updateInfo({ auditType: AuditType.EXTERNAL });
      expect(audit.auditType).toBe(AuditType.EXTERNAL);
    });

    it('should update planned date', () => {
      const audit = Audit.create(basePrimitives);
      const newDate = new Date('2024-04-15T00:00:00Z');
      audit.updateInfo({ plannedDate: newDate });
      expect(audit.plannedDate).toEqual(newDate);
    });
  });

  describe('Status Transitions', () => {
    it('should start an audit', () => {
      const audit = Audit.create(basePrimitives);
      expect(audit.status).toBe(AuditStatus.PLANNED);

      audit.start();
      expect(audit.status).toBe(AuditStatus.IN_PROGRESS);
    });

    it('should not start an audit that is not planned', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      
      expect(() => audit.start())
        .toThrow('Solo se pueden iniciar auditorías planificadas');
    });

    it('should complete an audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      
      const actualDate = new Date('2024-03-18T00:00:00Z');
      const findings = 'Se identificaron 3 no conformidades menores';
      const recommendations = 'Implementar sistema automatizado';

      audit.complete(actualDate, findings, recommendations);
      
      expect(audit.status).toBe(AuditStatus.COMPLETED);
      expect(audit.actualDate).toEqual(actualDate);
      expect(audit.findings).toBe(findings);
      expect(audit.recommendations).toBe(recommendations);
    });

    it('should not complete an audit that is not in progress', () => {
      const audit = Audit.create(basePrimitives);
      
      expect(() => audit.complete(new Date(), 'findings', 'recommendations'))
        .toThrow('Solo se pueden completar auditorías en progreso');
    });

    it('should not complete with actual date before planned date', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      
      const pastDate = new Date('2024-03-10T00:00:00Z');
      
      expect(() => audit.complete(pastDate, 'findings', 'recommendations'))
        .toThrow('La fecha real no puede ser anterior a la fecha planificada');
    });

    it('should cancel an audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.cancel();
      expect(audit.status).toBe(AuditStatus.CANCELLED);
    });

    it('should not cancel a completed audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      audit.complete(new Date('2024-03-18T00:00:00Z'));
      
      expect(() => audit.cancel())
        .toThrow('No se puede cancelar una auditoría completada');
    });
  });

  describe('Rescheduling', () => {
    it('should reschedule an audit', () => {
      const audit = Audit.create(basePrimitives);
      const newDate = new Date('2024-04-15T00:00:00Z');
      
      audit.reschedule(newDate);
      expect(audit.plannedDate).toEqual(newDate);
    });

    it('should not reschedule a completed audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      audit.complete(new Date('2024-03-18T00:00:00Z'));
      
      expect(() => audit.reschedule(new Date('2024-04-15T00:00:00Z')))
        .toThrow('No se puede reprogramar una auditoría completada o cancelada');
    });

    it('should not reschedule a cancelled audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.cancel();
      
      expect(() => audit.reschedule(new Date('2024-04-15T00:00:00Z')))
        .toThrow('No se puede reprogramar una auditoría completada o cancelada');
    });

    it('should not reschedule to a past date', () => {
      const audit = Audit.create(basePrimitives);
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      expect(() => audit.reschedule(pastDate))
        .toThrow('La nueva fecha planificada debe ser en el futuro');
    });
  });

  describe('Findings and Recommendations', () => {
    it('should add findings to an in-progress audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      
      const findings = 'Nuevos hallazgos identificados';
      audit.addFindings(findings);
      
      expect(audit.findings).toBe(findings);
    });

    it('should add recommendations to a completed audit', () => {
      const audit = Audit.create(basePrimitives);
      audit.start();
      audit.complete(new Date('2024-03-18T00:00:00Z'));
      
      const recommendations = 'Nuevas recomendaciones';
      audit.addRecommendations(recommendations);
      
      expect(audit.recommendations).toBe(recommendations);
    });

    it('should not add findings to a planned audit', () => {
      const audit = Audit.create(basePrimitives);
      
      expect(() => audit.addFindings('findings'))
        .toThrow('Solo se pueden agregar hallazgos a auditorías en progreso o completadas');
    });

    it('should not add recommendations to a planned audit', () => {
      const audit = Audit.create(basePrimitives);
      
      expect(() => audit.addRecommendations('recommendations'))
        .toThrow('Solo se pueden agregar recomendaciones a auditorías en progreso o completadas');
    });
  });

  describe('Date Calculations', () => {
    it('should identify overdue audit', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: pastDate });
      expect(audit.isOverdue()).toBe(true);
    });

    it('should not identify completed audit as overdue', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: pastDate });
      audit.start();
      audit.complete(new Date());
      
      expect(audit.isOverdue()).toBe(false);
    });

    it('should identify upcoming audit', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: futureDate });
      expect(audit.isUpcoming()).toBe(true);
    });

    it('should not identify in-progress audit as upcoming', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: futureDate });
      audit.start();
      
      expect(audit.isUpcoming()).toBe(false);
    });

    it('should calculate days until planned date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 10);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: futureDate });
      const days = audit.getDaysUntilPlanned();
      
      expect(days).toBeGreaterThan(9);
      expect(days).toBeLessThanOrEqual(10);
    });

    it('should calculate days overdue', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: pastDate });
      const days = audit.getDaysOverdue();
      
      expect(days).toBeGreaterThan(6);
      expect(days).toBeLessThanOrEqual(7);
    });

    it('should return 0 days overdue for non-overdue audit', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      
      const audit = Audit.create({ ...basePrimitives, plannedDate: futureDate });
      expect(audit.getDaysOverdue()).toBe(0);
    });
  });

  describe('Serialization', () => {
    it('should convert to primitives', () => {
      const audit = Audit.create(basePrimitives);
      const primitives = audit.toPrimitives();
      
      expect(primitives).toHaveProperty('id');
      expect(primitives).toHaveProperty('title');
      expect(primitives).toHaveProperty('auditType');
      expect(primitives).toHaveProperty('status');
      expect(primitives).toHaveProperty('plannedDate');
      expect(primitives).toHaveProperty('auditorName');
      expect(primitives).toHaveProperty('scope');
      expect(primitives).toHaveProperty('createdAt');
      expect(primitives).toHaveProperty('updatedAt');
    });

    it('should create from primitives', () => {
      const audit = Audit.create(basePrimitives);
      const primitives = audit.toPrimitives();
      
      const newAudit = Audit.fromPrimitives(primitives);
      
      expect(newAudit.id).toBe(audit.id);
      expect(newAudit.title).toBe(audit.title);
      expect(newAudit.auditType).toBe(audit.auditType);
      expect(newAudit.status).toBe(audit.status);
    });
  });
});
