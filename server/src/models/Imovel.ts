import { Schema, model, Document } from "mongoose";

interface ImovelInterface extends Document{
    codigo: string //codigo
    tipo: string
    descricao: string
    nome_vendedor: string
    preco_solicitado: number
    url1: string
    url2: string
    url3: string
    data_cadastro: Date
    vendido: boolean
}

const ImovelSchema = new Schema<ImovelInterface>({
    codigo: {type: String, required: true, unique: true}, //codigo
    tipo: { type: String, required: true},
    descricao: { type: String, required: true},
    nome_vendedor: { type: String, required: true},
    preco_solicitado: { type: Number, required: true},
    url1: { type: String, required: true},
    url2: { type: String, required: true},
    url3: { type: String, required: true},
    data_cadastro: { type: Date, required: true},
    vendido: { type: Boolean, required: true}
}, {
    timestamps: true
});


export default model<ImovelInterface>('Imovel', ImovelSchema)