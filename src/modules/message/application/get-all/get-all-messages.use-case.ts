import { Either, Id, UseCase } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { MessageDto, MessageMapper } from '../message.mapper';
import {
	MessageRepositoryPortSymbol,
	MessageRepositoryPort,
} from '@modules/message/domain/message.repository.port';
import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';

export type GetAllMessagesDto = {
	userId: string;
};

@Injectable()
export class GetAllMessages
	implements UseCase<GetAllMessagesDto, Either<void, MessageDto[]>>
{
	constructor(
		@Inject(MessageRepositoryPortSymbol)
		private readonly messageRepository: MessageRepositoryPort,

		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}

	async run(
		getAllMessagesDto: GetAllMessagesDto,
	): Promise<Either<void, MessageDto[]>> {
		const user = new Id(getAllMessagesDto.userId);
		const messages = await this.messageRepository.findAllByReceiverId(user);
		const messagesDto = messages.map((message) => MessageMapper.toDto(message));

		return Either.right(messagesDto);
	}
}
