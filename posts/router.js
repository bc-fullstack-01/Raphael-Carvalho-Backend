const express = require('express')
const router = express.Router();

module.exports = (pid) => {
    router.route("/")
.all((req, res, next) => {
//midleware de all
 console.log(`Request on : ${pid}`)
 console.log(`Request from : ${req.originalUrl}`)
 console.log(`Request type : ${req.method}`)
 console.log(`Request params : ${req.params}`)
// empurra pro proximo midlleware da mesma rota
 next();

 })

 .get((req, res) => {
 console.log(req.params)
 res.send(JSON.stringify([]))
 res.status(200)
 //Finaliza o envio da requisição, evita chmadas indevidas retorna com um erro caaso force
 res.end()

 })

 .post((req, res) => {
 console.log(JSON.stringify(req.body))
 res.status(201)
 res.end()

 })
 
router
 .param('id', (req, res, next, id) => {
 console.log(`Request from : ${req.params}`)
 console.log(`Request type : ${req.method}`)
 console.log(`Request id : ${id}`)
 next()

 })

 .route("/:id")
 .get((req, res) => {
 console.log(req.params)
 res.send(JSON.stringify({}))
 res.status(200)
 res.end()

 })

 .put((req, res) => {
 console.log(req.body)
 res.status(203)
 res.end()

 })

 .delete((req, res) => {
 res.status(203)
 res.end()

 })
 
 return router
 
}

