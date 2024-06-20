import { ExceptionBase } from '@lib';

export const NOTIFICATION_ENTITY_UNKNOW_ERROR =
	'NOTIFICATION.ENTITY_UNKNOW_ERROR';

export class NotificationEntityUnknownException extends ExceptionBase {
	constructor(message = 'Notification entity unknown error') {
		super(message);
	}

	readonly code = NOTIFICATION_ENTITY_UNKNOW_ERROR;
}
