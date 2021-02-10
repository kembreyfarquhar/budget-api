export interface JWTToken {
	subject: number;
	username: string;
	iat: number;
	exp: number;
}
