import { Router } from 'express';
import PagamentoControllers from '../controllers/PagamentoController'

const routes = Router();

routes.get('/api/pagamentoComissionado/:periodo/:numero_creci', PagamentoControllers.pagamentoDoMesComissionado);
routes.get('/api/pagamentoContratado/:periodo/:numero_creci', PagamentoControllers.pagamentoDoMesContratado);

export default routes