import dotenv from 'dotenv';
dotenv.config();
import { User } from '../database/models/users.model';
import jsonwebtoken from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'secret';

// FUNCTION THAT GENERATES A JWT TOKEN
function genToken(user: Partial<User>) {
	const payload = {
		subject: user.id,
		username: user.username,
	};

	const options = {
		expiresIn: '1d',
	};

	return jsonwebtoken.sign(payload, secret, options);
}

export { genToken };
