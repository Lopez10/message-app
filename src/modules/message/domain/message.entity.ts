import { Either, Entity, Id } from '@lib';
import { MessageEntityUnknownException } from './message.entity.exception';

export interface MessagePrimitives {
	id: string;
	content: string;
	senderId: string;
	receiverId: string;
}

export interface MessageProps {
	content: string;
	senderId: Id;
	receiverId: Id;
}

export class Message extends Entity<MessageProps> {
	get content() {
		return this.props.content;
	}

	get senderId() {
		return this.props.senderId;
	}

	get receiverId() {
		return this.props.receiverId;
	}

	private constructor(props: MessageProps, id?: Id) {
		super(props, id);
	}

	public static create(
		props: MessageProps,
		id?: Id,
	): Either<MessageEntityUnknownException, Message> {
		const message = new Message(props, id);

		return Either.right(message);
	}
}
