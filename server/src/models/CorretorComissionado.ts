import { Schema, model, Document } from "mongoose";

interface CorretorComissionadoInterface extends Document{
    numero_creci: string
    nome: string
    tipo: string
    percentual_comissao: number
}

const CorretorComissionadoSchema = new Schema<CorretorComissionadoInterface>({
    numero_creci: {type: String, required: true, unique: true},
    nome: { type: String, required: true}, 
    tipo: { type: String, required: true},
    percentual_comissao: { type: Number, required: true},
}, {
    timestamps: true
})

export default model<CorretorComissionadoInterface>('CorretorComissionado', CorretorComissionadoSchema)