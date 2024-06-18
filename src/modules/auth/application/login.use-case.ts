import {
	Email,
	InvalidUsernameOrPasswordException,
	Either,
	type UseCase,
} from '@lib';
import type { AuthRepositoryPort } from '../domain/auth.repository.port';
import type { UserRepositoryPort } from '@modules/user/domain/user.repository.port';
import type { JwtTokenServicePort } from '../domain/jwt/jwt-token.service.port';

export type LoginDto = {
	email: string;
	password: string;
};
export class Login
	implements
		UseCase<LoginDto, Either<InvalidUsernameOrPasswordException, string>>
{
	constructor(
		private readonly authRepository: AuthRepositoryPort,
		private readonly userRepository: UserRepositoryPort,
		private readonly jwtService: JwtTokenServicePort,
	) {}
	async run(
		request: LoginDto,
	): Promise<Either<InvalidUsernameOrPasswordException, string>> {
		const email = Email.create(request.email);

		if (email.isLeft()) {
			return Either.left(new InvalidUsernameOrPasswordException());
		}

		const user = await this.userRepository.findByEmail(email.get());

		if (!user) {
			return Either.left(new InvalidUsernameOrPasswordException());
		}

		const auth = await this.authRepository.findByUserId(user.id);
		const isPasswordMatch = await auth.password.compare(request.password);

		if (!isPasswordMatch) {
			return Either.left(new InvalidUsernameOrPasswordException());
		}

		const accessToken = this.jwtService.generateToken({
			email: user.email.value,
			id: user.id.value,
			name: user.name,
		});

		return Either.right(accessToken.value);
	}
}
