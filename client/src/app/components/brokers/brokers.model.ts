export interface Brokers {
    id?: string
    nomeCorretor: string
    creci: string
    tipo: string
    salario?: number | null
    dataAdmissao?: Date | null
    percentualComissao?: number | null
}