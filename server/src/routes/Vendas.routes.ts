import { Router } from 'express';
import VendasController from '../controllers/VendasControllers';

const routes = Router();

//Contratado
routes.get('/api/vendasContratado/:codigo', VendasController.getVendaContratado);
routes.get('/api/vendasContratado', VendasController.getAllVendasContratado);
routes.post('/api/vendasContratado', VendasController.createVendaContratado);
routes.patch('/api/vendasContratado/:codigo', VendasController.updateVendaContratado);
routes.delete('/api/vendasContratado/:codigo', VendasController.deleteVendaContratado);

//Comissionado
routes.get('/api/vendasComissionado/:codigo', VendasController.getVendaComissionado);
routes.get('/api/vendasComissionado', VendasController.getAllVendasComissionado);
routes.post('/api/vendasComissionado', VendasController.createVendaComissionado);
routes.patch('/api/vendasComissionado/:codigo', VendasController.updateVendaComissionado);
routes.delete('/api/vendasComissionado/:codigo', VendasController.deleteVendaComissionado);
export default routes
