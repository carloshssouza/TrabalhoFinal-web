import {Request, Response} from 'express';
import Imovel from '../models/Imovel';

class ImovelController{
   
    //Cria um imovel
    public async createImovel(req: Request, res: Response):Promise<Response>{
        try {
            const imovel = await Imovel.find({codigo: req.params.codigo})
            console.log(imovel)
            if(imovel.length > 0){
                return res.status(400).json({message: 'Ja existe um imovel com esse codigo'})
            } 
        
            const imovelCreated = await Imovel.create({
                codigo: req.body.codigo,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                nomeVendedor: req.body.nomeVendedor,
                preco: req.body.preco,
                imagem1: req.body.imagem1,
                imagem2: req.body.imagem2,
                imagem3: req.body.imagem3,
                dataDeCadastro: req.body.dataDeCadastro,
                vendido: false
            });
           
            return res.status(201).json(imovelCreated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
    
    //Consulta um imovel
    public async getImovel(req: Request, res: Response):Promise<Response>{
        try {
            const tipo = req.params.tipo;
            const imovel = await Imovel.find({tipo: tipo});
            return res.status(200).json(imovel);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Consulta todos imoveis disponiveis para venda
    public async getAllImovel(req: Request, res: Response):Promise<Response>{
        try {
            const imoveis = await Imovel.find({vendido: false});
            return res.status(200).json(imoveis);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Atualiza dados de um imovel
    public async updateImovel(req: Request, res: Response):Promise<Response>{
        try {
            const imovel = await Imovel.find({codigo: req.params.codigo});
            const data = {
                descricao: req.body.descricao !== undefined ? req.body.descricao : imovel[0].descricao,
                nomeVendedor: req.body.nomeVendedor !== undefined ? req.body.nomeVendedor : imovel[0].nomeVendedor,
                preco: req.body.preco !== undefined ? req.body.preco : imovel[0].preco,
                imagem1: req.body.imagem1 !== undefined ? req.body.imagem1 : imovel[0].imagem1,
                image2: req.body.image2 !== undefined ? req.body.imagem2 : imovel[0].imagem2,
                imagem3: req.body.imagem3 !== undefined ? req.body.imagem3 : imovel[0].imagem3,
                dataDeCadastro: req.body.dataDeCadastro !== undefined ? req.body.dataDeCadastro : imovel[0].dataDeCadastro
            }
            const imovelUpdated = await Imovel.updateOne(
                {codigo: req.params.codigo},
                {$set: data}
            )
            return res.status(200).json(imovelUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    //Deleta um imovel
    public async deleteImovel(req: Request, res: Response): Promise<Response> {
        try {
            const imovelDeleted = await Imovel.remove({codigo: req.params.codigo});
            return res.status(200).json(imovelDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new ImovelController();