import { Entity, type Id, Result } from '@lib';
import type { JwtToken } from './jwt/jwt-token.value-object';
import type { Password } from './password.value-object';

export interface AuthProps {
	userId: Id;
	password: Password;
	accessToken: JwtToken;
	refreshToken: JwtToken;
}

export class Auth extends Entity<AuthProps> {
	get userId() {
		return this.props.userId;
	}

	get accessToken() {
		return this.props.accessToken;
	}

	get refreshToken() {
		return this.props.refreshToken;
	}

	get password() {
		return this.props.password;
	}

	updateAccessToken(token: JwtToken) {
		this.props.accessToken = token;
	}

	updateRefreshToken(token: JwtToken) {
		this.props.refreshToken = token;
	}

	private constructor(props: AuthProps) {
		super(props);
	}

	public static create(props: AuthProps): Result<Auth> {
		const auth = new Auth(props);

		return Result.ok(auth);
	}
}
