import type { JwtTokenServicePort } from '../domain/jwt/jwt-token.service.port';
import { JwtToken } from '../domain/jwt/jwt-token.value-object';
import type { JwtServicePort } from '../domain/jwt/jwt.service.port';

export class JwtTokenService implements JwtTokenServicePort {
	constructor(private jwtService: JwtServicePort) {}

	generateToken(payload: {
		id: string;
		email: string;
		name: string;
	}): JwtToken {
		const token = this.jwtService.sign(payload);
		return JwtToken.create(token);
	}

	verifyToken(token: string): JwtToken {
		this.jwtService.verify(token);
		return JwtToken.create(token);
	}
}
