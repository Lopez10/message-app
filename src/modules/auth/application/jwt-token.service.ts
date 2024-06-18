import type { JwtTokenServicePort } from '../domain/jwt-token.service.port';
import { JwtToken } from '../domain/jwt-token.value-object';
import type { JwtServicePort } from '../domain/jwt.service.port';

export class JwtTokenService implements JwtTokenServicePort {
	constructor(private jwtService: JwtServicePort) {}

	generateToken(userId: string): JwtToken {
		const token = this.jwtService.sign({ userId });
		return new JwtToken(token);
	}

	verifyToken(token: string): JwtToken {
		this.jwtService.verify(token);
		return new JwtToken(token);
	}
}
