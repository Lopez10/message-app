import { type DomainPrimitive, ValueObject } from '@lib';

export class JwtToken extends ValueObject<string> {
	private constructor(value: string) {
		super({ value });
		this.props.value = value;
	}

	get value(): string {
		return this.props.value;
	}

	public static create(value: string): JwtToken {
		if (value.length < 10) {
			throw new Error(`Token "${value}" is too short`);
		}

		if (value.length > 1000) {
			throw new Error(`Token "${value}" is too long`);
		}
		return new JwtToken(value);
	}
}
