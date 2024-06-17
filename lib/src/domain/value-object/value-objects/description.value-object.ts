import { type DomainPrimitive, ValueObject } from '../value-object.base';

export class Description extends ValueObject<string> {
	constructor(value: string) {
		super({ value });
		this.validate({ value });
		this.props.value = value;
	}

	get value(): string {
		return this.props.value;
	}

	protected validate({ value: description }: DomainPrimitive<string>): void {
		if (description.length > 250) {
			throw new Error(`Name "${description}" is too long`);
		}
	}
}
