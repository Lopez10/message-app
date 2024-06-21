import { Either, Id, UnexpectedError } from '@lib';
import { Message } from '../domain/message.entity';
import { MessageRepositoryPort } from '../domain/message.repository.port';

export class MessageMemoryRepository implements MessageRepositoryPort {
	private messages: Message[] = [];

	async insert(message: Message): Promise<Either<UnexpectedError, void>> {
		await this.messages.push(message);

		return Either.right(undefined);
	}

	async findAllByReceiverId(receiverId: Id): Promise<Message[]> {
		return await this.messages.filter((message) =>
			receiverId.isEqual(message.receiverId),
		);
	}
}
