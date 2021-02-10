import { Controller } from '../../types/Controller';
import { connection } from '../dbConnection';
import dotenv from 'dotenv';
import { BudgetType } from '../../types/Budget';
dotenv.config();

const environment = process.env.NODE_ENV;

/**
 * Budget Controller class that holds all methods
 * for making SQL queries to the budgets table
 */
class BudgetController implements Controller {
	tableName: string;
	public static tableName: string = 'budgets';
	connection = connection;

	public static find() {
		const query = connection.select('*').from(this.tableName).toQuery();
		console.log(query);

		return connection(this.tableName);
	}

	public static findById(id: string | number) {
		const query = connection.select('*').from(this.tableName).where({ id }).first().toQuery();
		console.log(query);

		return connection(this.tableName).where({ id }).first();
	}

	public static findUserBudgets(user_id: string | number) {
		return connection(this.tableName).where({ user_id });
	}

	public static findCategoryId(category: string) {
		return connection.raw(`select id from budget_categories where category="${category}"`);
	}

	public static async add(budget: Partial<BudgetType>) {
		const query = connection.insert(budget).toQuery();
		console.log(query);

		const [newBudget] = await connection(this.tableName).insert(budget).returning('*');

		return environment === 'development' ? BudgetController.findById(newBudget) : newBudget;
	}

	public static remove(id: string | number) {
		const query = connection.where({ id }).del().toQuery();
		console.log(query);

		return connection(this.tableName).where({ id }).del();
	}
}

export { BudgetController };
