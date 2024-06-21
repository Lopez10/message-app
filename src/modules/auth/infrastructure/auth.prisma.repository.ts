import { Injectable } from '@nestjs/common';
import type { AuthRepositoryPort } from '../domain/auth.repository.port';
import { Either, Id, UnexpectedError } from '@lib';
import type { Auth } from '../domain/auth.entity';
import { PrismaService } from '@modules/prisma/prisma.service';
import type { Auth as AuthPrisma } from '@prisma/client';
import { AuthMapper } from '../application/auth.mapper';
import { AuthNotFoundException } from '../domain/auth.exception';

@Injectable()
export class AuthPrismaRepository implements AuthRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async insert(auth: Auth): Promise<Either<UnexpectedError, void>> {
		const authPrisma: AuthPrisma = AuthMapper.toDto(auth);

		await this.prisma.auth.create({
			data: authPrisma,
		});

		return Either.right(undefined);
	}

	async findByUserId(
		userId: Id,
	): Promise<Either<UnexpectedError | AuthNotFoundException, Auth>> {
		const authPersistence: AuthPrisma = await this.prisma.auth.findUnique({
			where: { userId: userId.value },
		});

		if (!authPersistence) {
			return Either.left(new AuthNotFoundException());
		}

		const auth = AuthMapper.persistanceToDomain(authPersistence);

		return Either.right(auth);
	}

	update(
		auth: Auth,
	): Promise<Either<UnexpectedError | AuthNotFoundException, void>> {
		throw new Error('Method not implemented.');
	}
}
