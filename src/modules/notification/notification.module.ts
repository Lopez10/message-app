import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { NotificationRepositoryPortSymbol } from './domain/notification.repository.port';
import { NotificationPrismaRepository } from './infrastructure/notification.prisma.repository';
import { CreateNotification } from './application/create-notification/create-notification.use-case';
import { NotificationController } from './presentation/notification.controller';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [NotificationController],
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
