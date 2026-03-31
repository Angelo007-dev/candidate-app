import mongoose from "mongoose";
import app from "./app";
import logger from './utils/logger';
import listEndpoints from 'express-list-endpoints';

import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/candidate-app"

mongoose.connect(MONGO_URI)
    .then(() => {
        logger.info('MongoDB connecté')
        app.listen(PORT, () => {
            logger.info(`Serveur tourne sur http://localhost:${PORT}`);

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