import { Either, Id, UnexpectedError } from '@lib';
import type { UserRepositoryPort } from '../domain/user.repository.port';
import type { User } from '../domain/user.entity';
import type { Email } from '../domain/email.value-object';
import { UserNotFoundException } from '../domain/user.exception';

export class UserMemoryRepository implements UserRepositoryPort {
	private users: User[] = [];

	async findByEmail(
		email: Email,
	): Promise<Either<UserNotFoundException, User>> {
		const user = this.users.find((user) => user.email.isEqual(email)) || null;

		if (!user) {
			return Either.left(new UserNotFoundException());
		}

		return Either.right(user);
	}

	async findById(id: Id): Promise<Either<UserNotFoundException, User>> {
		const user = this.users.find((user) => user.id.isEqual(id)) || null;

		if (!user) {
			return Either.left(new UserNotFoundException());
		}

		return Either.right(user);
	}

	async insert(user: User): Promise<Either<UnexpectedError, void>> {
		this.users.push(user);

		return Either.right(undefined);
	}

	getActiveUsers(): Promise<Either<void, User[]>> {
		throw new Error('Method not implemented.');
	}
	update(user: User): Promise<Either<UnexpectedError, void>> {
		throw new Error('Method not implemented.');
	}
}
