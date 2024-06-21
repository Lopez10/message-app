import { Either, Id } from '@lib';
import type { UserRepositoryPort } from '../domain/user.repository.port';
import type { User } from '../domain/user.entity';
import type { Email } from '../domain/email.value-object';
import { UserNotFoundException } from '../domain/user.exception';

export class UserMemoryRepository implements UserRepositoryPort {
	getActiveUsers(): Promise<User[]> {
		throw new Error('Method not implemented.');
	}
	update(user: User): Promise<void> {
		throw new Error('Method not implemented.');
	}
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

	async findById(id: Id): Promise<User | null> {
		return this.users.find((user) => user.id.isEqual(id)) || null;
	}

	async insert(user: User): Promise<void> {
		this.users.push(user);
	}
}
