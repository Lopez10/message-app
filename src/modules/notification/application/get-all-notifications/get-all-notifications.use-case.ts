import { Either, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { GetAllNotificationsDto } from './get-all-notifications.mapper';
import {
	NotificationRepositoryPortSymbol,
	NotificationRepositoryPort,
} from '@modules/notification/domain/notification.repository.port';
import { NotificationDto } from '../notification.mapper';

@Injectable()
export class GetAllNotifications
	implements UseCase<GetAllNotificationsDto, Either<void, NotificationDto[]>>
{
	constructor(
		@Inject(NotificationRepositoryPortSymbol)
		private readonly notificationRepository: NotificationRepositoryPort,
	) {}

	async run(
		request?: GetAllNotificationsDto,
	): Promise<Either<void, NotificationDto[]>> {
		throw new Error('Method not implemented.');
	}
}
