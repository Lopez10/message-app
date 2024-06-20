import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MessageRepositoryPortSymbol } from './domain/message.repository.port';
import { MessagePrismaRepository } from './infrastructure/message.prisma.repository';
import { CreateMessage } from './application/create-message/create-message.use-case';
import { MessageController } from './presentation/message.controller';
import { NotificationModule } from '@modules/notification/notification.module';
@Module({
	imports: [PrismaModule, UserModule, AuthModule, NotificationModule],
	controllers: [MessageController],
	providers: [
		{
			provide: MessageRepositoryPortSymbol,
			useClass: MessagePrismaRepository,
		},
		CreateMessage,
	],
})
export class MessageModule {}
