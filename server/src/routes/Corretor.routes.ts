import { Router } from 'express';
import CorretorContratadoController from '../controllers/CorretorContratadoController';
import CorretorComissionadoControllers from '../controllers/CorretorComissionadoControllers';

const routes = Router();

//Rotas para corretor contratado
routes.get('/api/corretorContratado/:creci', CorretorContratadoController.getCorretor);
routes.get('/api/corretorContratado', CorretorContratadoController.getAllCorretores);
routes.post('/api/corretorContratado', CorretorContratadoController.createCorretor);
routes.patch('/api/corretorContratado/:creci', CorretorContratadoController.updateCorretor);
routes.delete('/api/corretorContratado/:creci', CorretorContratadoController.deleteCorretor);

//Rotas para corretor comissionado
routes.get('/api/corretorComissionado/:creci', CorretorComissionadoControllers.getCorretor);
routes.get('/api/corretorComissionado', CorretorComissionadoControllers.getAllCorretores);
routes.post('/api/corretorComissionado', CorretorComissionadoControllers.createCorretor);
routes.patch('/api/corretorComissionado/:creci', CorretorComissionadoControllers.updateCorretor);
routes.delete('/api/corretorComissionado/:creci', CorretorComissionadoControllers.deleteCorretor);

export default routes
