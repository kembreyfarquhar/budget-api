import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', tbl => {
		tbl.increments();

		tbl.string('username', 255).notNullable().unique();

		tbl.string('password').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('users');
}
