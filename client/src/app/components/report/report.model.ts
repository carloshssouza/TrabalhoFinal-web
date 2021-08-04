export interface Report {
    faturamento: number
    lucro: number
    qtdImoveisVendidos: number
    qtdImoveisEncalhados: number
    listaFaturamentoCorretores: []
    listaPagamento: []
    periodo: Date 
    funcionarioMes: []
}