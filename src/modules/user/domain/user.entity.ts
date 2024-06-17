import { Entity, Result, type Id } from '@lib';

export interface UserProps {
	name: string;
	email: string;
}

export class User extends Entity<UserProps> {
	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	private constructor(props: UserProps, id?: Id) {
		super(props, id);
	}

	public static create(props: UserProps, id?: Id): Result<User> {
		const user = new User(props, id);

		return Result.ok(user);
	}
}
