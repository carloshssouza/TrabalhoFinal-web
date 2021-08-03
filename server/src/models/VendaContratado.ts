import { Schema, model, Document } from "mongoose";

interface VendaInterface extends Document{
    codigo: string
    valorVenda: number
    comprador: string,
    dataVenda: Date,
    nomeCorretor: any,
    imovel: any
}

const VendaSchema = new Schema<VendaInterface>({
    codigo: {type: String, required: true, unique: true},
    valorVenda: { type: Number, required: true},
    comprador: { type: String, required: true}, 
    dataVenda: { type: Date, required: true},
    nomeCorretor: { type: Schema.Types.String, ref: 'CorretorContratado', required: true},
    imovel: { type: Schema.Types.String, ref:'Imovel', required: true}
}, {
    timestamps: true
})

export default model<VendaInterface>('VendaContratado', VendaSchema)