import {Request, Response} from 'express';
import Imovel from '../models/Imovel';

class ImovelController{
   
    public async createImovel(req: Request, res: Response):Promise<Response>{
        try {
            const imovelCreated = await Imovel.create({
                codigo: req.body.codigo,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                nome_vendedor: req.body.nome_vendedor,
                preco_solicitado: req.body.preco_solicitado,
                url1: req.body.url1,
                url2: req.body.url2,
                url3: req.body.url3,
                data_cadastro: req.body.data_cadastro,
                vendido: false
            });
           
            return res.status(201).json(imovelCreated);
        } catch (error) {
            return res.json({message: error});
        }
    }
    
    public async getImovel(req: Request, res: Response):Promise<Response>{
        try {
            const tipo = req.params.tipo;
            const imovel = await Imovel.find({tipo: tipo});
            return res.json(imovel);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async getAllImovel(req: Request, res: Response):Promise<Response>{
        try {
            const imoveis = await Imovel.find({});
            return res.json(imoveis);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async updateImovel(req: Request, res: Response):Promise<Response>{
        try {
            const imovel = await Imovel.find({codigo: req.params.codigo});
            const data = {
                descricao: req.body.descricao !== undefined ? req.body.descricao : imovel[0].descricao,
                nome_vendedor: req.body.nome_vendedor !== undefined ? req.body.nome_vendedor : imovel[0].nome_vendedor,
                preco_solicitado: req.body.preco_solicitado !== undefined ? req.body.preco_solicitado : imovel[0].preco_solicitado,
                url1: req.body.url1 !== undefined ? req.body.url1 : imovel[0].url1,
                url2: req.body.url2 !== undefined ? req.body.url2 : imovel[0].url2,
                url3: req.body.url3 !== undefined ? req.body.url3 : imovel[0].url3,
                data_cadastro: req.body.data_cadastro !== undefined ? req.body.data_cadastro : imovel[0].data_cadastro
            }
            const imovelUpdated = await Imovel.updateOne(
                {codigo: req.params.codigo},
                {$set: data}
            )
            return res.json(imovelUpdated);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async deleteImovel(req: Request, res: Response): Promise<Response> {
        try {
            const imovelDeleted = await Imovel.remove({codigo: req.params.codigo});
            return res.json(imovelDeleted);
        } catch (error) {
            return res.json({message: error});
        }
    }
}

export default new ImovelController();