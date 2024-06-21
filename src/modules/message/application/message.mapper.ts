import { Either, Id } from '@lib';
import { Message, MessagePrimitives } from '../domain/message.entity';
import { MessageEntityUnknownException } from '../domain/message.exception';
import { ApiProperty } from '@nestjs/swagger';

export class MessageMapper {
	static toDto(message: Message): MessagePrimitives {
		return {
			id: message.id.value,
			content: message.content,
			senderId: message.senderId.value,
			receiverId: message.receiverId.value,
		};
	}
	static toDomain(
		message: MessagePrimitives,
	): Either<MessageEntityUnknownException, Message> {
		return Message.create(
			{
				content: message.content,
				senderId: new Id(message.senderId),
				receiverId: new Id(message.receiverId),
			},
			new Id(message.id),
		);
	}
}

export class MessageDto {
	@ApiProperty({
		example: '40735409-a410-4aa8-b26a-242dc4399899',
		description: 'The message id',
		required: true,
	})
	id: string;

	@ApiProperty({
		example: 'Hello, world!',
		description: 'The message content',
		required: true,
	})
	content: string;

	@ApiProperty({
		example: '40735409-a410-4aa8-b26a-242dc4399899',
		description: 'The sender id',
		required: true,
	})
	senderId: string;

	@ApiProperty({
		example: '40735409-a410-4aa8-b26a-242dc4399899',
		description: 'The receiver id',
		required: true,
	})
	receiverId: string;
}
