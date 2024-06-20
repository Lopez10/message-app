import { Either, Entity, Id } from '@lib';
import { NotificationEntityUnknownException } from './notification.entity.exception';

export interface NotificationProps {
	userId: Id;
	message: string;
	isRead: boolean;
}

export interface NotificationPrimitives {
	id: string;
	userId: string;
	message: string;
	isRead: boolean;
}

export class Notification extends Entity<NotificationProps> {
	get userId() {
		return this.props.userId;
	}

	get message() {
		return this.props.message;
	}

	get isRead() {
		return this.props.isRead;
	}

	private constructor(props: NotificationProps, id?: Id) {
		super(props, id);
	}

	public static create(
		props: NotificationProps,
		id?: Id,
	): Either<NotificationEntityUnknownException, Notification> {
		const notification = new Notification(props, id);

		return Either.right(notification);
	}
}
