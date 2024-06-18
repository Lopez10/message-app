import { Id } from '@lib';
import { Auth } from './auth.entity';

export interface AuthRepositoryPort {
	save(auth: Auth): Promise<void>;
	findByUserId(userId: Id): Promise<Auth | null>;
}
