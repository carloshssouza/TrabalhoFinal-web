import { Schema, model, Document } from "mongoose";

//Criação da estrutura do objeto Venda
interface VendaInterface extends Document{
    codigo: string
    valorVenda: number
    comprador: string
    dataVenda: Date
    creci: any
    onModel: any
    imovel: any
}
 
//Criação do Schema Venda
const VendaSchema = new Schema<VendaInterface>({
    codigo: {type: String, required: true, unique: true},
    valorVenda: { type: Number, required: true},
    comprador: { type: String, required: true}, 
    dataVenda: { type: Date, required: true},
    creci: { type: Schema.Types.String, required: true, refPath: 'onModel'},
    onModel: { type: String, required: true, enum: ['CorretorContratado', 'CorretorComissionado']},
    imovel: { type: Schema.Types.String, ref:'Imovel', required: true}
}, {
    timestamps: true
})

export default model<VendaInterface>('Venda', VendaSchema)