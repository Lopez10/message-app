import { ExceptionBase } from '@lib';

export const EMAIL_INVALID_FORMAT = 'Invalid email format';

export class EmailInvalidFormatException extends ExceptionBase {
	constructor(message = 'Invalid email format') {
		super(message);
	}

	readonly code = EMAIL_INVALID_FORMAT;
}
