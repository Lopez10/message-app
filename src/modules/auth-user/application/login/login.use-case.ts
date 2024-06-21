import { Either, UnexpectedError, type UseCase } from '@lib';

import {
	UserRepositoryPortSymbol,
	type UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';

import { InvalidEmailOrPasswordException } from './login.use-case.exception';
import { Inject, Injectable } from '@nestjs/common';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import {
	AuthRepositoryPortSymbol,
	AuthRepositoryPort,
} from '@modules/auth/domain/auth.repository.port';
import {
	JwtTokenServiceSymbol,
	JwtTokenServicePort,
} from '@modules/auth/domain/jwt/jwt-token.service.port';
import { Email } from '@modules/user/domain/email.value-object';
import { LoginDto, TokenResponse } from '@modules/auth/application/auth.mapper';
import { AuthNotFoundException } from '@modules/auth/domain/auth.exception';
import { UserNotFoundException } from '@modules/user/domain/user.exception';

@Injectable()
export class Login
	implements
		UseCase<
			LoginDto,
			Either<
				| InvalidEmailOrPasswordException
				| InvalidEmailFormatException
				| UnexpectedError
				| AuthNotFoundException
				| UserNotFoundException,
				TokenResponse
			>
		>
{
	constructor(
		@Inject(AuthRepositoryPortSymbol)
		private readonly authRepository: AuthRepositoryPort,
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
		@Inject(JwtTokenServiceSymbol)
		private readonly jwtService: JwtTokenServicePort,
	) {}
	async run(
		request: LoginDto,
	): Promise<
		Either<
			| InvalidEmailOrPasswordException
			| InvalidEmailFormatException
			| UnexpectedError
			| AuthNotFoundException
			| UserNotFoundException,
			TokenResponse
		>
	> {
		const email = Email.create(request.email);
		if (email.isLeft()) {
			return Either.left(email.getLeft());
		}

		const user = await this.userRepository.findByEmail(email.get());
		if (user.isLeft()) {
			return Either.left(user.getLeft());
		}

		const userFound = user.get();

		const auth = await this.authRepository.findByUserId(userFound.id);
		if (auth.isLeft()) {
			return Either.left(auth.getLeft());
		}

		const isPasswordMatch = await auth.get().password.compare(request.password);
		if (!isPasswordMatch) {
			return Either.left(new InvalidEmailOrPasswordException());
		}

		const accessToken = this.jwtService.generateToken({
			email: userFound.email.value,
			id: userFound.id.value,
			name: userFound.name,
		});

		const response: TokenResponse = {
			accessToken: accessToken.value,
		};

		return Either.right(response);
	}
}
