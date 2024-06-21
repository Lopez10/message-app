import { Either, Id, UnexpectedError } from '@lib';
import { Notification } from './notification.entity';

export interface NotificationRepositoryPort {
	insert(notification: Notification): Promise<Either<UnexpectedError, void>>;
	findAllByUserId(userId: Id): Promise<Either<UnexpectedError, Notification[]>>;
}

export const NotificationRepositoryPortSymbol = Symbol(
	'NotificationRepositoryPort',
);
