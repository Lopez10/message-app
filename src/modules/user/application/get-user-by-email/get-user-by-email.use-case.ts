import { Either, UseCase } from '@lib';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import { UserPrimitives } from '@modules/user/domain/user.entity';
import { UserRepositoryPortSymbol } from '@modules/user/domain/user.repository.port';
import { UserPrismaRepository } from '@modules/user/infrastructure/user.prisma.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '../user.mapper';
import { UserNotFoundException } from '@modules/user/domain/user.exception';

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
		private readonly userRepository: UserPrismaRepository,
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

		if (user.isLeft()) {
			return Either.left(user.getLeft());
		}

		return Either.right(UserMapper.toDto(user.get()));
	}
}
