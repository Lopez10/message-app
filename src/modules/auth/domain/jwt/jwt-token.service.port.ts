import type { JwtToken } from './jwt-token.value-object';

export interface JwtTokenServicePort {
	generateToken({
		id,
		email,
		name,
	}: {
		id: string;
		email: string;
		name: string;
	}): JwtToken;
	verifyToken(token: string): JwtToken;
}

export const JwtTokenServiceSymbol = Symbol('JwtTokenServicePort');
