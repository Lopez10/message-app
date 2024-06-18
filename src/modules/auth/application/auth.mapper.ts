import { Id } from '@lib';
import { Auth, type AuthPrimitives } from '../domain/auth.entity';
import { Password } from '../domain/password.value-object';
import { JwtToken } from '../domain/jwt/jwt-token.value-object';

export class AuthMapper {
	static toDomain(authDto: AuthPrimitives): Auth {
		return Auth.create({
			userId: new Id(authDto.userId),
			password: Password.create(authDto.password).get(),
			accessToken: JwtToken.create(authDto.accessToken),
			refreshToken: JwtToken.create(authDto.refreshToken),
		}).get();
	}
}
