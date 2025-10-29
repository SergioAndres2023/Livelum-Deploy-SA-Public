import { FastifyInstance } from 'fastify';
import { CreateRiskController } from '../controllers/risks/CreateRiskController';
import { FindRiskController } from '../controllers/risks/FindRiskController';
import { FindRiskByCodeController } from '../controllers/risks/FindRiskByCodeController';
import { SearchRisksController } from '../controllers/risks/SearchRisksController';
import { UpdateRiskController } from '../controllers/risks/UpdateRiskController';
import { DeleteRiskController } from '../controllers/risks/DeleteRiskController';
import { ChangeRiskStatusController } from '../controllers/risks/ChangeRiskStatusController';
import { GetRiskStatsController } from '../controllers/risks/GetRiskStatsController';

export const registerRiskRoutes = (fastify: FastifyInstance): void => {
  const createRiskController = new CreateRiskController();
  const findRiskController = new FindRiskController();
  const findRiskByCodeController = new FindRiskByCodeController();
  const searchRisksController = new SearchRisksController();
  const updateRiskController = new UpdateRiskController();
  const deleteRiskController = new DeleteRiskController();
  const changeRiskStatusController = new ChangeRiskStatusController();
  const getRiskStatsController = new GetRiskStatsController();

  // POST /api/risks - Crear riesgo
  fastify.post('/api/risks', {
    handler: createRiskController.handle.bind(createRiskController),
  });

  // GET /api/risks/:id - Obtener riesgo por ID
  fastify.get('/api/risks/:id', {
    handler: findRiskController.handle.bind(findRiskController),
  });

  // GET /api/risks/code/:code - Obtener riesgo por código
  fastify.get('/api/risks/code/:code', {
    handler: findRiskByCodeController.handle.bind(findRiskByCodeController),
  });

  // GET /api/risks - Buscar riesgos (con filtros)
  fastify.get('/api/risks', {
    handler: searchRisksController.handle.bind(searchRisksController),
  });

  // PUT /api/risks/:id - Actualizar riesgo
  fastify.put('/api/risks/:id', {
    handler: updateRiskController.handle.bind(updateRiskController),
  });

  // DELETE /api/risks/:id - Eliminar riesgo
  fastify.delete('/api/risks/:id', {
    handler: deleteRiskController.handle.bind(deleteRiskController),
  });

  // PUT /api/risks/:id/status - Cambiar estado del riesgo
  fastify.put('/api/risks/:id/status', {
    handler: changeRiskStatusController.handle.bind(changeRiskStatusController),
  });

  // GET /api/risks/stats - Obtener estadísticas
  fastify.get('/api/risks/stats', {
    handler: getRiskStatsController.handle.bind(getRiskStatsController),
  });
};
