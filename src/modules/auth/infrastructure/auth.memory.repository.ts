import type { Id } from '@lib';
import type { Auth } from '../domain/auth.entity';
import type { AuthRepositoryPort } from '../domain/auth.repository.port';

export class AuthMemoryRepository implements AuthRepositoryPort {
	private auths: Auth[] = [];

	async findByUserId(userId: Id): Promise<Auth | null> {
		return this.auths.find((auth) => auth.userId.isEqual(userId)) || null;
	}

	async update(auth: Auth): Promise<void> {
		const index = this.auths.findIndex((a) => a.userId.isEqual(auth.userId));

		if (index === -1) {
			throw new Error('Auth not found');
		}

		this.auths[index] = auth;
	}

	async insert(auth: Auth): Promise<void> {
		this.auths.push(auth);
	}
}
