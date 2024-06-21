import { Either, Id, UnexpectedError } from '@lib';
import type { Auth } from '../domain/auth.entity';
import type { AuthRepositoryPort } from '../domain/auth.repository.port';
import { AuthNotFoundException } from '../domain/auth.exception';

export class AuthMemoryRepository implements AuthRepositoryPort {
	private auths: Auth[] = [];

	async findByUserId(
		userId: Id,
	): Promise<Either<UnexpectedError | AuthNotFoundException, Auth>> {
		const auth = this.auths.find((auth) => auth.userId.isEqual(userId)) || null;

		if (!auth) {
			return Either.left(new AuthNotFoundException());
		}

		return Either.right(auth);
	}

	async update(
		auth: Auth,
	): Promise<Either<UnexpectedError | AuthNotFoundException, void>> {
		const index = this.auths.findIndex((a) => a.userId.isEqual(auth.userId));

		if (index === -1) {
			Either.left(new AuthNotFoundException());
		}

		this.auths[index] = auth;

		return Either.right(undefined);
	}

	async insert(auth: Auth): Promise<Either<UnexpectedError, void>> {
		this.auths.push(auth);
		return Either.right(undefined);
	}
}
