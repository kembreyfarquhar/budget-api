import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('budget_items', tbl => {
		tbl.increments();

		tbl.string('title', 100).notNullable();

		tbl.decimal('amount', 8, 2).notNullable().defaultTo(0.0);

		tbl
			.integer('budget_id')
			.notNullable()
			.references('id')
			.inTable('budgets')
			.onUpdate('cascade')
			.onDelete('cascade');

		tbl
			.integer('category_id')
			.notNullable()
			.references('id')
			.inTable('budget_categories')
			.onUpdate('cascade')
			.onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('budget_items');
}
