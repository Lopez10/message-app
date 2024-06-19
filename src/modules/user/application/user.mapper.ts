import { Id } from '@lib';
import { Email } from '../domain/email.value-object';
import { User, type UserPrimitives } from '../domain/user.entity';

export class UserMapper {
	static toDomain(userDto: UserPrimitives): User {
		return User.create(
			{
				email: Email.create(userDto.email).get(),
				isActive: userDto.isActive,
				name: userDto.name,
			},
			new Id(userDto.id),
		).get();
	}

	static toDto(user: User): UserPrimitives {
		return {
			id: user.id.value,
			email: user.email.value,
			isActive: user.isActive,
			name: user.name,
		};
	}
}
