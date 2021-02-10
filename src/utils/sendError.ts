import { Response } from 'express';
import { StatusCodes } from '../enums/StatusCodes';

const sendError = {
	serverError(err: Error, res: Response) {
		res.status(StatusCodes.SERVER_FAILURE).json({
			error: err.toString(),
			message: err.message ? err.message : 'error processing request',
		});
	},
};

export { sendError };
