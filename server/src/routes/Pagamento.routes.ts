import { Router } from 'express';
import PagamentoControllers from '../controllers/PagamentoController'

const routes = Router();

routes.get('/api/pagamento/:periodo/:creci', PagamentoControllers.pagamentoDoMes);

export default routes