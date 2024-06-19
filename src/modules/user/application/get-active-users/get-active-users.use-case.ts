import { Either, UseCase } from '@lib';
import { UserPrimitives } from '@modules/user/domain/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetActiveUsers
	implements UseCase<void, Either<void, UserPrimitives[]>>
{
	run(): Promise<Either<void, UserPrimitives[]>> {
		throw new Error('Method not implemented.');
	}
}
