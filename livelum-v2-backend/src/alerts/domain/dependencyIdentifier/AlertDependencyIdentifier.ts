export enum AlertDependencyIdentifier {
  // Repository
  AlertRepository = 'AlertRepository',

  // Use Cases
  CreateAlertUseCase = 'CreateAlertUseCase',
  FindAlertByIdUseCase = 'FindAlertByIdUseCase',
  SearchAlertsUseCase = 'SearchAlertsUseCase',
  UpdateAlertUseCase = 'UpdateAlertUseCase',
  DeleteAlertUseCase = 'DeleteAlertUseCase',
  SendAlertUseCase = 'SendAlertUseCase',
  MarkAlertAsReadUseCase = 'MarkAlertAsReadUseCase',
  GetAlertStatsUseCase = 'GetAlertStatsUseCase',
}
