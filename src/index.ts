import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from "./utils/logger";
import './config/db';
import path from 'path';

//import routes
import appRoute from "./api/routes/app.route";
import userRoute from "./api/routes/user.route";
import courierRoute from "./api/routes/courier.route";

//env config
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const app: Application = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', appRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/courier', courierRoute);

// start application
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info(`Server is running on port ${PORT}`);
});

export default app;
