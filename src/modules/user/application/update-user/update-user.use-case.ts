import { Either, Success, UseCase } from '@lib';
import { User, UserPrimitives } from '@modules/user/domain/user.entity';
import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '../user.mapper';
import { UserEntityUnknownException } from '@modules/user/domain/user.exception';
import { UpdateUserBody } from './update-user.mapper';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';

export type UpdateUserDto = {
	id: string;
	updateUserBody: UpdateUserBody;
};

@Injectable()
export class UpdateUser
	implements
		UseCase<
			UpdateUserDto,
			Either<UserEntityUnknownException | InvalidEmailFormatException, void>
		>
{
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}

	async run(
		userDto: UpdateUserDto,
	): Promise<
		Either<UserEntityUnknownException | InvalidEmailFormatException, void>
	> {
		const email = Email.create(userDto.updateUserBody.email);
		if (email.isLeft()) {
			return Either.left(new InvalidEmailFormatException());
		}

		const user = UserMapper.toDomain({
			...userDto.updateUserBody,
			id: userDto.id,
		});

		if (user.isLeft()) {
			return Either.left(new UserEntityUnknownException());
		}

		await this.userRepository.update(user.get());

		return Either.right(undefined);
	}
}
