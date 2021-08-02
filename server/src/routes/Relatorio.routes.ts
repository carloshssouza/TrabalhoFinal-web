import { Router } from 'express';
import RelatorioControllers from '../controllers/RelatorioControllers';

const routes = Router();

routes.get('/api/relatorio/:periodo', RelatorioControllers.gerarRelatorio);

export default routes