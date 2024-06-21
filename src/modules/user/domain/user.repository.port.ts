import type { Either, Id, UnexpectedError } from '@lib';
import type { User } from './user.entity';
import type { Email } from './email.value-object';
import { UserNotFoundException } from './user.exception';

export interface UserRepositoryPort {
	findByEmail(email: Email): Promise<Either<UserNotFoundException, User>>;
	findById(id: Id): Promise<Either<UserNotFoundException, User>>;
	insert(user: User): Promise<Either<UnexpectedError, void>>;
	getActiveUsers(): Promise<User[]>;
	update(user: User): Promise<void>;
}

export const UserRepositoryPortSymbol = Symbol('UserRepositoryPort');
