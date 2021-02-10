import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('expenses', tbl => {
		tbl.increments();

		tbl.string('title', 60).notNullable();

		tbl.decimal('amount', 8, 2).notNullable();

		tbl
			.integer('budget_id')
			.notNullable()
			.references('id')
			.inTable('budgets')
			.onUpdate('cascade')
			.onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('expenses');
}
