import express from 'express';
import { requireToken } from './database/middleware/requireToken';
// import dotenv from 'dotenv';
// dotenv.config();

// IMPORT ROUTERS
import { authRouter } from './routes/auth.routes';
import { usersRouter } from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

/**
 * All Routes Below this require Token Authorization
 * @param {token: JWTToken}
 */
app.use(requireToken);
app.use('/api/users', usersRouter);

export { app };
