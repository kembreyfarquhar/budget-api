import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('budget_categories').insert([
		{ id: 1, category: 'expense' },
		{ id: 2, category: 'income' },
	]);
}
