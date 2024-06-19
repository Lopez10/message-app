import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserMongoRepository } from './infrastructure/user.postgre.repository';
import { UserRepositoryPortSymbol } from './domain/user.repository.port';
import { UserController } from './presentation/user.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { GetActiveUsers } from './application/get-active-users/get-active-users.use-case';
import { GetUserByEmail } from './application/get-user-by-email/get-user-by-email.use-case';
import { UpdateUserStatus } from './application/update-user-status/update-user-status.use-case';
@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [UserController],
	providers: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserMongoRepository,
		},
		GetActiveUsers,
		GetUserByEmail,
		UpdateUserStatus,
	],
	exports: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserMongoRepository,
		},
	],
})
export class UserModule {}
