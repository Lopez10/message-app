import type { JwtToken } from './jwt-token.value-object';

export interface JwtTokenServicePort {
	generateToken(userId: string, email: string): JwtToken;
	verifyToken(token: string): JwtToken;
}
