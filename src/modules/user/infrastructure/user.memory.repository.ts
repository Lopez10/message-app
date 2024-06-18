import type { Id } from '@lib';
import type { UserRepositoryPort } from '../domain/user.repository.port';
import type { User } from '../domain/user.entity';
import type { Email } from '../domain/email.value-object';

export class UserMemoryRepository implements UserRepositoryPort {
	private users: User[] = [];

	async findByEmail(email: Email): Promise<User | null> {
		return this.users.find((user) => user.email.isEqual(email)) || null;
	}

	async findById(id: Id): Promise<User | null> {
		return this.users.find((user) => user.id.isEqual(id)) || null;
	}

	async insert(user: User): Promise<void> {
		this.users.push(user);
	}
}
