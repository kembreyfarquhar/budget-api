import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('budgets', tbl => {
		tbl.increments();

		tbl.string('title', 100).notNullable();

		tbl
			.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('users')
			.onUpdate('cascade')
			.onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('budgets');
}
