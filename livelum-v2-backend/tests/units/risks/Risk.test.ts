import { Risk } from '../../../src/risks/domain/entities/Risk';
import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../../src/risks/domain/enums/RiskEnums';

describe('Risk Entity', () => {
  const validRiskData = {
    title: 'Falla en Sistema de Información',
    code: 'R-001',
    category: RiskCategory.TECNOLOGICO,
    probability: RiskProbability.ALTA,
    impact: RiskImpact.ALTO,
    owner: 'Carlos López',
    dueDate: new Date('2024-02-15'),
    description: 'Posible falla del sistema principal que afecte las operaciones',
    mitigation: 'Implementar sistema de respaldo',
  };

  describe('create', () => {
    it('should create a risk with valid data', () => {
      const risk = Risk.create(validRiskData);

      expect(risk).toBeDefined();
      expect(risk.title).toBe(validRiskData.title);
      expect(risk.code).toBe(validRiskData.code);
      expect(risk.category).toBe(validRiskData.category);
      expect(risk.probability).toBe(validRiskData.probability);
      expect(risk.impact).toBe(validRiskData.impact);
      expect(risk.owner).toBe(validRiskData.owner);
      expect(risk.dueDate).toEqual(validRiskData.dueDate);
      expect(risk.description).toBe(validRiskData.description);
      expect(risk.mitigation).toBe(validRiskData.mitigation);
      expect(risk.status).toBe(RiskStatus.ACTIVE);
      expect(risk.createdAt).toBeDefined();
      expect(risk.updatedAt).toBeDefined();
    });

    it('should calculate risk level correctly for CRITICO', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.ALTA,
        impact: RiskImpact.ALTO,
      });

      expect(risk.riskLevel).toBe(RiskLevel.CRITICO);
    });

    it('should calculate risk level correctly for ALTO', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.ALTA,
        impact: RiskImpact.MEDIO,
      });

      expect(risk.riskLevel).toBe(RiskLevel.ALTO);
    });

    it('should calculate risk level correctly for MEDIO', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.MEDIA,
        impact: RiskImpact.MEDIO,
      });

      expect(risk.riskLevel).toBe(RiskLevel.MEDIO);
    });

    it('should calculate risk level correctly for BAJO', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.BAJA,
        impact: RiskImpact.BAJO,
      });

      expect(risk.riskLevel).toBe(RiskLevel.BAJO);
    });
  });

  describe('restore', () => {
    it('should restore a risk from existing data', () => {
      const existingData = {
        ...validRiskData,
        riskLevel: RiskLevel.CRITICO,
        status: RiskStatus.MONITORED,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-02'),
      };

      const risk = Risk.restore(existingData, 'test-id');

      expect(risk.id).toBe('test-id');
      expect(risk.riskLevel).toBe(RiskLevel.CRITICO);
      expect(risk.status).toBe(RiskStatus.MONITORED);
      expect(risk.createdAt).toEqual(existingData.createdAt);
      expect(risk.updatedAt).toEqual(existingData.updatedAt);
    });
  });

  describe('updateInfo', () => {
    it('should update risk information', () => {
      const risk = Risk.create(validRiskData);
      const updateData = {
        title: 'Nuevo título',
        category: RiskCategory.RECURSOS_HUMANOS,
        owner: 'María García',
      };

      risk.updateInfo(updateData);

      expect(risk.title).toBe(updateData.title);
      expect(risk.category).toBe(updateData.category);
      expect(risk.owner).toBe(updateData.owner);
      expect(risk.updatedAt).toBeDefined();
    });

    it('should recalculate risk level when probability changes', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.BAJA,
        impact: RiskImpact.BAJO,
      });

      expect(risk.riskLevel).toBe(RiskLevel.BAJO);

      risk.updateInfo({ probability: RiskProbability.ALTA });

      expect(risk.riskLevel).toBe(RiskLevel.ALTO);
    });

    it('should recalculate risk level when impact changes', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.MEDIA,
        impact: RiskImpact.BAJO,
      });

      expect(risk.riskLevel).toBe(RiskLevel.BAJO);

      risk.updateInfo({ impact: RiskImpact.ALTO });

      expect(risk.riskLevel).toBe(RiskLevel.ALTO);
    });
  });

  describe('changeStatus', () => {
    it('should change risk status', () => {
      const risk = Risk.create(validRiskData);
      expect(risk.status).toBe(RiskStatus.ACTIVE);

      risk.changeStatus(RiskStatus.MITIGATED);

      expect(risk.status).toBe(RiskStatus.MITIGATED);
      expect(risk.updatedAt).toBeDefined();
    });
  });

  describe('isOverdue', () => {
    it('should return true for overdue risks', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const risk = Risk.create({
        ...validRiskData,
        dueDate: pastDate,
      });

      expect(risk.isOverdue()).toBe(true);
    });

    it('should return false for closed overdue risks', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const risk = Risk.create({
        ...validRiskData,
        dueDate: pastDate,
      });
      risk.changeStatus(RiskStatus.CLOSED);

      expect(risk.isOverdue()).toBe(false);
    });

    it('should return false for non-overdue risks', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const risk = Risk.create({
        ...validRiskData,
        dueDate: futureDate,
      });

      expect(risk.isOverdue()).toBe(false);
    });
  });

  describe('isCritical', () => {
    it('should return true for critical risks', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.ALTA,
        impact: RiskImpact.ALTO,
      });

      expect(risk.isCritical()).toBe(true);
    });

    it('should return false for non-critical risks', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.BAJA,
        impact: RiskImpact.BAJO,
      });

      expect(risk.isCritical()).toBe(false);
    });
  });

  describe('isHighRisk', () => {
    it('should return true for high risk level', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.ALTA,
        impact: RiskImpact.MEDIO,
      });

      expect(risk.isHighRisk()).toBe(true);
    });

    it('should return true for critical risk level', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.ALTA,
        impact: RiskImpact.ALTO,
      });

      expect(risk.isHighRisk()).toBe(true);
    });

    it('should return false for low risk level', () => {
      const risk = Risk.create({
        ...validRiskData,
        probability: RiskProbability.BAJA,
        impact: RiskImpact.BAJO,
      });

      expect(risk.isHighRisk()).toBe(false);
    });
  });

  describe('toPrimitives', () => {
    it('should return primitive representation', () => {
      const risk = Risk.create(validRiskData);
      const primitives = risk.toPrimitives();

      expect(primitives).toHaveProperty('id');
      expect(primitives).toHaveProperty('title', validRiskData.title);
      expect(primitives).toHaveProperty('code', validRiskData.code);
      expect(primitives).toHaveProperty('category', validRiskData.category);
      expect(primitives).toHaveProperty('probability', validRiskData.probability);
      expect(primitives).toHaveProperty('impact', validRiskData.impact);
      expect(primitives).toHaveProperty('riskLevel');
      expect(primitives).toHaveProperty('status', RiskStatus.ACTIVE);
      expect(primitives).toHaveProperty('owner', validRiskData.owner);
      expect(primitives).toHaveProperty('dueDate', validRiskData.dueDate);
      expect(primitives).toHaveProperty('description', validRiskData.description);
      expect(primitives).toHaveProperty('mitigation', validRiskData.mitigation);
      expect(primitives).toHaveProperty('createdAt');
      expect(primitives).toHaveProperty('updatedAt');
    });
  });

  describe('Risk.calculateRiskLevel', () => {
    it('should calculate CRITICO for ALTA probability and ALTO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.ALTA, RiskImpact.ALTO);
      expect(level).toBe(RiskLevel.CRITICO);
    });

    it('should calculate ALTO for ALTA probability and MEDIO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.ALTA, RiskImpact.MEDIO);
      expect(level).toBe(RiskLevel.ALTO);
    });

    it('should calculate ALTO for MEDIA probability and ALTO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.MEDIA, RiskImpact.ALTO);
      expect(level).toBe(RiskLevel.ALTO);
    });

    it('should calculate MEDIO for MEDIA probability and MEDIO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.MEDIA, RiskImpact.MEDIO);
      expect(level).toBe(RiskLevel.MEDIO);
    });

    it('should calculate MEDIO for ALTA probability and BAJO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.ALTA, RiskImpact.BAJO);
      expect(level).toBe(RiskLevel.MEDIO);
    });

    it('should calculate MEDIO for BAJA probability and ALTO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.BAJA, RiskImpact.ALTO);
      expect(level).toBe(RiskLevel.MEDIO);
    });

    it('should calculate BAJO for BAJA probability and BAJO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.BAJA, RiskImpact.BAJO);
      expect(level).toBe(RiskLevel.BAJO);
    });

    it('should calculate BAJO for BAJA probability and MEDIO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.BAJA, RiskImpact.MEDIO);
      expect(level).toBe(RiskLevel.BAJO);
    });

    it('should calculate BAJO for MEDIA probability and BAJO impact', () => {
      const level = Risk.calculateRiskLevel(RiskProbability.MEDIA, RiskImpact.BAJO);
      expect(level).toBe(RiskLevel.BAJO);
    });
  });
});
