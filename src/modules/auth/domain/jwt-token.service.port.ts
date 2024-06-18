import type { JwtToken } from './jwt-token.value-object';

export interface ITokenService {
	generateToken(userId: string, email: string): JwtToken;
	verifyToken(token: string): JwtToken;
}
