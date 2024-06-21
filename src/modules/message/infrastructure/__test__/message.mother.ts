import { MessageMapper } from '@modules/message/application/message.mapper';
import {
	Message,
	MessagePrimitives,
} from '@modules/message/domain/message.entity';

export class MessageMother {
	static create(params: Partial<MessagePrimitives>): Message {
		const messageDto: MessagePrimitives = {
			id: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			content: 'test',
			receiverId: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			senderId: '38010560-d08f-42d8-a3e5-72d55aa51e07',
			...params,
		};

		return MessageMapper.toDomain(messageDto).get();
	}
}
