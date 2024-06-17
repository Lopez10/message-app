import { type DomainPrimitive, ValueObject } from '../value-object.base';

export class Email extends ValueObject<string> {
	constructor(value: string) {
		super({ value });
		this.validate({ value });
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

	protected validate({ value: email }: DomainPrimitive<string>): void {
		// add email validation
	}

	static format(email: string): string {
		return email.trim().toLowerCase();
	}
}
