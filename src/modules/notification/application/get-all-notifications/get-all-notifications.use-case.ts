import { Either, Id, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { GetAllNotificationsDto } from './get-all-notifications.mapper';
import {
	NotificationRepositoryPortSymbol,
	NotificationRepositoryPort,
} from '@modules/notification/domain/notification.repository.port';
import { NotificationDto, NotificationMapper } from '../notification.mapper';

@Injectable()
export class GetAllNotifications
	implements UseCase<GetAllNotificationsDto, Either<void, NotificationDto[]>>
{
	constructor(
		@Inject(NotificationRepositoryPortSymbol)
		private readonly notificationRepository: NotificationRepositoryPort,
	) {}

	async run(
		getAllNotificationsDto: GetAllNotificationsDto,
	): Promise<Either<void, NotificationDto[]>> {
		const userId = new Id(getAllNotificationsDto.userId);
		const notifications =
			await this.notificationRepository.findAllByUserId(userId);

		const notificationDtos = notifications
			.get()
			.map((notification) => NotificationMapper.toDto(notification));

		return Either.right(notificationDtos);
	}
}
