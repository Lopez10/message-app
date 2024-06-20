import { Injectable } from '@nestjs/common';
import type { AuthRepositoryPort } from '../domain/auth.repository.port';
import type { Id } from '@lib';
import type { Auth } from '../domain/auth.entity';
import { PrismaService } from '@modules/prisma/prisma.service';
import type { Auth as AuthPrisma } from '@prisma/client';
import { AuthMapper } from '../application/auth.mapper';

@Injectable()
export class AuthPrismaRepository implements AuthRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async insert(auth: Auth): Promise<void> {
		const authPrisma: AuthPrisma = AuthMapper.toDto(auth);

		await this.prisma.auth.create({
			data: authPrisma,
		});
	}

	async findByUserId(userId: Id): Promise<Auth | null> {
		const auth: AuthPrisma = await this.prisma.auth.findUnique({
			where: { userId: userId.value },
		});

		if (!auth) return null;

		return AuthMapper.persistanceToDomain(auth);
	}

	update(auth: Auth): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
