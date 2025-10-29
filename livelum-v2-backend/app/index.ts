import 'reflect-metadata';

import { container } from 'tsyringe';
import { DependencyIdentifier } from '../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { initializeContainer } from '../src/cross-cutting/infrastructure/container/Container';
import { Logger } from '../src/cross-cutting/infrastructure/logger/Logger';
import { MongoConnection } from '../src/cross-cutting/infrastructure/database/MongoConnection';
import config, { isDevelopment } from '../config/index';

import { Server } from './http/Server';

const bootstrap = async (): Promise<void> => {
  const { env, port, domain } = config;

  // Inicializar container de dependencias
  await initializeContainer();

  const logger = container.resolve<Logger>(DependencyIdentifier.Logger);
  const mongoConnection = container.resolve<MongoConnection>(DependencyIdentifier.MongoConnection);
  const isLocal = isDevelopment(env);

  // Manejo de errores no capturados
  process.on('uncaughtException', (error: Error) => {
    if (isLocal) {
      logger.error(`👎🏽 | uncaughtException: ${error.toString()}`);
      return;
    }
    logger.error(`👎🏽 | uncaughtException: ${error.toString()}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (error: Error) => {
    if (isLocal) {
      logger.error(`👎🏽 | unhandledRejection: ${error.toString()}`);
      return;
    }
    logger.error(`👎🏽 | unhandledRejection: ${error.toString()}`);
    process.exit(1);
  });

  // Manejo de señales de terminación
  const gracefulShutdown = async (signal: string): Promise<void> => {
    logger.info(`🛑 Recibida señal ${signal}, iniciando cierre graceful...`);
    
    try {
      const server = container.resolve(Server);
      await server.stop();
      await mongoConnection.disconnect();
      logger.info('✅ Cierre graceful completado');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Error durante cierre graceful', { error: (error as Error).message });
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  try {
    // Verificar conexión a MongoDB
    if (!mongoConnection.isConnected()) {
      logger.error('❌ MongoDB no está conectado');
      process.exit(1);
    }

    // Iniciar servidor
    const server = new Server(logger);
    container.registerInstance(Server, server);
    
    await server.start(domain, port);
    
    logger.info('🎉 Aplicación iniciada exitosamente', {
      environment: env,
      port,
      domain,
      mongodb: mongoConnection.isConnected(),
    });
  } catch (error) {
    logger.error('❌ Error al iniciar aplicación', { 
      error: (error as Error).message,
      stack: (error as Error).stack 
    });
    process.exit(1);
  }
};

void bootstrap();
