import { Injectable } from '@nestjs/common';
import { Message } from '../domain/message.entity';
import { MessageRepositoryPort } from '../domain/message.repository.port';
import { PrismaService } from '@modules/prisma/prisma.service';
import { MessageMapper } from '../application/message.mapper';
import { Either, Id, UnexpectedError } from '@lib';

@Injectable()
export class MessagePrismaRepository implements MessageRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async insert(message: Message): Promise<Either<UnexpectedError, void>> {
		const messageDto = MessageMapper.toDto(message);
		const messageCreated = await this.prisma.message.create({
			data: messageDto,
		});

		if (!messageCreated) {
			return Either.left(new UnexpectedError());
		}

		return Either.right(undefined);
	}

	async findAllByReceiverId(receiverId: Id): Promise<Message[]> {
		const messages = await this.prisma.message.findMany({
			where: {
				receiverId: receiverId.value,
			},
		});

		return messages.map((message) => MessageMapper.toDomain(message).get());
	}
}
