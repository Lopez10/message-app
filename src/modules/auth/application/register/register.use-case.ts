import { Either, type UseCase } from '@lib';
import type { AuthRepositoryPort } from '@modules/auth/domain/auth.repository.port';
import type { JwtTokenServicePort } from '@modules/auth/domain/jwt/jwt-token.service.port';
import { Password } from '@modules/auth/domain/password.value-object';
import { InvalidPasswordFormatException } from '@modules/auth/domain/password.value-object.exceptions';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import type { UserRepositoryPort } from '@modules/user/domain/user.repository.port';
import { UserAlreadyExistsException } from './register.use-case.exception';
import { User } from '@modules/user/domain/user.entity';
import { Auth } from '@modules/auth/domain/auth.entity';
import type { RegisterDto, TokenResponse } from '../auth.mapper';

export class Register
	implements
		UseCase<
			RegisterDto,
			Either<
				| InvalidEmailFormatException
				| InvalidPasswordFormatException
				| UserAlreadyExistsException,
				TokenResponse
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
			TokenResponse
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

		const existingUser = await this.userRepository.findByEmail(email.get());
		if (existingUser) {
			return Either.left(new UserAlreadyExistsException());
		}

		const user = User.create({
			email: email.get(),
			name: request.name,
		});

		const auth = Auth.create({
			userId: user.get().id,
			password: password.get(),
		});

		await this.userRepository.insert(user.get());
		await this.authRepository.insert(auth.get());

		const accessToken = this.jwtService.generateToken({
			email: user.get().email.value,
			id: user.get().id.value,
			name: user.get().name,
		});

		const response: TokenResponse = {
			accessToken: accessToken.value,
		};

		return Either.right(response);
	}
}
