import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPrismaRepository } from './infrastructure/user.prisma.repository';
import { UserRepositoryPortSymbol } from './domain/user.repository.port';
import { UserController } from './presentation/user.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { GetActiveUsers } from './application/get-active-users/get-active-users.use-case';
import { GetUserByEmail } from './application/get-user-by-email/get-user-by-email.use-case';
import { UpdateUserStatus } from './application/update-user-status/update-user-status.use-case';
import { UpdateUser } from './application/update-user/update-user.use-case';
@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [UserController],
	providers: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserPrismaRepository,
		},
		GetActiveUsers,
		GetUserByEmail,
		UpdateUserStatus,
		UpdateUser,
	],
	exports: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserPrismaRepository,
		},
	],
})
export class UserModule {}
