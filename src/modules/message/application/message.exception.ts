import { ExceptionBase } from '@lib';

export const USER_RECEIVER_NOT_FOUND = 'USER.RECEIVER_NOT_FOUND';
export const USER_SENDER_NOT_FOUND = 'USER.SENDER_NOT_FOUND';
export const USER_RECEIVER_IS_NOT_ACTIVE = 'USER.RECEIVER_IS_NOT_ACTIVE';

export class UserReceiverNotFoundException extends ExceptionBase {
	constructor(message = 'Receiver user not found') {
		super(message);
	}

	readonly code = USER_RECEIVER_NOT_FOUND;
}

export class UserSenderNotFoundException extends ExceptionBase {
	constructor(message = 'Sender user not found') {
		super(message);
	}

	readonly code = USER_SENDER_NOT_FOUND;
}

export class UserReceiverIsNotActiveException extends ExceptionBase {
	constructor(message = 'Receiver user is not active') {
		super(message);
	}

	readonly code = USER_RECEIVER_IS_NOT_ACTIVE;
}
