import { Controller } from '../../types/Controller';
import { connection } from '../dbConnection';
import dotenv from 'dotenv';
import { BudgetItemType } from '../../types/BudgetItem';
dotenv.config();

const environment = process.env.NODE_ENV;

/**
 * Budget Item Controller class that holds all methods
 * for making SQL queries to the budget items table
 */
class BudgetItemConroller implements Controller {
	tableName: string;
	public static tableName: string = 'budget_items';
	connection = connection;

	public static findByBudgetId(budget_id: string | number) {
		return connection(this.tableName).where({ budget_id });
	}

	public static findById(id: string | number) {
		return connection(this.tableName).where({ id }).first();
	}

	public static findItemsinBudgetByCategory(
		category_id: string | number,
		budget_id: string | number
	) {
		return connection(this.tableName).where({ category_id }).and.where({ budget_id });
	}

	public static async add(budget_item: Partial<BudgetItemType>) {
		const [newBudgetItem] = await connection(this.tableName).insert(budget_item).returning('*');

		return environment === 'development'
			? BudgetItemConroller.findById(newBudgetItem)
			: newBudgetItem;
	}
}

export { BudgetItemConroller };
