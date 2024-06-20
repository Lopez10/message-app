import { Either, Entity, Id } from '@lib';
import { MessageEntityUnknownException } from './message.entity.exception';

export interface MessagePrimitives {
	id: string;
	content: string;
	originUserId: string;
	destinationUserId: string;
}

export interface MessageProps {
	content: string;
	originUserId: Id;
	destinationUserId: Id;
}

export class Message extends Entity<MessageProps> {
	get content() {
		return this.props.content;
	}

	get originUserId() {
		return this.props.originUserId;
	}

	get destinationUserId() {
		return this.props.destinationUserId;
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
