import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../domain/user.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Either, Id } from '@lib';
import type { Email } from '../domain/email.value-object';
import type { User, UserPrimitives } from '../domain/user.entity';
import { UserMapper } from '../application/user.mapper';
import type { User as UserPrisma } from '@prisma/client';
import { UserNotFoundException } from '../domain/user.exception';

@Injectable()
export class UserPrismaRepository implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async findByEmail(
		email: Email,
	): Promise<Either<UserNotFoundException, User>> {
		const userPersistence: UserPrisma = await this.prisma.user.findUnique({
			where: {
				email: email.value,
			},
		});

		if (!userPersistence) {
			return Either.left(new UserNotFoundException());
		}

		const user = UserMapper.toDomain(userPersistence).get();

		return Either.right(user);
	}

	async findById(id: Id): Promise<User | null> {
		const user: UserPrisma = await this.prisma.user.findUnique({
			where: {
				id: id.value,
			},
		});

		if (!user) return null;

		return UserMapper.toDomain(user).get();
	}

	async insert(user: User): Promise<void> {
		const userPrisma: UserPrimitives = UserMapper.toDto(user);

		await this.prisma.user.create({
			data: userPrisma,
		});
	}

	async getActiveUsers(): Promise<User[]> {
		const usersPersistence: UserPrisma[] = await this.prisma.user.findMany({
			where: {
				isActive: true,
			},
		});

		return usersPersistence.map((user) => UserMapper.toDomain(user).get());
	}

	async update(user: User): Promise<void> {
		const userPrisma: UserPrimitives = UserMapper.toDto(user);

		await this.prisma.user.update({
			where: {
				id: user.id.value,
			},
			data: userPrisma,
		});
	}
}
