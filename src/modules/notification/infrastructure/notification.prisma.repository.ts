import { Injectable } from '@nestjs/common';
import { NotificationRepositoryPort } from '../domain/notification.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';
import {
	Notification,
	NotificationPrimitives,
} from '../domain/notification.entity';
import { NotificationMapper } from '../application/notification.mapper';

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
}
