import { Indicator, IndicatorProps } from '../../../src/indicators/domain/entities/Indicator';
import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../../src/indicators/domain/enums/IndicatorEnums';

describe('Indicator Entity', () => {
  const validIndicatorData: Omit<IndicatorProps, 'trend' | 'status' | 'createdAt' | 'updatedAt'> = {
    name: 'Tasa de Satisfacción del Cliente',
    code: 'IND-001',
    category: IndicatorCategory.SATISFACCION_CLIENTE,
    type: IndicatorType.PORCENTAJE,
    currentValue: 85.5,
    targetValue: 90.0,
    unit: '%',
    owner: 'Juan Pérez',
    lastUpdate: new Date('2024-01-15'),
    frequency: IndicatorFrequency.MENSUAL,
    description: 'Mide el nivel de satisfacción de los clientes con nuestros servicios',
  };

  it('should create a new indicator with calculated trend and status', () => {
    const indicator = Indicator.create(validIndicatorData);

    expect(indicator).toBeInstanceOf(Indicator);
    expect(indicator.id).toBeDefined();
    expect(indicator.name).toBe(validIndicatorData.name);
    expect(indicator.code).toBe(validIndicatorData.code);
    expect(indicator.category).toBe(validIndicatorData.category);
    expect(indicator.type).toBe(validIndicatorData.type);
    expect(indicator.currentValue).toBe(validIndicatorData.currentValue);
    expect(indicator.targetValue).toBe(validIndicatorData.targetValue);
    expect(indicator.unit).toBe(validIndicatorData.unit);
    expect(indicator.owner).toBe(validIndicatorData.owner);
    expect(indicator.lastUpdate).toEqual(validIndicatorData.lastUpdate);
    expect(indicator.frequency).toBe(validIndicatorData.frequency);
    expect(indicator.description).toBe(validIndicatorData.description);
    expect(indicator.createdAt).toBeInstanceOf(Date);
    expect(indicator.updatedAt).toBeInstanceOf(Date);
    
    // Verificar cálculos automáticos
    expect(indicator.trend).toBe(IndicatorTrend.DOWN); // 85.5 < 90.0
    expect(indicator.status).toBe(IndicatorStatus.WARNING); // Por debajo del objetivo
  });

  it('should restore an indicator from primitives', () => {
    const now = new Date();
    const restoredProps: IndicatorProps = {
      ...validIndicatorData,
      trend: IndicatorTrend.UP,
      status: IndicatorStatus.GOOD,
      createdAt: now,
      updatedAt: now,
    };
    const indicatorId = '65c7a1d0f7b1c2d3e4f5a6b7';
    const indicator = Indicator.restore(restoredProps, indicatorId);

    expect(indicator.id).toBe(indicatorId);
    expect(indicator.name).toBe(restoredProps.name);
    expect(indicator.trend).toBe(IndicatorTrend.UP);
    expect(indicator.status).toBe(IndicatorStatus.GOOD);
  });

  describe('calculateTrend', () => {
    it('should return UP when current value is above target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 95.0, 
        targetValue: 90.0 
      });
      expect(indicator.trend).toBe(IndicatorTrend.UP);
    });

    it('should return DOWN when current value is below target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 85.0, 
        targetValue: 90.0 
      });
      expect(indicator.trend).toBe(IndicatorTrend.DOWN);
    });

    it('should return STABLE when current value equals target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 90.0, 
        targetValue: 90.0 
      });
      expect(indicator.trend).toBe(IndicatorTrend.STABLE);
    });
  });

  describe('calculateStatus', () => {
    it('should return GOOD for percentage type when above 90% of target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        type: IndicatorType.PORCENTAJE,
        currentValue: 91.0, 
        targetValue: 100.0 
      });
      expect(indicator.status).toBe(IndicatorStatus.GOOD);
    });

    it('should return WARNING for percentage type when between 70-90% of target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        type: IndicatorType.PORCENTAJE,
        currentValue: 80.0, 
        targetValue: 100.0 
      });
      expect(indicator.status).toBe(IndicatorStatus.WARNING);
    });

    it('should return CRITICAL for percentage type when below 70% of target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        type: IndicatorType.PORCENTAJE,
        currentValue: 60.0, 
        targetValue: 100.0 
      });
      expect(indicator.status).toBe(IndicatorStatus.CRITICAL);
    });

    it('should return GOOD for time type when within target (100% or less)', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        type: IndicatorType.TIEMPO,
        currentValue: 90.0, 
        targetValue: 100.0 
      });
      expect(indicator.status).toBe(IndicatorStatus.GOOD);
    });

    it('should return WARNING for time type when 100-120% of target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        type: IndicatorType.TIEMPO,
        currentValue: 110.0, 
        targetValue: 100.0 
      });
      expect(indicator.status).toBe(IndicatorStatus.WARNING);
    });

    it('should return CRITICAL for time type when above 120% of target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        type: IndicatorType.TIEMPO,
        currentValue: 130.0, 
        targetValue: 100.0 
      });
      expect(indicator.status).toBe(IndicatorStatus.CRITICAL);
    });
  });

  describe('updateValue', () => {
    it('should update current value and recalculate trend and status', () => {
      const indicator = Indicator.create(validIndicatorData);
      const oldUpdatedAt = indicator.updatedAt;

      indicator.updateValue(95.0);

      expect(indicator.currentValue).toBe(95.0);
      expect(indicator.trend).toBe(IndicatorTrend.UP); // 95.0 > 90.0
      expect(indicator.status).toBe(IndicatorStatus.GOOD); // 95/90 = 105.6% > 90%
      expect(indicator.lastUpdate).toBeInstanceOf(Date);
      expect(indicator.updatedAt).not.toEqual(oldUpdatedAt);
    });
  });

  describe('updateTarget', () => {
    it('should update target value and recalculate trend and status', () => {
      const indicator = Indicator.create(validIndicatorData);
      const oldUpdatedAt = indicator.updatedAt;

      indicator.updateTarget(80.0);

      expect(indicator.targetValue).toBe(80.0);
      expect(indicator.trend).toBe(IndicatorTrend.UP); // 85.5 > 80.0
      expect(indicator.status).toBe(IndicatorStatus.GOOD); // 85.5/80 = 106.9% > 90%
      expect(indicator.updatedAt).not.toEqual(oldUpdatedAt);
    });
  });

  describe('updateInfo', () => {
    it('should update indicator information', () => {
      const indicator = Indicator.create(validIndicatorData);
      const oldUpdatedAt = indicator.updatedAt;

      indicator.updateInfo({
        name: 'Nuevo Nombre',
        category: IndicatorCategory.CALIDAD,
        owner: 'María García',
      });

      expect(indicator.name).toBe('Nuevo Nombre');
      expect(indicator.category).toBe(IndicatorCategory.CALIDAD);
      expect(indicator.owner).toBe('María García');
      expect(indicator.updatedAt).not.toEqual(oldUpdatedAt);
    });
  });

  describe('target comparison methods', () => {
    it('should correctly identify when above target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 95.0, 
        targetValue: 90.0 
      });
      
      expect(indicator.isAboveTarget()).toBe(true);
      expect(indicator.isBelowTarget()).toBe(false);
      expect(indicator.isOnTarget()).toBe(false);
    });

    it('should correctly identify when below target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 85.0, 
        targetValue: 90.0 
      });
      
      expect(indicator.isAboveTarget()).toBe(false);
      expect(indicator.isBelowTarget()).toBe(true);
      expect(indicator.isOnTarget()).toBe(false);
    });

    it('should correctly identify when on target', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 90.0, 
        targetValue: 90.0 
      });
      
      expect(indicator.isAboveTarget()).toBe(false);
      expect(indicator.isBelowTarget()).toBe(false);
      expect(indicator.isOnTarget()).toBe(true);
    });
  });

  describe('getProgressPercentage', () => {
    it('should calculate progress percentage correctly', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 75.0, 
        targetValue: 100.0 
      });
      
      expect(indicator.getProgressPercentage()).toBe(75);
    });

    it('should cap progress at 100%', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 150.0, 
        targetValue: 100.0 
      });
      
      expect(indicator.getProgressPercentage()).toBe(100);
    });

    it('should handle zero target value', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 50.0, 
        targetValue: 0.0 
      });
      
      expect(indicator.getProgressPercentage()).toBe(0);
    });
  });

  describe('status check methods', () => {
    it('should correctly identify critical status', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 60.0, 
        targetValue: 100.0 
      });
      
      expect(indicator.isCritical()).toBe(true);
      expect(indicator.isWarning()).toBe(false);
      expect(indicator.isGood()).toBe(false);
    });

    it('should correctly identify warning status', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 80.0, 
        targetValue: 100.0 
      });
      
      expect(indicator.isCritical()).toBe(false);
      expect(indicator.isWarning()).toBe(true);
      expect(indicator.isGood()).toBe(false);
    });

    it('should correctly identify good status', () => {
      const indicator = Indicator.create({ 
        ...validIndicatorData, 
        currentValue: 95.0, 
        targetValue: 100.0 
      });
      
      expect(indicator.isCritical()).toBe(false);
      expect(indicator.isWarning()).toBe(false);
      expect(indicator.isGood()).toBe(true);
    });
  });

  describe('toPrimitives', () => {
    it('should return a primitive object with all properties', () => {
      const indicator = Indicator.create(validIndicatorData);
      const primitives = indicator.toPrimitives();

      expect(primitives).toEqual({
        id: indicator.id,
        name: indicator.name,
        code: indicator.code,
        category: indicator.category,
        type: indicator.type,
        currentValue: indicator.currentValue,
        targetValue: indicator.targetValue,
        unit: indicator.unit,
        trend: indicator.trend,
        status: indicator.status,
        owner: indicator.owner,
        lastUpdate: indicator.lastUpdate,
        frequency: indicator.frequency,
        description: indicator.description,
        createdAt: indicator.createdAt,
        updatedAt: indicator.updatedAt,
      });
    });
  });
});
