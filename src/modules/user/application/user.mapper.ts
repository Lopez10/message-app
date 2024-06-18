import { Email } from '../domain/email.value-object';
import { User, type UserPrimitives } from '../domain/user.entity';

export class UserMapper {
	static toDomain(userDto: UserPrimitives): User {
		return User.create({
			email: Email.create(userDto.email).get(),
			isActive: userDto.isActive,
			name: userDto.name,
		}).get();
	}
}
