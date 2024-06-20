import { UserMapper } from '@modules/user/application/user.mapper';
import type { User, UserPrimitives } from '@modules/user/domain/user.entity';

export class UserMother {
	static create(params: Partial<UserPrimitives>): User {
		const userDto: UserPrimitives = {
			id: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			email: 'test@test.com',
			isActive: true,
			name: 'test',
			...params,
		};

		return UserMapper.toDomain(userDto).get();
	}
}
