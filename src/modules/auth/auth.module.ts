import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthMongoRepository } from './infrastructure/auth.mongo.repository';
import { AuthRepositoryPortSymbol } from './domain/auth.repository.port';
import { Login } from './application/login/login.use-case';
import { Register } from './application/register/register.use-case';
import { JwtTokenServiceSymbol } from './domain/jwt/jwt-token.service.port';
import { JwtTokenService } from './application/jwt-token.service';
import { UserModule } from '@modules/user/user.module';

@Module({
	controllers: [AuthController],
	providers: [
		AuthMongoRepository,
		{
			provide: AuthRepositoryPortSymbol,
			useClass: AuthMongoRepository,
		},
		JwtTokenService,
		{
			provide: JwtTokenServiceSymbol,
			useClass: JwtTokenService,
		},
		Login,
		Register,
	],
	imports: [PrismaModule, UserModule],
})
export class AuthModule {}
