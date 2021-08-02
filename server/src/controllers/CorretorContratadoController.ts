import {Request, Response} from 'express';
import CorretorContratado from '../models/CorretorContratado'
import CorretorComissionado from '../models/CorretorComissionado'
import VendaContratado from '../models/VendaContratado'

class CorretorContratadoController{
    public async createCorretor(req: Request, res: Response):Promise<Response>{
        try {
            let exist = false;
            const check = await CorretorComissionado.find({})
            for(let i = 0; i < check.length; i++) {
                if(check[i].numero_creci === req.body.numero_creci){
                    exist = true;
                    break;
                }
            }
            if(exist){
                return res.status(400).json({ message: 'Já existe um corretor com esse numero_creci'});
            } else{
                const corretorCreated = await CorretorContratado.create({
                    numero_creci: req.body.numero_creci,
                    nome: req.body.nome,
                    tipo: "contratado",
                    salario: req.body.salario,
                    data_admissao: req.body.data_admissao
                });
                return res.json(corretorCreated);
            }
           
        } catch (error) {
            return res.json({message: error});
        }
    }
    
    public async getCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorContratado.find({numero_creci: req.params.numero_creci});
            return res.json(corretor);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async getAllCorretores(req: Request, res: Response):Promise<Response>{
        try {
            const corretores = await CorretorContratado.find({});
            return res.json(corretores);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async updateCorretor(req: Request, res: Response):Promise<Response>{
        try {
            const corretor = await CorretorContratado.find({numero_creci: req.params.numero_creci});
            const corretorUpdated = await CorretorContratado.updateOne(
                {numero_creci: req.params.numero_creci},
                {$set: {
                    salario: req.body.salario !== undefined ? req.body.salario : corretor[0].salario,
                }}
            )
            return res.json(corretorUpdated);
        } catch (error) {
            return res.json({message: error});
        }
    }

    public async deleteCorretor(req: Request, res: Response): Promise<Response> {
        try {
            const corretorDeleted = await CorretorContratado.remove({numero_creci: req.params.numero_creci});
            return res.json(corretorDeleted);
        } catch (error) {
            return res.json({message: error});
        }
    }
}

export default new CorretorContratadoController();