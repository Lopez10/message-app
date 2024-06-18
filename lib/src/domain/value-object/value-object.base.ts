export type Primitives = string | number | boolean;

export type PrimitivesExtended = Primitives | Date | null;

export interface DomainPrimitive<T extends Primitives | Date> {
	value: T;
}

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
	constructor(protected props: ValueObjectProps<T>) {}

	public isEqual(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false;
		}
		if (vo.props === undefined) {
			return false;
		}
		return JSON.stringify(vo.props) === JSON.stringify(this.props);
	}
}
