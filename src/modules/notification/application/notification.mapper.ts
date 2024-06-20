import { Either, Id } from '@lib';
import {
	Notification,
	NotificationPrimitives,
} from '../domain/notification.entity';
import { NotificationEntityUnknownException } from '../domain/notification.entity.exception';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationMapper {
	static toDto(notification: Notification): NotificationDto {
		return {
			id: notification.id.value,
			userId: notification.userId.value,
			message: notification.message,
			isRead: notification.isRead,
		};
	}

	static toDomain(
		notification: NotificationDto,
	): Either<NotificationEntityUnknownException, Notification> {
		return Notification.create(
			{
				userId: new Id(notification.userId),
				message: notification.message,
				isRead: notification.isRead,
			},
			new Id(notification.id),
		);
	}
}

export class NotificationDto {
	@ApiProperty({
		example: '1',
		description: 'Notification id',
		required: true,
	})
	id: string;

	@ApiProperty({
		example: '1',
		description: 'User id',
		required: true,
	})
	userId: string;

	@ApiProperty({
		example: 'Hello',
		description: 'Notification message',
		required: true,
	})
	message: string;

	@ApiProperty({
		example: false,
		description: 'Is notification read',
		required: true,
	})
	isRead: boolean;
}
