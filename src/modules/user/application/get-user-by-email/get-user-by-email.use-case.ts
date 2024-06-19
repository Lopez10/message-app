import { Either, UseCase } from '@lib';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import { UserPrimitives } from '@modules/user/domain/user.entity';
import { UserRepositoryPortSymbol } from '@modules/user/domain/user.repository.port';
import { UserMongoRepository } from '@modules/user/infrastructure/user.postgre.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../user.exception';
import { UserMapper } from '../user.mapper';

@Injectable()
export class GetUserByEmail
	implements
		UseCase<
			string,
			Either<
				InvalidEmailFormatException | UserNotFoundException,
				UserPrimitives
			>
		>
{
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserMongoRepository,
	) {}
	async run(
		email: string,
	): Promise<
		Either<InvalidEmailFormatException | UserNotFoundException, UserPrimitives>
	> {
		const emailVo = Email.create(email);
		if (emailVo.isLeft()) {
			return Either.left(new InvalidEmailFormatException());
		}

		const user = await this.userRepository.findByEmail(emailVo.get());

		if (!user) {
			return Either.left(new UserNotFoundException());
		}

		return Either.right(UserMapper.toDto(user));
	}
}
