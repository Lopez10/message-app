import { type DomainPrimitive, ValueObject } from '@lib';

export class JwtToken extends ValueObject<string> {
	constructor(value: string) {
		super({ value });
		this.validate({ value });
		this.props.value = value;
	}

	get value(): string {
		return this.props.value;
	}

	protected validate(props: DomainPrimitive<string>): void {
		const { value } = props;
		if (value.length < 10) {
			throw new Error(`Token "${value}" is too short`);
		}

		if (value.length > 1000) {
			throw new Error(`Token "${value}" is too long`);
		}
	}
}
