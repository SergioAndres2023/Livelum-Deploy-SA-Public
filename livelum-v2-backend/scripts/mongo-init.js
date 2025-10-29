// Script de inicialización de MongoDB para Livelum v2
db = db.getSiblingDB('livelum');

// Crear usuario para la aplicación
db.createUser({
  user: 'livelum_user',
  pwd: 'livelum_password',
  roles: [
    {
      role: 'readWrite',
      db: 'livelum'
    }
  ]
});

// Crear colecciones con índices
db.createCollection('clients');

// Índices para la colección de clientes
db.clients.createIndex({ email: 1 }, { unique: true });
db.clients.createIndex({ name: 1 });
db.clients.createIndex({ status: 1 });
db.clients.createIndex({ type: 1 });
db.clients.createIndex({ createdAt: -1 });
db.clients.createIndex({ nif: 1 }, { sparse: true });
db.clients.createIndex({ phone: 1 }, { sparse: true });
db.clients.createIndex({ status: 1, type: 1, createdAt: -1 });

print('✅ Base de datos Livelum inicializada correctamente');
print('📊 Colecciones creadas: clients');
print('🔍 Índices creados para optimización de consultas');
