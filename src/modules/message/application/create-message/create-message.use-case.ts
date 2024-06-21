import { Either, Id, Success, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateMessageMapper } from './create-message.mapper';
import { MessageEntityUnknownException } from '@modules/message/domain/message.exception';
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
import { UserNotFoundException } from '@modules/user/domain/user.exception';

@Injectable()
export class CreateMessage
	implements
		UseCase<
			CreateMessageDto,
			Either<
				| MessageEntityUnknownException
				| UserReceiverNotFoundException
				| UserReceiverIsNotActiveException
				| UserNotFoundException,
				Success
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
			| UserReceiverIsNotActiveException
			| UserNotFoundException,
			Success
		>
	> {
		const messageCreated = CreateMessageMapper.toDomain(createMessageDto);
		if (messageCreated.isLeft()) {
			return Either.left(messageCreated.getLeft());
		}

		const receiverId = new Id(createMessageDto.receiverId);
		const receiverUser = await this.userRepository.findById(receiverId);

		if (receiverUser.isLeft()) {
			return Either.left(new UserReceiverNotFoundException());
		}

		if (!receiverUser.get().isActive) {
			return Either.left(new UserReceiverIsNotActiveException());
		}

		await this.messageRepository.insert(messageCreated.get());

		return Either.right({ success: true });
	}
}
