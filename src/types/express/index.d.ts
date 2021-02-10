import { JWTToken } from '../JSONWebToken';
import { User } from '../../database/models/users.model';
import { Budget } from '../../database/models/budgets.model';

declare global {
	namespace Express {
		export interface Request {
			token: JWTToken;
			user: User;
			budget: Budget;
		}
	}
}
