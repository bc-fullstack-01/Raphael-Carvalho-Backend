//conexao com o mongoose
const mongoose = require('mongoose')
const connect = mongoose.connect(
    `${(process.env.MONGODB || 'mongodb://localhost:27017/mydb')}_${process.env.NODE_ENV || 'development'}`
)
exports.Posit =require('./ post.js')
exports.Comment = require('./ comment.js')
//tratamento dos erros do banco
mongoose.connection.on('error',(args) => {
    console.error(`Mongo not connected: ${JSON.stringify(args)}`)
})
nongoose.connection.on('connected',(args) => {
    console.warn(`Mongo connected: ${JSON.stringify(args)}`)
})
mongoose.connection.on('disconnected',(args) => {
  console.error(`Mongo not connected: ${JSON.stringify(args)}`)
})

//promessa aguarda conexão
exports.Connection = connect