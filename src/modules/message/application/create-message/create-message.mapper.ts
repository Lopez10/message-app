import { Either, Id } from '@lib';
import { Message } from '@modules/message/domain/message.entity';
import { MessageEntityUnknownException } from '@modules/message/domain/message.exception';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
	@ApiProperty({
		example: 'Hello',
		description: 'Message content',
		required: true,
	})
	content: string;

	@ApiProperty({
		example: '1',
		description: 'Origin user id',
		required: true,
	})
	senderId: string;

	@ApiProperty({
		example: '2',
		description: 'Destination user id',
		required: true,
	})
	receiverId: string;
}

export class CreateMessageMapper {
	static toDto(createMessage: Message): CreateMessageDto {
		return {
			content: createMessage.content,
			senderId: createMessage.senderId.value,
			receiverId: createMessage.receiverId.value,
		};
	}

	static toDomain(
		createMessageDto: CreateMessageDto,
	): Either<MessageEntityUnknownException, Message> {
		return Message.create({
			content: createMessageDto.content,
			senderId: new Id(createMessageDto.senderId),
			receiverId: new Id(createMessageDto.receiverId),
		});
	}
}
