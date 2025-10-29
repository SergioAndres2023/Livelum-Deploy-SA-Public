import 'reflect-metadata';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../domain/dependencyIdentifier/DependencyIdentifier';
import { Logger, PinoLogger } from '../logger/Logger';
import { MongoConnection, MongoConnectionImpl } from '../database/MongoConnection';

export const initializeContainer = async (): Promise<void> => {
  // Logger
  container.registerSingleton<Logger>(DependencyIdentifier.Logger, PinoLogger);

  // Database
  const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
  const mongoConnection = new MongoConnectionImpl(logger);
  container.registerInstance<MongoConnection>(DependencyIdentifier.MongoConnection, mongoConnection);

  // Conectar a la base de datos
  await mongoConnection.connect();

  // Registrar módulos específicos
  await registerCompanyModule();
  await registerUserModule();
  await registerPersonModule();
  await registerObjectiveModule();
  await registerStakeholderModule();
  await registerSupplierModule();
  await registerFindingModule();
  await registerActionPlanModule();
  await registerJobProfileModule();
  await registerTrainingPlanModule();
  await registerMinuteModule();
  await registerSkillModule();
  await registerAuthorizationModule();
  await registerEquipmentModule();
  await registerClientModule();
  await registerDocumentModule();
  await registerAuditModule();
  await registerProcessModule();
  await registerRiskModule();
  await registerIndicatorModule();
  await registerAlertModule();
};

const registerClientModule = async (): Promise<void> => {
  const { registerClientModule } = await import('../../../clients/infrastructure/container/ClientContainer.js');
  registerClientModule();
};

const registerDocumentModule = async (): Promise<void> => {
  const { registerDocumentModule } = await import('../../../documents/infrastructure/container/DocumentContainer.js');
  registerDocumentModule();
};

const registerAuditModule = async (): Promise<void> => {
  const { registerAuditModule } = await import('../../../audits/infrastructure/container/AuditContainer.js');
  registerAuditModule();
};

const registerProcessModule = async (): Promise<void> => {
  const { registerProcessModule } = await import('../../../processes/infrastructure/container/ProcessContainer.js');
  registerProcessModule();
};

const registerRiskModule = async (): Promise<void> => {
  const { registerRiskModule } = await import('../../../risks/infrastructure/container/RiskContainer.js');
  registerRiskModule();
};

const registerIndicatorModule = async (): Promise<void> => {
  const { registerIndicatorModule } = await import('../../../indicators/infrastructure/container/IndicatorContainer.js');
  registerIndicatorModule();
};

const registerAlertModule = async (): Promise<void> => {
  const { registerAlertModule } = await import('../../../alerts/infrastructure/container/AlertContainer.js');
  registerAlertModule();
};

const registerCompanyModule = async (): Promise<void> => {
  const { initializeCompanyContainer } = await import('../../../companies/infrastructure/container/CompanyContainer.js');
  initializeCompanyContainer();
};

const registerUserModule = async (): Promise<void> => {
  const { UserContainer } = await import('../../../users/infrastructure/container/UserContainer.js');
  UserContainer.initialize();
};

const registerPersonModule = async (): Promise<void> => {
  const { PersonContainer } = await import('../../../people/infrastructure/container/PersonContainer.js');
  PersonContainer.initialize();
};

const registerObjectiveModule = async (): Promise<void> => {
  const { ObjectiveContainer } = await import('../../../objectives/infrastructure/container/ObjectiveContainer.js');
  ObjectiveContainer.initialize();
};

const registerStakeholderModule = async (): Promise<void> => {
  const { StakeholderContainer } = await import('../../../stakeholders/infrastructure/container/StakeholderContainer.js');
  StakeholderContainer.initialize();
};

const registerSupplierModule = async (): Promise<void> => {
  const { SupplierContainer } = await import('../../../suppliers/infrastructure/container/SupplierContainer.js');
  SupplierContainer.initialize();
};

const registerFindingModule = async (): Promise<void> => {
  const { FindingContainer } = await import('../../../findings/infrastructure/container/FindingContainer.js');
  FindingContainer.initialize();
};

const registerActionPlanModule = async (): Promise<void> => {
  const { ActionPlanContainer } = await import('../../../actionPlans/infrastructure/container/ActionPlanContainer.js');
  ActionPlanContainer.initialize();
};

const registerJobProfileModule = async (): Promise<void> => {
  const { JobProfileContainer } = await import('../../../jobProfiles/infrastructure/container/JobProfileContainer.js');
  JobProfileContainer.initialize();
};

const registerTrainingPlanModule = async (): Promise<void> => {
  const { TrainingPlanContainer } = await import('../../../trainingPlans/infrastructure/container/TrainingPlanContainer.js');
  TrainingPlanContainer.initialize();
};

const registerMinuteModule = async (): Promise<void> => {
  const { MinuteContainer } = await import('../../../minutes/infrastructure/container/MinuteContainer.js');
  MinuteContainer.initialize();
};

const registerSkillModule = async (): Promise<void> => {
  const { SkillContainer } = await import('../../../skills/infrastructure/container/SkillContainer.js');
  SkillContainer.initialize();
};

const registerAuthorizationModule = async (): Promise<void> => {
  const { AuthorizationContainer } = await import('../../../authorizations/infrastructure/container/AuthorizationContainer.js');
  AuthorizationContainer.initialize();
};

const registerEquipmentModule = async (): Promise<void> => {
  const { EquipmentContainer } = await import('../../../equipment/infrastructure/container/EquipmentContainer.js');
  EquipmentContainer.initialize();
};
