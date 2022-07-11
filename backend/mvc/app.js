const path = require('path')

const express = require('express');
const bodyParser = require('body-Parser')
const methodOverride = require ('method-override')
const session = require ('express-session')
const logger = require('morgan')
const createError = require('http-errors')
//rotas em arquivo separado
const routers =  require('./routers');
const { read } = require('fs');

// instanciando o express
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')





//Função personalizada
app.response.messages = function (msg) {
//recupera a sessao do usuario a cada atualizacao .this
    const sess = this.req.session

    sess.messages = sess.messages || []
    sess.messages.push[msg]
    return this
}



app.use(express.urlencoded({
  extended: true
  }))

app.use(bodyParser.json())

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}))

//Middleware customizado
app.use(function(req, res, next){
  // expose "error" local variable
  res.locals = Object.assign(res.locals, req.session.form)
  res.locals.errors = Object.assign([], res.locals, req.session.errors)
  res.locals.messages = Object.assign([], res.locals, req.session.messages)
  next()

  //middlware
  req.session.errors = []
  req.session.messages = []
  req.session.form = []
  })

  app.use(logger(process.env.NODE_ENV || 'dev'))


  app.get('/', (req, res) => res.redirect('/v1/posts'))
  app.use('v1', routers)


  app.use(function (req, res, next){
    const err = createError(404)
    next(err)
  })

  app.use(function(err, req,res, next) {
    //mongoose valitator e tratamento de erros
    if (err.name && err.name === 'validationError') {

      const lastview = req.headers.referer.replace(`${req.headers.origin}/`,'/')

      read.session.form = req.body

      req.session.errors = Object.entries(err.errors).map(([, obj]) => obj)
      req.session.messages.push(err.message)

      res.redirect(lastView)
    } else if ((err.status && err.status === 404) || (err.name && err.name == 'CastError')) {
      res.status(404).render('404',{
        url: req.originalUrl
      })
    } else {

      res.status(err.status || 500).render('5xx' , {err})
    }
  })

  module.exports = app