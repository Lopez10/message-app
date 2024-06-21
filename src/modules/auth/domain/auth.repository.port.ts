import type { Either, Id, UnexpectedError } from '@lib';
import type { Auth } from './auth.entity';
import { AuthNotFoundException } from './auth.exception';

export interface AuthRepositoryPort {
	insert(auth: Auth): Promise<Either<UnexpectedError, void>>;
	findByUserId(
		userId: Id,
	): Promise<Either<UnexpectedError | AuthNotFoundException, Auth>>;
	update(
		auth: Auth,
	): Promise<Either<UnexpectedError | AuthNotFoundException, void>>;
}

export const AuthRepositoryPortSymbol = Symbol('AuthRepositoryPort');
