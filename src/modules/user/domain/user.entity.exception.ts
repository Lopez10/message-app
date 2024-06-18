import { ExceptionBase } from '@lib';

export const USER_ENTITY_UNKNOW_ERROR = 'USER.ENTITY_UNKNOW_ERROR';

export class UserEntityUnknownException extends ExceptionBase {
	constructor(message = 'User entity unknown error') {
		super(message);
	}

	readonly code = USER_ENTITY_UNKNOW_ERROR;
}
