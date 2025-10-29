export enum DependencyIdentifier {
  // Logger
  Logger = 'Logger',
  
  // Database
  MongoConnection = 'MongoConnection',
  
  // Companies Module
  CompanyRepository = 'CompanyRepository',
  CreateCompanyUseCase = 'CreateCompanyUseCase',
  FindCompanyByIdUseCase = 'FindCompanyByIdUseCase',
  FindCompanyByCuitUseCase = 'FindCompanyByCuitUseCase',
  SearchCompaniesUseCase = 'SearchCompaniesUseCase',
  UpdateCompanyUseCase = 'UpdateCompanyUseCase',
  DeleteCompanyUseCase = 'DeleteCompanyUseCase',
  ChangeCompanyStatusUseCase = 'ChangeCompanyStatusUseCase',
  
  // Clients Module
  ClientRepository = 'ClientRepository',
  CreateClientUseCase = 'CreateClientUseCase',
  FindClientByIdUseCase = 'FindClientByIdUseCase',
  SearchClientsUseCase = 'SearchClientsUseCase',
  UpdateClientUseCase = 'UpdateClientUseCase',
  DeleteClientUseCase = 'DeleteClientUseCase',
  
  // Documents Module
  DocumentRepository = 'DocumentRepository',
  CreateDocumentUseCase = 'CreateDocumentUseCase',
  FindDocumentByIdUseCase = 'FindDocumentByIdUseCase',
  FindDocumentByCodeUseCase = 'FindDocumentByCodeUseCase',
  SearchDocumentsUseCase = 'SearchDocumentsUseCase',
  UpdateDocumentUseCase = 'UpdateDocumentUseCase',
  DeleteDocumentUseCase = 'DeleteDocumentUseCase',
  RestoreDocumentUseCase = 'RestoreDocumentUseCase',
  ApproveDocumentUseCase = 'ApproveDocumentUseCase',
  RejectDocumentUseCase = 'RejectDocumentUseCase',
  GetDocumentStatsUseCase = 'GetDocumentStatsUseCase',
  
  // Audits Module
  AuditRepository = 'AuditRepository',
  CreateAuditUseCase = 'CreateAuditUseCase',
  FindAuditByIdUseCase = 'FindAuditByIdUseCase',
  SearchAuditsUseCase = 'SearchAuditsUseCase',
  UpdateAuditUseCase = 'UpdateAuditUseCase',
  DeleteAuditUseCase = 'DeleteAuditUseCase',
  StartAuditUseCase = 'StartAuditUseCase',
  CompleteAuditUseCase = 'CompleteAuditUseCase',
  CancelAuditUseCase = 'CancelAuditUseCase',
  RescheduleAuditUseCase = 'RescheduleAuditUseCase',
  GetAuditStatsUseCase = 'GetAuditStatsUseCase',

  // ProcessType Module
  ProcessTypeRepository = 'ProcessTypeRepository',
  CreateProcessTypeUseCase = 'CreateProcessTypeUseCase',
  FindProcessTypeByIdUseCase = 'FindProcessTypeByIdUseCase',
  GetAllProcessTypesUseCase = 'GetAllProcessTypesUseCase',
  UpdateProcessTypeUseCase = 'UpdateProcessTypeUseCase',
  DeleteProcessTypeUseCase = 'DeleteProcessTypeUseCase',
  ReorderProcessTypesUseCase = 'ReorderProcessTypesUseCase',

  // ProcessName Module
  ProcessNameRepository = 'ProcessNameRepository',
  CreateProcessNameUseCase = 'CreateProcessNameUseCase',
  FindProcessNameByIdUseCase = 'FindProcessNameByIdUseCase',
  GetProcessNamesByTypeUseCase = 'GetProcessNamesByTypeUseCase',
  UpdateProcessNameUseCase = 'UpdateProcessNameUseCase',
  DeleteProcessNameUseCase = 'DeleteProcessNameUseCase',
  ReorderProcessNamesUseCase = 'ReorderProcessNamesUseCase',

  // Risks Module
  RiskRepository = 'RiskRepository',
  CreateRiskUseCase = 'CreateRiskUseCase',
  FindRiskByIdUseCase = 'FindRiskByIdUseCase',
  FindRiskByCodeUseCase = 'FindRiskByCodeUseCase',
  SearchRisksUseCase = 'SearchRisksUseCase',
  UpdateRiskUseCase = 'UpdateRiskUseCase',
  DeleteRiskUseCase = 'DeleteRiskUseCase',
  ChangeRiskStatusUseCase = 'ChangeRiskStatusUseCase',
  GetRiskStatsUseCase = 'GetRiskStatsUseCase',

  // Indicators Module
  IndicatorRepository = 'IndicatorRepository',
  CreateIndicatorUseCase = 'CreateIndicatorUseCase',
  FindIndicatorByIdUseCase = 'FindIndicatorByIdUseCase',
  FindIndicatorByCodeUseCase = 'FindIndicatorByCodeUseCase',
  SearchIndicatorsUseCase = 'SearchIndicatorsUseCase',
  UpdateIndicatorUseCase = 'UpdateIndicatorUseCase',
  DeleteIndicatorUseCase = 'DeleteIndicatorUseCase',
  UpdateIndicatorValueUseCase = 'UpdateIndicatorValueUseCase',
  GetIndicatorStatsUseCase = 'GetIndicatorStatsUseCase',

  // Alerts Module
  AlertRepository = 'AlertRepository',
  CreateAlertUseCase = 'CreateAlertUseCase',
  FindAlertByIdUseCase = 'FindAlertByIdUseCase',
  SearchAlertsUseCase = 'SearchAlertsUseCase',
  UpdateAlertUseCase = 'UpdateAlertUseCase',
  DeleteAlertUseCase = 'DeleteAlertUseCase',
  SendAlertUseCase = 'SendAlertUseCase',
  MarkAlertAsReadUseCase = 'MarkAlertAsReadUseCase',
  GetAlertStatsUseCase = 'GetAlertStatsUseCase',
}
