import type { User } from '@modules/user/domain/user.entity';
import type { Auth } from './auth.entity';

export interface UserAuthRepositoryPort {
	createUserAndAuth(user: User, auth: Auth): Promise<void>;
}
