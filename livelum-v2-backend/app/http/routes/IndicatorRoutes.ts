import { FastifyInstance } from 'fastify';
import { CreateIndicatorController } from '../controllers/indicators/CreateIndicatorController';
import { FindIndicatorController } from '../controllers/indicators/FindIndicatorController';
import { FindIndicatorByCodeController } from '../controllers/indicators/FindIndicatorByCodeController';
import { SearchIndicatorsController } from '../controllers/indicators/SearchIndicatorsController';
import { UpdateIndicatorController } from '../controllers/indicators/UpdateIndicatorController';
import { DeleteIndicatorController } from '../controllers/indicators/DeleteIndicatorController';
import { UpdateIndicatorValueController } from '../controllers/indicators/UpdateIndicatorValueController';
import { GetIndicatorStatsController } from '../controllers/indicators/GetIndicatorStatsController';

export async function registerIndicatorRoutes(fastify: FastifyInstance): Promise<void> {
  const createIndicatorController = new CreateIndicatorController();
  const findIndicatorController = new FindIndicatorController();
  const findIndicatorByCodeController = new FindIndicatorByCodeController();
  const searchIndicatorsController = new SearchIndicatorsController();
  const updateIndicatorController = new UpdateIndicatorController();
  const deleteIndicatorController = new DeleteIndicatorController();
  const updateIndicatorValueController = new UpdateIndicatorValueController();
  const getIndicatorStatsController = new GetIndicatorStatsController();

  // POST /api/indicators - Crear indicador
  fastify.post('/api/indicators', {
    handler: createIndicatorController.handle.bind(createIndicatorController),
  });

  // GET /api/indicators/:id - Obtener indicador por ID
  fastify.get('/api/indicators/:id', {
    handler: findIndicatorController.handle.bind(findIndicatorController),
  });

  // GET /api/indicators/code/:code - Obtener indicador por código
  fastify.get('/api/indicators/code/:code', {
    handler: findIndicatorByCodeController.handle.bind(findIndicatorByCodeController),
  });

  // GET /api/indicators - Buscar indicadores
  fastify.get('/api/indicators', {
    handler: searchIndicatorsController.handle.bind(searchIndicatorsController),
  });

  // PUT /api/indicators/:id - Actualizar indicador
  fastify.put('/api/indicators/:id', {
    handler: updateIndicatorController.handle.bind(updateIndicatorController),
  });

  // DELETE /api/indicators/:id - Eliminar indicador
  fastify.delete('/api/indicators/:id', {
    handler: deleteIndicatorController.handle.bind(deleteIndicatorController),
  });

  // PUT /api/indicators/:id/value - Actualizar valor del indicador
  fastify.put('/api/indicators/:id/value', {
    handler: updateIndicatorValueController.handle.bind(updateIndicatorValueController),
  });

  // GET /api/indicators/stats - Obtener estadísticas
  fastify.get('/api/indicators/stats', {
    handler: getIndicatorStatsController.handle.bind(getIndicatorStatsController),
  });
}
