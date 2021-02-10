import { Controller } from '../../types/controller';
import { connection } from '../dbConnection';
import { User } from '../models/users.model';

class UserController implements Controller {
	tableName: string;
	public static tableName: string = 'users';
	connection = connection;

	public static find() {
		return connection(this.tableName);
	}

	public static async add(user: User) {
		const [newUser] = await connection(this.tableName).insert(user).returning('*');

		return newUser;
	}
}

export { UserController };
