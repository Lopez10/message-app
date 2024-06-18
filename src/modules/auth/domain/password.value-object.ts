import { Either, ValueObject } from '@lib';
import * as bcrypt from 'bcrypt';
import {
	PasswordTooLongException,
	PasswordTooShortException,
	PasswordWithoutLowercaseException,
	PasswordWithoutNumberException,
	PasswordWithoutUppercaseException,
} from './password.value-object.exceptions';

export interface PasswordProps {
	value: string;
	hashed?: boolean;
}

export interface PasswordPrimitives {
	value: string;
	hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
	private static readonly SALT_ROUNDS = 10;

	private constructor({ value, hashed }: PasswordProps) {
		super({ value, hashed });
		if (!hashed) {
			this.props.value = this.hashPassword(value);
			this.props.hashed = true;
		}
	}

	public get value(): string {
		return this.props.value;
	}

	public async compare(plainText: string): Promise<boolean> {
		return await bcrypt.compare(plainText, this.props.value);
	}

	private hashPassword(password: string): string {
		const salt = bcrypt.genSaltSync(Password.SALT_ROUNDS);
		return bcrypt.hashSync(password, salt);
	}

	public static create({
		value: password,
	}: PasswordProps): Either<
		| PasswordTooShortException
		| PasswordTooLongException
		| PasswordWithoutNumberException
		| PasswordWithoutLowercaseException
		| PasswordWithoutUppercaseException,
		Password
	> {
		if (password.length < 8) {
			return Either.left(new PasswordTooShortException());
		}
		if (password.length > 50) {
			return Either.left(new PasswordTooLongException());
		}
		if (!/[A-Z]/.test(password)) {
			return Either.left(new PasswordWithoutUppercaseException());
		}
		if (!/[a-z]/.test(password)) {
			return Either.left(new PasswordWithoutLowercaseException());
		}
		if (!/[0-9]/.test(password)) {
			return Either.left(new PasswordWithoutNumberException());
		}
		return Either.right(new Password({ value: password }));
	}
}
