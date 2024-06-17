import * as bcrypt from 'bcrypt';
import { type DomainPrimitive, ValueObject } from '../value-object.base';

export interface PasswordProps {
	value: string;
	hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
	private static readonly SALT_ROUNDS = 10;

	constructor({ value, hashed }: PasswordProps) {
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

	protected validate({ value: password }: DomainPrimitive<string>): void {
		if (password.length < 8) {
			throw new Error('Password must be at least 8 characters long.');
		}
		if (password.length > 50) {
			throw new Error('Password must be at most 50 characters long');
		}
		if (!/[A-Z]/.test(password)) {
			throw new Error('Password must contain at least one uppercase letter.');
		}
		if (!/[a-z]/.test(password)) {
			throw new Error('Password must contain at least one lowercase letter.');
		}
		if (!/[0-9]/.test(password)) {
			throw new Error('Password must contain at least one number.');
		}
	}
}
