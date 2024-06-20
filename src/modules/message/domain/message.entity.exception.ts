import { ExceptionBase } from '@lib';

export const MESSAGE_ENTITY_UNKNOW_ERROR = 'MESSAGE.ENTITY_UNKNOW_ERROR';

export class MessageEntityUnknownException extends ExceptionBase {
	constructor(message = 'Message entity unknown error') {
		super(message);
	}

	readonly code = MESSAGE_ENTITY_UNKNOW_ERROR;
}
