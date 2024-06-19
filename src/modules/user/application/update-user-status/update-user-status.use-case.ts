import { UseCase, Either } from '@lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserStatusUseCase
	implements UseCase<string, Either<void, void>>
{
	run(email: string): Promise<Either<void, void>> {
		throw new Error('Method not implemented.');
	}
}
