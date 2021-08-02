import {Request, Response} from 'express';
import VendaComissionado from '../models/VendaComissionado';
import VendaContratado from '../models/VendaContratado';
import Imovel from '../models/Imovel';

class VendasController{

    //Comissionado
    public async createVendaComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const vendaCreated = await VendaComissionado.create({
                valor_real_venda: req.body.valor_real_venda,
                nome_comprador: req.body.nome_comprador,
                data_venda: req.body.data_venda,
                corretor: req.body.corretor,
                imovel: req.body.imovel
            });
            const imovel = await Imovel.updateOne(
                {codigo: req.body.imovel},
                {$set: {
                    vendido: true
                }}
            )
            return res.json(vendaCreated);
        } catch (error) {
            return res.json({message: error});
        }
    }
    
    public async getVendaComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await VendaComissionado.find({_id: req.params._id});
            return res.json(venda);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async getAllVendasComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const vendas = await VendaComissionado.find({});
            return res.json(vendas);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async updateVendaComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const vendasUpdated = await VendaComissionado.updateOne(
                {_id: req.params._id},
                {$set: {
                    valor_real_venda: req.body.valor_real_venda,
                    nome_comprador: req.body.nome_comprador,
                    data_venda: req.body.data_venda,
                    corretor: req.body.corretor,
                    imovel: req.body.imovel
                }}
            )
            return res.json(vendasUpdated);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async deleteVendaComissionado(req: Request, res: Response): Promise<Response> {
        try {
            const vendaDeleted = await VendaComissionado.remove({_id: req.params._id});
            return res.json(vendaDeleted);
        } catch (error) {
            return res.json({message: error});
        }
    }

    //Contratado
    public async createVendaContratado(req: Request, res: Response):Promise<Response>{
        try {
            const vendaCreated = await VendaContratado.create({
                valor_real_venda: req.body.valor_real_venda,
                nome_comprador: req.body.nome_comprador,
                data_venda: req.body.data_venda,
                corretor: req.body.corretor,
                imovel: req.body.imovel
            });
            const imovel = await Imovel.updateOne(
                {codigo: req.body.imovel},
                {$set: {
                    vendido: true
                }}
            )
            return res.json(vendaCreated);
        } catch (error) {
            return res.json({message: error});
        }
    }
    
    public async getVendaContratado(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await VendaContratado.find({_id: req.params._id});
            return res.json(venda);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async getAllVendasContratado(req: Request, res: Response):Promise<Response>{
        try {
            const vendas = await VendaContratado.find({});
            return res.json(vendas);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async updateVendaContratado(req: Request, res: Response):Promise<Response>{
        try {
            const vendasUpdated = await VendaContratado.updateOne(
                {_id: req.params._id},
                {$set: {
                    valor_real_venda: req.body.valor_real_venda,
                    nome_comprador: req.body.nome_comprador,
                    data_venda: req.body.data_venda,
                    corretor: req.body.corretor,
                    imovel: req.body.imovel
                }}
            )
            return res.json(vendasUpdated);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async deleteVendaContratado(req: Request, res: Response): Promise<Response> {
        try {
            const vendaDeleted = await VendaContratado.remove({_id: req.params._id});
            return res.json(vendaDeleted);
        } catch (error) {
            return res.json({message: error});
        }
    }
}

export default new VendasController();