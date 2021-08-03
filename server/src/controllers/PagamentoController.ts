import {Request, Response} from 'express';
import CorretorContratado from '../models/CorretorContratado';
import CorretorComissionado from '../models/CorretorComissionado';
import VendaComissionado from '../models/VendaComissionado';
import VendaContratado from '../models/VendaContratado';

class PagamentoControllers{
    public async pagamentoDoMesContratado(req: Request, res: Response): Promise<Response>{
        try {
            let comissao = 0;
        
            const periodoSplited = (req.params.periodo.split('-'));
            const dt = new Date(parseInt(periodoSplited[0]), parseInt(periodoSplited[1]));
            const ano = dt.getFullYear();
            const mes = dt.getMonth();
            const creci = req.params.creci
            const corretor = await CorretorContratado.find({creci: req.params.creci});
            const vendas = await VendaContratado.find({});
            const vendasFiltradas = vendas.filter(value => {
                let temp = value.dataVenda.toISOString().split('-');
                if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                    return value;
                }
            })
    
            for(let i = 0; i < vendasFiltradas.length; i++){
                if(vendasFiltradas[i].nomeCorretor === creci){
                    comissao += vendasFiltradas[i].valorVenda * 0.01
                }
            }
            const response = {
                nome: corretor[0].nomeCorretor,
                tipo: corretor[0].tipo,
                total_pagar: corretor[0].salario + comissao
            }
            return res.json(response)
        } catch (error) {
            return res.status(400).json({message: error})
        }
       
    }
    public async pagamentoDoMesComissionado(req: Request, res: Response): Promise<Response>{
        try {
            let comissao = 0;
            console.log(req.params.periodo)
            const periodoSplited = (req.params.periodo.split('-'));
            const dt = new Date(parseInt(periodoSplited[0]), parseInt(periodoSplited[1]));
            const ano = dt.getFullYear();
            const mes = dt.getMonth();
            
            const corretor = await CorretorComissionado.find({creci: req.params.creci});
            const vendas = await VendaComissionado.find({});
            
            const vendasFiltradas = vendas.filter(value => {
                let temp = value.dataVenda.toISOString().split('-');
                if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                    console.log(value.dataVenda)
                    return value;
                }
            })
        
            for(let i = 0; i < vendasFiltradas.length; i++){
                if(vendasFiltradas[i].nomeCorretor === req.params.creci){
                    comissao += vendasFiltradas[i].valorVenda * corretor[0].percentualComissao
                }
            }
            const response = {
                nome: corretor[0].nomeCorretor,
                tipo: corretor[0].tipo,
                total_pagar: comissao
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json({ message: error})
        }
        
    }
}
export default new PagamentoControllers();