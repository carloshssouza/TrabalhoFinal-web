import {Request, Response} from 'express';
import Venda from '../models/Venda';
import Imovel from '../models/Imovel';
import CorretorContratado from '../models/CorretorContratado';
import CorretorComissionado from '../models/CorretorComissionado';

class VendasController{

    //Cria uma venda
    public async createVenda(req: Request, res: Response):Promise<Response>{
        try {
            const imovel = await Imovel.find({codigo: req.body.imovel})
            if(imovel[0].vendido === true || imovel.length === 0){
                return res.status(400).json({message: 'Esse codigo é de um imovel que já foi vendido ou não existe'})
            }
          
            const corretorContratado = await CorretorContratado.find({creci: req.body.creci});
            const corretorComissionado = await CorretorComissionado.find({creci: req.body.creci});
            if(corretorContratado.length !== 0){
                const vendaCreated = await Venda.create({
                    codigo: req.body.codigo,
                    valorVenda: req.body.valorVenda,
                    comprador: req.body.comprador,
                    dataVenda: req.body.dataVenda,
                    creci: req.body.creci,
                    onModel: 'CorretorContratado',
                    imovel: req.body.imovel,
                    },
                
                );
                const imovel = await Imovel.updateOne(
                    {codigo: req.body.imovel},
                    {$set: {
                        vendido: true
                    }}
                )
                return res.json(vendaCreated);
            } else if(corretorComissionado.length != 0){
                
                const vendaCreated = await Venda.create({
                    codigo: req.body.codigo,
                    valorVenda: req.body.valorVenda,
                    comprador: req.body.comprador,
                    dataVenda: req.body.dataVenda,
                    creci: req.body.creci,
                    onModel: 'CorretorComissionado',
                    imovel: req.body.imovel,
                    },
                );
                const imovel = await Imovel.updateOne(
                    {codigo: req.body.imovel},
                    {$set: {
                        vendido: true
                    }}
                )
                return res.status(201).json(vendaCreated);
            } else{
                return res.status(400).json({message: 'Não existe corretor com esse creci'})
            }
            
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
    
    //Consulta uma venda por codigo
    public async getVenda(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await Venda.find({codigo: req.params.codigo});
            return res.json(venda);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Lista todas as vendas realizadas
    public async getAllVendas(req: Request, res: Response):Promise<Response>{
        try {
            const vendas = await Venda.find({});
            return res.json(vendas);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Atualiza dados de uma venda
    public async updateVenda(req: Request, res: Response):Promise<Response>{
        try {
            const venda = await Venda.find({codigo: req.params.codigo});
            const vendasUpdated = await Venda.updateOne(
                {codigo: req.params.codigo},
                {$set: {
                    valorVenda: req.body.valorVenda !== undefined ? req.body.valorVenda : venda[0].valorVenda,
                    comprador: req.body.comprador !== undefined ? req.body.comprador : venda[0].comprador,
                    dataVenda: req.body.dataVenda !== undefined ? req.body.dataVenda : venda[0].dataVenda,
                    creci: req.body.creci !== undefined ? req.body.creci : venda[0].creci,
                    imovel: req.body.imovel !== undefined ? req.body.imovel : venda[0].imovel
                }}
            )
            return res.json(vendasUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Deleta uma venda
    public async deleteVenda(req: Request, res: Response): Promise<Response> {
        try {
            const vendaDeleted = await Venda.remove({codigo: req.params.codigo});
            return res.json(vendaDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new VendasController() ;