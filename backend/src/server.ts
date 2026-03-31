import mongoose from "mongoose";
import app from "./app";
import logger from './utils/logger';
import listEndpoints from 'express-list-endpoints';

import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "0.0.0.0"
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/candidate-app"

mongoose.connect(MONGO_URI)
    .then(() => {
        logger.info('MongoDB connecté')
        app.listen(Number(PORT), HOST, () => {
            logger.info(`Serveur tourne sur http://${HOST}:${PORT}`);

            const endpoints = listEndpoints(app);

            logger.info("Routes :");
            endpoints.forEach(route => {
                route.methods.forEach(method => {
                    logger.info(`   [${method}] ${route.path}`);
                });
            });
        });
    })
    .catch((err) => {
        logger.error('La connexion a échouée', err);
        process.exit(1);
    })