import type { AlertRepository } from '../../domain/contracts/AlertRepository';
import { AlertStatsResponse } from '../dtos/AlertStatsResponse';

export class GetAlertStatsUseCase {
  constructor(
    private readonly alertRepository: AlertRepository,
  ) {}

  async execute(): Promise<AlertStatsResponse> {
    const stats = await this.alertRepository.getStats();
    
    // Calcular indicadores adicionales
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const recentCriteria = {
      createdFrom: twentyFourHoursAgo,
      createdTo: new Date(),
    };
    
    const todayCriteria = {
      createdFrom: today,
      createdTo: tomorrow,
    };
    
    const recentAlerts = await this.alertRepository.findByCriteria(recentCriteria);
    const todayAlerts = await this.alertRepository.findByCriteria(todayCriteria);
    
    return {
      total: stats.total,
      byStatus: stats.byStatus,
      byType: stats.byType,
      byPriority: stats.byPriority,
      byCategory: stats.byCategory,
      byChannel: stats.byChannel,
      pending: stats.pending,
      sent: stats.sent,
      read: stats.read,
      acknowledged: stats.acknowledged,
      dismissed: stats.dismissed,
      overdue: stats.overdue,
      highPriority: stats.highPriority,
      critical: stats.critical,
      recent: recentAlerts.length,
      today: todayAlerts.length,
    };
  }
}
