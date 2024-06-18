import type { JwtToken } from './jwt-token.value-object';

export interface JwtTokenServicePort {
	generateToken(userId: string): JwtToken;
	verifyToken(token: string): JwtToken;
}
