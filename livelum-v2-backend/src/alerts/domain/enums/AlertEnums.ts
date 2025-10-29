export enum AlertType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
  SUCCESS = 'SUCCESS'
}

export enum AlertStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  READ = 'READ',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  DISMISSED = 'DISMISSED'
}

export enum AlertPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum AlertCategory {
  SYSTEM = 'SYSTEM',
  SECURITY = 'SECURITY',
  PERFORMANCE = 'PERFORMANCE',
  BUSINESS = 'BUSINESS',
  COMPLIANCE = 'COMPLIANCE',
  MAINTENANCE = 'MAINTENANCE'
}

export enum AlertChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  DASHBOARD = 'DASHBOARD',
  WEBHOOK = 'WEBHOOK'
}
