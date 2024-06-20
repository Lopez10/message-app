import { Either, Id } from '@lib';
import {
	Notification,
	NotificationPrimitives,
} from '../domain/notification.entity';
import { NotificationEntityUnknownException } from '../domain/notification.entity.exception';

export class NotificationMapper {
	static toDto(notification: Notification): NotificationPrimitives {
		return {
			id: notification.id.value,
			userId: notification.userId.value,
			message: notification.message,
			isRead: notification.isRead,
			createdAt: notification.createdAt,
		};
	}

	static toDomain(
		notification: NotificationPrimitives,
	): Either<NotificationEntityUnknownException, Notification> {
		return Notification.create({
			userId: new Id(notification.userId),
			message: notification.message,
			isRead: notification.isRead,
			createdAt: notification.createdAt,
		});
	}
}
