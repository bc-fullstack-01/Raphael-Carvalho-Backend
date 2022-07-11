const createError = require('http-errors')
const { Post, Connection } =  require('../ models')
module.exports = {                             
  beforeAll: (req,res,next)=>Promise.resolve()
    .then(() =>  Connection.then())
    .then(() => {
      // console.log(`Request from: ${req.originalUrl}`)
      // console.log(`Request type: ${req.method}`)
      // console.log(`Request params:${0bject.keys(req.body)}`)
      next()
    })
    .catch(err => next(err)),
  beforeById: (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => {
      // console.log(`Request from${req.params}`)
      // console.log(`Request type:${req.method)`)
      // console.log(`Request id:${id}`)
      next()
    })
    .catch(err => next(err)),
  list: (req,res,next) => Promise.resolve()
    .then(() => Post.find({}))
    .then((data) => {
      res.render('posts/list',{
        posts: data
    })
})
    .catch(err => next(err)),
  add: (req, res, next) => Promise.resolve()
    .then(() => new Post (req.body.post).save())
    .then((data) => {
      res.message('add post successfully!')
      res.redirect(`/v1/posts/${data._id}`)
})
  .catch(err => next(err)),
    show: (req, res, next) => Promise.resolve()
      .then(() => Post.findById(req.params.post).populate({
        path: 'comments'
      }))
      .then((data) => {
        if(data) {
          res.render('posts/show',{
            post: data
          })
        }else {
          next(createError(404))
        }
})
  .catch(err => next(err)),
  save: (req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    }))
  .then((data) =>{
    res.message('save post sucess!')
    res.redirect(`/v1/posts/${req.params.id}`)
    })
  .catch(err => next(err)),
  delete: (req, res, next) => Promise.resolve()
  .then(() => Post.deleteOne({_id: req.params.id}))
  .then(() => {
      res.message('delete postsucess!')
      res.redirect('/v1/posts')
    })
    .catch(err => next(err)),
    edit: (req, res, next) => Promise.resolve()
    .then(() => Post.findById(req.params.id))
    .then((data) => {
    res.render('posts/edit', {
      posts: data
    })
})
    .catch(err => next(err)),
    new: (req, res, next) => Promise.resolve()
    .then((data) => {
      res.render('posts/new', {post: new Post(res.locals.post) })
    })
    .catch(err => next(err))
  }
