import { AuthMapper } from '@modules/auth/application/auth.mapper';
import type { Auth, AuthPrimitives } from '@modules/auth/domain/auth.entity';
import { Password } from '@modules/auth/domain/password.value-object';

export class AuthMother {
	static create(params: Partial<AuthPrimitives>): Auth {
		const authDto: AuthPrimitives = {
			userId: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			accessToken: 'accessToken',
			password: '1234Password',
			refreshToken: 'refreshToken',
			...params,
		};

		return AuthMapper.toDomain(authDto);
	}
}
