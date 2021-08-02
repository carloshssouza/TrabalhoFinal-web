import {Request, Response} from 'express';
import CorretorComissionado from '../models/CorretorComissionado';
import CorretorContratado from '../models/CorretorContratado';

class CorretorComissionadoController{
    public async createCorretor(req: Request, res: Response):Promise<Response>{
        try {
            let exist = false;
            const check = await CorretorContratado.find({})
            for(let i = 0; i < check.length; i++) {
                if(check[i].numero_creci === req.body.numero_creci){
                    exist = true;
                    break;
                }
            }
            if(exist){
                return res.status(400).json({ message: 'Já existe um corretor com esse numero_creci'})
            } else{
                const corretorCreated = await CorretorComissionado.create({
                    numero_creci: req.body.numero_creci,
                    tipo: "comissionado",
                    nome: req.body.nome,
                    percentual_comissao: req.body.percentual_comissao
                });
                return res.status(201).json(corretorCreated);
            }
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
    
    public async getCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorComissionado.find({numero_creci: req.params.numero_creci});
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
            const corretor = await CorretorComissionado.find({numero_creci: req.params.numero_creci});
            const corretorUpdated = await CorretorComissionado.updateOne(
                {numero_creci: req.params.numero_creci},
                {$set: {
                    percentual_comissao: req.body.percentual_comissao !== undefined ? req.body.percentual_comissao : corretor[0].percentual_comissao
                }}
            )
            return res.status(200).json(corretorUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async deleteCorretor(req: Request, res: Response): Promise<Response> {
        try {
            const corretorDeleted = await CorretorComissionado.remove({numero_creci: req.params.numero_creci});
            return res.status(200).json(corretorDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new CorretorComissionadoController();