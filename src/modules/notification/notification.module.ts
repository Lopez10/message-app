import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { NotificationRepositoryPortSymbol } from './domain/notification.repository.port';
import { NotificationPrismaRepository } from './infrastructure/notification.prisma.repository';
import { CreateNotification } from './application/create-notification/create-notification.use-case';

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [
		{
			provide: NotificationRepositoryPortSymbol,
			useClass: NotificationPrismaRepository,
		},
		CreateNotification,
	],
	exports: [
		CreateNotification,
		{
			provide: NotificationRepositoryPortSymbol,
			useClass: NotificationPrismaRepository,
		},
	],
})
export class NotificationModule {}
