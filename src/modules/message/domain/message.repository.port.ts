import { Message } from './message.entity';

export interface MessageRepositoryPort {
	createMessage(message: Message): Promise<void>;
}

export const MessageRepositoryPortSymbol = Symbol('MessageRepositoryPort');
