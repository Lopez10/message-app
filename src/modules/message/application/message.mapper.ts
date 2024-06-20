import { Either, Id } from '@lib';
import { Message, MessagePrimitives } from '../domain/message.entity';
import { MessageEntityUnknownException } from '../domain/message.entity.exception';

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
