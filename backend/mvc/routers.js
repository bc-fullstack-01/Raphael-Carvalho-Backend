const express = require('express');

const {
  PostController,
  commentController
} = require('./controllers')

const router = express.Router();

router
  .route('/posts')
  .all(PostController.beforeAll)
  .get(PostController.list)
  .post(PostController.add)
router
  .route('/posts/new')
  .get(PostController.new)

router
  .param('id', PostController.beforeById)
  .route('/posts/:id')
  .get(PostController.show)
  .put(PostController.save)
  .delete(PostController.delete)

router
  .param('id', PostController.beforeById)
  .route('/posts/:id/edit')
  .get(PostController.edit)

const nRouter = express.Router()

nRouter
    .param('postID', commentController.beforeById)
    .route('/:postId/comments')
    .all(commentController.beforeAll)
    .get(commentController.list)
    .post(commentController.add)
nRouter
    .route('/:postId/comments/new')
    .get(CommentController.new)
nRouter
    .param('id',CommentController.beforeById)
    .route('/:postId/comments/:id')
    .get(CommentController.show)
    .put(CommentController.save)
    .delete(CommentController.delete)
    .post(CommentController.add)
nRouter
    .param('id',CommentController.beforeById)
    .route('/:postId/comments/:id/edit')
    .get(CommentController.edit)

router.use('/:posts', nRouter)