import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthUserController } from './presentation/auth-user.controller';
import { Login } from './application/login/login.use-case';
import { Register } from './application/register/register.use-case';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
	controllers: [AuthUserController],
	providers: [Login, Register],
	imports: [PrismaModule, AuthModule, UserModule],
})
export class AuthUserModule {}
