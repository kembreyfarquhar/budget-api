import express from 'express';
import { UserController } from '../database/controllers/users.controller';
import { StatusCodes } from '../enums/StatusCodes';
import { sendError } from '../utils/sendError';
import { isUser } from '../database/middleware/users.middleware';
import { BudgetController } from '../database/controllers/budgets.controller';

const usersRouter = express.Router();

/**
 * GET ALL USERS
 * @returns {users: Partial<User>[]}
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
 * @param {id: query string param}
 * @returns {user: Partial<User>}
 */
usersRouter.get('/:id', isUser, async (req, res) => {
	const user = req.user;
	delete user.password;
	res.status(StatusCodes.OK).json(user);
});

/**
 * GET ALL BUDGETS FOR GIVEN USER
 * @param {id: query string param}
 * @returns {budgets: Budget[]}
 */
usersRouter.get('/budgets/:id', isUser, async (req, res) => {
	const user_id = req.user.id;

	try {
		const budgets = await BudgetController.findUserBudgets(user_id);
		res.status(StatusCodes.OK).json(budgets);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * DELETE USER
 * @param {id: query string param}
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
