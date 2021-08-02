import { Router } from 'express';
import CorretorContratadoController from '../controllers/CorretorContratadoController';
import CorretorComissionadoControllers from '../controllers/CorretorComissionadoControllers';

const routes = Router();

//Rotas para corretor contratado
routes.get('/api/corretorContratado/:numero_creci', CorretorContratadoController.getCorretor);
routes.get('/api/corretorContratado', CorretorContratadoController.getAllCorretores);
routes.post('/api/corretorContratado', CorretorContratadoController.createCorretor);
routes.patch('/api/corretorContratado/:numero_creci', CorretorContratadoController.updateCorretor);
routes.delete('/api/corretorContratado/:numero_creci', CorretorContratadoController.deleteCorretor);

//Rotas para corretor comissionado
routes.get('/api/corretorComissionado/:numero_creci', CorretorComissionadoControllers.getCorretor);
routes.get('/api/corretorComissionado', CorretorComissionadoControllers.getAllCorretores);
routes.post('/api/corretorComissionado', CorretorComissionadoControllers.createCorretor);
routes.patch('/api/corretorComissionado/:numero_creci', CorretorComissionadoControllers.updateCorretor);
routes.delete('/api/corretorComissionado/:numero_creci', CorretorComissionadoControllers.deleteCorretor);

export default routes
