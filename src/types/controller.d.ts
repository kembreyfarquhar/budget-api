import knex from 'knex';

export interface Controller {
	connection: knex<any, unknown[]>;
	tableName: string;
}
