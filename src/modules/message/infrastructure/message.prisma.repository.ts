import { Injectable } from '@nestjs/common';
import { Message } from '../domain/message.entity';
import { MessageRepositoryPort } from '../domain/message.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class MessagePrismaRepository implements MessageRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	createMessage(message: Message): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
