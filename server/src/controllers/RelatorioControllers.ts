import {Request, Response} from 'express';
import CorretorContratado from '../models/CorretorContratado';
import CorretorComissionado from '../models/CorretorComissionado';
import Imovel from '../models/Imovel';
import VendaComissionado from '../models/VendaComissionado';
import VendaContratado from '../models/VendaContratado';

class RelatorioControllers{
    public async gerarRelatorio(req: Request, res: Response):Promise<Response>{
        try {

            console.log(req.params.periodo)
            //Faturamento
            const periodoSplited = (req.params.periodo.split('-'));
            const dt = new Date(parseInt(periodoSplited[0]), parseInt(periodoSplited[1]));
            const ano = dt.getFullYear();
            const mes = dt.getMonth();
          
            const vendasContratado = await VendaContratado.find({});
            const vendasFiltradasContratados = vendasContratado.filter(value => {
                let temp = value.data_venda.toISOString().split('-');
                console.log(temp)
                if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                    return value;
                }
            })

            const vendasComissionado = await VendaComissionado.find({});
            const vendasFiltradasComissionados = vendasComissionado.filter(value => {
                let temp = value.data_venda.toISOString().split('-');
                if(parseInt(temp[0]) === ano && parseInt(temp[1]) === mes){
                    return value;
                }
            })

            const arrayFaturamentoContratado = vendasFiltradasContratados.length > 0 ?vendasFiltradasContratados.map(value => {
                return value.valor_real_venda * 0.05
            }) : 0;
            
            const arrayFaturamentoComissionado = vendasFiltradasComissionados.length > 0 ?vendasFiltradasComissionados.map(value =>{
                return value.valor_real_venda * 0.05
            }) : 0;
            
            let faturamentoContratado:number;
            if(arrayFaturamentoContratado != 0){
                 faturamentoContratado = arrayFaturamentoContratado.reduce((total, currentValue) => total + currentValue)
            } else {
                faturamentoContratado = 0;
            }

            let faturamentoComissionado:number;
            if(arrayFaturamentoComissionado != 0){
                faturamentoComissionado = arrayFaturamentoComissionado.reduce((total, currentValue) => total + currentValue);
            } else {
                faturamentoComissionado = 0;
            }
            const faturamento = faturamentoComissionado + faturamentoContratado;

            // A relação de imóveis vendidos
            const qtdImoveisVendidos = vendasFiltradasComissionados.length + vendasFiltradasContratados.length;

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
                for(let j = 0; j < vendasFiltradasContratados.length; j++){
                    if(corretorContratado[i].numero_creci === vendasFiltradasContratados[j].corretor){
                        faturamentoPorCorretor += vendasFiltradasContratados[j].valor_real_venda
                    }
                }
                listaFaturamentoCorretores.push({
                    nome: corretorContratado[i].nome,
                    tipo: corretorContratado[i].tipo,
                    faturamento: faturamentoPorCorretor
                });
            }

            for(let i = 0; i < corretorComissionado.length; i++){
                faturamentoPorCorretor = 0;
                for(let j = 0; j < vendasFiltradasComissionados.length; j++){
                    if(corretorComissionado[i].numero_creci === vendasFiltradasComissionados[j].corretor){
                        faturamentoPorCorretor += vendasFiltradasComissionados[j].valor_real_venda
                    }
                }
                listaFaturamentoCorretores.push({
                    nome: corretorComissionado[i].nome,
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
                for(let j = 0; j < vendasFiltradasContratados.length; j++){
                    if(corretorContratado[i].numero_creci === vendasFiltradasContratados[j].corretor){
                        comissao += vendasFiltradasContratados[j].valor_real_venda * 0.01
                    }
                }
                listaPagamento.push({
                    nome: corretorContratado[i].nome,
                    tipo: corretorContratado[i].tipo,
                    pagamento: corretorContratado[i].salario + comissao
                });
                
                listaComissao.push({
                    nome: corretorContratado[i].nome,
                    tipo: corretorContratado[i].tipo,
                    comissao: comissao
                })
            }

            for(let i = 0; i < corretorComissionado.length; i++){
                comissao = 0;
               
                for(let j = 0; j < vendasFiltradasComissionados.length; j++){
                    if(corretorComissionado[i].numero_creci === vendasFiltradasComissionados[j].corretor){
                        comissao += vendasFiltradasComissionados[j].valor_real_venda * corretorComissionado[i].percentual_comissao
                    }

                }
                listaPagamento.push({
                    nome: corretorComissionado[i].nome,
                    tipo: corretorComissionado[i].tipo,
                    pagamento: comissao
                });
                listaComissao.push({
                    nome: corretorComissionado[i].nome,
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
            });
        } catch (error) {
            return res.json({message: error});
        }
    }

    
}

export default new RelatorioControllers();

