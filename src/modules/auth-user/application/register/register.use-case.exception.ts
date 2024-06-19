import { ExceptionBase } from '@lib';

export const USER_ALREADY_EXISTS = 'AUTH.USER_ALREADY_EXISTS';

export class UserAlreadyExistsException extends ExceptionBase {
	constructor(message = 'User already exists') {
		super(message);
	}

	readonly code = USER_ALREADY_EXISTS;
}
