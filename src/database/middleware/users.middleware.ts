import { RequestHandler } from 'express';
import { sendError } from '../../utils/sendError';
import { StatusCodes } from '../../enums/StatusCodes';
import { UserController } from '../controllers/users.controller';

/**
 * MIDDLEWARE FOR CHECKING IF USER EXISTS IN DATABASE
 * @param {id: query string param}
 * @param {username: string body param}
 */
export const isUser: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const { username } = req.body;

	try {
		let user;
		if (id) {
			user = await UserController.findById(id);
		} else {
			user = await UserController.findByUsername(username);
		}
		if (!user)
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: `user ${id ? id : username} not found` });
		else {
			req.user = user;
			next();
		}
	} catch (err) {
		sendError.serverError(err, res);
	}
};
