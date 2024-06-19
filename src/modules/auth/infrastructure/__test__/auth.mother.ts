import { AuthMapper } from '@modules/auth/application/auth.mapper';
import type { Auth, AuthPrimitives } from '@modules/auth/domain/auth.entity';

export class AuthMother {
	static create(params: Partial<AuthPrimitives>): Auth {
		const authDto: AuthPrimitives = {
			userId: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			password: '1234Password',
			id: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			...params,
		};

		return AuthMapper.toDomain(authDto);
	}
}
