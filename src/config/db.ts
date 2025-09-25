import pg from 'pg';
import logger from "../utils/logger";
import path from 'path';
import dotenv from 'dotenv';

//env config
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

// test the database connection
const testConnection = async () => {
    try {
        await pool.connect();
        logger.info('Database connection established successfully');
    } catch (error) {
        logger.error('Database connection failed');
        logger.error(error);
    }
};

// test the connection
testConnection();

export default pool;
