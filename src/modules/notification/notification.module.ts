import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [],
})
export class NotificationModule {}
