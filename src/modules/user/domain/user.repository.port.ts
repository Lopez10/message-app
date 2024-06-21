import type { Either, Id } from '@lib';
import type { User } from './user.entity';
import type { Email } from './email.value-object';
import { UserNotFoundException } from './user.exception';

export interface UserRepositoryPort {
	findByEmail(email: Email): Promise<Either<UserNotFoundException, User>>;
	findById(id: Id): Promise<User | null>;
	insert(user: User): Promise<void>;
	getActiveUsers(): Promise<User[]>;
	update(user: User): Promise<void>;
}

export const UserRepositoryPortSymbol = Symbol('UserRepositoryPort');
