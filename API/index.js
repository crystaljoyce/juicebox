
console.log(process.env.JWT_SECRET)
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;
const express = require('express');
const apiRouter = express.Router();

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.headers['Authorization'];

  if (!auth) {
    next(); 
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(data, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const postsRouter = require('./posts');
const tagsRouter = require('./tags');
apiRouter.use('/posts', postsRouter);
apiRouter.use('/tags', tagsRouter);
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;

