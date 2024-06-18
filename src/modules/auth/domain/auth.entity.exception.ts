import { ExceptionBase } from '@lib';

export const AUTH_ENTITY_UNKNOW_ERROR = 'AUTH.ENTITY_UNKNOW_ERROR';

export class AuthEntityUnknownException extends ExceptionBase {
	constructor(message = 'Auth entity unknown error') {
		super(message);
	}

	readonly code = AUTH_ENTITY_UNKNOW_ERROR;
}
