
const express = require('express');
const tagsRouter = express.Router();

tagsRouter.get('/tags', (req, res, next) => {
        console.log("A get request was made to /tag");
        res.send({"tags": []});
      });

module.exports = tagsRouter;