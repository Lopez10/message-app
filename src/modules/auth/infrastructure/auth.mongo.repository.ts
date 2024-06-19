import { Injectable } from '@nestjs/common';
import type { AuthRepositoryPort } from '../domain/auth.repository.port';
import type { Id } from '@lib';
import type { Auth } from '../domain/auth.entity';
import { PrismaService } from '@modules/prisma/prisma.service';
import type { Auth as AuthPrisma } from '@prisma/client';
import { AuthMapper } from '../application/auth.mapper';

@Injectable()
export class AuthMongoRepository implements AuthRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	insert(auth: Auth): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async findByUserId(userId: Id): Promise<Auth | null> {
		const auth: AuthPrisma = await this.prisma.auth.findUnique({
			where: { userId: userId.value },
		});

		if (!auth) return null;

		AuthMapper.toDomain(auth);
	}

	update(auth: Auth): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
