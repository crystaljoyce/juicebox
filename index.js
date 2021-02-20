require('dotenv').config();
console.log(process.env.JWT_SECRET)

const PORT = 3000;
const express = require('express');
const server = express();
const { client } = require('./db');
client.connect();

const apiRouter = require('./api');

const bodyParser = require('body-parser');
server.use(bodyParser.json());


const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

  server.use('/api', apiRouter);

  
//   app.use('/api', (req, res, next) => {
//     console.log("A request was made to /api");
//     next();
//   });
  
//   app.get('/api', (req, res, next) => {
//     console.log("A get request was made to /api");
//     res.send({ message: "success" });
//   });

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });