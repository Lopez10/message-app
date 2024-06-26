import {
	Injectable,
	type OnModuleInit,
	type OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		try {
			await this.$connect();
		} catch (error) {
			console.error(
				'Failed to connect to the database:',
				process.env.DATABASE_URL,
				error.message,
			);
		}
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
