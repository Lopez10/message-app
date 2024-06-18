import { Entity, Result } from '@lib';
import type { JwtToken } from './jwt-token.value-object';

export interface AuthProps {
	userId: string;
	token: JwtToken;
	refreshToken: JwtToken;
}

export class Auth extends Entity<AuthProps> {
	get userId() {
		return this.props.userId;
	}

	get token() {
		return this.props.token;
	}

	get refreshToken() {
		return this.props.refreshToken;
	}

	private constructor(props: AuthProps) {
		super(props);
	}

	public static create(props: AuthProps): Result<Auth> {
		const auth = new Auth(props);

		return Result.ok(auth);
	}
}
