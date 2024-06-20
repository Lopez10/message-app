import { Injectable } from '@nestjs/common';
import { NotificationRepositoryPort } from '../domain/notification.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';
import {
	Notification,
	NotificationPrimitives,
} from '../domain/notification.entity';
import { NotificationMapper } from '../application/notification.mapper';
import { Id } from '@lib';

@Injectable()
export class NotificationPrismaRepository
	implements NotificationRepositoryPort
{
	constructor(private readonly prisma: PrismaService) {}

	async insert(notification: Notification): Promise<void> {
		const notificationDto: NotificationPrimitives =
			NotificationMapper.toDto(notification);

		await this.prisma.notification.create({
			data: notificationDto,
		});
	}

	async findAllByUserId(userId: Id): Promise<Notification[]> {
		const notifications = await this.prisma.notification.findMany({
			where: {
				userId: userId.value,
			},
		});

		return notifications.map((notification) =>
			NotificationMapper.toDomain(notification).get(),
		);
	}
}
