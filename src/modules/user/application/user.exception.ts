import { ExceptionBase } from '@lib';

export const USER_NOT_FOUND = 'USER.NOT_FOUND';

export class UserNotFoundException extends ExceptionBase {
	constructor(message = 'User not found') {
		super(message);
	}

	readonly code = USER_NOT_FOUND;
}
