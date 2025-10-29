import mongoose from 'mongoose';
import { Logger } from '../logger/Logger';

export interface MongoConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getConnection(): mongoose.Connection;
  getModel<T>(name: string, schema: mongoose.Schema<T>): mongoose.Model<T>;
}

export class MongoConnectionImpl implements MongoConnection {
  private connection: mongoose.Connection | null = null;
  private isConnecting = false;

  constructor(private readonly logger: Logger) {}

  async connect(): Promise<void> {
    if (this.isConnected() || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/livelum';
      
      this.logger.info('Conectando a MongoDB...', { uri: mongoUri.replace(/\/\/.*@/, '//***:***@') });
      
      await mongoose.connect(mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
        // bufferMaxEntries: 0, // Deprecated in newer versions
      });

      this.connection = mongoose.connection;

      this.connection.on('error', (error) => {
        this.logger.error('Error de conexión MongoDB', { error: error.message });
      });

      this.connection.on('disconnected', () => {
        this.logger.warn('MongoDB desconectado');
      });

      this.connection.on('reconnected', () => {
        this.logger.info('MongoDB reconectado');
      });

      this.logger.info('MongoDB conectado exitosamente', {
        host: this.connection.host,
        port: this.connection.port,
        name: this.connection.name,
      });

    } catch (error) {
      this.logger.error('Error al conectar a MongoDB', { error: (error as Error).message });
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected()) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.connection = null;
      this.logger.info('MongoDB desconectado exitosamente');
    } catch (error) {
      this.logger.error('Error al desconectar de MongoDB', { error: (error as Error).message });
      throw error;
    }
  }

  isConnected(): boolean {
    return this.connection?.readyState === 1;
  }

  getConnection(): mongoose.Connection {
    if (!this.connection) {
      throw new Error('MongoDB no está conectado');
    }
    return this.connection;
  }

  getModel<T>(name: string, schema: mongoose.Schema<T>): mongoose.Model<T> {
    if (!this.connection) {
      throw new Error('MongoDB no está conectado');
    }
    return this.connection.model<T>(name, schema);
  }
}
