import { Either, Id } from '@lib';
import { Message, MessagePrimitives } from '../domain/message.entity';
import { MessageEntityUnknownException } from '../domain/message.entity.exception';

export class MessageMapper {
	static toDto(message: Message): MessagePrimitives {
		return {
			id: message.id.value,
			content: message.content,
			originUserId: message.originUserId.value,
			destinationUserId: message.destinationUserId.value,
		};
	}
	static toDomain(
		message: MessagePrimitives,
	): Either<MessageEntityUnknownException, Message> {
		return Message.create(
			{
				content: message.content,
				originUserId: new Id(message.originUserId),
				destinationUserId: new Id(message.destinationUserId),
			},
			new Id(message.id),
		);
	}
}
