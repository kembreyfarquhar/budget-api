import dotenv from 'dotenv';
dotenv.config();

module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './src/database/dev.sqlite3',
		},
		migrations: {
			directory: './src/database/migrations',
		},
		seeds: {
			directory: './src/database/seeds',
		},
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10,
		},
		useNullAsDefault: true,
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/database/migrations',
		},
		seeds: {
			directory: './src/database/seeds',
		},
	},
};
