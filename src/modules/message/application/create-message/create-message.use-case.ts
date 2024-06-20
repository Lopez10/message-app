import { Either, Id, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateMessageMapper } from './create-message.mapper';
import { MessageEntityUnknownException } from '@modules/message/domain/message.entity.exception';
import {
	MessageRepositoryPort,
	MessageRepositoryPortSymbol,
} from '@modules/message/domain/message.repository.port';
import {
	UserRepositoryPort,
	UserRepositoryPortSymbol,
} from '@modules/user/domain/user.repository.port';
import {
	UserReceiverIsNotActiveException,
	UserReceiverNotFoundException,
} from '../message.exception';

@Injectable()
export class CreateMessage
	implements
		UseCase<
			CreateMessageDto,
			Either<
				| MessageEntityUnknownException
				| UserReceiverNotFoundException
				| UserReceiverIsNotActiveException,
				void
			>
		>
{
	constructor(
		@Inject(MessageRepositoryPortSymbol)
		private readonly messageRepository: MessageRepositoryPort,

		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}
	async run(
		createMessageDto: CreateMessageDto,
	): Promise<
		Either<
			| MessageEntityUnknownException
			| UserReceiverNotFoundException
			| UserReceiverIsNotActiveException,
			void
		>
	> {
		const messageCreated = CreateMessageMapper.toDomain(createMessageDto);
		if (messageCreated.isLeft()) {
			return Either.left(messageCreated.getLeft());
		}

		const receiverId = new Id(createMessageDto.receiverId);
		const receiverUser = await this.userRepository.findById(receiverId);

		if (!receiverUser) {
			return Either.left(new UserReceiverNotFoundException());
		}

		if (!receiverUser.isActive) {
			return Either.left(new UserReceiverIsNotActiveException());
		}

		await this.messageRepository.insert(messageCreated.get());
	}
}
