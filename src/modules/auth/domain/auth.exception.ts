import { ExceptionBase } from '@lib';

export const AUTH_ENTITY_UNKNOW_ERROR = 'AUTH.ENTITY_UNKNOW_ERROR';
export const AUTH_NOT_FOUND = 'AUTH.NOT_FOUND';

export class AuthEntityUnknownException extends ExceptionBase {
	constructor(message = 'Auth entity unknown error') {
		super(message);
	}

	readonly code = AUTH_ENTITY_UNKNOW_ERROR;
}

export class AuthNotFoundException extends ExceptionBase {
	constructor(message = 'Auth not found') {
		super(message);
	}

	readonly code = AUTH_NOT_FOUND;
}
