import { Either, type UseCase } from '@lib';
import type { AuthRepositoryPort } from '@modules/auth/domain/auth.repository.port';
import type { JwtTokenServicePort } from '@modules/auth/domain/jwt/jwt-token.service.port';
import { Password } from '@modules/auth/domain/password.value-object';
import { InvalidPasswordFormatException } from '@modules/auth/domain/password.value-object.exceptions';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import type { UserRepositoryPort } from '@modules/user/domain/user.repository.port';
import { UserAlreadyExistsException } from './register.use-case.exception';

export type RegisterDto = {
	email: string;
	password: string;
	name: string;
};

export class Register
	implements
		UseCase<
			RegisterDto,
			Either<
				| InvalidEmailFormatException
				| InvalidPasswordFormatException
				| UserAlreadyExistsException,
				string
			>
		>
{
	constructor(
		private readonly authRepository: AuthRepositoryPort,
		private readonly userRepository: UserRepositoryPort,
		private readonly jwtService: JwtTokenServicePort,
	) {}
	async run(
		request: RegisterDto,
	): Promise<
		Either<
			| InvalidEmailFormatException
			| InvalidPasswordFormatException
			| UserAlreadyExistsException,
			string
		>
	> {
		const email = Email.create(request.email);
		if (email.isLeft()) {
			return Either.left(new InvalidEmailFormatException());
		}

		const password = Password.create(request.password);
		if (password.isLeft()) {
			return Either.left(new InvalidPasswordFormatException());
		}

		const user = await this.userRepository.findByEmail(email.get());
		if (user) {
			return Either.left(new UserAlreadyExistsException());
		}

		return;
	}
}
