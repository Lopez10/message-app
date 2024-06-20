import { Id } from '@lib';
import { Message } from '../domain/message.entity';
import { MessageRepositoryPort } from '../domain/message.repository.port';

export class MessageMemoryRepository implements MessageRepositoryPort {
	private messages: Message[] = [];

	async insert(message: Message): Promise<void> {
		await this.messages.push(message);
	}

	async findAllByReceiverId(receiverId: Id): Promise<Message[]> {
		return await this.messages.filter((message) =>
			receiverId.isEqual(message.receiverId),
		);
	}
}
