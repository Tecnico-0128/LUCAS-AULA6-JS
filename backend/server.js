import express from 'express'
import cors from 'cors'
import clienteRouter from './src/routes/clienteRouter.js'
import controleRouter from './src/routes/controleRouter.js'
import produtoRouter from './src/routes/produtoRouter.js'
import relatorioRouter from './src/routes/relatorioRouter.js'
import compraRouter from './src/routes/compraRouter.js'
import vendaRouter from './src/routes/vendaRouter.js'
import sequelize from './src/config/database.js'

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.use(express.json())

// Garante a conexão com o banco antes de processar as rotas
app.use(async (req, res, next) => {
    try {
        await sequelize.authenticate()
        next()
    } catch (erro) {
        console.error('Erro de conexão com o banco:', erro)
        res.status(500).json({ error: 'Falha ao conectar no banco de dados' })
    }
})

app.use('/cliente', clienteRouter)
app.use('/produto', produtoRouter)
app.use('/controle', controleRouter)
app.use('/relatorio', relatorioRouter) // Corrigido para relatorioRouter
app.use('/compra', compraRouter)
app.use('/venda', vendaRouter)

app.get('/health', (req, res) => {
    res.json({ message: "Servidizn rodando", success: true })
})

// Permite rodar localmente sem quebrar na Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000
    sequelize.sync().then(() => {
        app.listen(PORT, () => console.log(`Servidozin rodando na porta ${PORT}.`))
    })
}

export default app
