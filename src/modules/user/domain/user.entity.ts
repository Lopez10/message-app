import { Either, Entity, ExceptionBase, type Id } from '@lib';
import type { UserEntityUnknownException } from './user.exception';
import type { Email } from './email.value-object';

export interface UserPrimitives {
	id: string;
	name: string;
	email: string;
	isActive?: boolean;
}
export interface UserProps {
	name: string;
	email: Email;
	isActive?: boolean;
}

export class User extends Entity<UserProps> {
	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	get isActive() {
		return this.props.isActive;
	}

	toggleStatus() {
		this.props.isActive = !this.props.isActive;
	}

	private constructor(props: UserProps, id?: Id) {
		super(props, id);
	}

	public static create(
		props: UserProps,
		id?: Id,
	): Either<UserEntityUnknownException, User> {
		const user = new User(props, id);

		return Either.right(user);
	}
}
