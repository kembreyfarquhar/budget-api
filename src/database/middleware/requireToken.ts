import { RequestHandler } from 'express';
import { JWTToken } from '../../types/JSONWebToken';
import jsonwebtoken from 'jsonwebtoken';
import { StatusCodes } from '../../enums/StatusCodes';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

const requireToken: RequestHandler = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jsonwebtoken.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
			} else {
				req.token = decodedToken as JWTToken;
				next();
			}
		});
	} else {
		res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Please provide a token' });
	}
};

export { requireToken };
