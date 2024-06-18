export class Result<T> {
	public isSuccess: boolean;
	public isFailure: boolean;
	private error: T | string;
	private _value: T;

	public constructor(isSuccess: boolean, error?: T | string, value?: T) {
		if (isSuccess && error) {
			throw new Error(
				'InvalidOperation: A result cannot be successful and contain an error',
			);
		}
		if (!isSuccess && !error) {
			throw new Error(
				'InvalidOperation: A failing result needs to contain an error message',
			);
		}

		this.isSuccess = isSuccess;
		this.isFailure = !isSuccess;
		this.error = error;
		this._value = value;

		Object.freeze(this);
	}

	public getValue(): T {
		if (!this.isSuccess) {
			console.log(this.error);
			throw new Error(
				"Can't get the value of an error result. Use 'errorValue' instead.",
			);
		}

		return this._value;
	}

	public getErrorValue(): T {
		return this.error as T;
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, null, value);
	}

	public static fail<U>(error: string): Result<U> {
		return new Result<U>(false, error);
	}

	public static combine(results: Result<unknown>[]): Result<unknown> {
		for (const result of results) {
			if (result.isFailure) return result;
		}
		return Result.ok();
	}
}

type Left<L> = { kind: 'left'; leftValue: L };
type Right<R> = { kind: 'right'; rightValue: R };

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
	private constructor(private readonly value: EitherValue<L, R>) {}

	isLeft(): boolean {
		return this.value.kind === 'left';
	}
	isRight(): boolean {
		return this.value.kind === 'right';
	}

	fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
		switch (this.value.kind) {
			case 'left':
				return leftFn(this.value.leftValue);
			case 'right':
				return rightFn(this.value.rightValue);
		}
	}

	map<T>(fn: (r: R) => T): Either<L, T> {
		return this.flatMap((r) => Either.right(fn(r)));
	}

	flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
		return this.fold(
			(leftValue) => Either.left(leftValue),
			(rightValue) => fn(rightValue),
		);
	}

	mapLeft<T>(fn: (l: L) => T): Either<T, R> {
		return this.flatMapLeft((l) => Either.left(fn(l)));
	}

	flatMapLeft<T>(fn: (left: L) => Either<T, R>): Either<T, R> {
		return this.fold(
			(leftValue) => fn(leftValue),
			(rightValue) => Either.right(rightValue),
		);
	}

	get(errorMessage?: string): R {
		return this.getOrThrow(errorMessage);
	}

	getOrThrow(errorMessage?: string): R {
		const throwFn = () => {
			throw Error(
				errorMessage
					? errorMessage
					: `An error has ocurred retrieving value: ${JSON.stringify(this.value)}`,
			);
		};

		return this.fold(
			() => throwFn(),
			(rightValue) => rightValue,
		);
	}

	getLeft(): L {
		const throwFn = () => {
			throw Error(`The value is right: ${JSON.stringify(this.value)}`);
		};

		return this.fold(
			(leftValue) => leftValue,
			() => throwFn(),
		);
	}

	getOrElse(defaultValue: R): R {
		return this.fold(
			() => defaultValue,
			(someValue) => someValue,
		);
	}

	static left<L, R>(value: L) {
		return new Either<L, R>({ kind: 'left', leftValue: value });
	}

	static right<L, R>(value: R) {
		return new Either<L, R>({ kind: 'right', rightValue: value });
	}
}
