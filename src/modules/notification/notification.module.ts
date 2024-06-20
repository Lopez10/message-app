import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { NotificationRepositoryPortSymbol } from './domain/notification.repository.port';
import { NotificationPrismaRepository } from './infrastructure/notification.prisma.repository';

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [
		{
			provide: NotificationRepositoryPortSymbol,
			useClass: NotificationPrismaRepository,
		},
	],
})
export class NotificationModule {}
