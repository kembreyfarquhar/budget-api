import express, { Request, Response } from 'express';
import { UserController } from '../database/controllers/users.controller';
import bcrypt from 'bcryptjs';
import { User } from '../database/models/users.model';

const usersRouter = express.Router();

/**
 * GET ALL USERS
 * @returns {users: User[]}
 */
usersRouter.get('/', async (req: Request, res: Response) => {
	try {
		let users = await UserController.find();
		users.forEach(user => delete user.password);
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({
			error: err.toString(),
			message: err.message ? err.message : 'error processing request',
		});
	}

	/**
	 * ADD NEW USER
	 * @param {user: User}
	 * @returns {newUser: User}
	 */
	usersRouter.post('/register', async (req: Request, res: Response) => {
		const user = new User();
		user.username = req.body.username;
		user.password = req.body.password;

		const hash = bcrypt.hashSync(user.password, 10);
		user.password = hash;

		try {
			const addedUser = await UserController.add(user);
			delete addedUser.password;
			res.status(201).json(addedUser);
		} catch (err) {
			res.status(500).json({
				error: err.toString(),
				message: err.message ? err.message : 'error processing request',
			});
		}
	});
});

export { usersRouter };
