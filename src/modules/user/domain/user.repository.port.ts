import type { Email, Id } from '@lib';
import type { User } from './user.entity';

export interface UserRepositoryPort {
	findByEmail(email: Email): Promise<User | null>;
	findById(id: Id): Promise<User | null>;
	insert(user: User): Promise<void>;
}
