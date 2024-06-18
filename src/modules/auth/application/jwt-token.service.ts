import type { JwtTokenServicePort } from '../domain/jwt/jwt-token.service.port';
import { JwtToken } from '../domain/jwt/jwt-token.value-object';
import type { JwtService } from '@nestjs/jwt';

export class JwtTokenService implements JwtTokenServicePort {
	constructor(private jwtService: JwtService) {}

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
