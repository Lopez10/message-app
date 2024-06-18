import { Either, ValueObject } from '@lib';
import * as bcrypt from 'bcrypt';
import {
	PasswordTooLongException,
	PasswordTooShortException,
	PasswordWithoutLowercaseException,
	PasswordWithoutNumberException,
	PasswordWithoutUppercaseException,
} from './password.value-object.exceptions';

export class Password extends ValueObject<string> {
	private static readonly SALT_ROUNDS = 10;

	private constructor(value: string) {
		super({ value });
	}

	public get value(): string {
		return this.props.value;
	}

	public async compare(plainText: string): Promise<boolean> {
		return await bcrypt.compare(plainText, this.props.value);
	}

	static rehydrate(hash: string): Password {
		return new Password(hash);
	}

	public static create(
		value: string,
	): Either<
		| PasswordTooShortException
		| PasswordTooLongException
		| PasswordWithoutNumberException
		| PasswordWithoutLowercaseException
		| PasswordWithoutUppercaseException,
		Password
	> {
		if (value.length < 8) {
			return Either.left(new PasswordTooShortException());
		}
		if (value.length > 50) {
			return Either.left(new PasswordTooLongException());
		}
		if (!/[A-Z]/.test(value)) {
			return Either.left(new PasswordWithoutUppercaseException());
		}
		if (!/[a-z]/.test(value)) {
			return Either.left(new PasswordWithoutLowercaseException());
		}
		if (!/[0-9]/.test(value)) {
			return Either.left(new PasswordWithoutNumberException());
		}

		const salt = bcrypt.genSaltSync(Password.SALT_ROUNDS);
		const hashPassword = bcrypt.hashSync(value, salt);

		return Either.right(new Password(hashPassword));
	}
}
