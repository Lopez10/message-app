import type { JwtTokenServicePort } from '../jwt/jwt-token.service.port';
import { JwtToken } from '../jwt/jwt-token.value-object';

export class JwtTokenServiceMock implements JwtTokenServicePort {
	generateToken({
		id,
		email,
		name,
	}: { id: string; email: string; name: string }): JwtToken {
		const jwtToken = `Bearer ${id}.${email}.${name}`;
		return JwtToken.create(jwtToken);
	}
	verifyToken(token: string): JwtToken {
		return JwtToken.create(token);
	}
}
