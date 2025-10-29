import { isDevelopment } from './environments';

const env = process.env.NODE_ENV || 'development';

export default {
  env,
  port: parseInt(process.env.PORT || '3000', 10),
  domain: process.env.DOMAIN || 'localhost',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/livelum',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  cors: {
    origin: isDevelopment(env) 
      ? ['http://localhost:3001', 'http://localhost:8080'] 
      : [process.env.FRONTEND_URL || 'https://livelum.com'],
    credentials: true,
  },
  swagger: {
    enabled: isDevelopment(env),
    path: '/docs',
  },
} as const;

export { isDevelopment };
