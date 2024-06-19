import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserMongoRepository } from './infrastructure/user.postgre.repository';
import { UserRepositoryPortSymbol } from './domain/user.repository.port';
import { UserController } from './presentation/user.controller';
import { AuthModule } from '@modules/auth/auth.module';
@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [UserController],
	providers: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserMongoRepository,
		},
	],
	exports: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserMongoRepository,
		},
	],
})
export class UserModule {}
