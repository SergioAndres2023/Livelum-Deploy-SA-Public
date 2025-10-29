import 'reflect-metadata';

// Configuración global para tests
beforeAll(async () => {
  // Setup global para tests
});

afterAll(async () => {
  // Cleanup global para tests
});

// Mock de console para tests
global.console = {
  ...console,
  // Silenciar logs en tests
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
