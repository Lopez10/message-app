import { ExceptionBase } from '@lib';

export const INVALID_EMAIL_OR_PASSWORD = 'AUTH.INVALID_EMAIL_OR_PASSWORD';

export class InvalidEmailOrPasswordException extends ExceptionBase {
	static readonly message = 'Invalid username or password';

	constructor(message = InvalidEmailOrPasswordException.message) {
		super(message);
	}

	readonly code = INVALID_EMAIL_OR_PASSWORD;
}
