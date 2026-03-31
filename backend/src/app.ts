import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import rateLimit from 'express-rate-limit';
import router from './modules/candidate/candidate.routes';

const app = express();

app.use(cors());

//logs 
app.use(pinoHttp());

//rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

app.use('/api/candidates', router);

export default app;