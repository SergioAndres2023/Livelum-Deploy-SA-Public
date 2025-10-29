import { Alert } from '../../../src/alerts/domain/entities/Alert';
import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../../src/alerts/domain/enums/AlertEnums';

describe('Alert Entity', () => {
  const validAlertProps = {
    title: 'Test Alert',
    message: 'This is a test alert message',
    type: AlertType.INFO,
    priority: AlertPriority.MEDIUM,
    category: AlertCategory.SYSTEM,
    channel: AlertChannel.EMAIL,
    recipient: 'user@example.com',
    sender: 'system@example.com',
    relatedEntityType: 'Risk',
    relatedEntityId: 'risk-123',
    scheduledFor: new Date('2024-01-01T10:00:00Z'),
    metadata: { source: 'test' },
  };

  describe('create', () => {
    it('should create a new alert with valid props', () => {
      const alert = Alert.create(validAlertProps);

      expect(alert.id).toBeDefined();
      expect(alert.title).toBe(validAlertProps.title);
      expect(alert.message).toBe(validAlertProps.message);
      expect(alert.type).toBe(validAlertProps.type);
      expect(alert.status).toBe(AlertStatus.PENDING);
      expect(alert.priority).toBe(validAlertProps.priority);
      expect(alert.category).toBe(validAlertProps.category);
      expect(alert.channel).toBe(validAlertProps.channel);
      expect(alert.recipient).toBe(validAlertProps.recipient);
      expect(alert.sender).toBe(validAlertProps.sender);
      expect(alert.relatedEntityType).toBe(validAlertProps.relatedEntityType);
      expect(alert.relatedEntityId).toBe(validAlertProps.relatedEntityId);
      expect(alert.scheduledFor).toEqual(validAlertProps.scheduledFor);
      expect(alert.metadata).toEqual(validAlertProps.metadata);
      expect(alert.createdAt).toBeInstanceOf(Date);
      expect(alert.updatedAt).toBeInstanceOf(Date);
    });

    it('should create alert with default status PENDING', () => {
      const alert = Alert.create(validAlertProps);
      expect(alert.status).toBe(AlertStatus.PENDING);
    });

    it('should create alert with current timestamp for createdAt and updatedAt', () => {
      const beforeCreation = new Date();
      const alert = Alert.create(validAlertProps);
      const afterCreation = new Date();

      expect(alert.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(alert.createdAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
      expect(alert.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(alert.updatedAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });
  });

  describe('restore', () => {
    it('should restore alert from existing data', () => {
      const existingProps = {
        ...validAlertProps,
        status: AlertStatus.SENT,
        sentAt: new Date('2024-01-01T10:30:00Z'),
        createdAt: new Date('2024-01-01T09:00:00Z'),
        updatedAt: new Date('2024-01-01T10:30:00Z'),
      };

      const alert = Alert.restore(existingProps, 'test-id');

      expect(alert.id).toBe('test-id');
      expect(alert.status).toBe(AlertStatus.SENT);
      expect(alert.sentAt).toEqual(existingProps.sentAt);
      expect(alert.createdAt).toEqual(existingProps.createdAt);
      expect(alert.updatedAt).toEqual(existingProps.updatedAt);
    });
  });

  describe('updateInfo', () => {
    it('should update alert information', () => {
      const alert = Alert.create(validAlertProps);
      const updateData = {
        title: 'Updated Alert',
        message: 'Updated message',
        priority: AlertPriority.HIGH,
        category: AlertCategory.SECURITY,
      };

      alert.updateInfo(updateData);

      expect(alert.title).toBe(updateData.title);
      expect(alert.message).toBe(updateData.message);
      expect(alert.priority).toBe(updateData.priority);
      expect(alert.category).toBe(updateData.category);
      expect(alert.updatedAt.getTime()).toBeGreaterThan(alert.createdAt.getTime());
    });

    it('should only update provided fields', () => {
      const alert = Alert.create(validAlertProps);
      const originalTitle = alert.title;
      const originalMessage = alert.message;

      alert.updateInfo({ priority: AlertPriority.HIGH });

      expect(alert.title).toBe(originalTitle);
      expect(alert.message).toBe(originalMessage);
      expect(alert.priority).toBe(AlertPriority.HIGH);
    });
  });

  describe('send', () => {
    it('should send a pending alert', () => {
      const alert = Alert.create(validAlertProps);
      const beforeSend = new Date();

      alert.send();

      expect(alert.status).toBe(AlertStatus.SENT);
      expect(alert.sentAt).toBeInstanceOf(Date);
      expect(alert.sentAt!.getTime()).toBeGreaterThanOrEqual(beforeSend.getTime());
      expect(alert.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeSend.getTime());
    });

    it('should throw error when trying to send non-pending alert', () => {
      const alert = Alert.create(validAlertProps);
      alert.send(); // First send

      expect(() => alert.send()).toThrow('Solo se pueden enviar alertas pendientes');
    });
  });

  describe('markAsRead', () => {
    it('should mark sent alert as read', () => {
      const alert = Alert.create(validAlertProps);
      alert.send();
      const beforeRead = new Date();

      alert.markAsRead();

      expect(alert.status).toBe(AlertStatus.READ);
      expect(alert.readAt).toBeInstanceOf(Date);
      expect(alert.readAt!.getTime()).toBeGreaterThanOrEqual(beforeRead.getTime());
      expect(alert.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeRead.getTime());
    });

    it('should throw error when trying to mark non-sent alert as read', () => {
      const alert = Alert.create(validAlertProps);

      expect(() => alert.markAsRead()).toThrow('Solo se pueden marcar como leídas alertas enviadas');
    });
  });

  describe('acknowledge', () => {
    it('should acknowledge a read alert', () => {
      const alert = Alert.create(validAlertProps);
      alert.send();
      alert.markAsRead();
      const beforeAck = new Date();

      alert.acknowledge();

      expect(alert.status).toBe(AlertStatus.ACKNOWLEDGED);
      expect(alert.acknowledgedAt).toBeInstanceOf(Date);
      expect(alert.acknowledgedAt!.getTime()).toBeGreaterThanOrEqual(beforeAck.getTime());
      expect(alert.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeAck.getTime());
    });

    it('should throw error when trying to acknowledge non-read alert', () => {
      const alert = Alert.create(validAlertProps);
      alert.send();

      expect(() => alert.acknowledge()).toThrow('Solo se pueden confirmar alertas leídas');
    });
  });

  describe('dismiss', () => {
    it('should dismiss alert regardless of status', () => {
      const alert = Alert.create(validAlertProps);
      const beforeDismiss = new Date();

      alert.dismiss();

      expect(alert.status).toBe(AlertStatus.DISMISSED);
      expect(alert.dismissedAt).toBeInstanceOf(Date);
      expect(alert.dismissedAt!.getTime()).toBeGreaterThanOrEqual(beforeDismiss.getTime());
      expect(alert.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeDismiss.getTime());
    });
  });

  describe('reschedule', () => {
    it('should reschedule pending alert', () => {
      const alert = Alert.create(validAlertProps);
      const newDate = new Date('2024-01-02T10:00:00Z');

      alert.reschedule(newDate);

      expect(alert.scheduledFor).toEqual(newDate);
      expect(alert.updatedAt.getTime()).toBeGreaterThan(alert.createdAt.getTime());
    });

    it('should throw error when trying to reschedule non-pending alert', () => {
      const alert = Alert.create(validAlertProps);
      alert.send();

      expect(() => alert.reschedule(new Date())).toThrow('Solo se pueden reprogramar alertas pendientes');
    });
  });

  describe('status check methods', () => {
    it('should correctly identify alert status', () => {
      const alert = Alert.create(validAlertProps);

      expect(alert.isPending()).toBe(true);
      expect(alert.isSent()).toBe(false);
      expect(alert.isRead()).toBe(false);
      expect(alert.isAcknowledged()).toBe(false);
      expect(alert.isDismissed()).toBe(false);
      expect(alert.isActive()).toBe(true);

      alert.send();
      expect(alert.isPending()).toBe(false);
      expect(alert.isSent()).toBe(true);
      expect(alert.isActive()).toBe(true);

      alert.markAsRead();
      expect(alert.isSent()).toBe(false);
      expect(alert.isRead()).toBe(true);

      alert.acknowledge();
      expect(alert.isRead()).toBe(false);
      expect(alert.isAcknowledged()).toBe(true);

      alert.dismiss();
      expect(alert.isAcknowledged()).toBe(false);
      expect(alert.isDismissed()).toBe(true);
      expect(alert.isActive()).toBe(false);
    });
  });

  describe('priority and critical checks', () => {
    it('should identify high priority alerts', () => {
      const highPriorityAlert = Alert.create({
        ...validAlertProps,
        priority: AlertPriority.HIGH,
      });

      const urgentAlert = Alert.create({
        ...validAlertProps,
        priority: AlertPriority.URGENT,
      });

      const lowPriorityAlert = Alert.create({
        ...validAlertProps,
        priority: AlertPriority.LOW,
      });

      expect(highPriorityAlert.isHighPriority()).toBe(true);
      expect(urgentAlert.isHighPriority()).toBe(true);
      expect(lowPriorityAlert.isHighPriority()).toBe(false);
    });

    it('should identify critical alerts', () => {
      const criticalTypeAlert = Alert.create({
        ...validAlertProps,
        type: AlertType.CRITICAL,
      });

      const urgentPriorityAlert = Alert.create({
        ...validAlertProps,
        priority: AlertPriority.URGENT,
      });

      const normalAlert = Alert.create({
        ...validAlertProps,
        type: AlertType.INFO,
        priority: AlertPriority.MEDIUM,
      });

      expect(criticalTypeAlert.isCritical()).toBe(true);
      expect(urgentPriorityAlert.isCritical()).toBe(true);
      expect(normalAlert.isCritical()).toBe(false);
    });
  });

  describe('overdue check', () => {
    it('should identify overdue alerts', () => {
      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 1);

      const overdueAlert = Alert.create({
        ...validAlertProps,
        scheduledFor: pastDate,
      });

      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);

      const futureAlert = Alert.create({
        ...validAlertProps,
        scheduledFor: futureDate,
      });

      const noScheduleAlert = Alert.create({
        ...validAlertProps,
        scheduledFor: undefined,
      });

      expect(overdueAlert.isOverdue()).toBe(true);
      expect(futureAlert.isOverdue()).toBe(false);
      expect(noScheduleAlert.isOverdue()).toBe(false);
    });
  });

  describe('age calculation', () => {
    it('should calculate age in minutes correctly', () => {
      const pastDate = new Date();
      pastDate.setMinutes(pastDate.getMinutes() - 30);

      const alert = Alert.restore({
        ...validAlertProps,
        status: AlertStatus.PENDING,
        createdAt: pastDate,
        updatedAt: pastDate,
      }, 'test-id');

      const age = alert.getAgeInMinutes();
      expect(age).toBeGreaterThanOrEqual(29);
      expect(age).toBeLessThanOrEqual(31);
    });
  });

  describe('time to send calculation', () => {
    it('should calculate time to send correctly', () => {
      const futureDate = new Date();
      futureDate.setMinutes(futureDate.getMinutes() + 30);

      const alert = Alert.create({
        ...validAlertProps,
        scheduledFor: futureDate,
      });

      const timeToSend = alert.getTimeToSend();
      expect(timeToSend).toBeGreaterThanOrEqual(29);
      expect(timeToSend).toBeLessThanOrEqual(31);
    });

    it('should return null when no scheduled time', () => {
      const alert = Alert.create({
        ...validAlertProps,
        scheduledFor: undefined,
      });

      expect(alert.getTimeToSend()).toBeNull();
    });
  });

  describe('toPrimitives', () => {
    it('should return all alert data as plain object', () => {
      const alert = Alert.create(validAlertProps);
      const primitives = alert.toPrimitives();

      expect(primitives).toHaveProperty('id');
      expect(primitives).toHaveProperty('title', validAlertProps.title);
      expect(primitives).toHaveProperty('message', validAlertProps.message);
      expect(primitives).toHaveProperty('type', validAlertProps.type);
      expect(primitives).toHaveProperty('status', AlertStatus.PENDING);
      expect(primitives).toHaveProperty('priority', validAlertProps.priority);
      expect(primitives).toHaveProperty('category', validAlertProps.category);
      expect(primitives).toHaveProperty('channel', validAlertProps.channel);
      expect(primitives).toHaveProperty('recipient', validAlertProps.recipient);
      expect(primitives).toHaveProperty('sender', validAlertProps.sender);
      expect(primitives).toHaveProperty('relatedEntityType', validAlertProps.relatedEntityType);
      expect(primitives).toHaveProperty('relatedEntityId', validAlertProps.relatedEntityId);
      expect(primitives).toHaveProperty('scheduledFor', validAlertProps.scheduledFor);
      expect(primitives).toHaveProperty('metadata', validAlertProps.metadata);
      expect(primitives).toHaveProperty('createdAt');
      expect(primitives).toHaveProperty('updatedAt');
    });
  });
});
