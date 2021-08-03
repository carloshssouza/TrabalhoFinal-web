import { Router } from 'express';
import PagamentoControllers from '../controllers/PagamentoController'

const routes = Router();

routes.get('/api/pagamentoComissionado/:periodo/:creci', PagamentoControllers.pagamentoDoMesComissionado);
routes.get('/api/pagamentoContratado/:periodo/:creci', PagamentoControllers.pagamentoDoMesContratado);

export default routes