import { Injectable } from '@nestjs/common';
import { NotificationRepositoryPort } from '../domain/notification.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';
import {
	Notification,
	NotificationPrimitives,
} from '../domain/notification.entity';
import { NotificationMapper } from '../application/notification.mapper';
import { Either, Id, UnexpectedError } from '@lib';

@Injectable()
export class NotificationPrismaRepository
	implements NotificationRepositoryPort
{
	constructor(private readonly prisma: PrismaService) {}

	async insert(
		notification: Notification,
	): Promise<Either<UnexpectedError, void>> {
		const notificationDto: NotificationPrimitives =
			NotificationMapper.toDto(notification);

		await this.prisma.notification.create({
			data: notificationDto,
		});

		return Either.right(undefined);
	}

	async findAllByUserId(
		userId: Id,
	): Promise<Either<UnexpectedError, Notification[]>> {
		const notificationsFound = await this.prisma.notification.findMany({
			where: {
				userId: userId.value,
			},
		});

		const notifications = notificationsFound.map((notification) =>
			NotificationMapper.toDomain(notification).get(),
		);

		return Either.right(notifications);
	}
}
