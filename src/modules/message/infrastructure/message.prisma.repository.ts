import { Injectable } from '@nestjs/common';
import { Message } from '../domain/message.entity';
import { MessageRepositoryPort } from '../domain/message.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateMessageMapper } from '../application/create-message/create-message.mapper';
import { MessageMapper } from '../application/message.mapper';

@Injectable()
export class MessagePrismaRepository implements MessageRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	// Modify to Either
	async insert(createMessage: Message): Promise<void> {
		const createMessageDto = MessageMapper.toDto(createMessage);

		const messageCreated = await this.prisma.message.create({
			data: createMessageDto,
		});

		if (!messageCreated) {
			// Add Left here
			throw new Error('Message not created');
		}
	}
}
