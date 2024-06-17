import { UserModule } from '@modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
			isGlobal: true,
		}),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
