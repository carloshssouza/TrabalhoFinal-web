import { Router } from 'express';
import VendasController from '../controllers/VendasController';

const routes = Router();

routes.get('/api/vendas/:codigo', VendasController.getVenda);
routes.get('/api/vendas', VendasController.getAllVendas);
routes.post('/api/vendas', VendasController.createVenda);
routes.patch('/api/vendas/:codigo', VendasController.updateVenda);
routes.delete('/api/vendas/:codigo', VendasController.deleteVenda);

export default routes
