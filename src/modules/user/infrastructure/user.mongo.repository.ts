import { Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../domain/user.repository.port';
import type { PrismaService } from '@prisma/prisma.service';
import type { Id } from '@lib';
import type { Email } from '../domain/email.value-object';
import type { User } from '../domain/user.entity';
import { UserMapper } from '../application/user.mapper';
import type { User as UserPrisma } from '@prisma/client';

@Injectable()
export class UserMongoRepository implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}
	async findByEmail(email: Email): Promise<User | null> {
		const user: UserPrisma = await this.prisma.user.findUnique({
			where: {
				email: email.value,
			},
		});

		if (!user) return null;

		return UserMapper.toDomain(user);
	}
	findById(id: Id): Promise<User | null> {
		throw new Error('Method not implemented.');
	}
	insert(user: User): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
