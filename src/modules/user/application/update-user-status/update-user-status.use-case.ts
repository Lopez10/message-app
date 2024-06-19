import { UseCase, Either } from '@lib';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../user.exception';

@Injectable()
export class UpdateUserStatus
	implements
		UseCase<
			string,
			Either<InvalidEmailFormatException | UserNotFoundException, void>
		>
{
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}

	async run(
		email: string,
	): Promise<
		Either<InvalidEmailFormatException | UserNotFoundException, void>
	> {
		const emailVo = Email.create(email);
		if (emailVo.isLeft()) {
			return Either.left(new InvalidEmailFormatException());
		}

		const user = await this.userRepository.findByEmail(emailVo.get());

		if (!user) {
			return Either.left(new UserNotFoundException());
		}

		user.toggleStatus();

		await this.userRepository.update(user);
	}
}
