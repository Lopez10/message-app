import { ExceptionBase } from '@lib';

export const INVALID_EMAIL_FORMAT = 'Invalid email format';

export class InvalidEmailFormatException extends ExceptionBase {
	constructor(message = 'Invalid email format') {
		super(message);
	}

	readonly code = INVALID_EMAIL_FORMAT;
}
