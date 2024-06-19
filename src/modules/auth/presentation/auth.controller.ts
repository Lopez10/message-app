import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthMongoRepository } from '../infrastructure/auth.mongo.repository';
import { UserMongoRepository } from '@modules/user/infrastructure/user.mongo.repository';
import { JwtTokenService } from '../application/jwt-token.service';
import { type RegisterDto, TokenResponse } from '../application/auth.mapper';
import { Register } from '../application/register/register.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthMongoRepository)
		private readonly authRepository: AuthMongoRepository,

		@Inject(UserMongoRepository)
		private readonly userRepository: UserMongoRepository,

		@Inject(JwtTokenService)
		private readonly jwtService: JwtTokenService,
	) {}

	@Post('register')
	@ApiResponse({
		status: 201,
		description: 'User created',
		type: TokenResponse,
	})
	async register(@Body() registerDto: RegisterDto): Promise<TokenResponse> {
		const register = new Register(
			this.authRepository,
			this.userRepository,
			this.jwtService,
		);

		const result = await register.run(registerDto);

		if (result.isLeft()) {
			const error = result.getLeft();

			throw error;
		}

		return result.get();
	}
}
