import { Either, Id, UnexpectedError } from '@lib';
import { Message } from './message.entity';

export interface MessageRepositoryPort {
	insert(message: Message): Promise<Either<UnexpectedError, void>>;
	findAllByReceiverId(receiverId: Id): Promise<Either<void, Message[]>>;
}

export const MessageRepositoryPortSymbol = Symbol('MessageRepositoryPort');
