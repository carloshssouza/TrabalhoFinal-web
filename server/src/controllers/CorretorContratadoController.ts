import {Request, Response} from 'express';
import CorretorContratado from '../models/CorretorContratado'
import CorretorComissionado from '../models/CorretorComissionado'

class CorretorContratadoController{
    public getRef():string{
        return 'CorretorContratado';
    }
    public async createCorretor(req: Request, res: Response):Promise<Response>{
        try {
            let exist = false;
            const check = await CorretorComissionado.find({})
            for(let i = 0; i < check.length; i++) {
                if(check[i].creci === req.body.creci){
                    exist = true;
                    break;
                }
            }
            if(exist){
                return res.status(400).json({ message: 'Já existe um corretor com esse creci'});
            } else{
                const corretorCreated = await CorretorContratado.create({
                    creci: req.body.creci,
                    nomeCorretor: req.body.nomeCorretor,
                    tipo: "contratado",
                    salario: req.body.salario,
                    dataAdmissao: req.body.dataAdmissao
                });
                return res.status(201).json(corretorCreated);
            }
           
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
    
    public async getCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorContratado.find({creci: req.params.creci});
           return res.status(200).json(corretor);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async getAllCorretores(req: Request, res: Response):Promise<Response>{
        try {
            const corretores = await CorretorContratado.find({});
           return res.status(200).json(corretores);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async updateCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorContratado.find({creci: req.params.creci});
            const corretorUpdated = await CorretorContratado.updateOne(
                {creci: req.params.creci},
                {$set: {
                    salario: req.body.salario !== undefined ? req.body.salario : corretor[0].salario,
                }}
            )
           return res.status(200).json(corretorUpdated);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

    public async deleteCorretor(req: Request, res: Response): Promise<Response> {
        try {
            const corretorDeleted = await CorretorContratado.remove({creci: req.params.creci});
            return res.status(200).json(corretorDeleted);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new CorretorContratadoController();