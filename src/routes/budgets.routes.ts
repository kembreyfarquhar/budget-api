import express from 'express';
import { BudgetController } from '../database/controllers/budgets.controller';
import { BudgetItemConroller } from '../database/controllers/budgetItems.controller';
import { Budget } from '../database/models/budgets.model';
import { StatusCodes } from '../enums/StatusCodes';
import { sendError } from '../utils/sendError';
import { isBudget } from '../database/middleware/budgets.middleware';

const budgetsRouter = express.Router();

/**
 * GET ALL BUDGETS
 * @returns {budgets: Budgets[]}
 */
budgetsRouter.get('/', async (_req, res) => {
	try {
		let budgets = await BudgetController.find();
		res.status(StatusCodes.OK).json(budgets);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * GET BUDGET BY ID
 * @param {id: query string param}
 * @returns {budget: Budget}
 */
budgetsRouter.get('/:id', isBudget, async (req, res) => {
	const budget = req.budget;
	res.status(StatusCodes.OK).json(budget);
});

/**
 * GET ALL BUDGET ITEMS BY BUDGET ID
 * @param {id: query string param}
 * @returns {budgets: Budget[]}
 */
budgetsRouter.get('/items/:id', isBudget, async (req, res) => {
	const budget_id = req.budget.id;

	try {
		const items = await BudgetItemConroller.findByBudgetId(budget_id);
		res.status(StatusCodes.OK).json(items);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * GET ALL EXPENSES BY BUDGET ID
 * @param {id: query string param (budget id)}
 */
budgetsRouter.get('/expenses/:id', isBudget, async (req, res) => {
	const budget_id = req.budget.id;

	try {
		const expenses = await BudgetItemConroller.findItemsinBudgetByCategory(1, budget_id);
		res.status(StatusCodes.OK).json(expenses);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * GET ALL INCOME BY BUDGET ID
 * @param {id: query string param (budget id)}
 */
budgetsRouter.get('/income/:id', isBudget, async (req, res) => {
	const budget_id = req.budget.id;

	try {
		const income = await BudgetItemConroller.findItemsinBudgetByCategory(2, budget_id);
		res.status(StatusCodes.OK).json(income);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * GET FULL BUDGET
 */
budgetsRouter.get('/full/:id', isBudget, async (req, res) => {
	const budget_id = req.budget.id;
	let budget = req.budget;
	try {
		let income = await BudgetItemConroller.findItemsinBudgetByCategory(2, budget_id);
		let expenses = await BudgetItemConroller.findItemsinBudgetByCategory(1, budget_id);
		let income_total = income.reduce((acc, curr) => {
			return acc + curr.amount;
		}, 0.0);
		let expenses_total = expenses.reduce((acc, curr) => {
			return acc + curr.amount;
		}, 0.0);
		let budget_total = income_total - expenses_total;
		const total = parseFloat(budget_total.toString()).toFixed(2);
		const iTotal = parseFloat(income_total.toString()).toFixed(2);
		const eTotal = parseFloat(expenses_total.toString()).toFixed(2);
		income_total = Number(iTotal);
		expenses_total = Number(eTotal);
		budget_total = Number(total);
		const totals = { budget_total, income_total, expenses_total };
		res.status(StatusCodes.OK).json({ totals, budget, income, expenses });
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * ADD NEW BUDGET
 * @param {user_id: body number param}
 * @param {title: body string param}
 * @returns {budget: Budget}
 */
budgetsRouter.post('/', async (req, res) => {
	const budget = new Budget();
	budget.user_id = req.body.user_id;
	budget.title = req.body.title;

	try {
		const addedBudget = await BudgetController.add(budget);
		res.status(StatusCodes.CREATED).json(addedBudget);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * ADD ITEM TO BUDGET
 */
budgetsRouter.post('/items/:id', isBudget, async (req, res) => {
	const budget_id = req.budget.id;
	const { amount, title, category } = req.body;

	try {
		let category_id = await BudgetController.findCategoryId(category);
		category_id = category_id[0].id;
		const newBudgetItem = await BudgetItemConroller.add({ budget_id, amount, title, category_id });
		res.status(StatusCodes.CREATED).json(newBudgetItem);
	} catch (err) {
		sendError.serverError(err, res);
	}
});

/**
 * DELETE BUDGET
 * @param {id: query string param}
 */
budgetsRouter.delete('/:id', isBudget, async (req, res) => {
	const budget = req.budget;

	try {
		await BudgetController.remove(budget.id);
		res.sendStatus(StatusCodes.NO_RESPONSE).end();
	} catch (err) {
		sendError.serverError(err, res);
	}
});

export { budgetsRouter };
