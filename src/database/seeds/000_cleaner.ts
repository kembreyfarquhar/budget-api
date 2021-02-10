import * as Knex from 'knex';
import cleaner from 'knex-cleaner';

export async function seed(knex: Knex): Promise<void> {
	await cleaner.clean(knex, {
		mode: 'truncate',
		ignoreTables: ['knex_migrations', 'knex_migrations-lock'],
	});
}
