import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import rateLimit from 'express-rate-limit';
import router from './modules/candidate/candidate.routes';
import logger from './utils/logger';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logs 
app.use(pinoHttp({ logger }));

//rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

app.use('/api/candidates', router);

export default app;