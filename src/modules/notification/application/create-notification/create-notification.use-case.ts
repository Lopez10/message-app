import { Either, Success, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import {
	CreateNotificationDto,
	CreateNotificationMapper,
} from './create-notification.mapper';
import {
	NotificationRepositoryPort,
	NotificationRepositoryPortSymbol,
} from '@modules/notification/domain/notification.repository.port';
import { NotificationEntityUnknownException } from '@modules/notification/domain/notification.entity.exception';

@Injectable()
export class CreateNotification
	implements
		UseCase<
			CreateNotificationDto,
			Either<NotificationEntityUnknownException, Success>
		>
{
	constructor(
		@Inject(NotificationRepositoryPortSymbol)
		private readonly notificationRepository: NotificationRepositoryPort,
	) {}
	async run(
		createNotificationDto: CreateNotificationDto,
	): Promise<Either<NotificationEntityUnknownException, Success>> {
		const notification = CreateNotificationMapper.toDomain(
			createNotificationDto,
		);

		if (notification.isLeft()) {
			return Either.left(new NotificationEntityUnknownException());
		}

		await this.notificationRepository.insert(notification.get());

		return Either.right({ success: true });
	}
}
