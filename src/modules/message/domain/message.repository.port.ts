import { Message } from './message.entity';

export interface MessageRepositoryPort {
	insert(message: Message): Promise<void>;
}

export const MessageRepositoryPortSymbol = Symbol('MessageRepositoryPort');
