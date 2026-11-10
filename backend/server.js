import express from 'express'
import clienteRouter from './src/routes/clienteRouter.js'
import controleRouter from './src/routes/controleRouter.js'
import produtoRouter from './src/routes/produtoRouter.js'
import relatorioRouter from './src/routes/relatorioRouter.js'
import compraRouter from './src/routes/compraRouter.js'
import vendaRouter from './src/routes/vendaRouter.js'
import sequelize from './src/config/database.js'
import cors from 'cors';

const app = express()
app.use(express.json())
app.use('/cliente', clienteRouter)
app.use('/produto', produtoRouter)
app.use('/controle', controleRouter)
app.use('/relatorio', controleRouter)
app.use('/compra', compraRouter)
app.use('/venda', vendaRouter)
app.get('/health',(req, res) => {
    res.json({message: "Servidizn rodando",sucess: true})
})

try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(3000, () => console.log("Servidozin rodando."))
} catch(erro) {
    console.error('Falha ao inicar: ', erro)
    process.exit(1)
}