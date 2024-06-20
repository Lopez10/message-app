import { Injectable } from '@nestjs/common';
import { NotificationRepositoryPort } from '../domain/notification.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class NotificationPrismaRepository
	implements NotificationRepositoryPort
{
	constructor(private readonly prisma: PrismaService) {}

	insert(notification: Notification): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
