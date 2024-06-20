import { ExceptionBase } from '@lib';

export const USER_DESTINATION_NOT_FOUND = 'USER.DESTINATION_NOT_FOUND';
export const USER_ORIGIN_NOT_FOUND = 'USER.ORIGIN_NOT_FOUND';

export class UserDestinationNotFoundException extends ExceptionBase {
	constructor(message = 'Destination user not found') {
		super(message);
	}

	readonly code = USER_DESTINATION_NOT_FOUND;
}

export class UserOriginNotFoundException extends ExceptionBase {
	constructor(message = 'Origin user not found') {
		super(message);
	}

	readonly code = USER_ORIGIN_NOT_FOUND;
}
