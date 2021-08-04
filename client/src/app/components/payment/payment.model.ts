export interface Payment {
    id?: number
    nome: string
    tipo: string
    data?: Date | null
    total_pagar?: number | null
}