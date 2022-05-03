const express = require('express');
const app = express();
const porta = 3000;
var listaClientes = [];

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({'mensagem': 'Consulta realizada'})})

app.get('/listaClientes', (req, res) => {
    res.status(200).json(listaClientes);
})

app.delete('/deletaCliente', (req, res) => {
    if (listaClientes.at(req.query.numero) === undefined){
        res.status(404).json({mensage: `Usuário com ID não encontrado`})
        return;
    }

    listaClientes.splice(req.query.numero, 1)
    res.status(200).json({mensage: `Cliente deletado com sucesso`})
})

app.post('/cadastracliente', (req,res) => {
    const nome = req.body.nome
    const telefone = req.body.telefone
    if(!nome){
        res.status(422).json({mensage: `Campo nome é obrigatório`})
        return
    }
    listaClientes.push(req.body);
    console.log(`Cadastrado: ${nome} com o telefone ${telefone}`)
    res.status(201).json({'mensagem': `Cliente ${nome} cadastrado`})
})

app.listen(porta, () => {console.log(`Rodando na porta ${porta}`)})