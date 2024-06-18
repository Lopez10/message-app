import type { Id } from '@lib';
import type { Auth } from './auth.entity';

export interface AuthRepositoryPort {
	save(auth: Auth): Promise<void>;
	findByUserId(userId: Id): Promise<Auth | null>;
	updateAuth(auth: Auth): Promise<void>;
}
