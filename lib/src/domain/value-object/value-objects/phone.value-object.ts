import { type DomainPrimitive, ValueObject } from '../value-object.base';

export class Phone extends ValueObject<string> {
	constructor(value: string) {
		super({ value });
		this.validate({ value });
		this.props.value = value;
	}

	get value(): string {
		return this.props.value;
	}

	protected validate({ value: phone }: DomainPrimitive<string>): void {
		if (!this.isPhoneNumber(phone)) {
			throw new Error(`Phone "${phone}" has incorrect format`);
		}
	}

	private isPhoneNumber(phone: string): boolean {
		return phone.match(/^\+?3?8?(0\d{9})$/) !== null;
	}
}
