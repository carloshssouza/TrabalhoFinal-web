import {Request, Response} from 'express';
import CorretorContratado from '../models/CorretorContratado';
import CorretorComissionado from '../models/CorretorComissionado';
import Venda from '../models/Venda';

class PagamentoControllers{
    public async pagamentoDoMes(req: Request, res: Response): Promise<Response>{
        try {
            let comissao = 0;
            const corretor = await CorretorContratado.find({creci: req.params.creci});
            if(corretor.length > 0) {
                const periodoSplited = (req.params.periodo.split('-'));
                const dt = new Date(parseInt(periodoSplited[0]), parseInt(periodoSplited[1]));
                const ano = dt.getFullYear();
                const mes = dt.getMonth();
                const creci = req.params.creci
                
                const vendas = await Venda.find({});
                const vendasFiltradas = vendas.filter(value => {
                    let temp = value.dataVenda.toISOString().split('-');
                    if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                        return value;
                    }
                })
        
                for(let i = 0; i < vendasFiltradas.length; i++){
                    if(vendasFiltradas[i].creci === creci){
                        comissao += vendasFiltradas[i].valorVenda * 0.01
                    }
                }
                const response = {
                    nome: corretor[0].nomeCorretor,
                    tipo: corretor[0].tipo,
                    total_pagar: corretor[0].salario + comissao,
                    data: req.params.periodo
                }
                return res.json(response)
            } else{
                const corretor = await CorretorComissionado.find({creci: req.params.creci})
                const periodoSplited = (req.params.periodo.split('-'));
                const dt = new Date(parseInt(periodoSplited[0]), parseInt(periodoSplited[1]));
                const ano = dt.getFullYear();
                const mes = dt.getMonth();
                const creci = req.params.creci
                
                const vendas = await Venda.find({});
                const vendasFiltradas = vendas.filter(value => {
                    let temp = value.dataVenda.toISOString().split('-');
                    if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                        return value;
                    }
                })
        
                for(let i = 0; i < vendasFiltradas.length; i++){
                    if(vendasFiltradas[i].creci === creci){
                        comissao += vendasFiltradas[i].valorVenda * corretor[0].percentualComissao
                    }
                }
                const response = {
                    nome: corretor[0].nomeCorretor,
                    tipo: corretor[0].tipo,
                    total_pagar: comissao,
                    data: req.params.periodo
                }
                return res.json(response)
            }
        } catch (error) {
            return res.status(400).json({message: error})
        }  
    }
}
export default new PagamentoControllers();