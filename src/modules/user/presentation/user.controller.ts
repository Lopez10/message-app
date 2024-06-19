import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserMongoRepository } from '../infrastructure/user.postgre.repository';
import { UserRepositoryPortSymbol } from '../domain/user.repository.port';
import { Controller, Get, Inject } from '@nestjs/common';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserMongoRepository,
	) {}

	@Get('active')
	@ApiResponse({
		status: 200,
		description: 'List of active users',
	})
	async active() {}
}
