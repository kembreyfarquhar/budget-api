import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { usersRouter } from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);

export { app };
