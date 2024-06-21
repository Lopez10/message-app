import { UseCase, Either, Success } from '@lib';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import { UserNotFoundException } from '@modules/user/domain/user.exception';
import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserStatus
	implements
		UseCase<
			string,
			Either<InvalidEmailFormatException | UserNotFoundException, Success>
		>
{
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}

	async run(
		email: string,
	): Promise<
		Either<InvalidEmailFormatException | UserNotFoundException, Success>
	> {
		const emailVo = Email.create(email);
		if (emailVo.isLeft()) {
			return Either.left(new InvalidEmailFormatException());
		}

		const user = await this.userRepository.findByEmail(emailVo.get());

		if (user.isLeft()) {
			return Either.left(user.getLeft());
		}

		user.get().toggleStatus();

		await this.userRepository.update(user.get());

		return Either.right({ success: true });
	}
}
