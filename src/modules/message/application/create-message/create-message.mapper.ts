import { Either, Id } from '@lib';
import { Message } from '@modules/message/domain/message.entity';
import { MessageEntityUnknownException } from '@modules/message/domain/message.entity.exception';
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
	originUserId: string;

	@ApiProperty({
		example: '2',
		description: 'Destination user id',
		required: true,
	})
	destinationUserId: string;
}

export class CreateMessageMapper {
	static toDto(message: Message): CreateMessageDto {
		return {
			content: message.content,
			originUserId: message.originUserId.value,
			destinationUserId: message.destinationUserId.value,
		};
	}

	static toDomain(
		createMessageDto: CreateMessageDto,
	): Either<MessageEntityUnknownException, Message> {
		return Message.create({
			content: createMessageDto.content,
			originUserId: new Id(createMessageDto.originUserId),
			destinationUserId: new Id(createMessageDto.destinationUserId),
		});
	}
}
