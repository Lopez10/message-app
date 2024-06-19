import { ExceptionBase } from '@lib';

export const INVALID_USERNAME_OR_PASSWORD = 'AUTH.INVALID_USERNAME_OR_PASSWORD';

export class InvalidUsernameOrPasswordException extends ExceptionBase {
	static readonly message = 'Invalid username or password';

	constructor(message = InvalidUsernameOrPasswordException.message) {
		super(message);
	}

	readonly code = INVALID_USERNAME_OR_PASSWORD;
}
