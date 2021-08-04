import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Imoveis from './routes/Imoveis.routes';
import Corretor from './routes/Corretor.routes';
import Vendas from './routes/Vendas.routes';
import Pagamento from './routes/Pagamento.routes'
import Relatorio from './routes/Relatorio.routes'

class App{
    public express: express.Application

    public constructor(){
        this.express = express()

        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares(): void{
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors())
    }

    private database(): void{
        mongoose.connect('mongodb://localhost:27017/trabalhofinal', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongodb Connected');
    }

    private routes(): void{
        this.express.use(Imoveis)
        this.express.use(Corretor)
        this.express.use(Vendas)
        this.express.use(Pagamento)
        this.express.use(Relatorio)
    }
}

export default new App().express

