import { Router } from 'express';
import ImovelControllers from '../controllers/ImovelControllers';

const routes = Router();

routes.get('/api/imoveis/:tipo', ImovelControllers.getImovel);
routes.get('/api/imoveis', ImovelControllers.getAllImovel);
routes.post('/api/imoveis', ImovelControllers.createImovel);
routes.patch('/api/imoveis/:codigo', ImovelControllers.updateImovel);
routes.delete('/api/imoveis/:codigo', ImovelControllers.deleteImovel);

export default routes