import { Schema, model, Document } from "mongoose";

interface CorretorContratadoInterface extends Document{
    numero_creci: string
    nome: string
    tipo: string
    salario: number
    data_admissao: Date
}

const CorretorContratadoSchema = new Schema<CorretorContratadoInterface>({
    numero_creci: {type: String, required: true, unique: true},
    nome: { type: String, required: true}, 
    tipo: { type: String, required: true},
    salario: { type: Number, required: true},
    data_admissao: { type: Date, required: true}
}, {
    timestamps: true
})

export default model<CorretorContratadoInterface>('CorretorContratado', CorretorContratadoSchema)