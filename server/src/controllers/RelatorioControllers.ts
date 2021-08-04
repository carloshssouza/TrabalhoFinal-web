import {Request, Response} from 'express';
import CorretorContratado from '../models/CorretorContratado';
import CorretorComissionado from '../models/CorretorComissionado';
import Imovel from '../models/Imovel';
import Venda from '../models/Venda';

class RelatorioControllers{
    public async gerarRelatorio(req: Request, res: Response):Promise<Response>{
        try {

            //Faturamento
            const periodoSplited = (req.params.periodo.split('-'));
            const dt = new Date(parseInt(periodoSplited[0]), parseInt(periodoSplited[1]));
            const ano = dt.getFullYear();
            const mes = dt.getMonth();
          
            const vendas = await Venda.find({});
            const vendasFiltradas = vendas.filter(value => {
                let temp = value.dataVenda.toISOString().split('-');
                if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                    return value;
                }
            })

            const arrayFaturamento = vendasFiltradas.length > 0 ? vendasFiltradas.map(value => {
                return value.valorVenda * 0.05
            }) : 0;
            
            
            let faturamento;
            if(arrayFaturamento != 0){
                 faturamento = arrayFaturamento.reduce((total, currentValue) => total + currentValue)
            } else {
                faturamento = 0;
            }

            // A relação de imóveis vendidos
            const qtdImoveisVendidos = vendasFiltradas.length

            // A relação de imoveis encalhados
            const imoveisEncalhados = await Imovel.find({vendido: false});
            const qtdImoveisEncalhados = imoveisEncalhados.length;

            //Faturamento de cada corretor
            const corretorContratado = await CorretorContratado.find({});
            const corretorComissionado = await CorretorComissionado.find({});
            const listaFaturamentoCorretores = [];
            let faturamentoPorCorretor:number;

            for(let i = 0; i < corretorContratado.length; i++){
                faturamentoPorCorretor = 0;
                for(let j = 0; j < vendasFiltradas.length; j++){
                    if(corretorContratado[i].creci === vendasFiltradas[j].creci){
                        faturamentoPorCorretor += vendasFiltradas[j].valorVenda
                    }
                }
                listaFaturamentoCorretores.push({
                    nome: corretorContratado[i].nomeCorretor,
                    tipo: corretorContratado[i].tipo,
                    faturamento: faturamentoPorCorretor
                });
            }

            for(let i = 0; i < corretorComissionado.length; i++){
                faturamentoPorCorretor = 0;
                for(let j = 0; j < vendasFiltradas.length; j++){
                    if(corretorComissionado[i].creci === vendasFiltradas[j].creci){
                        faturamentoPorCorretor += vendasFiltradas[j].valorVenda
                    }
                }
                listaFaturamentoCorretores.push({
                    nome: corretorComissionado[i].nomeCorretor,
                    tipo: corretorComissionado[i].tipo,
                    faturamento: faturamentoPorCorretor
                });
            }

            //Valor pago a cada corretor e Corretor do Mes
            const listaPagamento = [];
            const listaComissao = [];
            let comissao:number;
            
            for(let i = 0; i < corretorContratado.length; i++){
                comissao = 0;
                for(let j = 0; j < vendasFiltradas.length; j++){
                    if(corretorContratado[i].creci === vendasFiltradas[j].creci){
                        comissao += vendasFiltradas[j].valorVenda * 0.01
                    }
                }
                listaPagamento.push({
                    nome: corretorContratado[i].nomeCorretor,
                    tipo: corretorContratado[i].tipo,
                    pagamento: corretorContratado[i].salario + comissao
                });
                
                listaComissao.push({
                    nome: corretorContratado[i].nomeCorretor,
                    tipo: corretorContratado[i].tipo,
                    comissao: comissao
                })
            }

            for(let i = 0; i < corretorComissionado.length; i++){
                comissao = 0;
               
                for(let j = 0; j < vendasFiltradas.length; j++){
                    if(corretorComissionado[i].creci === vendasFiltradas[j].creci){
                        comissao += vendasFiltradas[j].valorVenda * corretorComissionado[i].percentualComissao
                    }

                }
                listaPagamento.push({
                    nome: corretorComissionado[i].nomeCorretor,
                    tipo: corretorComissionado[i].tipo,
                    pagamento: comissao
                });
                listaComissao.push({
                    nome: corretorComissionado[i].nomeCorretor,
                    tipo: corretorComissionado[i].tipo,
                    comissao
                })
            }

             //Lucro
             const pagamentos = listaPagamento.map(value => value.pagamento)
             const totalPagamentos = pagamentos.reduce((total, currentValue) => total + currentValue);
             const lucro = faturamento - totalPagamentos
        
            //Pegando o funcionario do mes
            const maiorComissao = Math.max.apply(Math, listaComissao.map(value => value.comissao));
            const funcionarioMes = listaComissao.filter(value => value.comissao === maiorComissao)
            return res.json({
                faturamento,
                lucro,
                qtdImoveisVendidos,
                qtdImoveisEncalhados,
                listaFaturamentoCorretores,
                listaPagamento,
                funcionarioMes,
                periodo: req.params.periodo
            });
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }
}

export default new RelatorioControllers();

