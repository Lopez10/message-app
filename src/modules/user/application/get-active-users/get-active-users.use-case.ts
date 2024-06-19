import { Either, UseCase } from '@lib';
import { User, UserPrimitives } from '@modules/user/domain/user.entity';
import { UserRepositoryPortSymbol } from '@modules/user/domain/user.repository.port';
import { UserMongoRepository } from '@modules/user/infrastructure/user.postgre.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '../user.mapper';

@Injectable()
export class GetActiveUsers
	implements UseCase<void, Either<void, UserPrimitives[]>>
{
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserMongoRepository,
	) {}

	async run(): Promise<Either<void, UserPrimitives[]>> {
		const activeUsers: User[] = await this.userRepository.getActiveUsers();

		return Either.right(activeUsers.map(UserMapper.toDto));
	}
}
