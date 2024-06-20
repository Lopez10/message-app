import { Either, UseCase } from '@lib';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './create-message.mapper';
import { MessageEntityUnknownException } from '@modules/message/domain/message.entity.exception';

@Injectable()
export class CreateMessage
	implements
		UseCase<CreateMessageDto, Either<MessageEntityUnknownException, void>>
{
	async run(
		createMessageDto: CreateMessageDto,
	): Promise<Either<MessageEntityUnknownException, void>> {
		throw new Error('Method not implemented.');
	}
}
