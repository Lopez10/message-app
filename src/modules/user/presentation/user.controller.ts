import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserMongoRepository as UserPostgreRepository } from '../infrastructure/user.postgre.repository';
import { UserRepositoryPortSymbol } from '../domain/user.repository.port';
import { Controller, Get, Inject } from '@nestjs/common';
import { GetActiveUsers } from '../application/get-active-users/get-active-users.use-case';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserPostgreRepository,
	) {}

	@Get('active')
	@ApiResponse({
		status: 200,
		description: 'List of active users',
	})
	async active() {
		const getActiveUsers = new GetActiveUsers(this.userRepository);

		const result = await getActiveUsers.run();

		if (result.isLeft()) {
			const error = result.getLeft();
			throw error;
		}

		return result.get();
	}
}
