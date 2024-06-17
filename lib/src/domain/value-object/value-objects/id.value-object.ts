import { randomUUID } from 'node:crypto';
import { type DomainPrimitive, ValueObject } from '../value-object.base';

export class Id extends ValueObject<string> {
	constructor(value?: string) {
		super(value ? { value } : { value: randomUUID() });
		this.validate({ value: this.props.value });
	}

	public get value(): string {
		return this.props.value;
	}

	protected validate({ value: id }: DomainPrimitive<string>): void {
		if (!id || !this.isValidUUID(id)) {
			throw new Error(`Invalid ID format: "${id}"`);
		}
	}

	private isValidUUID(id: string): boolean {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		return uuidRegex.test(id);
	}
}
