import express from 'express';
import { UserController } from '../database/controllers/users.controller';
import { StatusCodes } from '../enums/StatusCodes';
import { sendError } from '../utils/sendError';
import { isUser } from '../database/middleware/users.middleware';

const usersRouter = express.Router();

/**
 * GET ALL USERS
 * @returns {users: <Partial>User[]}
 */
usersRouter.get('/', async (_req, res) => {
	try {
		let users = await UserController.find();
		users.forEach(user => delete user.password);
		res.status(StatusCodes.OK).json(users);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * GET USER BY ID
 * @param {id: string}
 * @returns {user: <Partial>User}
 */
usersRouter.get('/:id', isUser, async (req, res) => {
	const user = req.user;
	delete user.password;
	res.status(StatusCodes.OK).json(user);
});

/**
 * DELETE USER
 * @param {id: string}
 */
usersRouter.delete('/:id', isUser, async (req, res) => {
	const user = req.user;

	try {
		await UserController.remove(user.id);
		res.sendStatus(StatusCodes.NO_RESPONSE).end();
	} catch (err) {
		sendError.serverError(err, res);
	}
});

export { usersRouter };
