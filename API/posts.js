
const postsRouter = express.Router();

const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const bodyParser = require('body-parser');

server.use(bodyParser.json());

server.us((req, res, next) => {
    console.log('body is now: ', req.body)
})

module.export = postsRouter