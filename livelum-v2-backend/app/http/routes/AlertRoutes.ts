import { FastifyInstance } from 'fastify';
import { CreateAlertController } from '../controllers/alerts/CreateAlertController';
import { FindAlertController } from '../controllers/alerts/FindAlertController';
import { SearchAlertsController } from '../controllers/alerts/SearchAlertsController';
import { UpdateAlertController } from '../controllers/alerts/UpdateAlertController';
import { DeleteAlertController } from '../controllers/alerts/DeleteAlertController';
import { SendAlertController } from '../controllers/alerts/SendAlertController';
import { MarkAlertAsReadController } from '../controllers/alerts/MarkAlertAsReadController';
import { GetAlertStatsController } from '../controllers/alerts/GetAlertStatsController';

export async function registerAlertRoutes(fastify: FastifyInstance): Promise<void> {
  const createAlertController = new CreateAlertController();
  const findAlertController = new FindAlertController();
  const searchAlertsController = new SearchAlertsController();
  const updateAlertController = new UpdateAlertController();
  const deleteAlertController = new DeleteAlertController();
  const sendAlertController = new SendAlertController();
  const markAlertAsReadController = new MarkAlertAsReadController();
  const getAlertStatsController = new GetAlertStatsController();

  // POST /api/alerts - Crear alerta
  fastify.post('/api/alerts', {
    handler: createAlertController.handle.bind(createAlertController),
  });

  // GET /api/alerts/:id - Obtener alerta por ID
  fastify.get('/api/alerts/:id', {
    handler: findAlertController.handle.bind(findAlertController),
  });

  // GET /api/alerts - Buscar alertas
  fastify.get('/api/alerts', {
    handler: searchAlertsController.handle.bind(searchAlertsController),
  });

  // PUT /api/alerts/:id - Actualizar alerta
  fastify.put('/api/alerts/:id', {
    handler: updateAlertController.handle.bind(updateAlertController),
  });

  // DELETE /api/alerts/:id - Eliminar alerta
  fastify.delete('/api/alerts/:id', {
    handler: deleteAlertController.handle.bind(deleteAlertController),
  });

  // POST /api/alerts/:id/send - Enviar alerta
  fastify.post('/api/alerts/:id/send', {
    handler: sendAlertController.handle.bind(sendAlertController),
  });

  // POST /api/alerts/:id/read - Marcar alerta como leída
  fastify.post('/api/alerts/:id/read', {
    handler: markAlertAsReadController.handle.bind(markAlertAsReadController),
  });

  // GET /api/alerts/stats - Obtener estadísticas
  fastify.get('/api/alerts/stats', {
    handler: getAlertStatsController.handle.bind(getAlertStatsController),
  });
}
