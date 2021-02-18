
const express = require('express');
const postsRouter = express.Router();

postsRouter.get('/posts', (req, res, next) => {
        console.log("A get request was made to /api");
        res.send({"posts": []});
      });

module.exports = postsRouter;