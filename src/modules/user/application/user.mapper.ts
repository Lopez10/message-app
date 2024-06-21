import { Either, Id } from '@lib';
import { Email } from '../domain/email.value-object';
import { User, type UserPrimitives } from '../domain/user.entity';
import { UserEntityUnknownException } from '../domain/user.exception';

export class UserMapper {
	static toDomain(
		userDto: UserPrimitives,
	): Either<UserEntityUnknownException, User> {
		return User.create(
			{
				email: Email.create(userDto.email).get(),
				isActive: userDto.isActive,
				name: userDto.name,
			},
			new Id(userDto.id),
		);
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
