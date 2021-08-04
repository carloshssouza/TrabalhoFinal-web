import { Schema, model, Document } from "mongoose";

//Criação da estrutura do objeto CorrretorComissionado
interface CorretorComissionadoInterface extends Document{
    creci: string
    nomeCorretor: string
    tipo: string
    percentualComissao: number
}

//Criação do Schema do CorretorComissionado
const CorretorComissionadoSchema = new Schema<CorretorComissionadoInterface>({
    creci: {type: String, required: true, unique: true},
    nomeCorretor: { type: String, required: true}, 
    tipo: { type: String, required: true},
    percentualComissao: { type: Number, required: true},
}, {
    timestamps: true
})

export default model<CorretorComissionadoInterface>('CorretorComissionado', CorretorComissionadoSchema)