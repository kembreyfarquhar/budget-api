import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('budget_categories', tbl => {
		tbl.increments();

		tbl.string('category').notNullable().defaultTo('expense');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('budget_categories');
}
