import { config } from 'dotenv';

config();

const MONGODB = process.env.MONGODB;
const SECRET_KEY = process.env.SECRET_KEY;

export { MONGODB, SECRET_KEY };
