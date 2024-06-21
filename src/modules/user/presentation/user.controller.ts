import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPrismaRepository as UserPostgreRepository } from '../infrastructure/user.prisma.repository';
import { UserRepositoryPortSymbol } from '../domain/user.repository.port';
import {
	Body,
	Controller,
	Get,
	HttpException,
	Inject,
	Patch,
	Put,
	Request,
	UseGuards,
} from '@nestjs/common';
import { GetActiveUsers } from '../application/get-active-users/get-active-users.use-case';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UpdateUserStatus } from '../application/update-user-status/update-user-status.use-case';
import { GetUserByEmail } from '../application/get-user-by-email/get-user-by-email.use-case';
import { UpdateUser } from '../application/update-user/update-user.use-case';
import { UpdateUserBody } from '../application/update-user/update-user.mapper';

@ApiTags('users')
@Controller('users')
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

	@UseGuards(JwtAuthGuard)
	@Patch('me/status')
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: 'User status updated',
	})
	async updateStatus(@Request() req) {
		const updateStatus = new UpdateUserStatus(this.userRepository);

		await updateStatus.run(req.user.email);
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: 'User details',
	})
	async me(@Request() req) {
		const getUser = new GetUserByEmail(this.userRepository);

		const result = await getUser.run(req.user.email);

		if (result.isLeft()) {
			const error = result.getLeft();
			throw error;
		}

		return result.get();
	}

	@UseGuards(JwtAuthGuard)
	@Put('me')
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: 'User updated',
	})
	async update(@Request() req, @Body() body: UpdateUserBody) {
		const updateUser = new UpdateUser(this.userRepository);

		const userDto = {
			id: req.user.id,
			updateUserBody: body,
		};

		const userUpdated = await updateUser.run(userDto);

		if (userUpdated.isLeft()) {
			const error = userUpdated.getLeft();
			throw new HttpException(error.message, 500);
		}

		return { message: 'User updated' };
	}
}
