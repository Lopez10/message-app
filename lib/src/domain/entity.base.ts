import {
	ArgumentNotProvidedException,
	ArgumentInvalidException,
	ArgumentOutOfRangeException,
} from '../exceptions';
import { Id } from './value-object';

const isEntity = (v: unknown): v is Entity<unknown> => {
	return v instanceof Entity;
};

export abstract class Entity<T> {
	protected readonly _id: Id;
	public readonly props: T;

	constructor(props: T, id?: Id) {
		this._id = id ? id : new Id();
		this.validateProps(props);
		this.props = props;
	}

	public equals(object?: Entity<T>): boolean {
		if (object === null || object === undefined) {
			return false;
		}

		if (this === object) {
			return true;
		}

		if (!isEntity(object)) {
			return false;
		}

		return this._id.matches(object._id);
	}

	get propsCopy(): Readonly<{ id: Id } & T> {
		const propsCopy = {
			id: this._id,
			...this.props,
		};
		return Object.freeze(propsCopy);
	}

	private validateProps(props: T): void {
		const MAX_PROPS = 50;

		if (typeof props !== 'object') {
			throw new ArgumentInvalidException('Entity props should be an object');
		}
		if (Object.keys(props as unknown).length > MAX_PROPS) {
			throw new ArgumentOutOfRangeException(
				`Entity props should not have more than ${MAX_PROPS} properties`,
			);
		}
	}
}
