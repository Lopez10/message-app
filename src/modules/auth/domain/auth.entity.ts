import type { JwtToken } from './jwt-token.value-object';

export interface AuthProps {
	userId: string;
	token: JwtToken;
	refreshToken: JwtToken;
}
