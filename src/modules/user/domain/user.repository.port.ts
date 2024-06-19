import type { Id } from '@lib';
import type { User } from './user.entity';
import type { Email } from './email.value-object';

export interface UserRepositoryPort {
	findByEmail(email: Email): Promise<User | null>;
	findById(id: Id): Promise<User | null>;
	insert(user: User): Promise<void>;
}

export const UserRepository = Symbol('UserRepositoryPort');
