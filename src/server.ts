import express from 'express';
import 'express-async-errors';
import './database/connection';
import routes from './routes';
import path from 'path'
import errorHandler from './errors/handler';
import cors from 'cors'
const app = express();
app
    .use(cors())
    .use(express.json())
    .use(routes)
    .use('/uploads',express.static(path.join(__dirname,'..','uploads')))
    .use(errorHandler)
    .listen(3333);

