import { Either, type UseCase } from '@lib';
import {
	AuthRepository,
	type AuthRepositoryPort,
} from '../../domain/auth.repository.port';
import {
	UserRepository,
	type UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import {
	JwtTokenService,
	type JwtTokenServicePort,
} from '../../domain/jwt/jwt-token.service.port';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailOrPasswordException } from './login.use-case.exception';
import type { LoginDto } from '../auth.mapper';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class Login
	implements UseCase<LoginDto, Either<InvalidEmailOrPasswordException, string>>
{
	constructor(
		@Inject(AuthRepository)
		private readonly authRepository: AuthRepositoryPort,
		@Inject(UserRepository)
		private readonly userRepository: UserRepositoryPort,
		@Inject(JwtTokenService)
		private readonly jwtService: JwtTokenServicePort,
	) {}
	async run(
		request: LoginDto,
	): Promise<Either<InvalidEmailOrPasswordException, string>> {
		const email = Email.create(request.email);
		if (email.isLeft()) {
			return Either.left(new InvalidEmailOrPasswordException());
		}

		const user = await this.userRepository.findByEmail(email.get());
		if (!user) {
			return Either.left(new InvalidEmailOrPasswordException());
		}

		const auth = await this.authRepository.findByUserId(user.id);
		if (!auth) {
			return Either.left(new InvalidEmailOrPasswordException());
		}

		const isPasswordMatch = await auth.password.compare(request.password);
		if (!isPasswordMatch) {
			return Either.left(new InvalidEmailOrPasswordException());
		}

		const accessToken = this.jwtService.generateToken({
			email: user.email.value,
			id: user.id.value,
			name: user.name,
		});

		return Either.right(accessToken.value);
	}
}
