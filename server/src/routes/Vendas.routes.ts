import { Router } from 'express';
import VendasController from '../controllers/VendasControllers';

const routes = Router();

//Contratado
routes.get('/api/vendasContratado/:_id', VendasController.getVendaContratado);
routes.get('/api/vendasContratado', VendasController.getAllVendasContratado);
routes.post('/api/vendasContratado', VendasController.createVendaContratado);
routes.patch('/api/vendasContratado/:_id', VendasController.updateVendaContratado);
routes.delete('/api/vendasContratado/:_id', VendasController.deleteVendaContratado);

//Comissionado
routes.get('/api/vendasComissionado/:_id', VendasController.getVendaComissionado);
routes.get('/api/vendasComissionado', VendasController.getAllVendasComissionado);
routes.post('/api/vendasComissionado', VendasController.createVendaComissionado);
routes.patch('/api/vendasComissionado/:_id', VendasController.updateVendaComissionado);
routes.delete('/api/vendasComissionado/:_id', VendasController.deleteVendaComissionado);
export default routes
