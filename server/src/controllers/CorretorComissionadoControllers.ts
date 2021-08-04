import {Request, Response} from 'express';
import CorretorComissionado from '../models/CorretorComissionado';
import CorretorContratado from '../models/CorretorContratado';

class CorretorComissionadoController{

    public async createCorretor(req: Request, res: Response):Promise<Response>{
        try {
            let exist = false;
            const check = await CorretorContratado.find({})
            for(let i = 0; i < check.length; i++) {
                if(check[i].creci === req.body.creci){
                    exist = true;
                    break;
                }
            }
            if(exist){
                return res.status(400).json({ message: 'Já existe um corretor com esse creci'})
            } else{
                const corretorCreated = await CorretorComissionado.create({
                    creci: req.body.creci,
                    tipo: "comissionado",
                    nomeCorretor: req.body.nomeCorretor,
                    percentualComissao: req.body.percentualComissao / 100
                });
                return res.status(201).json(corretorCreated);
            }
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
    
    public async getCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorComissionado.find({creci: req.params.creci});
            return res.status(200).json(corretor);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async getAllCorretores(req: Request, res: Response):Promise<Response>{
        try {
            const corretores = await CorretorComissionado.find({});
            return res.status(200).json(corretores);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async updateCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorComissionado.find({creci: req.params.creci});
            const corretorUpdated = await CorretorComissionado.updateOne(
                {creci: req.params.creci},
                {$set: {
                    percentualComissao: req.body.percentualComissao !== undefined ? req.body.percentualComissao : corretor[0].percentualComissao
                }}
            )
            return res.status(200).json(corretorUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async deleteCorretor(req: Request, res: Response): Promise<Response> {
        try {
            const corretorDeleted = await CorretorComissionado.remove({creci: req.params.creci});
            return res.status(200).json(corretorDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new CorretorComissionadoController();