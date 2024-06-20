import { Either, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateMessageMapper } from './create-message.mapper';
import { MessageEntityUnknownException } from '@modules/message/domain/message.entity.exception';
import {
	MessageRepositoryPort,
	MessageRepositoryPortSymbol,
} from '@modules/message/domain/message.repository.port';

@Injectable()
export class CreateMessage
	implements
		UseCase<CreateMessageDto, Either<MessageEntityUnknownException, void>>
{
	constructor(
		@Inject(MessageRepositoryPortSymbol)
		private readonly messageRepository: MessageRepositoryPort,
	) {}
	async run(
		createMessageDto: CreateMessageDto,
	): Promise<Either<MessageEntityUnknownException, void>> {
		const messageCreated = CreateMessageMapper.toDomain(createMessageDto);
		if (messageCreated.isLeft()) {
			return Either.left(messageCreated.getLeft());
		}

		await this.messageRepository.insert(messageCreated.get());
	}
}
