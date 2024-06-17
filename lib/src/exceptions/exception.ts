import {
	ARGUMENT_INVALID,
	ARGUMENT_NOT_PROVIDED,
	ARGUMENT_OUT_OF_RANGE,
	CONFLICT,
	INTERNAL_SERVER_ERROR,
	INVALID_ROLE,
	INVALID_TOKEN,
	NOT_FOUND,
} from '.';
import { ExceptionBase } from './exception.base';

export class ArgumentInvalidException extends ExceptionBase {
	readonly code = ARGUMENT_INVALID;
}

export class ArgumentNotProvidedException extends ExceptionBase {
	readonly code = ARGUMENT_NOT_PROVIDED;
}

export class ArgumentOutOfRangeException extends ExceptionBase {
	readonly code = ARGUMENT_OUT_OF_RANGE;
}

export class ConflictException extends ExceptionBase {
	readonly code = CONFLICT;
}

export class NotFoundException extends ExceptionBase {
	static readonly message = 'Not found';

	constructor(message = NotFoundException.message) {
		super(message);
	}

	readonly code = NOT_FOUND;
}

export class InternalServerErrorException extends ExceptionBase {
	static readonly message = 'Internal server error';

	constructor(message = InternalServerErrorException.message) {
		super(message);
	}

	readonly code = INTERNAL_SERVER_ERROR;
}

export class InvalidTokenException extends ExceptionBase {
	static readonly message = 'Invalid token';

	constructor(message = InvalidTokenException.message) {
		super(message);
	}

	readonly code = INVALID_TOKEN;
}

export class InvalidRoleException extends ExceptionBase {
	static readonly message = 'Invalid role';
	constructor(role: string) {
		super(`message: ${role}`);
	}

	readonly code = INVALID_ROLE;
}
