import knex from 'knex';
const knexConfig = require('../../knexfile');
import dotenv from 'dotenv';
dotenv.config();

const environment = process.env.NODE_ENV;

// returns connection to db based on environment
const connection = knex(knexConfig[environment]);

export { connection };
