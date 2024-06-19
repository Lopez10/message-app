import { ExceptionBase } from '@lib';

export const INVALID_PASSWORD_FORMAT = 'AUTH.INVALID_PASSWORD_FORMAT';
export const PASSWORD_TOO_SHORT = 'AUTH.PASSWORD_TOO_SHORT';
export const PASSWORD_TOO_LONG = 'AUTH.PASSWORD_TOO_LONG';
export const PASSWORD_WITHOUT_NUMBER = 'AUTH.PASSWORD_WITHOUT_NUMBER';
export const PASSWORD_WITHOUT_UPPERCASE = 'AUTH.PASSWORD_WITHOUT_UPPERCASE';
export const PASSWORD_WITHOUT_LOWERCASE = 'AUTH.PASSWORD_WITHOUT_LOWERCASE';

export class InvalidPasswordFormatException extends ExceptionBase {
	constructor(message = 'Invalid password') {
		super(message);
	}

	readonly code = INVALID_PASSWORD_FORMAT;
}

export class PasswordTooShortException extends ExceptionBase {
	constructor(message = 'Password is too short') {
		super(message);
	}

	readonly code = PASSWORD_TOO_SHORT;
}

export class PasswordTooLongException extends ExceptionBase {
	constructor(message = 'Password is too long') {
		super(message);
	}

	readonly code = PASSWORD_TOO_LONG;
}

export class PasswordWithoutNumberException extends ExceptionBase {
	constructor(message = 'Password must contain at least one number') {
		super(message);
	}

	readonly code = PASSWORD_WITHOUT_NUMBER;
}

export class PasswordWithoutUppercaseException extends ExceptionBase {
	constructor(message = 'Password must contain at least one uppercase letter') {
		super(message);
	}

	readonly code = PASSWORD_WITHOUT_UPPERCASE;
}

export class PasswordWithoutLowercaseException extends ExceptionBase {
	constructor(message = 'Password must contain at least one lowercase letter') {
		super(message);
	}

	readonly code = PASSWORD_WITHOUT_LOWERCASE;
}
