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
import { JwtModule } from '@nestjs/jwt';
import { UserMongoRepository } from '@modules/user/infrastructure/user.mongo.repository';

@Module({
	controllers: [AuthController],
	providers: [
		{
			provide: AuthRepositoryPortSymbol,
			useClass: AuthMongoRepository,
		},
		{
			provide: JwtTokenServiceSymbol,
			useClass: JwtTokenService,
		},
		UserMongoRepository,
		Login,
		Register,
	],
	imports: [
		PrismaModule,
		UserModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60m' },
		}),
	],
})
export class AuthModule {}
