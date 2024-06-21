import { Either, Entity, type Id } from '@lib';
import type { Password } from './password.value-object';
import type { AuthEntityUnknownException } from './auth.exception';

export interface AuthProps {
	userId: Id;
	password: Password;
}

export interface AuthPrimitives {
	id: string;
	userId: string;
	password: string;
}

export class Auth extends Entity<AuthProps> {
	get userId() {
		return this.props.userId;
	}

	get password() {
		return this.props.password;
	}

	private constructor(props: AuthProps, id?: Id) {
		super(props);
	}

	public static create(
		props: AuthProps,
		id?: Id,
	): Either<AuthEntityUnknownException, Auth> {
		const auth = new Auth(props, id);

		return Either.right(auth);
	}
}
