import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserController } from '../database/controllers/users.controller';
import { User } from '../database/models/users.model';
import { StatusCodes } from '../enums/StatusCodes';
import { genToken } from '../utils/genToken';
import { isUser } from '../database/middleware/users.middleware';
import { sendError } from '../utils/sendError';

const authRouter = express.Router();

/**
 * REGISTER NEW USER
 * @param {user: USER}
 * @returns {newUser: <Partial>User}
 */
authRouter.post('/register', async (req: Request, res: Response) => {
	const user = new User();
	user.username = req.body.username;
	user.password = req.body.password;

	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	try {
		const addedUser = await UserController.add(user);
		delete addedUser.password;
		const token = genToken(addedUser);
		res.status(StatusCodes.CREATED).json({ token, user: { ...addedUser } });
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * LOGIN USER
 * @param {username: string}
 * @param {password: string}
 * @returns {user: <Partial>User}
 */
authRouter.post('/login', isUser, (req, res) => {
	const user = req.user;
	delete user.password;
	const token = genToken(user);
	res.status(StatusCodes.OK).json({ token, user: { ...user } });
});
export { authRouter };
