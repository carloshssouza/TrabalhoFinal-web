import { Schema, model, Document } from "mongoose";

interface VendaInterface extends Document{
    valor_real_venda: number
    nome_comprador: string,
    data_venda: Date,
    corretor: any,
    imovel: any
}

const VendaSchema = new Schema<VendaInterface>({
    valor_real_venda: { type: Number, required: true},
    nome_comprador: { type: String, required: true}, 
    data_venda: { type: Date, required: true},
    corretor: { type: Schema.Types.String, ref: 'CorretorComissionado', required: true},
    imovel: { type: Schema.Types.String, ref:'Imovel', required: true}
}, {
    timestamps: true
})

export default model<VendaInterface>('VendaComissionado', VendaSchema)