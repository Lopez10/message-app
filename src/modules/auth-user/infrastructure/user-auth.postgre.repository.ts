import type { User } from '@modules/user/domain/user.entity';
import { Injectable } from '@nestjs/common';
import type { PrismaService } from '@modules/prisma/prisma.service';
import type { Auth } from '../../auth/domain/auth.entity';
import type { UserAuthRepositoryPort } from '../domain/user-auth.repository.port';

@Injectable()
export class UserAuthMongoRepository implements UserAuthRepositoryPort {
	constructor(private prisma: PrismaService) {}

	async createUserAndAuth(user: User, auth: Auth): Promise<void> {
		// const userPrisma = UserMapper.toDto(user);
		// const authPrisma = AuthMapper.toDto(auth);
		// return this.prisma.$transaction(async (prisma) => {
		// 	const user = await prisma.user.create({
		// 		data: userPrisma,
		// 	});
		// 	const auth = await prisma.auth.create({
		// 		data: authPrisma,
		// 	});
		// 	return { user, auth };
		// });
	}
}
