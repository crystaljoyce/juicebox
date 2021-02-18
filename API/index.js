
const express = require('express');
const apiRouter = express.Router();
const postsRouter = require('./posts');
const tagsRouter = require('./tags');
apiRouter.use('/posts', postsRouter);
apiRouter.use('/tags', tagsRouter);


const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;