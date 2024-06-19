import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { AuthMongoRepository } from '../infrastructure/auth.mongo.repository';
import type { UserMongoRepository } from '@modules/user/infrastructure/user.mongo.repository';
import {
	LoginDto,
	RegisterDto,
	TokenResponse,
} from '../application/auth.mapper';
import { Register } from '../application/register/register.use-case';
import { JwtTokenServiceSymbol } from '../domain/jwt/jwt-token.service.port';
import type { JwtTokenService } from '../application/jwt-token.service';
import { UserRepositoryPortSymbol } from '@modules/user/domain/user.repository.port';
import { AuthRepositoryPortSymbol } from '../domain/auth.repository.port';
import { Login } from '../application/login/login.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AuthRepositoryPortSymbol)
		private readonly authRepository: AuthMongoRepository,

		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserMongoRepository,

		@Inject(JwtTokenServiceSymbol)
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

			throw new HttpException(error.message, 500);
		}

		return result.get();
	}

	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
		const login = new Login(
			this.authRepository,
			this.userRepository,
			this.jwtService,
		);

		const result = await login.run(loginDto);

		if (result.isLeft()) {
			const error = result.getLeft();

			throw new HttpException(error.message, 500);
		}

		return result.get();
	}
}
