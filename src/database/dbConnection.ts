import knex from 'knex';
const knexConfig = require('../../knexfile');
import dotenv from 'dotenv';
dotenv.config();

const environment = process.env.NODE_ENV;

const connection = knex(knexConfig[environment]);

export { connection };
