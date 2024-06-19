import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthMongoRepository } from './infrastructure/auth.mongo.repository';
import { AuthRepositoryPortSymbol } from './domain/auth.repository.port';
import { JwtTokenServiceSymbol } from './domain/jwt/jwt-token.service.port';
import { JwtTokenService } from './application/jwt-token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
	controllers: [],
	providers: [
		{
			provide: AuthRepositoryPortSymbol,
			useClass: AuthMongoRepository,
		},
		{
			provide: JwtTokenServiceSymbol,
			useClass: JwtTokenService,
		},
		JwtStrategy,
		JwtAuthGuard,
	],
	imports: [
		PrismaModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60m' },
		}),
	],
	exports: [
		JwtAuthGuard,
		JwtModule,
		{
			provide: AuthRepositoryPortSymbol,
			useClass: AuthMongoRepository,
		},
		{
			provide: JwtTokenServiceSymbol,
			useClass: JwtTokenService,
		},
	],
})
export class AuthModule {}
