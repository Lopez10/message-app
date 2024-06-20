import { Either, Id } from '@lib';
import { Notification } from '@modules/notification/domain/notification.entity';
import { NotificationEntityUnknownException } from '@modules/notification/domain/notification.entity.exception';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
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

export class CreateNotificationMapper {
	static toDomain(
		createNotificationDto: CreateNotificationDto,
	): Either<NotificationEntityUnknownException, Notification> {
		return Notification.create({
			userId: new Id(createNotificationDto.userId),
			message: createNotificationDto.message,
			isRead: createNotificationDto.isRead,
		});
	}
}
