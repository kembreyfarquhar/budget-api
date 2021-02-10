import { RequestHandler } from 'express';
import { sendError } from '../../utils/sendError';
import { StatusCodes } from '../../enums/StatusCodes';
import { BudgetController } from '../controllers/budgets.controller';

/**
 * MIDDLEWARE FOR CHECKING IF BUDGET EXISTS IN DATABASE
 * @param {id: query string param}
 */
export const isBudget: RequestHandler = async (req, res, next) => {
	const { id } = req.params;

	try {
		const budget = await BudgetController.findById(id);
		if (!budget)
			return res.status(StatusCodes.NOT_FOUND).json({ message: `budget ${id} not found` });
		else {
			req.budget = budget;
			next();
		}
	} catch (err) {
		sendError.serverError(err, res);
	}
};
