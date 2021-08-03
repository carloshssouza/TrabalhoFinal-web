import { Schema, model, Document } from "mongoose";

interface CorretorComissionadoInterface extends Document{
    creci: string
    nomeCorretor: string
    tipo: string
    percentualComissao: number
}

const CorretorComissionadoSchema = new Schema<CorretorComissionadoInterface>({
    creci: {type: String, required: true, unique: true},
    nomeCorretor: { type: String, required: true}, 
    tipo: { type: String, required: true},
    percentualComissao: { type: Number, required: true},
}, {
    timestamps: true
})

export default model<CorretorComissionadoInterface>('CorretorComissionado', CorretorComissionadoSchema)