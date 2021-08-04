import { Schema, model, Document } from "mongoose";

//Criação da estrutura do objeto CorretorContratado
interface CorretorContratadoInterface extends Document{
    creci: string
    nomeCorretor: string
    tipo: string
    salario: number
    dataAdmissao: Date
}

//Criação do Schema CorretorContratado
const CorretorContratadoSchema = new Schema<CorretorContratadoInterface>({
    creci: {type: String, required: true, unique: true},
    nomeCorretor: { type: String, required: true}, 
    tipo: { type: String, required: true},
    salario: { type: Number, required: true},
    dataAdmissao: { type: Date, required: true}
}, {
    timestamps: true
})

export default model<CorretorContratadoInterface>('CorretorContratado', CorretorContratadoSchema)