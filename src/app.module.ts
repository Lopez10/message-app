import { UserModule } from '@modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { MessageModule } from '@modules/message/message.module';
import { NotificationModule } from '@modules/notification/notification.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
			isGlobal: true,
		}),
		UserModule,
		AuthModule,
		MessageModule,
		NotificationModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
