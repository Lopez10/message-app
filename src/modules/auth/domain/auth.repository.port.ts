import type { Id } from '@lib';
import type { Auth } from './auth.entity';

export interface AuthRepositoryPort {
	insert(auth: Auth): Promise<void>;
	findByUserId(userId: Id): Promise<Auth | null>;
	update(auth: Auth): Promise<void>;
}

export const AuthRepositoryPortSymbol = Symbol('AuthRepositoryPort');
