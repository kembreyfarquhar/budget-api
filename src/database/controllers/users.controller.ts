import { Controller } from '../../types/Controller';
import { connection } from '../dbConnection';
import { User } from '../models/users.model';
import dotenv from 'dotenv';
import { sendError } from '../../utils/sendError';
import { Response } from 'express';
dotenv.config();

const environment = process.env.NODE_ENV;

/**
 * User Controller class that holds all methods
 * for making SQL queries to the users table
 */
class UserController implements Controller {
	tableName: string;
	public static tableName: string = 'users';
	connection = connection;

	public static find() {
		const query = connection.select('*').from(this.tableName).toQuery();
		console.log(query);

		return connection(this.tableName);
	}

	public static findById(id: string | number) {
		const query = connection.select('*').from(this.tableName).where({ id }).first().toQuery();
		console.log(query);

		return connection(this.tableName).where({ id }).first();
	}

	public static findByUsername(username: string) {
		const query = connection.select('*').from(this.tableName).where({ username }).first().toQuery();
		console.log(query);

		return connection(this.tableName).where({ username }).first();
	}

	public static async add(user: User) {
		const query = connection.insert(user).toQuery();
		console.log(query);

		const [newUser] = await connection(this.tableName).insert(user).returning('*');

		return environment === 'development' ? UserController.findById(newUser) : newUser;
	}

	public static remove(id: string | number) {
		const query = connection.where({ id }).del().toQuery();
		console.log(query);

		return connection(this.tableName).where({ id }).del();
	}
}

export { UserController };
