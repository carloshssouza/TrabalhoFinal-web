import { Schema, model, Document } from "mongoose";

//Criação da estrutura do objeto Imovel
interface ImovelInterface extends Document{
    codigo: string //codigo
    tipo: string
    descricao: string
    nomeVendedor: string
    preco: number
    imagem1: string
    imagem2: string
    imagem3: string
    dataDeCadastro: Date
    vendido?: boolean
}

//Criação do Schema Imovel
const ImovelSchema = new Schema<ImovelInterface>({
    codigo: {type: String, required: true, unique: true}, //codigo
    tipo: { type: String, required: true},
    descricao: { type: String, required: true},
    nomeVendedor: { type: String, required: true},
    preco: { type: Number, required: true},
    imagem1: { type: String, required: true},
    imagem2: { type: String, required: true},
    imagem3: { type: String, required: true},
    dataDeCadastro: { type: Date, required: true},
    vendido: { type: Boolean}
}, {
    timestamps: true
});


export default model<ImovelInterface>('Imovel', ImovelSchema)