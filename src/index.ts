import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from "./utils/logger";
import './config/db';

//import routes
import appRoute from "./api/routes/app.route";

//env config
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', appRoute);

// start application
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info(`Server is running on port ${PORT}`);
});
