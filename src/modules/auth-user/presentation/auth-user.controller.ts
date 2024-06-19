import { JwtTokenService } from '@modules/auth/application/jwt-token.service';
import { AuthRepositoryPortSymbol } from '@modules/auth/domain/auth.repository.port';
import { JwtTokenServiceSymbol } from '@modules/auth/domain/jwt/jwt-token.service.port';
import { AuthMongoRepository } from '@modules/auth/infrastructure/auth.mongo.repository';
import { UserRepositoryPortSymbol } from '@modules/user/domain/user.repository.port';
import { UserMongoRepository } from '@modules/user/infrastructure/user.postgre.repository';
import {
	Controller,
	Inject,
	Post,
	Body,
	HttpException,
	UseGuards,
	Get,
	Request,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Login } from '../application/login/login.use-case';
import { Register } from '../application/register/register.use-case';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import {
	LoginDto,
	RegisterDto,
	TokenResponse,
} from '@modules/auth/application/auth.mapper';

@ApiTags('auth')
@Controller('auth')
export class AuthUserController {
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

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('me')
	async me(@Request() req): Promise<string> {
		return req.user;
	}
}
