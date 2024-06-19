import { ValueObject, Either } from '@lib';
import { InvalidEmailFormatException } from './email.value-object.exception';

export class Email extends ValueObject<string> {
	private constructor(value: string) {
		super({ value });
		this.props.value = Email.format(value);
	}

	get value(): string {
		return this.props.value;
	}

	get name(): string {
		return this.value.substring(0, this.props.value?.lastIndexOf('@'));
	}

	get domain(): string {
		return this.value.substring(this.props.value?.lastIndexOf('@') + 1);
	}

	static format(email: string): string {
		return email.trim().toLowerCase();
	}

	public static create(
		email: string,
	): Either<InvalidEmailFormatException, Email> {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isEmailValid = emailRegex.test(email);
		if (!isEmailValid) {
			return Either.left(new InvalidEmailFormatException());
		}
		return Either.right(new Email(email));
	}
}
