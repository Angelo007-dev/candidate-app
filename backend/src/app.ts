import "reflect-metadata";
import express from 'express';
import { responseInterceptor } from "./middlewares/responseInterceptor";
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import rateLimit from 'express-rate-limit';
import router from './modules/candidate/candidate.routes';
import logger from './utils/logger';
import qs from "qs";

const app = express();
app.set("query parser", (str: string) => qs.parse(str));
app.use(cors());

app.use(express.json());
app.use(responseInterceptor);
app.use(express.urlencoded({ extended: true }));

//logs 
app.use(pinoHttp({ logger }));

//rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

app.use('/api/candidate', router);

export default app;