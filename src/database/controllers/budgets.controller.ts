import { Controller } from '../../types/Controller';
import { connection } from '../dbConnection';
import { Budget } from '../models/budgets.model';
import dotenv from 'dotenv';
dotenv.config();

const environment = process.env.NODE_ENV;

/**
 * Budget Controller class that holds all methods
 * for making SQL queries to the budgets table
 */
class BudgetController implements Controller {
	tableName: string;
	public static tableName: string = 'users';
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

	public static async add(budget: Budget) {
		const query = connection.insert(budget).toQuery();
		console.log(query);

		const [newBudget] = await connection(this.tableName).insert(budget).returning('*');

		return environment === 'development' ? BudgetController.findById(newBudget) : newBudget;
	}
}

export { BudgetController };
