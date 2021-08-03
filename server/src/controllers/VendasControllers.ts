import {Request, Response} from 'express';
import VendaComissionado from '../models/VendaComissionado';
import VendaContratado from '../models/VendaContratado';
import Imovel from '../models/Imovel';

class VendasController{

    //Comissionado
    public async createVendaComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const vendaCreated = await VendaComissionado.create({
                codigo: req.body.codigo,
                valorVenda: req.body.valorVenda,
                comprador: req.body.comprador,
                dataVenda: req.body.dataVenda,
                nomeCorretor: req.body.nomeCorretor,
                imovel: req.body.imovel
            });
            const imovel = await Imovel.updateOne(
                {codigo: req.body.imovel},
                {$set: {
                    vendido: true
                }}
            )
            return res.status(201).json(vendaCreated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
    
    public async getVendaComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await VendaComissionado.find({codigo: req.params.codigo});
            return res.json(venda);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async getAllVendasComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const vendas = await VendaComissionado.find({});
            return res.json(vendas);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async updateVendaComissionado(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await VendaComissionado.find({codigo: req.params.codigo});
            console.log(req.params.codigo)
            console.log(req.body.valorVenda)
            const data = {
                valorVenda: req.body.valorVenda !== undefined ? req.body.valorVenda : venda[0].valorVenda,
                comprador: req.body.comprador !== undefined ? req.body.comprador : venda[0].comprador,
                dataVenda: req.body.dataVenda !== undefined ? req.body.dataVenda : venda[0].dataVenda,
                nomeCorretor: req.body.nomeCorretor !== undefined ? req.body.nomeCorretor : venda[0].nomeCorretor,
                imovel: req.body.imovel !== undefined ? req.body.imovel : venda[0].imovel
            }
            const vendasUpdated = await VendaComissionado.updateOne(
                {codigo: req.params.codigo},
                {$set: data}
            )
            console.log(req.body.dataVenda);
            return res.json(vendasUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async deleteVendaComissionado(req: Request, res: Response): Promise<Response> {
        try {
            const vendaDeleted = await VendaComissionado.remove({codigo: req.params.codigo});
            return res.json(vendaDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Contratado
    public async createVendaContratado(req: Request, res: Response):Promise<Response>{
        try {
            const vendaCreated = await VendaContratado.create({
                codigo: req.body.codigo,
                valorVenda: req.body.valorVenda,
                comprador: req.body.comprador,
                dataVenda: req.body.dataVenda,
                nomeCorretor: req.body.nomeCorretor,
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
            return res.status(400).json({message: error});
        }
    }
    
    public async getVendaContratado(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await VendaContratado.find({codigo: req.params.codigo});
            return res.json(venda);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async getAllVendasContratado(req: Request, res: Response):Promise<Response>{
        try {
            const vendas = await VendaContratado.find({});
            return res.json(vendas);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async updateVendaContratado(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await VendaContratado.find({codigo: req.params.codigo});
            const vendasUpdated = await VendaContratado.updateOne(
                {codigo: req.params.codigo},
                {$set: {
                    valorVenda: req.body.valorVenda !== undefined ? req.body.valorVenda : venda[0].valorVenda,
                    comprador: req.body.comprador !== undefined ? req.body.comprador : venda[0].comprador,
                    dataVenda: req.body.dataVenda !== undefined ? req.body.dataVenda : venda[0].dataVenda,
                    nomeCorretor: req.body.nomeCorretor !== undefined ? req.body.nomeCorretor : venda[0].nomeCorretor,
                    imovel: req.body.imovel !== undefined ? req.body.imovel : venda[0].imovel
                }}
            )
            return res.json(vendasUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async deleteVendaContratado(req: Request, res: Response): Promise<Response> {
        try {
            const vendaDeleted = await VendaContratado.remove({codigo: req.params.codigo});
            return res.json(vendaDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new VendasController();