import type { Either, UseCase } from '@lib';

export type RegisterDto = {
	email: string;
	password: string;
	name: string;
};

export class Register implements UseCase<RegisterDto, Either<string, string>> {
	run(request: RegisterDto): Promise<Either<string, string>> {
		throw new Error('Method not implemented.');
	}
}
