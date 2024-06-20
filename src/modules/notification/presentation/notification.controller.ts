import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	NotificationRepositoryPortSymbol,
	NotificationRepositoryPort,
} from '../domain/notification.repository.port';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { GetAllNotifications } from '../application/get-all-notifications/get-all-notifications.use-case';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
	constructor(
		@Inject(NotificationRepositoryPortSymbol)
		private readonly notificationRepository: NotificationRepositoryPort,
	) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: 'All notifications',
	})
	async getAllNotifications(@Request() req) {
		const getAllNotificationsDto = { userId: req.user.id };
		const getAllNotifications = new GetAllNotifications(
			this.notificationRepository,
		);

		const result = await getAllNotifications.run(getAllNotificationsDto);

		if (result.isLeft()) {
			const error = result.getLeft();
			return error;
		}

		return result.get();
	}
}
